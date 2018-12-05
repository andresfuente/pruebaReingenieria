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

        /**
        * @ngdoc method
        * @name shoppingCartSrv.Services.ShoppingCartSrv#getTypologiesPrices
        * @param {string} componentName nombre del componente
        * @param {string} postalCode código postal
        * @methodOf shoppingCartSrv.Services.ShoppingCartSrv
        * @description
        * Obtiene los precios de las tipologías de entrega
        */
        getTypologiesPrices(componentName: string, postalCode: string) {
            let vm = this;

            let body = {
                "contactMedium": [],
                "cartItem": [],
                "relatedParty": [],
                "customer": null
            };

            let _search = {
                body: body,
                urlParams: ['ospShoppingCart', 'cartItemProposal'],
                queryParams: {
                    'postalCode': postalCode
                }
            };

            return vm.httpPost(vm.genericConstant.shoppingCart, _search, componentName, null, null)
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
        * @name shoppingCartSrv.Services.ShoppingCartSrv#renameNACRates
        * @param {string} shoppingCart carrito a tratar
        * @param {string} clientName datos del cliente
        * @methodOf shoppingCartSrv.Services.ShoppingCartSrv
        * @description
        * Renombra las tarifas NAC principales usando datos del cliente
        */
        renameNACRates(shoppingCart: any, clientName: Array<string>) {
            let vm = this;

            let newName : string = '';
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));

            // Formateamos el nombre (usando todos los elementos que se pasen)
            if (clientName) {
                for (let i = 0; i < clientName.length; i++) {
                    if (clientName[i]) {
                        if (i === 0) {
                            newName += clientName[i];
                        } else {
                            newName += ' ' + clientName[i];
                        }
                    }
                }
            }

            // Renombramos tarifas NAC para guardar 
            if (commercialData && shoppingCart && shoppingCart.cartItem) {
                shoppingCart.cartItem.forEach(opt => {
                    if (opt.cartItem) {
                        opt.cartItem.forEach(cartItem => {
                            if (cartItem && cartItem.product && cartItem.product.productRelationship && cartItem.product.productRelationship[0] 
                            && cartItem.product.productRelationship[0].type === 'tarifa') {
                                let comm : any = _.find(commercialData, {id: Math.floor(opt.id)});

                                // Revisamos las tarifas para renombrar únicamente las LOVE NAC principales (movil_fijo)
                                if (comm && comm.rates) {
                                    let rate : any = _.find(comm.rates, {'siebelId': cartItem.id});

                                    if (rate && rate.type === 'Convergente_NAC' && rate.typeService === 'movil_fijo' && cartItem.product.name) {
                                        if (newName) { // Si hay aprovechamiento, se pintan los apellidos
                                            cartItem.product.name = 'Love ' + newName;
                                        } else { // Si no hay aprvechamiento, se pinta "Love"
                                            cartItem.product.name = 'Love';
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
            }

            return shoppingCart;
        }
    }

    angular.module('shoppingCartSrv', [])
        .service('shoppingCartSrv', OrangeFeSARQ.Services.ShoppingCartSrv);
}
