module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name PermanencyDetailsSrv
     * @description
     * Servicio que realiza la llamada a la API Agreement.
     */
    export class PermanencyDetailsSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public genericConstant;
        public brand: string;
        public permanencyDetailsServiceUrl: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
            vm.brand = vm.genericConstant.brand;
            vm.permanencyDetailsServiceUrl = vm.genericConstant.agreement;
        }

        /**
         * @ngdoc method
         * @name #getPermanencyDataSrv(msisdn:string, site:string, marca:string, compomentName:string)
         * @methodOf locator.UserSrv
         * @param {string} msisdn Identificador de linea.
         * * @param {string} compomentName Componente.
         * @returns {object} Devuelve una promesa con el response.
         */
        getPermanencyDataSrv(msisdn: string, type: string, compomentName = 'permanencyDetailsComp'): any {
            let vm = this;
            let _search: Object = {
                queryParams: {'type': type},
                urlParams: [vm.brand, msisdn]
            };

            return vm.httpCacheGett(vm.permanencyDetailsServiceUrl, _search, compomentName)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    return error;
                }
            );
        }
    }
}
