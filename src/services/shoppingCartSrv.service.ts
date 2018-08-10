module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.ShoppingCartSrv
     * @description
     * Servicio ShoppingCartSrv
     */
    export class ShoppingCartSrv extends OrangeFeSARQ.Services.ParentService {
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
         * @name OrangeFeSARQ.Services.ShoppingCartSrv#generateShoppingCart
         * @param {Object} body datos de shoppingCart
         * @param {string} componentName nombre del componente
         * @methodOf OrangeFeSARQ.Services.ShoppingCartSrv
         * @description
         * Crea/valida el carrito
         * @returns {object} Devuelve una promesa con el response.
         */
        generateShoppingCart(body, componentName: string, customer?) {
            let vm = this;
            let _headers = vm.getParentSfid();

            let body2 = JSON.stringify(body);
            body2 = body2.replace(/á/g,"a");
            body2 = body2.replace(/é/g,"e");
            body2 = body2.replace(/í/g,"i");
            body2 = body2.replace(/ó/g,"o");
            body2 = body2.replace(/ú/g,"u");
            body2 = body2.replace(/ñ/g,"n");
            body2 = body2.replace(/€/g,"e");
            body = JSON.parse(body2);

            if (customer) {
                let customer2: string = JSON.stringify(customer);
                customer2 = customer2.replace(/á/g,"a");
                customer2 = customer2.replace(/é/g,"e");
                customer2 = customer2.replace(/í/g,"i");
                customer2 = customer2.replace(/ó/g,"o");
                customer2 = customer2.replace(/ú/g,"u");
                customer2 = customer2.replace(/ñ/g,"n");
                customer = JSON.parse(customer2);
            }

            let _search = {
                body: {
                    ospCartItemReqPost: [
                        body
                    ],
                    customer
                },
                urlParams: ['ospShoppingCart']
            };
            return vm.httpPost(vm.genericConstant.shoppingCart, _search, componentName, {}, null, _headers)
                .then(
                    (response) => {
                        return response.data;
                    },
                    (error) => {
                        throw error.data;
                    }
                );
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.ShoppingCartSrv#putOspShoppingCart
         * @param {Object} body datos de shoppingCart
         * @param {string} componentName nombre del componente
         * @methodOf OrangeFeSARQ.Services.ShoppingCartSrv
         * @description
         * Guarda el carrito
         * @returns {object} Devuelve una promesa con el response.
         */
        putOspShoppingCart(body, id: string, componentName: string) {
            let vm = this;

            let _headers = vm.getParentSfid();
            let _search = {
                body: body,
                urlParams: ['ospShoppingCart', id]
            };

            return vm.httpPut(vm.genericConstant.shoppingCart, _search, componentName, null, null, _headers)
                .then(
                    (response) => {
                        return response.data;
                    }
                )
                .catch(
                    (error) => {
                        throw error.data;
                    }
                );
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.ShoppingCartSrv#getOspShoppingCart
         * @param {Object} id documento del cliente
         * @param {string} componentName nombre del componente
         * @methodOf OrangeFeSARQ.Services.ShoppingCartSrv
         * @description
         * Recupera el carrito
         * @returns {object} Devuelve una promesa con el response.
         */
        getOspShoppingCart(id: string, componentName: string) {
            let vm = this;

            let _headers = vm.getParentSfid();
            let _search = {
                urlParams: ['ospShoppingCart', id]
            };

            return vm.httpCacheGeth(vm.genericConstant.shoppingCart, _search, _headers, componentName)
                .then(
                    (response) => {
                        return response.data;
                    }
                )
                .catch(
                    (error) => {
                        throw error.data;
                    }
                );
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.ShoppingCartSrv#getSvas
         * @param {Object} body shoppingCart
         * @param {string} componentName nombre del componente
         * @methodOf OrangeFeSARQ.Services.ShoppingCartSrv
         * @description
         * Obtiene los svas compatibles con la tarifa seleccionada
         * @returns {object} Devuelve una promesa con el response.
         */
        getSvas(body, componentName: string, customer) {
            let vm = this;
            body.customer = customer;
            let _headers = vm.getParentSfid();
            let _search = {
                body: body,
                urlParams: ['ospShoppingCart', 'cartItemProposal']
            };

            return vm.httpPost(vm.genericConstant.shoppingCart, _search, componentName, null, null, _headers)
                .then(
                    (response) => {
                        return response.data;
                    },
                    (error) => {
                        throw error.data;
                    }
                );
        }

        getParentSfid() {
            let shopInfo;
            let _headers ;
            shopInfo = JSON.parse(sessionStorage.getItem('shopInfo'));
            if(shopInfo && shopInfo.parentSfid) {
                _headers = new HashMap<string, string>();
                _headers.set('parentSfid', shopInfo.parentSfid);
            }
            return _headers;
        }
    }

    angular.module('shoppingCartSrv', [])
        .service('shoppingCartSrv', OrangeFeSARQ.Services.ShoppingCartSrv);
}
