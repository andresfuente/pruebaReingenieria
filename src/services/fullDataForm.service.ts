module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OFC.Services.FullDataFormSrv
     * @description
     * Servicio que obtiene información de la API DeviceCatalog
     */
    export class FullDataFormSrv extends OrangeFeSARQ.Services.ParentService {
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
         * @ngdoc method
         * @name OFC.Services.FullDataFormSrv#getDeviceCatalogView()
         * @methodOf OFC.Services.FullDataFormSrv
         * @param {string} channel canal [pdv]
         * @param {string} isExistingCustomer [0 - cliente nuevo, 1 - cliente existente]
         * @param {string} commercialAction acto comercial [portabilidad, alta, ...]
         * @description
         * Valida el iban
         */
        validateBankAccount(document: string, bankAccount: string, individual: boolean) {
            let vm = this;
            let body;

            if (individual) {
                body = {
                    "individual": {
                        "id": document
                    },
                    "paymentMean": [{
                        "bankAccount": {
                            "iban": bankAccount
                        }
                    }]
                }
            } else {
                body = {
                    "organization": {
                        "id": document
                    },
                    "paymentMean": [{
                        "bankAccount": {
                            "iban": bankAccount
                        }
                    }]
                }
            }

            let _search: any = {
                urlParams: ['Customer', 'checkSalesProfile'],
                queryParams: {typeRequest:'validateBankAccount'},
                body: body
            };

            
            return vm.httpPost(vm.genericConstant.customerManagement, _search,'formulario')
                .then(function (response) {
                    return response;      
                })
                .catch(function (error) {
                    throw error;
                });
        }
        /**
         * @ngdoc method
         * @name OFC.Services.FullDataFormSrv#getDeviceCatalogView()
         * @methodOf OFC.Services.FullDataFormSrv
         * @param {string} channel canal [pdv]
         * @param {string} isExistingCustomer [0 - cliente nuevo, 1 - cliente existente]
         * @param {string} commercialAction acto comercial [portabilidad, alta, ...]
         * @description
         * Valida morosidad
         */
        validateDefaulter(document: string, individual: boolean) {
            let vm = this;
            let body;

            if (individual) {
                body = {
                    "individual": {
                        "id": document,
                        "ospIDtype": "BA"
                    }
                }
            } else {
                body = {
                    "organization": {
                        "id": document,
                        "ospIDtype": "BA"
                    }
                }
            }

            let _search: any = {
                urlParams: ['Customer', 'checkSalesProfile'],
                queryParams: {typeRequest:'validateBankAccount',blackList:'true'},
                body: body
            };

            
            return vm.httpPost(vm.genericConstant.customerManagement, _search,'formulario')
                .then(function (response) {
                     return response;
                })
                .catch(function (error) {
                    throw error;
                });
        }
    }

    angular.module('fullDataFormSrv', [])
        .service('fullDataFormSrv', FullDataFormSrv);
}
