module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:repository
     * @author Jaime Alain
     * @description
     * Servicio para comprobar las ordenes en vuelo
     */
    export class repositorySrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        constructor(public $injector) {
            super($injector);
        }

        /**
         * @ngdoc service
         * @name OrangeFeSARQ.Services:getOrders
         * @author Jaime Alain
         * @description
         * Servicio para realizar inyectar las ordenes
         */
        postCreateCommercialActSPA(shoppingCart, customer, comp) {
            let vm = this;

            let endPoint = 'createCommercialActSPA';

            let _search: Object = {
                body: {
                    shoppingCart: shoppingCart,
                    customer: customer
                },
                queryParams: {},
                urlParams: [endPoint]
            };

            return vm.httpPost(vm.genericConstant.createCommercialActSPA, _search, comp)
                .then((response) => {
                    return response.data;

                })
                .catch((error) => {
                    return error;
                });
        }
    }
}
