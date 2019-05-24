module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.CommunicationsSrv
     * @description
     * Servicio que realiza la llamada a la API Communications
     */
    export class EligibilitySrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public baseURL: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.baseURL = vm.genericConstant.eligibility;
        }

        /**
         * Calcula la compatibilidad tecnica y comercial del servicio
         * @param msisdn Linea
         * @param service Servicio
         * @param componentName 
         */
        eligibilityCriteria(msisdn: string, service: string, componentName: string = "eligibility-comp") {
            let vm = this;

            let _search: Object = {
                queryParams: {
                    service: service
                },
                urlParams: ['eligibilityCriteria', msisdn]
            };

            return vm.httpCacheGett(vm.baseURL, _search, componentName)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error.data;
                });
        }
    }
    angular.module('eligibilitySrv', [])
        .service('eligibilitySrv', OrangeFeSARQ.Services.EligibilitySrv);
}
