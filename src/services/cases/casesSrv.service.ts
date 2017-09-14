module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.CaseSrv
     * @description
     * Servicio que realiza la llamada al microwebservice para obtener la informacion
     * de los listados de casos
     */
    export class CasesSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        // Injection vars
        public genericConstant;

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:CasesSrv#contructor
         * @methodOf OrangeFeSARQ.Services:CasesSrv
         * @param {Object} $injector componente que necesita el parent injector
         * @description
         * Incluye las dependencias necesarias
         */
        constructor($injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:CasesSrv#setInjections
         * @methodOf OrangeFeSARQ.Services:CasesSrv
         * @param {Object} $injector componente que necesita el parent injector
         * @description
         * Incluye las dependencias necesarias
         */
        setInjections($injector) {
            let vm = this;

            vm.genericConstant = $injector.get('genericConstant');
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:CasesSrv#getMsInteraction
         * @methodOf OrangeFeSARQ.Services:CasesSrv
         * @param {string} individualPublicId numero documento
         * @param {string} category mobile / fixed
         * @param {string} componentName nombre del componente
         * @description
         * Devuelve los casos de un cliente si tiene
         * @return {ng.IPromise<any>} response -> interaction / err -> error
         */
        getMsInteraction(individualPublicId: string, category: string, componentName: string) {
            let vm = this;

            let _search: Object = {
                urlParams: ['interaction', category, individualPublicId]
            };

            return vm.httpCacheGett(vm.genericConstant.interactionAPIUrl, _search, componentName, true)
                .then(
                    function(response) {
                    return response.data;
                    }
                )
                .catch(
                    function(error) {
                        return error.data;
                    }
                );
        }
    }
}
