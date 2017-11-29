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
         * Añade un terminal al session storage del carrito
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
                }
            };

            rateCartItemElement = {
                'id': '1-CWOOG9',
                'product': {
                    'name': 'peach',
                    'productRelationship': [{
                            'type': 'tarifa',
                            'product': null
                    }]
                },
                'productOffering': {
                    'id': '1-CWOOG9',
                    'name': 'peach',
                    'category': [],
                    'isBundle': true
                }
            };

            cartItemElementId = Number((lastCartItemId + 0.1).toFixed(1));

            cartItemElement = {
                'id' : cartItemElementId,
                'cartItem': [deviceCartItemElement, rateCartItemElement],
                'action': 'New',
                'cartItemRelationship' : [{
                    id: commercialActId
                }],
                'ospCartItemType': 'alta',
                'ospSelected' : true
            };

            if(commercialData !== null) {
                commercialData[commercialActIndex].isCompleteAC = true;
                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }

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

            // Se inserta la tarifa peach en el multiselección
            peachRate = {
                'siebelId': '1-CWOOG9',
                'name': 'Peach',
                'taxeFreePrice': 0
            };
            vm.srvTerminalCompare.insertInRateContainer(peachRate);
            vm.srvTerminalCompare.putRatesInSessionStorage();
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
                return currentCommercialAct.isSelected === true;
            });
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#getModifiedCarItem
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @param cartItem Array de cart item
         * @description
         * @return {boolean} Retorna el indice del cartItem que se esta modificando,
         * en caso contrario retorna -1
         */
        getModifiedCarItem(cartItem): number {
            return _.findIndex(cartItem, function(currentCartItem: any){
                return currentCartItem.action === 'Modify';
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
            let vm;
            let lastCartItemId;
            let lastCartItemIndex;
            // Se establece el ID del ultimo elemento del shopping cart
            if(shoppingCart !== null && shoppingCart.cartItem.length > 0) {
                lastCartItemIndex = shoppingCart.cartItem.length - 1;
                lastCartItemId = shoppingCart.cartItem[lastCartItemIndex].id;
            } else {
                // Si el shopping cart no existe se devuelve el id del acto comercial
                lastCartItemId = commercialActId;
            }
            return lastCartItemId;
        }
    }
}
