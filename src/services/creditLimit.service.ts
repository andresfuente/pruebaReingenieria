module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:CreditLimitSrv
     * @author Isabel Matas
     * @description
     * Servicio para guardar y recuperar el limite de credito NMC
     */
    export class CreditLimitSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        constructor($injector) {
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
                                list = new Array<string>();
                                element1.listOptionsLiteral.forEach(element2 => {
                                    list.push(element2.value);
                                });
                            } else {
                                list = new Array<string>();
                            }
                        });
                    }
                });
            }

            if ((_.size(list) !== 0) && sessionStorage.getItem('shopInfo')) {
                if (_.indexOf(list, JSON.parse(sessionStorage.getItem('shopInfo')).sfid) !== -1) {
                    return true;
                }
            } else if (_.size(list) === 0) {
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
            let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            if (clientData) {
                clientData.creditLimit = vm.getCreditRisk(search, response);
                sessionStorage.setItem('clientData', JSON.stringify(clientData));
            }
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
            let limit = 0;
            if (search && response) {
                if (search === 'CV') {
                    if (response.customer && response.customer.individual && response.customer.individual.characteristic) {
                        limit = parseInt(_.find(response.customer.individual.characteristic, function (chr: any) {
                            if (chr.name && chr.name === 'limiteCredito') {
                                return chr;
                            }
                        }).value, 10);
                    }
                } else if (search === 'prescoring') {
                    if (response.customer && response.customer.ospCustomerSalesProfile && response.customer.ospCustomerSalesProfile[0]
                        && response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo
                        && response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo[0]
                        && response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo[0].ospFinancedAmount) {
                        limit = parseInt(response.customer.ospCustomerSalesProfile[0].ospDeferredPaymentInfo[0].ospFinancedAmount, 10);
                    }
                } else if (search === 'renove') {

                }
            }
            return limit;
        }

    }
}
