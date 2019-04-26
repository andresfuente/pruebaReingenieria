module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:s8salesOrder
     * @author Jaime Alain
     * @description
     * Servicio para comprobar las ordenes en vuelo
     */
    export class s8salesOrderSrv extends OrangeFeSARQ.Services.ParentService {
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
        getOrders(publicIdType, publicId, comp) {
            let vm = this;

            let _search: Object = {
                queryParams: {},
                urlParams: [publicIdType, publicId]
            };

            return vm.httpCacheGett(vm.genericConstant.inflightOrders, _search, comp)
                .then((response) => {
                    return response.data;

                })
                .catch((error) => {
                    return error;
                });
        }
    }
}
