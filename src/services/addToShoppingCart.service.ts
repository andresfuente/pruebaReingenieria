module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name orangeFeSARQ.Services:AddToShoppingCartSrv
     * @description
     * Servicio para añadir productos al carrito
     */
    export class AddToShoppingCartSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        srvTerminalCompare;

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#constructor
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Incluye las dependencias necesarias
         */
        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#setInjections
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Inyecta las dependencias
         */
        setInjections($injector) {
            let vm = this;
            vm.srvTerminalCompare = $injector.get('srvTerminalCompare');
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#putDeviceInShoppingCart
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Añade un terminal libre sin servicio al session storage del carrito
         */
        putDeviceInShoppingCart(device) {
            let vm = this;
            let productItem;
            let peachRate;
            let deviceCartItemElement, rateCartItemElement;
            let cartItemElement;
            let cartItemElementId: number;
            let cartItemIndex: number;
            let lastCartItemId: number;
            let commercialActId: number;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();

            // Se obtiene el ID del acto comercial que se esta modificando
            if(commercialActIndex !== -1 && commercialData[commercialActIndex].id !== null) {
                commercialActId = Number(commercialData[commercialActIndex].id);
            }
            // Se comprueba si existe algun dispositivo TSS en el shopping cart que se este modificando
            if(shoppingCart !== null && commercialData !== null && commercialData[commercialActIndex].isCompletedAC &&
                commercialData[commercialActIndex].ospIsSelected) {
                    // Se eliminan los TSS del acto comercial existentes en el shopping cart
                    shoppingCart = vm.deleteElementInCartItem(shoppingCart, commercialActId);
                    commercialData[commercialActIndex].isCompletedAC = false;
                    sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
            // Se obtiene el id del ultimo elmento del cart item del shopping cart
            lastCartItemId = vm.getLastCartItemId(shoppingCart, commercialActId);

            productItem = {
                'href': device.srcImage,
                'name': device.brand,
                'description': device.litSubTitle,
                'productRelationship': [{
                    'type': 'terminal'
                }],
                'place': [],
                'characteristic': [{
                        'name': 'CIMATerminalType',
                        'value': 'Primary'
                }]
            };

            deviceCartItemElement = {
                'id' : device.siebelId,
                'action': 'New',
                'product': productItem,
                'itemPrice': device.itemPrice,
                'productOffering': {
                    id: device.siebelId,
                },
                cartItemRelationship: [{
                      id: '1-CWOOG9'
                 }],
                 'ospSelected' : true,
                 'ospCartItemType': 'alta',
                 'ospCartItemSubtype': ''
            };

            rateCartItemElement = {
                'id': '1-CWOOG9',
                'action': 'New',
                'product': {
                    'name': 'peach',
                    'description': '',
                    'productRelationship': [{
                            'type': 'tarifa'
                    }]
                },
                'productOffering': {
                    'id': '1-CWOOG9',
                    'isBundle': true
                },
                'cartItemRelationship': [],
                'itemPrice': [{
                        'priceType': '',
                        'price': {
                            'dutyFreeAmount': {
                                'unit': '',
                                'value': 0
                            },
                            'taxIncludedAmount': {
                                'unit': '',
                                value: 0
                            }
                        },
                        taxRate: 0,
                        ospTaxRateName: ''
                 }],
                'ospSelected' : true,
                'ospCartItemType': 'alta',
                'ospCartItemSubtype': ''
            };

            cartItemElementId = Number((lastCartItemId + 0.1).toFixed(1));

            cartItemElement = {
                'id' : cartItemElementId,
                'cartItem': [deviceCartItemElement, rateCartItemElement],
                'action': 'New',
                'cartItemRelationship' : [{
                    id: commercialActId
                }],
                'ospSelected' : true,
                'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase(),
            };

            if(shoppingCart !== null) {
                shoppingCart.cartItem.push(cartItemElement);
            } else {
                shoppingCart = {
                    'id': '',
                    'cartItem': [cartItemElement],
                    'customer': {
                        'relatedPartyRef': {
                            'individual': {
                                'id': '45888495C',
                                'ospIdType': 'NIF'
                            },
                            'organization': {
                                'id': '45888495C',
                                'ospIdType': 'CIF'
                            }
                        },
                        'id': '45888495C',
                        'name': 'Juan Ostos',
                        'status': 0,
                        'customerCharacteristic': [
                            {
                                'name': 'segment',
                                'value': 1
                            }
                        ]
                    }
                };
            }
            sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#putDeviceInShoppingCart
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Añade un terminal secundario al session storage del carrito
         */
        putSecundaryDeviceInShoppingCart(device) {
            let vm = this;
            let secundaryTerminal;
            let productItem;
            let secundaryDeviceCartItem;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();
            let sTerminalsLength = commercialData[commercialActIndex].sTerminals.length;
            let sTerminalLastId = sTerminalsLength === 0 ? 0 : commercialData[commercialActIndex].sTerminals[sTerminalsLength - 1].id;
            let selectedCartItemId;

            secundaryTerminal = {
                'sTerminalId': (sTerminalLastId + 1),
                'action': 'New',
                'siebelId': device.siebelId,
                'name': device.name,
                'description': device.litSubTitle,
                'brand': device.litTitle,
                'insuranceSiebelId': device.insuranceSiebelId,
                'srcImage': device.srcImage,
                'insuranceSelected': device.insuranceSelected,
                'stock': device.stock
            };

            productItem = {
                'href': device.srcImage,
                'name': device.name,
                'description': device.litSubTitle,
                'productRelationship': [{
                    'type': 'terminal'
                }],
                'place': [],
                'characteristic': [{
                        'name': 'CIMATerminalType',
                        'value': 'Secundary'
                }]
            };

            secundaryDeviceCartItem = {
                'id' : device.siebelId,
                'action': 'New',
                'product': productItem,
                'itemPrice': device.itemPrice,
                'productOffering': {
                    id: device.siebelId,
                },
                cartItemRelationship: [],
                 'ospSelected' : true,
                 'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                 'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
            };

            // Se inserta el terminal en el array de terminales secundarios
            commercialData[commercialActIndex].sTerminals.push(secundaryTerminal);
            // Se inserta el terminal en el array de opciones seleccionadas 
            commercialData[commercialActIndex].shoppingCartElementsSelected
                .forEach((currentItem, index) => {
                    if(currentItem.ospIsAddSecundary) {
                        // Si sTerminals no esta definido
                        if(!currentItem.sTerminals) {
                            currentItem.sTerminals = [];
                        }
                        currentItem.sTerminals.push({'siebelId': device.siebelId});
                        selectedCartItemId = currentItem.id;
                    }
                });
            // Se inserta el terminal secundario en el shopping cart
            if(shoppingCart !== null && shoppingCart.cartItem.length > 0) {
                shoppingCart.cartItem.forEach( currentCartItem  => {
                    if(currentCartItem.id === selectedCartItemId) {
                        currentCartItem.cartItem.push(secundaryDeviceCartItem);
                    }
                });
            }
            sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#putRateInShoppingCart
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Añade una tarifa al session storage del carrito
         */
        putRateInShoppingCart(rate) {
            let vm = this;
            let productItem;
            let rateCartItemElement;
            let cartItemElement;
            let cartItemElementId: number;
            let cartItemIndex: number;
            let lastCartItemId: number;
            let commercialActId: number;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();

            // Se obtiene el ID del acto comercial que se esta modificando
            if(commercialActIndex !== -1 && commercialData[commercialActIndex].id !== null) {
                commercialActId = Number(commercialData[commercialActIndex].id);
            }
            // Se comprueba si existe alguna tarifa en el shopping cart que se este modificando
            if(shoppingCart !== null && commercialData !== null && commercialData[commercialActIndex].isCompletedAC &&
                commercialData[commercialActIndex].ospIsSelected) {
                    // Se eliminan las tarifas del acto comercial existentes en el shopping cart
                    shoppingCart = vm.deleteElementInCartItem(shoppingCart, commercialActId);
                    commercialData[commercialActIndex].isCompletedAC = false;
                    sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
            // Se obtiene el id del ultimo elmento del cart item del shopping cart
            lastCartItemId = vm.getLastCartItemId(shoppingCart, commercialActId);

            productItem = {
                'href': '',
                'name': rate.name ? rate.name : '',
                'description': rate.rateDescription ? rate.rateDescription : '',
                'productRelationship': [{
                    'type': 'tarifa'
                }],
                'place': [],
                'characteristic': [{
                        'name': 'CIMATerminalType',
                        'value': 'Primary'
                }]
            };

            rateCartItemElement = {
                'id' : rate.siebelId ? rate.siebelId : '',
                'action': 'New',
                'product': productItem,
                'itemPrice': [
                    {
                        'priceType': 'cuota',
                        'price': {
                            'dutyFreeAmount': {
                                'unit': 'EUR',
                                'value': rate.ratePrice ? rate.ratePrice : ''
                            },
                            'taxIncludedAmount': {
                                'unit': 'EUR',
                                'value': rate.ratePriceTaxIncluded ? rate.ratePriceTaxIncluded : ''
                            }
                        },
                        'priceAlteration': [{}]
                    }
                ],
                'productOffering': {
                    'id': rate.siebelId ? rate.siebelId : '',
                    'name': rate.name ? rate.name : '',
                    'category': [],
                    'isBundle': true
                }
            };

            cartItemElementId = Number((lastCartItemId + 0.1).toFixed(1));

            cartItemElement = {
                'id' : cartItemElementId,
                'cartItem': [rateCartItemElement],
                'action': 'New',
                'cartItemRelationship' : [{
                    id: commercialActId
                }],
                'ospCartItemType': 'alta',
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase(),
                'ospSelected' : true
            };

            if(shoppingCart !== null) {
                shoppingCart.cartItem.push(cartItemElement);
            } else {
                shoppingCart = {
                    'id': '',
                    'cartItem': [cartItemElement],
                    'customer': {
                        'relatedPartyRef': {
                            'individual': {
                                'id': '45888495C',
                                'ospIdType': 'NIF'
                            },
                            'organization': {
                                'id': '45888495C',
                                'ospIdType': 'CIF'
                            }
                        },
                        'id': '45888495C',
                        'name': 'Juan Ostos',
                        'status': 0,
                        'customerCharacteristic': [
                            {
                                'name': 'segment',
                                'value': 1
                            }
                        ]
                    }
                };
            }
            sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#getSelectedCommercialAct
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * @return {boolean} Retorna el indice del commercialData que se esta modificando,
         * en caso contrario retorna -1
         */
        getSelectedCommercialAct(): number {
            let commercialData = [];
            commercialData = JSON.parse(sessionStorage.getItem('commercialData'));

            return _.findIndex(commercialData, function(currentCommercialAct){
                return currentCommercialAct.ospIsSelected  === true;
            });
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#getModifiedCarItem
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @param shoppingCart session del carrito
         * @param commercialActId id del acto comercial que se esta modificando
         * @description
         * @return {number} el id del ultimo elemento del cartItem
         */
        getLastCartItemId(shoppingCart, commercialActId): number {
            let lastCartItemId = commercialActId;
            // Se establece el ID del ultimo elemento del shopping cart
            if(shoppingCart !== null && shoppingCart.cartItem.length > 0) {
                shoppingCart.cartItem.forEach( cartItem  => {
                    if(Math.floor(cartItem.id) === commercialActId) {
                        lastCartItemId = cartItem.id;
                    }
                });
            }
            return lastCartItemId;
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#deleteElementInCartItem
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @param shoppingCart session del carrito
         * @param commercialActId id del acto comercial que se esta modificando
         * @description
         * Elimina del shopping cart los elementos del acto comercial 
         * que se esta modificando
         * @return {any} shoppingCart con los elementos eliminados
         */
        deleteElementInCartItem(shoppingCart, commercialActId) {
            let vm = this;
            let cartItemArray = [];
            if(shoppingCart !== null && shoppingCart.cartItem.length > 0) {
                cartItemArray = shoppingCart.cartItem;
                _.remove(cartItemArray, function (cartItem) {
                    return (Math.floor(cartItem.id) === commercialActId);
                });
                shoppingCart.cartItem = cartItemArray;
            }
            return shoppingCart;
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#getModifiedCarItem
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @param {boolean} isCompletedAC verdadero o falso
         * @description
         * Establece el valor del isCompletedAC del acto comercial activo
         */
        setCompletedAC(isCompletedAC) {
            let vm = this;
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();
            if(commercialData !== null) {
                commercialData[commercialActIndex].isCompletedAC = isCompletedAC;
                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
        }
    }
}
