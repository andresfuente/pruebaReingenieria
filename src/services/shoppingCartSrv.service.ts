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
        generateShoppingCart(body, componentName: string) {
            let vm = this;

            let _search = {
                body: {
                    ospCartItemReqPost: [
                        body
                    ]
                },
                urlParams: ['ospShoppingCart']
            };

            return vm.httpPost(vm.genericConstant.shoppingCart, _search, componentName)
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

            let _search = {
                body: body,
                urlParams: ['ospShoppingCart', id]
            };

            return vm.httpPut(vm.genericConstant.shoppingCart, _search, componentName)
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

            let _search = {
                urlParams: ['ospShoppingCart', id]
            };

            return vm.httpCacheGett(vm.genericConstant.shoppingCart, _search, componentName)
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
        getSvas(body, componentName: string) {
            let vm = this;

            let _search = {
                body: body,
                urlParams: ['ospShoppingCart', 'cartItemProposal']
            };

            return vm.httpPost(vm.genericConstant.shoppingCart, _search, componentName)
                .then(
                    (response) => {
                        return response.data;
                    },
                    (error) => {
                        throw error.data;
                    }
                );
        }
    }

    angular.module('shoppingCartSrv', [])
        .service('shoppingCartSrv', OrangeFeSARQ.Services.ShoppingCartSrv);
}