module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.GetOperatorsSrv
     * @description
     * Devuelve una lista de los tipos de operador
     */
    export class GetOperatorsSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:GetOperatorsSrv#constructor
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf OrangeFeSARQ.Services:GetOperatorsSrv
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
         * @name OrangeFeSARQ.Services:GetOperatorsSrv#setInjections
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf OrangeFeSARQ.Services:GetOperatorsSrv
         * @description
         * Incluye las dependencias necesarias
         */
        setInjections($injector) {
            let vm = this;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:GetOperatorsSrv#getOperators
         * @param {string} componentName nombre del componente
         * @methodOf OrangeFeSARQ.Services:GetOperatorsSrv
         * @description
         * Devuelve una lista de los tipos de operador
         * @returns {Object} Devuelve una promesa con el response
         */
        getOperators(componentName: string = 'prescoring') {
            let vm = this;

            let _search: Object = {
                queryParams: {
                },
                urlParams: ['getListValue', 'listName', 'operadores']
            };

            return vm.httpCacheGett(vm.genericConstant.dataController, _search, componentName)
                .then(function (response) {
                    return response.data.response;
                })
                .catch(function (error) {
                    throw error.data;
                }
            );
        }
    }
}
