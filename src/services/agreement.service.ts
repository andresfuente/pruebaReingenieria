module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name locator.UserSrv
     * @description
     * #rest
     * Servicio que busca un cliente en funcion de distintos parámetros
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
    }
}
