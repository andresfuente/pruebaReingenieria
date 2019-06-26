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

            let list: any = [];
            let validAll: boolean = false;
            let loginData = JSON.parse(sessionStorage.getItem('loginData'));
            let cv = JSON.parse(sessionStorage.getItem('cv'));

            if (OrangeFeSARQ.Controllers.ParentController.shared
                && OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore
                && OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.listModule) {
                OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.listModule.forEach(element => {
                    if (element.compId === 'header_block_comp') {
                        element.listOption.forEach(option => {
                            if (option.name === 'defaultNmc.options' && option.listOptionsLiteral) {
                                if (_.size(option.listOptionsLiteral) !== 0) {
                                    option.listOptionsLiteral.forEach(literal => {
                                        list.push(literal.value);
                                    });
                                } else {
                                    validAll = true;
                                }
                            }
                        });
                    }
                });
            }


            if (loginData && loginData.sfid && loginData.sfid !== null) {
                if (validAll || list && ((_.size(list) !== 0) && _.indexOf(list, loginData.sfid) !== -1)) {
                    if (cv && cv.ospPointProgrammeType && cv.ospPointProgrammeType.toUpperCase() === 'SOCIO') {
                        return true;
                    } else if (!cv) {
                        return true;
                    }
                }
            }

            return false;
        }
        /**
         * 
         */
        isFdcSite() {
            const loginData = JSON.parse(sessionStorage.getItem('loginData'));
            return loginData.site === 'fichadecliente';
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
                    let umbral = vm.getCreditRisk(search, response);
                    if (umbral !== undefined && umbral !== null) {
                        sessionClientData.creditLimitRenove = {
                            'umbral': umbral
                        }
                    }
                } else if (search === 'PRESCORING') {
                    let creditLimit = vm.getCreditRisk(search, response);
                    if (creditLimit !== undefined && creditLimit !== null) {
                        if (creditLimit > 0) {
                            sessionClientData.creditLimitCapta = {
                                'creditLimitAvailable': creditLimit,
                                'staticCreditLimit': creditLimit,
                                'upperCreditLimit': false
                            }
                        } else {
                            sessionClientData.creditLimitCapta = {
                                'creditLimitAvailable': creditLimit,
                                'staticCreditLimit': 0,
                                'upperCreditLimit': true
                            }
                        }
                    }
                } else if (search === 'RENOVE' && sessionClientData.creditLimitRenove) {
                    let creditLimit = vm.getCreditRisk(search, response);
                    if (creditLimit !== undefined && creditLimit !== null) {
                        if (creditLimit < 0) {
                            
                            sessionClientData.creditLimitRenove.creditLimitAvailable = creditLimit;
                            sessionClientData.creditLimitRenove.staticCreditLimit = 0;
                            sessionClientData.creditLimitRenove.umbral = 0;
                            sessionClientData.creditLimitRenove.upperCreditLimit = true;
                            sessionClientData.creditLimitRenove.upperUmbral = true;
                        } else {
                            sessionClientData.creditLimitRenove.creditLimitAvailable = creditLimit;
                            sessionClientData.creditLimitRenove.staticCreditLimit = creditLimit;
                        }
                    } else {
                        if (!vm.isFdcSite()) {
                            delete sessionClientData.creditLimitRenove;
                        }
                    }
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
            let saldoEncontrado = false;

            if (search && response) {
                if (search === 'UMBRAL') { // customerView
                    if (response.customer && response.customer.customerCharacteristic && _.size(response.customer.customerCharacteristic) !== 0) {
                        let existLimitCredit: any = _.find(response.customer.customerCharacteristic, { 'name': 'umbralOrange' });
                        if (existLimitCredit && existLimitCredit.value !== null && 
                            parseInt(existLimitCredit.value) >= 0 ) {
                            limit = parseInt(existLimitCredit.value, 10);
                        }
                    }
                } else if (search === 'PRESCORING') { // cliente nuevo y existente del prescoring
                    if (response.customer && response.customer.ospCustomerSalesProfile && response.customer.ospCustomerSalesProfile[0]
                        && response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo
                        && response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo[0]
                        && response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo[0].ospFinancedAmount
                        && response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo[0].ospFinancedAmount !== null
                        && parseInt(response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo[0].ospFinancedAmount) >= 0 ) {
                        limit = parseInt(response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo[0].ospFinancedAmount, 10);
                    }
                } else if (search === 'RENOVE') { // campañas
                    if (response) {
                        response.forEach(campaign => {// Sacar el valor del primer renove
                            campaign.campaignNum.forEach(element2 => {
                                if (element2.wcs && element2.wcs.typeRenove && (element2.wcs.typeRenove === "Renove primario" || element2.wcs.typeRenove === "Renove secundario") && !saldoEncontrado) {
                                    if (campaign.saldoDisponible !== null && parseInt(campaign.saldoDisponible) >= 0 ) {
                                        limit = parseInt(campaign.saldoDisponible, 10);
                                        saldoEncontrado = true;
                                    }
                                }
                            });
                        });
                    }
                }
            }
            return limit;
        }

        /**
         * @name OrangeFeSARQ.Services:CreditLimitSrv#checkCampaignVAP
         * @description Comprueba si se tiene que cambiar el tipo de precio de la OT para renove 
         */
        checkCampaignVAP(campaigns) {
            let vm = this;

            let sessionClientData = JSON.parse(sessionStorage.getItem('clientData'));
            let owcsCampaign: string = _.camelCase('Renove primario');
            let owcsCampaignSecundario: string = _.camelCase('Renove secundario');
            if (sessionClientData && sessionClientData.creditLimitRenove) {
                sessionClientData.creditLimitRenove.linesWithVAP = [];
                if (campaigns) {
                    let ventaAPlazos: string;
                    campaigns.forEach(line => {
                        let linesWithVAP: any = {};
                        if (line.campaignNum && _.size(line.campaignNum) !== 0) {
                            line.campaignNum.forEach(campaign => {
                                if (campaign.wcs && (_.camelCase(campaign.wcs.typeRenove) === owcsCampaign || _.camelCase(campaign.wcs.typeRenove) === owcsCampaignSecundario)) {
                                    ventaAPlazos = campaign.ventaAPlazos;
                                    if (!ventaAPlazos || ventaAPlazos === 'null') {
                                        ventaAPlazos = 'Y';
                                    }
                                    linesWithVAP = {
                                        'line': line.idUser,
                                        'ventaAPlazos': ventaAPlazos
                                    }
                                    sessionClientData.creditLimitRenove.linesWithVAP.push(linesWithVAP);
                                }
                            });
                        }
                    });
                }
            }

            if (sessionClientData.creditLimitRenove.linesWithVAP && _.size(sessionClientData.creditLimitRenove.linesWithVAP) !== 0) {
                sessionClientData.creditLimitRenove.linesWithVAP = _.uniqBy(sessionClientData.creditLimitRenove.linesWithVAP, 'line');
                sessionStorage.setItem('clientData', JSON.stringify(sessionClientData));
            }
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

            if (sessionClientData && sessionClientData.creditLimitCapta && sessionClientData.creditLimitCapta.creditLimitAvailable !== null) {
                sessionClientData.creditLimitCapta.creditLimitAvailable = sessionClientData.creditLimitCapta.staticCreditLimit;
            }
            if (sessionClientData && sessionClientData.creditLimitRenove && sessionClientData.creditLimitRenove.creditLimitAvailable !== null) {
                sessionClientData.creditLimitRenove.creditLimitAvailable = sessionClientData.creditLimitRenove.staticCreditLimit;
            }
            sessionShopingCart.cartItem.forEach(option => {
                if (option.ospSelected && !(option.ospSelectable && option.ospSelectable === 'error')) {
                    option.cartItem.forEach(element => {
                        if (element.product && element.product.productRelationship && element.product.productRelationship.length > 0) {
                            if (_.find(element.product.productRelationship, { 'type': 'VAP' })) {
                                element.itemPrice.forEach(item => {
                                    if (item.priceType === 'cuota' && option.ospCartItemType !== 'renove') {
                                        priceVapsCapta += item.price.dutyFreeAmount.value * item.recurringChargePeriod;
                                    } else if (item.priceType === 'cuota' && option.ospCartItemType === 'renove') {
                                        priceVapsRenove += item.price.dutyFreeAmount.value * item.recurringChargePeriod;
                                    }
                                });
                            } else if (_.find(element.product.productRelationship, { 'type': 'terminal' }) && option.ospCartItemType !== 'renove') {
                                if (sessionClientData && sessionClientData.creditLimitCapta && sessionClientData.creditLimitCapta.creditLimitAvailable !== null) {
                                    sessionClientData.creditLimitCapta.creditLimitAvailable = sessionClientData.creditLimitCapta.staticCreditLimit;
                                }
                            } else if (_.find(element.product.productRelationship, { 'type': 'terminal' }) && option.ospCartItemType === 'renove') {
                                if (sessionClientData && sessionClientData.creditLimitRenove && sessionClientData.creditLimitRenove.creditLimitAvailable !== null) {
                                    sessionClientData.creditLimitRenove.creditLimitAvailable = sessionClientData.creditLimitRenove.staticCreditLimit;
                                }
                            }
                        }
                    });
                }
            });

            vm.calculateCreditLimitForActs(sessionClientData, priceVapsCapta, priceVapsRenove);
            sessionStorage.setItem('clientData', JSON.stringify(sessionClientData));
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

            if (sessionClientData.creditLimitCapta && priceVapsCapta !== null) {
                vm.calculateCreditLimitCapta(sessionClientData, priceVapsCapta, totalPriceVaps);
            }

            if (sessionClientData.creditLimitRenove && sessionClientData.creditLimitRenove.staticCreditLimit && priceVapsRenove !== null) {
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
        calculateCreditLimitCapta(sessionClientData, priceVapsCapta, totalPriceVaps) {
            let vm = this;

            if (sessionClientData.creditLimitCapta && sessionClientData.creditLimitCapta.creditLimitAvailable) {
                sessionClientData.creditLimitCapta.creditLimitAvailable = sessionClientData.creditLimitCapta.staticCreditLimit - priceVapsCapta;
            }

            if (totalPriceVaps > sessionClientData.creditLimitCapta.staticCreditLimit) {
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

            if (sessionClientData.creditLimitRenove && !sessionClientData.creditLimitCapta) {
                sessionClientData.creditLimitRenove.creditLimitAvailable =
                    sessionClientData.creditLimitRenove.staticCreditLimit - priceVapsRenove;
            } else {
                sessionClientData.creditLimitRenove.creditLimitAvailable =
                    sessionClientData.creditLimitRenove.staticCreditLimit - totalPriceVaps;
            }

            if (sessionClientData.creditLimitRenove.creditLimitAvailable > sessionClientData.creditLimitRenove.umbral) {
                sessionClientData.creditLimitRenove.upperUmbral = false;
            } else {
                sessionClientData.creditLimitRenove.upperUmbral = true;
            }

            if (priceVapsRenove > sessionClientData.creditLimitRenove.staticCreditLimit) {
                sessionClientData.creditLimitRenove.upperCreditLimit = true;
            } else {
                sessionClientData.creditLimitRenove.upperCreditLimit = false;
            }
        }
    }
}
