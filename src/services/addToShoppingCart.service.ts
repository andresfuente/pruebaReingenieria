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

        public srvTerminalCompare: OrangeFeSARQ.Services.SrvTerminalCompare;
        public objectTv;
        private productCatalogV2Srv;

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
            vm.productCatalogV2Srv = $injector.get('productCatalogV2Srv');
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
            if (commercialActIndex !== -1 && commercialData[commercialActIndex].id !== null) {
                commercialActId = Number(commercialData[commercialActIndex].id);
            }
            // Se comprueba si existe algun dispositivo TSS en el shopping cart que se este modificando
            if (shoppingCart !== null && commercialData !== null && commercialData[commercialActIndex].isCompletedAC &&
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
                },
                ]
            };

            // Se guarda el IMEI del terminal si se dispone de el
            if (device && device.IMEI && device.IMEI !== undefined) {
                let imei = {
                    'name': 'IMEI',
                    'value': device.IMEI
                };
                productItem.characteristic.push(imei);
            }

            deviceCartItemElement = {
                'id': device.siebelId,
                'action': 'New',
                'product': productItem,
                'itemPrice': [device.itemPrice[0]],
                'productOffering': {
                    id: device.siebelId,
                },
                cartItemRelationship: [],
                'ospSelected': true,
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
                    'name': 'peach',
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
                        },
                        taxRate: 0,
                        ospTaxRateName: ''
                    },
                }],
                'ospSelected': true,
                'ospCartItemType': 'alta',
                'ospCartItemSubtype': ''
            };

            cartItemElementId = Number((lastCartItemId + 0.1).toFixed(1));

            cartItemElement = {
                'id': cartItemElementId,
                'cartItem': [deviceCartItemElement, rateCartItemElement],
                'action': 'New',
                'cartItemRelationship': [{
                    id: commercialActId
                }],
                'ospSelected': true,
                'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase(),
            };

            // Añadir cartItem compromiso de permanencia CP
            if (device.cpDescription && device.cpSiebel) {
                cartItemElement.cartItem.push(vm.createCPCartItem(device));
            }

            if (shoppingCart !== null) {
                shoppingCart.cartItem.push(cartItemElement);
            } else {
                shoppingCart = {
                    'id': '',
                    'cartItem': [cartItemElement],
                    'customer': {}
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
        putSecundaryDeviceInShoppingCart(device, payType) {
            let vm = this;
            let secundaryTerminal;
            let productItem;
            let secundaryDeviceCartItem;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();
            let sTerminalsLength = commercialData[commercialActIndex].sTerminals ? commercialData[commercialActIndex].sTerminals.length : 0;
            let sTerminalLastId = sTerminalsLength === 0 ? 0 : commercialData[commercialActIndex].sTerminals[sTerminalsLength - 1].id;
            let selectedCartItemId;
            let selectedCartTerminal;
            let selectedCartRate;
            let vapCartItems = [];
            let vapCartItem;
            let unPriceItem;
            let sTerminalsSC = [];
            let seguro;

            device.itemPrice.forEach(item => {
                if (payType === 'deferred' && item.priceType === 'inicial' || item.priceType === 'cuota') {
                    vapCartItem = {
                        'id': item.id,
                        'action': 'New',
                        'product': {
                            'productRelationship': [{ 'type': 'VAP' }],
                            'characteristic': [{ 'name': 'CIMATerminalType', 'value': 'Secundary' }]
                        },
                        'itemPrice': [item],
                        'productOffering': { 'id': item.id },
                        'cartItemRelationship': [{ 'id': device.siebelId }],
                        'ospSelected': true,
                        'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                        'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
                    };
                    vapCartItems.push(vapCartItem);
                }
                if (payType === 'unique' && item.priceType === 'unico') {
                    unPriceItem = item;
                }

            });

            productItem = {
                'href': device.srcImage,
                'name': device.litTitle,
                'description': device.litSubTitle ? device.litSubTitle : device.description,
                'productRelationship': [{
                    'type': 'terminal'
                }],
                'place': [],
                'characteristic': [{
                    'name': 'CIMATerminalType',
                    'value': 'Secundary'
                }]
            };

            // Si viene IMEI se añade
            if (device && device.IMEI && device.IMEI !== undefined) {
                let imei = {
                    'name': 'IMEI',
                    'value': device.IMEI
                };
                productItem.characteristic.push(imei);
            }

            // Objeto para shopping cart
            secundaryDeviceCartItem = {
                'id': device.siebelId,
                'action': 'New',
                'product': productItem,
                'itemPrice': payType === 'deferred' ? [{ 'priceType': 'aplazado' }] : [unPriceItem],
                'productOffering': {
                    id: device.siebelId,
                },
                cartItemRelationship: [],
                'ospSelected': true,
                'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
            };

            // Objeto para sTerminals
            secundaryTerminal = {
                'sTerminalId': (sTerminalLastId + 1),
                'action': 'New',
                'siebelId': device.siebelId,
                'name': device.litTitle,
                'description': device.litSubTitle,
                'brand': device.litTitle,
                'insuranceSiebelId': device.insuranceSiebelId,
                'srcImage': device.srcImage,
                'insuranceSelected': device.insuranceSelected,
                'stock': device.stock,
                'itemPrice': device.itemPrice[0],
                'shoppingCart': [secundaryDeviceCartItem].concat(vapCartItems),
                'cpSiebel': device.cpSiebel,
                'cpDuration': device.cpDuration,
                'cpDescription': device.cpDescription,
                'id': device.id
            };
            if (device.insuranceSiebelId) {
                seguro = vm.createInsuranceCartItem(device, 'secundary');
            }

            // Se inserta el terminal en el array de terminales secundarios
            if (!commercialData[commercialActIndex].sTerminals) {
                commercialData[commercialActIndex].sTerminals = [];
            }
            commercialData[commercialActIndex].sTerminals.push(secundaryTerminal);
            // Se inserta el terminal en el array de opciones seleccionadas 
            commercialData[commercialActIndex].shoppingCartElementsSelected
                .forEach((currentItem, index) => {
                    if (currentItem.ospIsAddSecundary) {
                        // Si sTerminals no esta definido
                        if (!currentItem.sTerminals) {
                            currentItem.sTerminals = [];
                        }
                        currentItem.sTerminals.push({ 'siebelId': device.siebelId });
                        selectedCartTerminal = currentItem.terminalSiebelId;
                        selectedCartRate = currentItem.rateSiebelId;
                    }
                });
            // Se inserta el terminal secundario en el shopping cart
            if (shoppingCart !== null && shoppingCart.cartItem.length > 0) {
                shoppingCart.cartItem.forEach(currentCartItem => {
                    let rate = _.find(currentCartItem.cartItem, { 'id': selectedCartRate });
                    let terminal = _.find(currentCartItem.cartItem, { 'id': selectedCartTerminal });
                    if (rate && terminal) {
                        currentCartItem.cartItem.push(secundaryDeviceCartItem);
                        if (payType === 'deferred') {
                            currentCartItem.cartItem = currentCartItem.cartItem.concat(vapCartItems);

                            // Añadir cartItem compromiso de permanencia CP
                            if (device.cpDescription && device.cpSiebel) {
                                currentCartItem.cartItem.push(vm.createCPCartItem(device, true));
                            }

                        }
                        if (device.insuranceSiebelId) {
                            currentCartItem.cartItem.push(seguro);
                        }
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
            let cartItemElementId, cartItemIndex, lastCartItemId, commercialActId: number;
            let svaCartItemList = [];
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();

            // Se obtiene el ID del acto comercial que se esta modificando
            if (commercialActIndex !== -1 && commercialData[commercialActIndex].id !== null) {
                commercialActId = Number(commercialData[commercialActIndex].id);
                if (rate.groupName === 'Convergente' && rate.family === 'love') {
                    commercialData[commercialActIndex].loveRateInShoppingCart = true;
                }
                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
            // Se comprueba si existe alguna tarifa en el shopping cart que se este modificando
            if (shoppingCart !== null && commercialData !== null && commercialData[commercialActIndex].isCompletedAC &&
                commercialData[commercialActIndex].ospIsSelected) {
                commercialData[commercialActIndex].isCompletedAC = false;
                // Se eliminan las tarifas del acto comercial existentes en el shopping cart
                shoppingCart = vm.deleteElementInCartItem(shoppingCart, commercialActId);
                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
            // Se obtiene el id del ultimo elmento del cart item del shopping cart
            lastCartItemId = vm.getLastCartItemId(shoppingCart, commercialActId);

            // Si la tarifa posee SVA's seleccionados
            if (rate.selectedSvaList && rate.selectedSvaList.length > 0) {
                // Se crean los cartItem de los SVA's seleccionados
                rate.selectedSvaList.forEach(sva => {
                    svaCartItemList.push(vm.createSVACartItem(sva));
                });
            }

            productItem = {
                'href': '',
                'name': rate.name ? rate.name : '',
                'description': rate.description ? rate.description : '',
                'productRelationship': [{
                    'type': 'tarifa'
                }],
                'place': [],
                'characteristic': []
            };
            rateCartItemElement = {
                'id': rate.siebelId ? rate.siebelId : '',
                'action': 'New',
                'product': productItem,
                'itemPrice': [
                    {
                        'name': rate.typePriceName ? rate.typePriceName : '',
                        'priceType': 'cuota',
                        'price': {
                            'dutyFreeAmount': {
                                'unit': 'EUR',
                                'value': rate.ratePrice ? rate.ratePrice : rate.taxFreePrice
                            },
                            'taxIncludedAmount': {
                                'unit': 'EUR',
                                'value': rate.ratePriceTaxIncluded ? rate.ratePriceTaxIncluded : rate.taxIncludedPrice
                            },
                            taxRate: rate.taxRate,
                            ospTaxRateName: rate.taxRateName
                        },
                        'priceAlteration': [{
                            'name': rate.typePriceName ? rate.typePriceName : '',
                            'priceType': 'cuota',
                            'applicationDuration': rate.applicationDuration,
                            'price': {
                                'dutyFreeAmount': {
                                    'unit': 'EUR',
                                    'value': rate.ratePricePromotional
                                },
                                'taxIncludedAmount': {
                                    'unit': 'EUR',
                                    'value': rate.ratePriceTaxIncludedPromotional
                                },
                                taxRate: rate.taxRate,
                                ospTaxRateName: rate.taxRateName
                            }
                        }]
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
                'id': cartItemElementId,
                'cartItem': [rateCartItemElement].concat(svaCartItemList),
                'action': 'New',
                'cartItemRelationship': [{
                    id: commercialActId
                }],
                'ospCartItemType': commercialData[commercialActIndex].ospCartItemType,
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase(),
                'ospSelected': true
            };

            // Si viene tecnologia creamos cartItem
            if (rate.ospTecnology) {
                cartItemElement.cartItem.push(vm.createIdTechnologyCartItem(rate));
            }

            if (shoppingCart !== null) {
                shoppingCart.cartItem.push(cartItemElement);
            } else {
                shoppingCart = {
                    'id': '',
                    'cartItem': [cartItemElement],
                    'customer': {}
                };
            }
            sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#putRateInShoppingCart
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Añade una tarifa al session storage del carrito
         */
        putRateInShoppingCartForSva(rate) {
            let vm = this;
            let productItem;
            let rateCartItemElement;
            let cartItemElement;
            let cartItemElementId, cartItemIndex, lastCartItemId, commercialActId: number;
            let svaCartItemList = [];
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();

            productItem = {
                'href': '',
                'name': rate.name ? rate.name : '',
                'description': rate.description ? rate.description : '',
                'productRelationship': [{
                    'type': 'tarifa'
                }],
                'place': [],
                'characteristic': []
            };

            rateCartItemElement = {
                'id': rate.siebelId ? rate.siebelId : '',
                'action': 'New',
                'product': productItem,
                'itemPrice': [
                    {
                        'name': rate.typePriceName ? rate.typePriceName : '',
                        'priceType': 'cuota',
                        'price': {
                            'dutyFreeAmount': {
                                'unit': 'EUR',
                                'value': rate.ratePrice ? rate.ratePrice : rate.taxFreePrice
                            },
                            'taxIncludedAmount': {
                                'unit': 'EUR',
                                'value': rate.ratePriceTaxIncluded ? rate.ratePriceTaxIncluded : rate.taxIncludedPrice
                            },
                            taxRate: rate.taxRate,
                            ospTaxRateName: rate.taxRateName
                        },
                        'priceAlteration': [{
                            'name': rate.typePriceName ? rate.typePriceName : '',
                            'priceType': 'cuota',
                            'applicationDuration': rate.applicationDuration,
                            'price': {
                                'dutyFreeAmount': {
                                    'unit': 'EUR',
                                    'value': rate.ratePricePromotional
                                },
                                'taxIncludedAmount': {
                                    'unit': 'EUR',
                                    'value': rate.ratePriceTaxIncludedPromotional
                                },
                                taxRate: rate.taxRate,
                                ospTaxRateName: rate.taxRateName
                            }
                        }]
                    }
                ],
                'productOffering': {
                    'id': rate.siebelId ? rate.siebelId : '',
                    'name': rate.name ? rate.name : '',
                    'category': [],
                    'isBundle': true
                }
            };

            cartItemElement = {
                'id': 1.1,
                'cartItem': [rateCartItemElement].concat(svaCartItemList),
                'action': 'New',
                'cartItemRelationship': [{
                    id: commercialActId
                }],
                'ospCartItemType': commercialData[commercialActIndex].ospCartItemType,
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase(),
                'ospSelected': true
            };

            let shoppingCart = {
                'id': '',
                'cartItem': [cartItemElement],
                'customer': {}
            };
            return shoppingCart;
        }
        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#createIdTechnologyCartItem
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @param rate rate
         * @description
         * Crea el item de ospTecnology cuando existe
         */
        createIdTechnologyCartItem(rate) {
            let vm = this;
            let ospTecnology;
            let flagTvItem = {};
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();
            let coverage = JSON.parse(sessionStorage.getItem('coverage'));

            if (coverage && coverage.hasFlagTv) {
                coverage.hasFlagTv.forEach(item => {
                    if (item.id && item.isTv) {
                        vm.objectTv = item.isTv;
                    }
                });
            }

            ospTecnology = {
                'id': rate.ospTecnology,
                'action': 'New',
                'product': {
                    'productRelationship': [{
                        'type': 'technology'
                    }],
                    'place': [],
                    'characteristic': []
                },
                'productOffering': {
                    id: rate.ospTecnology
                },
                'ospSelected': false,
                'ospSelectable': true,
                'ospMandatory': true,
                'ospObjectType': '',
                'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
            };

            // Añadir Flag TV 
            if (vm.objectTv && vm.objectTv !== undefined && vm.objectTv !== null) {
                flagTvItem = {
                    name: 'Flag TV',
                    value: vm.objectTv.value === 'Y' ? 'true' : 'false'
                };
                ospTecnology.product.characteristic.push(flagTvItem);
            }

            return ospTecnology;
        }
        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#putRateAndDeviceInShoppingCart
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @param {Object} rate tarifa.
         * @param {Object} device terminal.
         * @description
         * Añade un terminal primario y su tarifa al session storage del carrito
         */
        putRateAndDeviceInShoppingCart(rate, device, uniquePaid: boolean, preId?: string) {
            let vm = this;
            let rateCartItemElement;
            let deviceCartItemElement;
            let cartItemElement;
            let cartItemElementId: number;
            let cartItemIndex: number;
            let lastCartItemId = 1;
            let commercialActId: number;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();
            let insurance;

            // Eliminar cuando es sustituir elemento 
            if (preId && preId !== undefined && preId !== null) {
                _.remove(shoppingCart.cartItem, { id: preId });
            }

            // Se obtiene el ID del acto comercial que se esta creando
            if (commercialActIndex !== -1 && commercialData[commercialActIndex].id !== null) {
                commercialActId = Number(commercialData[commercialActIndex].id);
                if (rate.groupName === 'Convergente' && rate.family === 'love') {
                    commercialData[commercialActIndex].loveRateInShoppingCart = true;
                }
                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
            // Se obtiene el id del ultimo elemento del cart item del shopping cart
            lastCartItemId = vm.getLastCartItemId(shoppingCart, commercialActId);

            // TARIFA
            rateCartItemElement = {
                'id': rate.siebelId ? rate.siebelId : '',
                'action': 'New',
                'product': {
                    'href': '',
                    'name': rate.name ? rate.name : '',
                    'description': rate.description ? rate.description : '',
                    'productRelationship': [{
                        'type': 'tarifa'
                    }],
                    'place': []
                },
                'itemPrice': [
                    {
                        'name': rate.typePriceName ? rate.typePriceName : '',
                        'priceType': 'cuota',
                        'price': {
                            'dutyFreeAmount': {
                                'unit': 'EUR',
                                'value': !isNaN(rate.ratePrice) ? rate.ratePrice : rate.taxFreePrice
                            },
                            'taxIncludedAmount': {
                                'unit': 'EUR',
                                'value': !isNaN(rate.ratePriceTaxIncluded) ? rate.ratePriceTaxIncluded : rate.taxIncludedPrice
                            },
                            'taxRate': rate.taxRate,
                            'ospTaxRateName': rate.taxRateName
                        },
                        'priceAlteration': [{
                            'name': rate.typePriceName ? rate.typePriceName : '',
                            'priceType': 'cuota',
                            'applicationDuration': rate.applicationDuration,
                            'price': {
                                'dutyFreeAmount': {
                                    'unit': 'EUR',
                                    'value': rate.ratePricePromotional
                                },
                                'taxIncludedAmount': {
                                    'unit': 'EUR',
                                    'value': rate.ratePriceTaxIncludedPromotional
                                },
                                taxRate: rate.taxRate,
                                ospTaxRateName: rate.taxRateName
                            }
                        }]
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
            lastCartItemId = cartItemElementId;

            // TERMINAL PRIMARIO
            // Tipo del terminal
            device.characteristic = [
                {
                    name: 'CIMATerminalType',
                    value: 'Primary'
                }
            ];
            /* if (commercialData[commercialActIndex].ospTerminalWorkflow !== 'standar' &&
                commercialData[commercialActIndex].ospTerminalWorkflow !== 'standard' &&
                commercialData[commercialActIndex].ospTerminalWorkflow !== 'prepaid_renew' &&
                commercialData[commercialActIndex].ospTerminalWorkflow !== 'primary_renew') {
                device.characteristic = [
                    {
                        name: 'CIMATerminalType',
                        value: 'Secundary'
                    }
                ];
            } else {
                device.characteristic = [
                    {
                        name: 'CIMATerminalType',
                        value: 'Primary'
                    }
                ];
            } */
            let deviceReserve = _.find(commercialData[commercialActIndex].terminals, (o: any) => {
                return (device.siebelId === o.siebelId);
            });
            // Se guarda el IMEI del terminal si se dispone de el
            if (device && deviceReserve && deviceReserve.IMEI) {
                let imei = {
                    'name': 'IMEI',
                    'value': deviceReserve.IMEI
                };
                device.characteristic.push(imei);
            }
            if (device.insuranceSiebelId) {
                insurance = vm.createInsuranceCartItem(device, 'primary');
            }

            let uniqueItemPrice = [];
            let vapCartItems = [];
            for (let i in device.itemPrice) {
                if (device.itemPrice[i].priceType === 'unico') {
                    uniqueItemPrice.push(device.itemPrice[i]);
                } else {
                    let vapCartItem = {
                        'id': device.itemPrice[i].id,
                        'action': 'New',
                        'product': {
                            'productRelationship': [{ 'type': 'VAP' }],
                            'characteristic': [{ 'name': 'CIMATerminalType', 'value': 'Primary' }]
                        },
                        'itemPrice': [device.itemPrice[i]],
                        'productOffering': { 'id': device.itemPrice[i].id },
                        'cartItemRelationship': [{ 'id': device.siebelId }],
                        'ospSelected': true,
                        'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                        'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
                    };
                    vapCartItems.push(vapCartItem);
                }
            }

            deviceCartItemElement = {
                'id': device.siebelId ? device.siebelId : '',
                'action': 'New',
                'product': {
                    'href': device.srcImage ? device.srcImage : '',
                    'name': device.brand ? device.brand : '',
                    'description': device.description ? device.description : '',
                    'productRelationship': [{
                        'type': 'terminal'
                    }],
                    'place': [],
                    'characteristic': device.characteristic
                },
                'itemPrice': uniquePaid ? uniqueItemPrice : [{ 'priceType': 'aplazado' }],
                'productOffering': {
                    'id': device.siebelId ? device.siebelId : '',
                    'name': device.brand ? device.brand : '',
                    'category': []
                }
            };

            cartItemElement = {
                'id': preId ? preId : cartItemElementId,
                'cartItem': uniquePaid ? [rateCartItemElement, deviceCartItemElement] :
                    [rateCartItemElement, deviceCartItemElement].concat(vapCartItems),
                'action': 'New',
                'cartItemRelationship': [{
                    id: commercialActId
                }],
                'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase(),
                'ospSelected': true
            };

            // Comprobar SVAs Asociados a la tarifa y al carrito
            for (let i = 0; i < commercialData[commercialActIndex].rates.length; i++) {
                if (commercialData[commercialActIndex].rates[i].siebelId === rate.siebelId) {
                    if (commercialData[commercialActIndex].rates[i].selectedSvaList.length !== 0) {
                        for (let j = 0; j < commercialData[commercialActIndex].rates[i].selectedSvaList.length; j++) {
                            cartItemElement.cartItem
                                .push(vm.createSVACartItem(commercialData[commercialActIndex].rates[i].selectedSvaList[j]));
                        }
                    }
                }
            }

            for (let i = 0; i < commercialData[commercialActIndex].terminals.length; i++) {
                if (commercialData[commercialActIndex].terminals[i].bonusId) {

                    let params = {
                        commercialAction: '',
                        idSvaList: commercialData[commercialActIndex].terminals[i].bonusId,
                        isExistingCustomer: false,
                        segment: ''
                    };
                    let cv = JSON.parse(sessionStorage.getItem('cv'));
                    let clientData = JSON.parse(sessionStorage.getItem('clientData'));
                    let defaultData = JSON.parse(sessionStorage.getItem('defaultData'));

                    // Obtenemos si es cliente existente
                    if (!cv || cv === null || cv === undefined) {
                        params.isExistingCustomer = false;
                    } else {
                        params.isExistingCustomer = true;
                    }

                    // Obtenemos el segmento
                    if (!clientData || clientData === null || clientData === undefined
                    || !clientData.ospCustomerSegment || clientData.ospCustomerSegment === '') {
                        params.segment = defaultData.ospCustomerSegment;
                    } else  {
                        params.segment = clientData.ospCustomerSegment;
                    }

                    if (params.segment.toUpperCase() === 'RESIDENCIAL') {
                        params.segment = 'Residencial';
                    } else {
                        params.segment = 'Empresa';
                    }

                    if (!commercialData && commercialData === null || commercialData === undefined) {
                        params.commercialAction = defaultData.ospCartItemType;
                    } else {
                        params.commercialAction = commercialData.ospCartItemType;
                    }

                    vm.productCatalogV2Srv.getSpecificationSVAS(params.idSvaList, params.isExistingCustomer, params.segment,
                        params.commercialAction)
                        .then((spec) => {
                            if (spec) {
                                // Pasamos true como parámetro opcional porque es un bono de terminal
                                cartItemElement.cartItem.push(vm.createSVACartItem(spec.productSpecification[0], true));
                                sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
                            }
                        })
                        .catch((error => {
                        }));
                }
            }

            // Si viene tecnologia creamos cartItem
            if (rate.ospTecnology) {
                cartItemElement.cartItem.push(vm.createIdTechnologyCartItem(rate));
            }

            // Añadir cartItem compromiso de permanencia CP
            if (device.cpDescription && device.cpSiebel && !uniquePaid) {
                cartItemElement.cartItem.push(vm.createCPCartItem(device));
            }

            if (insurance) {
                cartItemElement.cartItem.push(insurance);
            }
            if (shoppingCart !== null) {
                shoppingCart.cartItem.push(cartItemElement);
            } else {
                shoppingCart = {
                    'id': '',
                    'cartItem': [cartItemElement],
                    'customer': {}
                };
            }

            // Set session
            sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        }
        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#putDeviceNoRateInShoppingCart
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @param {Object} device terminal a añadir.
         * @description
         * Añade un terminal sin tarifa al session storage del carrito
         */
        putDeviceNoRateInShoppingCart(device, uniquePaid: boolean) {
            let vm = this;
            let productItem;
            let deviceCartItemElement;
            let cartItemElement;
            let cartItemElementId: number;
            let cartItemIndex: number;
            let lastCartItemId: number;
            let commercialActId: number;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();

            // Se obtiene el ID del acto comercial que se esta modificando
            if (commercialActIndex !== -1 && commercialData[commercialActIndex].id !== null) {
                commercialActId = Number(commercialData[commercialActIndex].id);
            }
            // Se comprueba si existe algun dispositivo en el shopping cart que se este modificando
            if (shoppingCart !== null && commercialData !== null && commercialData[commercialActIndex].isCompletedAC &&
                commercialData[commercialActIndex].ospIsSelected) {
                // Se eliminan los terminales del acto comercial existentes en el shopping cart
                shoppingCart = vm.deleteElementInCartItem(shoppingCart, commercialActId);
                commercialData[commercialActIndex].isCompletedAC = false;
                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
            // Se obtiene el id del ultimo elmento del cart item del shopping cart
            lastCartItemId = vm.getLastCartItemId(shoppingCart, commercialActId);

            // Tipo del terminal
            if (commercialData[commercialActIndex].ospTerminalWorkflow !== 'standar') {
                device.characteristic = [
                    {
                        name: 'CIMATerminalType',
                        value: 'Secundary'
                    }
                ];
            } else {
                device.characteristic = [
                    {
                        name: 'CIMATerminalType',
                        value: 'Primary'
                    }
                ];
            }

            let uniqueItemPrice = [];
            let vapCartItems = [];

            for (let i in device.itemPrice) {
                if (device.itemPrice[i].priceType === 'unico') {
                    uniqueItemPrice.push(device.itemPrice[i]);
                } else {
                    let vapCartItem = {
                        'id': device.itemPrice[i].id,
                        'action': 'New',
                        'product': {
                            'productRelationship': [{ 'type': 'VAP' }],
                            'characteristic': [{ 'name': 'CIMATerminalType', 'value': 'Primary' }]
                        },
                        'itemPrice': [device.itemPrice[i]],
                        'productOffering': { 'id': device.itemPrice[i].id },
                        'cartItemRelationship': [{ 'id': device.siebelId }],
                        'ospSelected': true,
                        'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                        'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
                    };
                    vapCartItems.push(vapCartItem);
                }
            }

            productItem = {
                'href': device.srcImage,
                'name': device.brand,
                'description': device.litSubTitle,
                'productRelationship': [{
                    'type': 'terminal'
                }],
                'place': [],
                'characteristic': device.characteristic
            };

            deviceCartItemElement = {
                'id': device.siebelId,
                'action': 'New',
                'product': productItem,
                'itemPrice': uniquePaid ? uniqueItemPrice : [{ 'priceType': 'aplazado' }],
                'productOffering': {
                    id: device.siebelId,
                },
                cartItemRelationship: [],
                'ospSelected': true,
                'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase(),
            };

            cartItemElementId = Number((lastCartItemId + 0.1).toFixed(1));

            cartItemElement = {
                'id': cartItemElementId,
                'cartItem': uniquePaid ? [deviceCartItemElement] : [deviceCartItemElement].concat(vapCartItems),
                'action': 'New',
                'cartItemRelationship': [{
                    id: commercialActId
                }],
                'ospSelected': true,
                'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase(),
            };

            if (shoppingCart !== null) {
                shoppingCart.cartItem.push(cartItemElement);
            } else {
                shoppingCart = {
                    'id': '',
                    'cartItem': [cartItemElement],
                    'customer': {}
                };
            }
            sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#getSelectedCommercialAct
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * @return {number} Retorna el indice del commercialData que se esta modificando,
         * en caso contrario retorna -1
         */
        getSelectedCommercialAct(): number {
            let commercialData = [];
            commercialData = JSON.parse(sessionStorage.getItem('commercialData'));

            return _.findIndex(commercialData, function (currentCommercialAct) {
                return currentCommercialAct.ospIsSelected === true;
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
            if (shoppingCart !== null && shoppingCart.cartItem.length > 0) {
                shoppingCart.cartItem.forEach(cartItem => {
                    if (Math.floor(cartItem.id) === commercialActId) {
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
            if (shoppingCart !== null && shoppingCart.cartItem.length > 0) {
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
            if (commercialData !== null) {
                commercialData[commercialActIndex].isCompletedAC = isCompletedAC;
                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
        }

        createInsuranceCartItem(device, type) {
            let seguroCartItem = {
                id: device.insuranceSiebelId,
                action: 'New',
                ospSelected: device.insuranceSelected,
                cartItem: [],
                product: {
                    name: 'seguro',
                    description: '',
                    href: '',
                    place: [],
                    productRelationship: [
                        {
                            type: 'seguro'
                        }
                    ],
                    characteristic: [
                        {
                            name: 'CIMATerminalType',
                            value: type === 'primary' ? 'Primary' : 'Secundary'
                        }
                    ]
                },
                itemPrice: [
                    {
                        priceType: 'aplazado',
                        price: {
                            dutyFreeAmount: {
                                unit: 'EUR',
                                value: device.insurancePriceFree ? device.insurancePriceFree : device.litInsurancePaid
                            },
                            taxIncludedAmount: {
                                unit: 'EUR',
                                value: device.insurancePrice ? device.insurancePrice : device.litInsurancePaid
                            }
                        },
                        taxRate: 0.21,
                        ospTaxRateName: 'IVA'
                    }
                ],
                productOffering: {
                    id: device.insuranceSiebelId
                },
                cartItemRelationship: [
                    {
                        id: device.siebelId
                    }
                ]
            };
            return seguroCartItem;
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#createSVACartItem
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @param sva sva
         * @description
         * Crea el Cart Item de un SVA
         */
        createSVACartItem(sva, isBono?) {
            let vm = this;
            let productItem;
            let svaCartItemElement, cartItemElement;
            let cartItemElementId, cartItemIndex, lastCartItemId, commercialActId: number;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();

            if (sva.title) {
                productItem = {
                    'name': sva.title,
                    'description': sva.description,
                    'href': sva.href,
                    'productRelationship': [{
                        'type': 'SVA'
                    }],
                    'place': [],
                    'characteristic': []
                };
            } else {
                productItem = {
                    'name': sva.ospTitulo,
                    'description': sva.description,
                    'href': sva.href,
                    'productRelationship': [{
                        'type': 'SVA'
                    }],
                    'place': [],
                    'characteristic': []
                };
            }

            if (sva.ospTitulo) {
                let itemPrice;
                // Si no viene informado expresamente el precio del bono, añadimos 0 por defecto
                if (isBono) {
                    itemPrice =  [
                            {
                                "price": {
                                    "dutyFreeAmount": {
                                        "unit": "EUR",
                                        "value": 0
                                    },
                                    "taxIncludedAmount": {
                                        "value": 0,
                                        "unit": "EUR"
                                    },
                                    "taxRate": 0.21,
                                    "ospTaxRateName": ""
                                },
                                "priceType": "siebelPriceSva"
                            }
                        ];
                }else {
                    itemPrice = sva.itemPrice;
                }

                svaCartItemElement = {
                    'id': sva.id,
                    'action': 'New',
                    'product': productItem,
                    'itemPrice': itemPrice,
                    'productOffering': {
                        id: sva.id,
                        name: sva.ospTitulo,
                        category: []
                    },
                    cartItemRelationship: [],
                    'ospSelected': false,
                    'ospSelectable': true,
                    'ospMandatory': true,
                    'ospObjectType': '',
                    'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                    'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
                };
            } else {
                svaCartItemElement = {
                    'id': sva.id,
                    'action': 'New',
                    'product': productItem,
                    'itemPrice': sva.itemPrice,
                    'productOffering': {
                        id: sva.id,
                        name: sva.title,
                        category: []
                    },
                    cartItemRelationship: [],
                    'ospSelected': false,
                    'ospSelectable': true,
                    'ospMandatory': true,
                    'ospObjectType': '',
                    'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                    'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
                };
            }
            return svaCartItemElement;
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#createCPCartItem
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @param device
         * @param type (Opcional)
         * @description
         * Crea el Cart Item de Compropiso de permanencia
         */
        createCPCartItem(device, type?) {
            let vm = this;
            let productItem;
            let cpCartItemElement, cartItemElement;
            let cartItemElementId, cartItemIndex, lastCartItemId, commercialActId: number;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();

            productItem = {
                'name': type ? 'CPD' : 'CPT-CPC',
                'description': device.cpDescription,
                'productRelationship': [{
                    'type': type ? 'CPD' : 'CPT-CPC'
                }],
                'place': [],
                'characteristic': [
                    {
                        'name': 'CIMATerminalType',
                        'value': type ? 'Secundary' : 'Primary'
                    },
                ]
            };

            cpCartItemElement = {
                'id': device.cpSiebel,
                'action': 'New',
                'product': productItem,
                'itemPrice': [
                    {
                        priceType: 'cuota',
                        recurringChargePeriod: device.cpDuration

                    }
                ],
                'productOffering': {
                    id: device.cpSiebel,
                    name: device.cpDescription,
                    category: []
                },
                cartItemRelationship: [
                    {
                        id: device.siebelId
                    }
                ],
                'ospSelected': false,
                'ospSelectable': true,
                'ospMandatory': true,
                'ospObjectType': '',
                'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
            };

            return cpCartItemElement;
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#loveRateInShoppingCart
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @return {boolean} true si se ha llegado al carrito con una tarifa love
         * @description
         * Devuelve si se ha llegado al carrito con una tarifa love
         */
        loveRateInShoppingCart(): boolean {
            let vm = this;
            let response = false;
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            if (commercialData && commercialData.length > 0) {
                commercialData.forEach(function (commercialAct) {
                    if (commercialAct.loveRateInShoppingCart) {
                        response = true;
                    }
                });
            }
            return response;
        }

        createCommercialDataPacks(dato1?, dato2?) {
            let vm = this;

            let sessionCommercial = sessionStorage.getItem('commercialData');

            let cm: any = {
                'id': 0,
                'isCompletedAC': true,
                'ospIsSelected': false,
                'terminals': [

                ],
                'rates': [

                ],
                'idSgmr': null,
                'nameSgmr': '3-Altas de clientes ADSL/Fibra',
                'ospCartItemType': 'cambioTarifa',
                'renewalType': null,
                'ospCartItemSubtype': 'Convergente',
                'originType': 'pospago',
                'originRate': 'IL1G',
                'ospTerminalWorkflow': 'change_rate',
                'actParent': '',   //  En teoria representa el actoCommercialPadre
                'changeRateInfo': {
                    'clickedLine': '656004082',
                    'campaign': 'pasateALove',
                    'numLine': '',
                    'type': 'alta',
                    'rateCode': 'IL1G'
                },
                'originRateSiebelId': ''
            };

            sessionStorage.setItem('commercialData', JSON.stringify(''));

        }
    }
}
