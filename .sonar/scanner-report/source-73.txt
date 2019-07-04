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
        generateShoppingCart(body, componentName: string, customer?, contactMedium?, relatedParty?) {
            let vm = this;
            let _headers = vm.getParentSfid();
            body = vm.conditionalJazztel(body);
            let _search = {
                body: {
                    ospCartItemReqPost: [
                        body
                    ],
                    customer,
                    contactMedium,
                    relatedParty
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
         * @name OrangeFeSARQ.Services.ShoppingCartSrv#conditionalJazztel
         * @param {Object} body datos de shoppingCart
         * @methodOf OrangeFeSARQ.Services.ShoppingCartSrv
         * @description
         * Agrega una caracteristica en caso de ser cliente jazztel
         * @returns {object} Devuelve el body de la llamada
         */
        conditionalJazztel(body) {
            let loginData = JSON.parse(sessionStorage.getItem('loginData'));
            let clientData = JSON.parse(sessionStorage.getItem('clientData'));

            if (clientData && clientData.jazztelData) {
                if (body && body.cartItem && _.isArray(body.cartItem) && !_.isEmpty(body.cartItem)) {
                    let characteristic = {
                        "name": "Aplicable Cambio Marca",
                        "value": "YES"
                    };
                    _.forEach(body.cartItem, (element) => {
                        if (element.product && element.product.characteristic) {
                            element.product.characteristic.push(characteristic);
                            return false;
                        } else if (element.product && !element.product.characteristic) {
                            element.product.characteristic = [];
                            element.product.characteristic.push(characteristic);
                            return false;
                        }
                    });
                }
            }

            return body;
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

        getParentSfid(): HashMap<string, string> {
            let shopInfo = JSON.parse(sessionStorage.getItem('shopInfo'));
            let _headers = new HashMap<string, string>();
            if (shopInfo && shopInfo.parentSfid) {
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

            let newName: string = '';
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
                                let comm: any = _.find(commercialData, { id: Math.floor(opt.id) });

                                // Revisamos las tarifas para renombrar únicamente las LOVE NAC principales (movil_fijo)
                                if (comm && comm.rates) {
                                    let rate: any = _.find(comm.rates, { 'siebelId': cartItem.id });

                                    if (rate && ((rate.type === 'Convergente_NAC' && rate.typeService === 'movil_fijo') || (rate.type === 'Mobile Only_NAC' && rate.typeService === 'movil')) && cartItem.product.name) {
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
