module OFC.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OFC.Services.AgreementSrv
     * @description
     * Servicio que realiza la llamada a la API Agreement.
     */
    export class AgreementSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector', '$q'];
        public agreementServiceUrl: string; 

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;

            vm.agreementServiceUrl = vm.genericConstant.getAgrement;
        }

        /**
         * @ngdoc method
         * @name OFC.Services.AgreementSrv#getPermanencyDataSrv()
         * @methodOf OFC.Services.AgreementSrv
         * @param {string} msisdn Identificador de linea.
         * @param {string} type Tipo de linea [fixed, mobile]
         * @param {string} compomentName Componente.
         * @description
         * Obtiene los datos de permanencia de una linea
         * @returns {object} Devuelve una promesa con el response.
         */
        getPermanencyDataSrv(msisdn: string, type: string, compomentName = 'agreementAndVapComp'): any {
            let vm = this;
            let apiAgreementUrl = vm.genericConstant.agreement;

            let _search: Object = {
                queryParams: {
                    'type': type,
                    'onlyActive': vm.genericConstant.onlyActive
                },
                urlParams: [vm.genericConstant.brand, msisdn]
            };

            return vm.httpCacheGett(apiAgreementUrl, _search, compomentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    throw error;
                }
                );
        }

        /**
         * @ngdoc method
         * @name #getAgreement(brand: string, documentType: string, document: string, 
         *               segment: string, compomentName?, startrownum?, pagesize?)
         * @methodOf locator.UserSrv
         * @param {string} msisdn Identificador de linea.
         * @param {string} documentType Tipo de documento.
         * @param {string} document valor del documento
         * @param {string} segment residencial|business
         * @param {string} compomentName Componente.
         * @description
         * Consulta las marcas de consentimiento
         * @returns {object} Activa/desactiva el CP movil.
         */
        getAgreement(brand: string, documentType: string, document: string,
            segment: string, componentName: string = 'agreementSrv', refresh: boolean = false, anotherBrand:string = this.genericConstant.brand): any {
            let vm = this;

            let _search: Object = {
                urlParams: [anotherBrand, 'agreementConsent', documentType, document],
                queryParams: { segment }
            };

            return vm.httpCacheGett(vm.agreementServiceUrl, _search, componentName, refresh)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error.data;
                });
        }

        /**
         * @ngdoc method
         * @name #getAgreement(brand: string, documentType: string, document: string, 
         *               segment: string, compomentName?, startrownum?, pagesize?)
         * @methodOf locator.UserSrv
         * @param {string} msisdn Identificador de linea.
         * @param {string} documentType Tipo de documento.
         * @param {string} document valor del documento
         * @param {string} segment residencial|business
         * @param {string} compomentName Componente.
         * @description
         * Consulta las marcas de consentimiento
         * @returns {object} Activa/desactiva el CP movil.
         */
        getAgreementByNumber(documentType: string, number: string,
            segment: string, componentName: string = 'agreementSrv', refresh: boolean = false): any {
            let vm = this;

            let _search: Object = {
                urlParams: ['agreement', vm.genericConstant.brand, number],
                queryParams: { 
                    'onlyActive': vm.genericConstant.onlyActive
                 }
            };

            return vm.httpCacheGett(vm.agreementServiceUrl, _search, componentName, refresh)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error.data;
                });
        }

        getAgreementByNumberJazztel(documentType: string, number: string,
            segment: string, componentName: string = 'agreementSrv', refresh: boolean = false): any {
            let vm = this;

            let _search: Object = {
                urlParams: ['agreement', 'jazztel', number],
                queryParams: { 
                    'onlyActive': vm.genericConstant.onlyActive
                 }
            };

            return vm.httpCacheGett(vm.agreementServiceUrl, _search, componentName, refresh)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error.data;
                });
        }

                /**
         * @ngdoc method
         * @name #setAgrrement(data: Object, comp: string)
         * @methodOf locator.UserSrv
         * @param {Object} data Valores de las marcas.
         * @param {string} comp Componente.
         * @description
         * Actualiza las marcas de consentimiento
         * @returns {object} Activa/desactiva el CP movil.
         */
        setAgreement(data: Object, comp: string){
            let vm = this;

            let _search: Object = {
                queryParams: data,
                urlParams: [vm.genericConstant.brand, 'modifyConsent']
            };
            let apiUrl = vm.agreementServiceUrl;

            return vm.httpPut(apiUrl, _search, comp)
                .then(
                    (response) => {
                        return response.data;
                    },
                    (error) => {
                        return error.data;
                    }
                );
        }


    }

    angular.module('agreementSrv', [])
        .service('agreementSrv', OFC.Services.AgreementSrv);
}
