module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:getCodesOwcsSrv
     * @author Jaime Alain
     * @description
     * Servicio para recoger los codigos de scoring 
     */
    export class getCodesOwcsSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        constructor(public $injector) {
            super($injector);
        }

        /**
         * @ngdoc service
         * @name OrangeFeSARQ.Services:getOrders
         * @author Jaime Alain
         * @description
         * Servicio para comprobar las ordenes en vuelo
         */
        getCodes(codes) {
            let vm = this;

            let _search: Object = {
                queryParams: {},
                urlParams: ['getListValues', 'listName', codes]
            };
            return vm.httpCacheGett(vm.genericConstant.dataController, _search)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    throw error;
                });
        }
    
    }
}
