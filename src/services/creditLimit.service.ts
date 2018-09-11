module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:CreditLimitSrv
     * @author Isabel Matas & Jaime Alain
     * @description
     * Servicio para guardar y recuperar el limite de credito NMC
     */
    export class CreditLimitSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public existDefaultNMC: boolean = false;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
        }

        /**
         * @name OrangeFeSARQ.Services:CreditLimitSrv#isValidSFIDNMC
         * @description Devuelve true en caso de que el SFID de la tienda este incluido en la lista de SFIDs para NMC
         * @returns {boolean}
         */
        isValidSFIDNMC(): boolean {
            let vm = this;
            let list: Array<string>;

            if (OrangeFeSARQ.Controllers.ParentController.shared
                && OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore
                && OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.listModule) {
                OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.listModule.forEach(element => {
                    if (element.compId === 'header_block_comp') {
                        element.listOption.forEach(element1 => {
                            if (element1.name === 'defaultNmc.options' && _.size(element1.listOptionsLiteral) !== 0) {
                                vm.existDefaultNMC = true;
                                list = new Array<string>();
                                element1.listOptionsLiteral.forEach(element2 => {
                                    list.push(element2.value);
                                });
                            } else if (element1.name === 'defaultNmc.options' && _.size(element1.listOptionsLiteral) === 0) {
                                vm.existDefaultNMC = true;
                                list = new Array<string>();
                            }
                        });
                    }
                });
            }

            if (vm.existDefaultNMC && (_.size(list) !== 0) && sessionStorage.getItem('shopInfo')) {
                if (_.indexOf(list, JSON.parse(sessionStorage.getItem('shopInfo')).sfid) !== -1) {
                    return true;
                }
            } else
                if (vm.existDefaultNMC && _.size(list) === 0) {
                    return true;
                }
            return false;
        }

        /**
         * @name OrangeFeSARQ.Services:CreditLimitSrv#setCreditRisk
         * @param {string} search Donde se debe buscar el limite de credito [CV, prescoring, renove]
         * @param {object} response Respuesta del microservicio donde se debe buscar el limite de credito
         * @description Llama al metodo que busca el limite de credito para guardarlo en sessionStorage (clientData.creditLimit)
         */
        setCreditRisk(search: string, response) {
            let vm = this;

            let sessionClientData = JSON.parse(sessionStorage.getItem('clientData'));

            if (sessionClientData) {
                if (search === 'UMBRAL') {
                    sessionClientData.creditLimitRenove = {
                        'umbral': vm.getCreditRisk(search, response)
                    }
                } else if (search === 'PRESCORING') {
                    let creditLimit = vm.getCreditRisk(search, response);
                    sessionClientData.creditLimitCapta = {
                        'creditLimitAvailable': creditLimit,
                        'staticCreditLimit': creditLimit,
                        'upperCreditLimit': false
                    }
                } else if (search === 'RENOVE') {
                    sessionClientData.creditLimitRenove.creditLimitAvailable = vm.getCreditRisk(search, response);
                    sessionClientData.creditLimitRenove.staticCreditLimit = sessionClientData.creditLimitRenove.creditLimitAvailable;
                    sessionClientData.creditLimitRenove.upperUmbral = sessionClientData.creditLimitRenove.creditLimitAvailable > sessionClientData.creditLimitRenove.umbral ? false : true;
                    sessionClientData.creditLimitRenove.changeOT = true;
                    // sessionClientData.changeOT = response ... ;
                }
            }
            sessionStorage.setItem('clientData', JSON.stringify(sessionClientData));
        }

        /**
         * @name OrangeFeSARQ.Services:CreditLimitSrv#getCreditRisk
         * @param {string} search Donde se debe buscar el limite de credito [CV, prescoring, renove]
         * @param {object} response Respuesta del microservicio donde se debe buscar el limite de credito
         * @returns {number} limite de credito 
         * @description Busca el limite de credito y lo retorna
         */
        getCreditRisk(search: string, response): number {
            let vm = this;
            let limit;

            if (search && response) {
                if (search === 'UMBRAL') { // customerView
                    if (response.customer && response.customer.individual && response.customer.individual.characteristic !== null) {
                        let existLimitCredit: any = _.find(response.customer.individual.characteristic, { 'name': 'limiteCredito' });
                        if (existLimitCredit || !existLimitCredit) {
                            limit = parseInt(existLimitCredit.value, 10);
                            // limit = 2125;
                        }
                    }
                } else if (search === 'PRESCORING') { // cliente nuevo y existente del prescoring
                    if (response.customer && response.customer.ospCustomerSalesProfile && response.customer.ospCustomerSalesProfile[0]
                        && response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo
                        && response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo[0]
                        && response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo[0].ospFinancedAmount !== null) {
                        limit = parseInt(response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo[0].ospFinancedAmount, 10);
                        // limit = 500;
                    }
                } else if (search === 'RENOVE') { // campañas
                    if (response && response[0] && response[0].saldoDisponible !== null) {
                        limit = parseInt(response[0].saldoDisponible, 10);
                        // limit = 5000;
                    }
                }
            }
            return limit;
        }


        /**
         * @ngdoc method checkCreditLimit
         * @name shoppingCartOptions.Controllers:ShoppingCartOptionsCtrl#checkCreditLimit
         * @methodOf shoppingCartOptions.Controllers:ShoppingCartOptionsCtrl
         * @description comprueba los AC 
         * Calcula el precio actual del carrito y lo comprueba con el creditLimit
         */
        checkCreditLimit(sessionClientData, sessionShopingCart) {
            let vm = this;

            let priceVapsCapta: number = 0;
            let priceVapsRenove: number = 0;

            sessionShopingCart.cartItem.forEach(option => {
                if (option.ospSelected && option.ospCartItemType !== 'renove') {
                    option.cartItem.forEach(element => {
                        if (_.find(element.product.productRelationship, { 'type': 'VAP' })) {
                            element.itemPrice.forEach(item => {
                                if (item.priceType === 'cuota') {
                                    priceVapsCapta += item.price.dutyFreeAmount.value * item.recurringChargePeriod;
                                }
                            });
                        }
                    });
                } else if (option.ospSelected && option.ospCartItemType === 'renove') {
                    option.cartItem.forEach(element => {
                        if (_.find(element.product.productRelationship, { 'type': 'VAP' })) {
                            element.itemPrice.forEach(item => {
                                if (item.priceType === 'cuota') {
                                    priceVapsRenove += item.price.dutyFreeAmount.value * item.recurringChargePeriod;
                                }
                            });
                        }
                    });
                }
            });

            vm.calculateCreditLimitForActs(sessionClientData, priceVapsCapta, priceVapsRenove);
        }

        /**
         * @ngdoc method
         * @name shoppingCartOptions.Controllers:ShoppingCartOptionsCtrl#calculateLDC
         * @methodOf shoppingCartOptions.Controllers:ShoppingCartOptionsCtrl
         * @description
         * Calcula el precio del limite de credito para captacion y renove
         */
        calculateCreditLimitForActs(sessionClientData, priceVapsCapta, priceVapsRenove) {
            let vm = this;

            let totalPriceVaps: number = 0;

            totalPriceVaps = priceVapsCapta + priceVapsRenove;

            if (sessionClientData.creditLimitCapta && priceVapsCapta) {
                // Calcular si existe renove en el carrito realizar calculos aqui
                vm.calculateCreditLimitCapta(sessionClientData, priceVapsCapta, priceVapsRenove, totalPriceVaps);

            } else if (sessionClientData.creditLimitRenove && priceVapsRenove) {
                vm.calculateCreditLimitRenove(sessionClientData, priceVapsRenove, totalPriceVaps);
            }

        }

        /**
         * @ngdoc method
         * @name shoppingCartOptions.Controllers:ShoppingCartOptionsCtrl#calculateCreditLimitCapta
         * @methodOf shoppingCartOptions.Controllers:ShoppingCartOptionsCtrl
         * @description
         * Calcula el precio del limite de credito de captacion
         */
        calculateCreditLimitCapta(sessionClientData, priceVapsCapta, priceVapsRenove, totalPriceVaps) {
            let vm = this;

            if (sessionClientData.creditLimitCapta && sessionClientData.creditLimitCapta.creditLimitAvailable) {
                sessionClientData.creditLimitCapta.creditLimitAvailable = sessionClientData.creditLimitCapta.staticCreditLimit - priceVapsCapta;
            }

            if (sessionClientData.creditLimitRenove && priceVapsRenove) {
                vm.calculateCreditLimitRenove(sessionClientData, priceVapsRenove, totalPriceVaps);
            }

            if (priceVapsCapta > sessionClientData.creditLimitCapta.staticCreditLimit) {
                sessionClientData.creditLimitCapta.upperCreditLimit = true;
            } else {
                sessionClientData.creditLimitCapta.upperCreditLimit = false;
            }
        }

        /**
         * @ngdoc method
         * @name shoppingCartOptions.Controllers:ShoppingCartOptionsCtrl#calculateCreditLimitRenove
         * @methodOf shoppingCartOptions.Controllers:ShoppingCartOptionsCtrl
         * @description
         * Calcula el precio del limite de credito renove
         */
        calculateCreditLimitRenove(sessionClientData, priceVapsRenove, totalPriceVaps) {
            let vm = this;

            if (sessionClientData.creditLimitCapta) {
                sessionClientData.creditLimitRenove.creditLimitAvailable =
                    sessionClientData.creditLimitRenove.staticCreditLimit - totalPriceVaps;
            } else {
                sessionClientData.creditLimitRenove.creditLimitAvailable =
                    sessionClientData.creditLimitRenove.staticCreditLimit - priceVapsRenove;
            }

            if (sessionClientData.creditLimitRenove.creditLimitAvailable > sessionClientData.creditLimitRenove.umbral) {
                // Continuo
                // sessionClientData.creditLimitRenove.upperUmbral = false;
                sessionClientData.creditLimitRenove.upperUmbral = true;
            } else {
                // Bloqueo y popUppor ahora
                sessionClientData.creditLimitRenove.upperUmbral = true;
            }

        }

    }
}
