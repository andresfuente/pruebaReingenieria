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
            let cartItemArray = [];
            let cartItemElement;
            let cartItem;
            let selectedOptions;
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));

            productItem = {
                href: device.srcImage,
                name: device.name,
                description: device.litSubTitle,
                productRelationship: [{
                    type: 'terminal',
                    product: null
                }],
                place: [],
                characteristic: [],
                relatedParty: [],
                productSpecification: []
            };

            cartItemElement = {
                id : device.siebelId,
                action: 'New',
                cartItem: [],
                product: productItem,
                itemPrice: [],
                productOffering: {
                    id: device.siebelId,
                    name: device.name,
                    category: []
                },
                cartItemRelationship: []
            };

            cartItem = {
                cartItem: [cartItemElement],
                itemPrice: device.itemPrice,
                cartItemRelationship: []
            };

            selectedOptions = {
                selectedOptionsId: '0',
                cartItem : [cartItem]
            };

            if(commercialData !== null) {
                commercialData[0].selectedOptions.push(selectedOptions);
                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
        }
    }
}
