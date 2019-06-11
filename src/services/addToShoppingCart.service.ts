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
        public clientJazztelSrv: OrangeFeSARQ.Services.ClientJazztelSrv;
        public userSrv: OrangeFeSARQ.Services.UserSrv;
        public data;
        public bucketId: string;
        public pressRateModifyButton: boolean;
        public shoppingCartAux;

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
            vm.clientJazztelSrv = $injector.get('clientJazztelSrv');
            vm.userSrv = $injector.get('userSrv');
        }

        getBundle() {
            let vm = this;

            let cv = JSON.parse(sessionStorage.getItem('cv'));

            let bundleId = '';

            if (cv && cv.product) {
                for (let i = 0; i < cv.product.length; i++) {
                    if (cv.product[i].productCharacteristic) {
                        bundleId = vm.getCVBundleData(cv.product[i].productCharacteristic);

                        if (bundleId) {
                            break;
                        }
                    }
                }
            }

            return bundleId;
        }


        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#getCVBundleData
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Busca la información relativa al bundle en el CV
         */
        getCVBundleData(productCharacteristic) {
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let active = _.findIndex(commercialData, { 'ospIsSelected': true });

            let returnBundle: string = '';

            let charMSISDN: any = _.find(productCharacteristic, (char: any) => {
                if (char.name === 'MSISDN' && commercialData[active].serviceNumber === char.value) {
                    return char;
                }
            });

            let bundle: any = _.find(productCharacteristic, (char: any) => {
                if (char.name === 'Product Bundle Siebel') {
                    return char;
                }
            });

            if (charMSISDN && bundle && bundle.value) {
                returnBundle = bundle.value;
            }

            return returnBundle;
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
            let deviceCartItemElement, rateCartItemElement;
            let cartItemElement;
            let cartItemElementId: number;
            let lastCartItemId: number;
            let commercialActId: number;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();;

            // Se obtiene el ID del acto comercial que se esta modificando
            // Se comprueba si existe algun dispositivo TSS en el shopping cart que se este modificando
            // Se eliminan los TSS del acto comercial existentes en el shopping cart
            // Se obtiene el id del ultimo elmento del cart item del shopping cart

            if (commercialActIndex !== -1 && commercialData[commercialActIndex].id !== null) {
                commercialActId = Number(commercialData[commercialActIndex].id);
            }
            if (shoppingCart !== null && commercialData !== null && commercialData[commercialActIndex].isCompletedAC &&
                commercialData[commercialActIndex].ospIsSelected) {
                shoppingCart = vm.deleteElementInCartItem(shoppingCart, commercialActId);
                commercialData[commercialActIndex].isCompletedAC = false;
                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
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

            rateCartItemElement = {
                'id': '',
                'action': 'New',
                'product': {
                    'name': '',
                    'description': '',
                    'productRelationship': [{
                        'type': 'tarifa'
                    }]
                },
                'productOffering': {
                    'id': '',
                    'name': '',
                    'isBundle': ''
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
                'ospSelected': '',
                'ospCartItemType': '',
                'ospCartItemSubtype': ''
            };

            // Se guarda el IMEI del terminal si se dispone de el
            if (device && device.IMEI && device.IMEI !== undefined) {
                let imei = {
                    'name': 'IMEI',
                    'value': device.IMEI
                };
                productItem.characteristic.push(imei);

                if (!vm.isFdcSite() && device.idReserva) {
                    productItem.characteristic.push(
                        {
                            name: 'idReserva',
                            value: device.idReserva
                        }
                    );
                }
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

            if (commercialData && commercialData[commercialActIndex]
                && commercialData[commercialActIndex].ospTerminalWorkflow === 'secondary_renew'
                && commercialData[commercialActIndex].ospCartItemType
                && commercialData[commercialActIndex].ospCartItemSubtype
                && commercialData[commercialActIndex].originRate) {

                let idBundle = vm.getBundle();
                rateCartItemElement.id = idBundle;
                rateCartItemElement.product.name = 'RENOVE_SECUNDARIO'
                rateCartItemElement.productOffering.id = idBundle;
                rateCartItemElement.productOffering.name = 'RENOVE_SECUNDARIO'
                rateCartItemElement.productOffering.isBundle = true;
                rateCartItemElement.ospSelected = true;
                rateCartItemElement.ospCartItemType = commercialData[commercialActIndex].ospCartItemType.toLowerCase();
                rateCartItemElement.ospCartItemSubtype = commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase();
            } else {
                let idBundle = vm.getBundle();
                rateCartItemElement.id = '1-CWOOG9';
                rateCartItemElement.product.name = 'peach'
                rateCartItemElement.productOffering.id = '1-CWOOG9';
                rateCartItemElement.productOffering.name = 'peach'
                rateCartItemElement.productOffering.isBundle = true;
                rateCartItemElement.ospSelected = true;
                rateCartItemElement.ospCartItemType = 'alta';
                rateCartItemElement.ospCartItemSubtype = '';
            }

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
            let isSecondaryRenew: boolean = (commercialData[commercialActIndex] && commercialData[commercialActIndex].renewalType && commercialData[commercialActIndex].renewalType.toLowerCase() === 'renove secundario');

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
                'name': device.litTitle ? device.litTitle : device.brand ? device.brand : undefined,
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

                if (!vm.isFdcSite() && device.idReserva) {
                    productItem.characteristic.push(
                        {
                            name: 'idReserva',
                            value: device.idReserva
                        }
                    );
                }
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
            if (!isSecondaryRenew) {
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

            } else {
                commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
                commercialActIndex = vm.getSelectedCommercialAct();

                if (commercialActIndex !== -1 && commercialData[commercialActIndex].id) {
                    let commercialActId: number = Number(commercialData[commercialActIndex].id);
                    let lastCartItemId: number = vm.getLastCartItemId(shoppingCart, commercialActId);
                    let cartItemElementId: number = Number((lastCartItemId + 0.1).toFixed(1));

                    let cartItemElement = {
                        'id': cartItemElementId,
                        'cartItem': payType === 'unique' ? [secundaryDeviceCartItem] : [secundaryDeviceCartItem].concat(vapCartItems),
                        'action': 'New',
                        'cartItemRelationship': [{
                            id: commercialActId
                        }],
                        'ospSelected': true,
                        'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                        'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase(),
                    };

                    if (shoppingCart) {
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

            }

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
            let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            let commercialActIndex = vm.getSelectedCommercialAct();
            let bucket;

            // Se obtiene el ID del acto comercial que se esta modificando
            if (commercialActIndex !== -1 && commercialData[commercialActIndex].id !== null) {
                commercialActId = Number(commercialData[commercialActIndex].id);

                if (rate.groupName === 'Convergente' && rate.family === 'love') {
                    commercialData[commercialActIndex].loveRateInShoppingCart = true;
                }

                if (rate.groupName === 'Convergente_NAC' && rate.typeService === 'movil_fijo') {
                    commercialData[commercialActIndex].NACRateInShoppingCart = true;
                }
                //Seteamos el valor de SOHORateInShoppingCart cuando groupNme es movil, cuando typeService es movil y cuando el segmento es empresa
                //TODO comprobar que se setea correctamente SOHORateInShoppingCart
                if (rate.groupName === 'movil' && rate.typeService === 'movil' && clientData.ospCustomerSegment === 'empresa') {
                    commercialData[commercialActIndex].SOHORateInShoppingCart = true;
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
                'characteristic': vm.informativePromo(rate)
            };

            let priceAlteration = [];

            if (vm.hasPromotion(rate)) {
                priceAlteration = [{
                    'name': rate.typePriceName ? rate.typePriceName : '',
                    'priceType': rate.priceType,
                    'applicationDuration': rate.applicationDuration,
                    'price': {
                        'dutyFreeAmount': {
                            'unit': 'EUR',
                            'value': rate.ratePricePromotional ? rate.ratePricePromotional : rate.taxFreePrice
                        },
                        'taxIncludedAmount': {
                            'unit': 'EUR',
                            'value': rate.ratePriceTaxIncludedPromotional ? rate.ratePriceTaxIncludedPromotional : rate.taxIncludedPrice
                        },
                        taxRate: rate.taxRate,
                        ospTaxRateName: rate.taxRateName
                    }
                }];

                // Si es NAC, añadimos los precios promocionados de las líneas adicionales al pack, si existen
                if (rate.groupName === 'Convergente_NAC') {
                    if (priceAlteration[0].price.dutyFreeAmount.value !== undefined && rate.nacPricePromotional !== undefined) {
                        priceAlteration[0].price.dutyFreeAmount.value += rate.nacPricePromotional;
                    }

                    if (priceAlteration[0].price.taxIncludedAmount.value !== undefined && rate.nacPriceTaxIncludedPromotional !== undefined) {
                        priceAlteration[0].price.taxIncludedAmount.value += rate.nacPriceTaxIncludedPromotional;
                    }
                }
            }

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
                        'priceAlteration': priceAlteration
                    }
                ],
                'productOffering': {
                    'id': rate.siebelId ? rate.siebelId : '',
                    'name': rate.name ? rate.name : '',
                    'category': [],
                    'isBundle': true
                }
            };

            // SI es NAC, calculamos el precio total estándar del pack
            if (rate.groupName === 'Convergente_NAC') {
                if (rateCartItemElement.itemPrice[0].price.dutyFreeAmount.value !== undefined && rate.nacPrice !== undefined) {
                    rateCartItemElement.itemPrice[0].price.dutyFreeAmount.value += rate.nacPrice;
                }

                if (rateCartItemElement.itemPrice[0].price.taxIncludedAmount.value !== undefined && rate.nacPriceTaxIncluded !== undefined) {
                    rateCartItemElement.itemPrice[0].price.taxIncludedAmount.value += rate.nacPriceTaxIncluded;
                }
            }

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

            if (rate.groupName === 'Convergente_NAC' && rate.bucket) {
                bucket = vm.createBucketCartItem(rate.bucket);

                if (bucket) {
                    cartItemElement.cartItem.push(bucket);
                }
            }

            // Cambio de marca


            if (clientData && clientData.jazztelData && clientData.jazztelData.customer) {
                let router = _.find(clientData.jazztelData.customer.product, (item: any) => {
                    return item.ospProductType === 'Equipo' && item.name.toLowerCase().indexOf("fibra") !== -1;
                });
                if (router) {
                    let routerCartItemElement = {
                        'id': router.id ? router.id : '',
                        'action': 'Existing',
                        'product': {
                            'name': router.name ? router.name : '',
                        }
                    };
                    cartItemElement.cartItem.push(routerCartItemElement);
                }

                let ONT = _.find(clientData.jazztelData.customer.product, (item: any) => {
                    return item.ospProductType === 'Equipo' && item.name.toLowerCase().indexOf("ont") !== -1;
                });
                if (ONT) {
                    let ONTCartItemElement = {
                        'id': ONT.id ? ONT.id : '',
                        'action': 'Existing',
                        'product': {
                            'name': ONT.name ? ONT.name : '',
                        }
                    };
                    cartItemElement.cartItem.push(ONTCartItemElement);
                }

                let deco = _.find(clientData.jazztelData.customer.product, (item: any) => {
                    return item.ospProductType === 'Equipo' && item.name.toLowerCase().indexOf("decodificador") !== -1;
                });
                if (deco) {
                    let decoCartItemElement = {
                        'id': deco.id ? deco.id : '',
                        'action': 'Existing',
                        'product': {
                            'name': deco.name ? deco.name : '',
                        }
                    };
                    cartItemElement.cartItem.push(decoCartItemElement);
                }
            }

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
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#informativePromo
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Añade las promos informativas al carrito
         */
        informativePromo(rate) {
            let vm = this;

            let promoInformativeName = rate.recurringChargePeriodPromotion ? rate.recurringChargePeriodPromotion.split('|') : [];
            let promoInformativeValue = rate.descriptionPromotion ? rate.descriptionPromotion.split('|') : [];
            let arrayPromoInformative = _.zipWith(promoInformativeName, promoInformativeValue, (a, b) => {
                return { name: a, value: b };
            });

            arrayPromoInformative = _.filter(arrayPromoInformative, { name: 'Información' });


            return arrayPromoInformative;
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#createAdditionalRateCartItem
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Crea un carrito formado por una tarifa adicional (para NAC)
         */
        createAdditionalRateCartItem(rate, commData, bucket, saveShoppingCart) {
            let vm = this;

            let productItem = {
                'href': '',
                'name': rate.name ? rate.name : '',
                'description': rate.description ? rate.description : '',
                'productRelationship': [{
                    'type': 'tarifa'
                }],
                'place': [],
                'characteristic': vm.informativePromo(rate)
            };

            let rateCartItemElement = {
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
                                'value': 0
                            },
                            'taxIncludedAmount': {
                                'unit': 'EUR',
                                'value': 0
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
                                    'value': 0
                                },
                                'taxIncludedAmount': {
                                    'unit': 'EUR',
                                    'value': 0
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

            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));

            if (commData) {
                let cartItemElementId = commData.id;

                let cartItemElement = {
                    'id': cartItemElementId + 0.1,
                    'cartItem': [rateCartItemElement],
                    'action': 'New',
                    'cartItemRelationship': [{
                        id: cartItemElementId
                    }],
                    'ospCartItemType': commData.ospCartItemType,
                    'ospCartItemSubtype': commData.ospCartItemSubtype.toLowerCase(),
                    'ospSelected': true
                };

                if (rate.groupName === 'Convergente_NAC') {
                    let cartItemBucket;

                    if (bucket) { // Si se informa el bucket, se crea con ese
                        cartItemBucket = vm.createBucketCartItem(bucket);
                    } else { // Recuperamos el bucket correspondiente del carrito 
                        cartItemBucket = vm.getFullBucketInShoppingCart();
                    }

                    if (cartItemBucket) {
                        cartItemElement.cartItem.push(cartItemBucket);
                    }
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

                if (saveShoppingCart) { // Para flujo no NAC
                    sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
                }

                return cartItemElement;
            }
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
            let bucket;

            productItem = {
                'href': '',
                'name': rate.name ? rate.name : '',
                'description': rate.description ? rate.description : '',
                'productRelationship': [{
                    'type': 'tarifa'
                }],
                'place': [],
                'characteristic': vm.informativePromo(rate)
            };

            let priceAlteration = []

            if (vm.hasPromotion(rate)) {
                priceAlteration = [{
                    'name': rate.typePriceName ? rate.typePriceName : '',
                    'priceType': rate.priceType,
                    'applicationDuration': rate.applicationDuration,
                    'price': {
                        'dutyFreeAmount': {
                            'unit': 'EUR',
                            'value': rate.ratePricePromotional ? rate.ratePricePromotional : rate.taxFreePrice
                        },
                        'taxIncludedAmount': {
                            'unit': 'EUR',
                            'value': rate.ratePriceTaxIncludedPromotional ? rate.ratePriceTaxIncludedPromotional : rate.taxIncludedPrice
                        },
                        taxRate: rate.taxRate,
                        ospTaxRateName: rate.taxRateName
                    }
                }];
            }

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
                        'priceAlteration': priceAlteration
                    }
                ],
                'productOffering': {
                    'id': rate.siebelId ? rate.siebelId : '',
                    'name': rate.name ? rate.name : '',
                    'category': [],
                    'isBundle': true
                }
            };

            // SI es NAC, calculamos el precio total estándar del pack
            if (rate.groupName === 'Convergente_NAC') {
                if (rateCartItemElement.itemPrice[0].price.dutyFreeAmount.value !== undefined && rate.nacPrice !== undefined) {
                    rateCartItemElement.itemPrice[0].price.dutyFreeAmount.value += rate.nacPrice;
                }

                if (rateCartItemElement.itemPrice[0].price.taxIncludedAmount.value !== undefined && rate.nacPriceTaxIncluded !== undefined) {
                    rateCartItemElement.itemPrice[0].price.taxIncludedAmount.value += rate.nacPriceTaxIncluded;
                }
            }

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

            if (rate.groupName === 'Convergente_NAC' && rate.bucket) {
                bucket = vm.createBucketCartItem(rate.bucket);

                if (bucket) {
                    cartItemElement.cartItem.push(bucket);
                }
            }

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
            let characteristicCDM = {};
            let flagTv = {};
            let fixedclient = {};
            let mantenRate = {};
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
                    value: vm.objectTv.value
                };
                ospTecnology.product.characteristic.push(flagTvItem);
                characteristicCDM = {
                    name: 'Aplicable Cambio Marca',
                    value: 'Yes'
                };
                ospTecnology.product.characteristic.push(characteristicCDM);
                flagTv = {
                    name: 'TVOrigen',
                    value: 'Yes'
                };
                ospTecnology.product.characteristic.push(flagTv);
                let clientData = JSON.parse(sessionStorage.getItem('clientData'));
                if (clientData && clientData.length > 0 && clientData.clientFixedNumber) {
                    fixedclient = {
                        name: 'ClienteFijo',
                        value: 'Yes'
                    }
                    ospTecnology.product.characteristic.push(fixedclient);
                }
                if (clientData && clientData.length > 0 && clientData.desblinMantenTarif && clientData.desblinMantenTarif === true) {
                    mantenRate = {
                        name: 'manten_tarifa',
                        value: 'Y'
                    }
                    ospTecnology.product.characteristic.push(mantenRate);
                }
            }

            /* let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            if (clientData && clientData.jazztelData && clientData.jazztelData.customer && clientData.jazztelData.CDM) {
                let characteristicCDM = {
                    name: 'Aplicable Cambio Marca',
                    value: 'Yes'
                };
                ospTecnology.product.characteristic.push(characteristicCDM);
                let flagTv = {
                    name: 'TVOrigen',
                    value: clientData.jazztelData.tv
                };
                ospTecnology.product.characteristic.push(flagTv);
            } */
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
        putRateAndDeviceInShoppingCart(rate, device, uniquePaid: boolean, preId?: string, selected?: boolean) {
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
            let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            let commercialActIndex = vm.getSelectedCommercialAct();
            let insurance;
            let bucket;

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
                if (rate.groupName === 'Convergente_NAC' && rate.typeService === 'movil_fijo') {
                    commercialData[commercialActIndex].NACRateInShoppingCart = true;
                }
                //Seteamos el valor de SOHORateInShoppingCart cuando groupNme es movil, cuando typeService es movil y cuando el segmento es empresa
                //TODO comprobar que se setea correctamente SOHORateInShoppingCart
                if (rate.groupName === 'Mobile Only_NAC' && rate.typeService === 'movil' && clientData.ospCustomerSegment === 'empresa') {
                    commercialData[commercialActIndex].SOHORateInShoppingCart = true;
                }

                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
            // Se obtiene el id del ultimo elemento del cart item del shopping cart
            lastCartItemId = vm.getLastCartItemId(shoppingCart, commercialActId);

            let priceAlteration = [];

            if (vm.hasPromotion(rate)) {
                priceAlteration = [{
                    'name': rate.typePriceName ? rate.typePriceName : '',
                    'priceType': rate.priceType,
                    'applicationDuration': rate.applicationDuration,
                    'price': {
                        'dutyFreeAmount': {
                            'unit': 'EUR',
                            'value': rate.ratePricePromotional ? rate.ratePricePromotional : rate.taxFreePrice
                        },
                        'taxIncludedAmount': {
                            'unit': 'EUR',
                            'value': rate.ratePriceTaxIncludedPromotional ? rate.ratePriceTaxIncludedPromotional : rate.taxIncludedPrice
                        },
                        taxRate: rate.taxRate,
                        ospTaxRateName: rate.taxRateName
                    }
                }];

                if (rate.groupName === 'Convergente_NAC') {
                    if (priceAlteration[0].price.dutyFreeAmount.value !== undefined && rate.nacPricePromotional !== undefined) {
                        priceAlteration[0].price.dutyFreeAmount.value += rate.nacPricePromotional;
                    }

                    if (priceAlteration[0].price.taxIncludedAmount.value !== undefined && rate.nacPriceTaxIncludedPromotional !== undefined) {
                        priceAlteration[0].price.taxIncludedAmount.value += rate.nacPriceTaxIncludedPromotional;
                    }
                }
            }

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
                    'characteristic': vm.informativePromo(rate),
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
                        'priceAlteration': priceAlteration
                    }
                ],
                'productOffering': {
                    'id': rate.siebelId ? rate.siebelId : '',
                    'name': rate.name ? rate.name : '',
                    'category': [],
                    'isBundle': true
                }
            };

            // SI es NAC, calculamos el precio total estándar del pack
            if (rate.groupName === 'Convergente_NAC') {
                if (rateCartItemElement.itemPrice[0].price.dutyFreeAmount.value !== undefined && rate.nacPrice !== undefined) {
                    rateCartItemElement.itemPrice[0].price.dutyFreeAmount.value += rate.nacPrice;
                }

                if (rateCartItemElement.itemPrice[0].price.taxIncludedAmount.value !== undefined && rate.nacPriceTaxIncluded !== undefined) {
                    rateCartItemElement.itemPrice[0].price.taxIncludedAmount.value += rate.nacPriceTaxIncluded;
                }
            }

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

                if (!vm.isFdcSite() && deviceReserve.idReserva) {
                    device.characteristic.push(
                        {
                            name: 'idReserva',
                            value: deviceReserve.idReserva
                        }
                    );
                }
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
            let preselected = true;
            if (selected !== null && selected !== undefined && selected === false) {
                preselected = false;
            }
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
                'ospSelected': preselected
            };

            if (rate.groupName === 'Convergente_NAC' && rate.bucket) {
                bucket = vm.createBucketCartItem(rate.bucket);

                if (bucket) {
                    cartItemElement.cartItem.push(bucket);
                }
            }

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
                    let defaultData = JSON.parse(sessionStorage.getItem('defaultData'));

                    // Obtenemos si es cliente existente
                    if (!cv || cv === null || cv === undefined) {
                        params.isExistingCustomer = false;
                    } else {
                        params.isExistingCustomer = true;
                    }

                    // Obtenemos el segmento
                    //TODO El segmento de las tarifas SOHO tiene que ser Empresa
                    if (!clientData || clientData === null || clientData === undefined
                        || !clientData.ospCustomerSegment || clientData.ospCustomerSegment === '') {
                        params.segment = defaultData.ospCustomerSegment;
                    } else {
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
                                if (commercialData[commercialActIndex].multicomparador) {
                                    shoppingCart.isMulticomparador = true;
                                }
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

            if (commercialData[commercialActIndex].multicomparador) {
                shoppingCart.isMulticomparador = true;
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
            let deviceCartItemElement, rateCartItemElement;
            let cartItemElement;
            let cartItemElementId: number;
            let cartItemIndex: number;
            let lastCartItemId: number;
            let commercialActId: number;

            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();

            let isSecondaryRenew: boolean = (commercialData[commercialActIndex].renewalType && commercialData[commercialActIndex].renewalType.toLowerCase() === 'renove secundario') ? true : false;

            // Se obtiene el ID del acto comercial que se esta modificando
            if (commercialActIndex !== -1 && commercialData[commercialActIndex].id !== null) {
                commercialActId = Number(commercialData[commercialActIndex].id);
            }
            // Se comprueba si existe algun dispositivo en el shopping cart que se este modificando
            if (shoppingCart !== null && commercialData !== null && commercialData[commercialActIndex].isCompletedAC &&
                commercialData[commercialActIndex].ospIsSelected && !isSecondaryRenew) {
                // Se eliminan los terminales del acto comercial existentes en el shopping cart
                shoppingCart = vm.deleteElementInCartItem(shoppingCart, commercialActId);
                commercialData[commercialActIndex].isCompletedAC = false;
                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
            // Se obtiene el id del ultimo elmento del cart item del shopping cart
            lastCartItemId = vm.getLastCartItemId(shoppingCart, commercialActId);

            // Tipo del terminal

            device.characteristic = [
                {
                    name: 'CIMATerminalType',
                    value: 'Primary'
                }
            ];

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
                'name': device.brand ? device.brand : device.litTitle ? device.litTitle : undefined,
                'description': device.litSubTitle,
                'productRelationship': [{
                    'type': 'terminal'
                }],
                'place': [],
                'characteristic': device.characteristic
            };

            // Se guarda el IMEI del terminal si se dispone de el
            if (device && device.IMEI && device.IMEI !== undefined) {
                let imei = {
                    'name': 'IMEI',
                    'value': device.IMEI
                };
                productItem.characteristic.push(imei);

                if (!vm.isFdcSite() && device.idReserva) {
                    productItem.characteristic.push(
                        {
                            name: 'idReserva',
                            value: device.idReserva
                        }
                    );
                }
            }

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

            rateCartItemElement = vm.obtainRateCartItemElement(commercialData, commercialActIndex);

            cartItemElementId = Number((lastCartItemId + 0.1).toFixed(1));
            cartItemElement = {
                'id': cartItemElementId,
                'cartItem': uniquePaid ? [deviceCartItemElement, rateCartItemElement] : [deviceCartItemElement, rateCartItemElement].concat(vapCartItems),
                'action': 'New',
                'cartItemRelationship': [{
                    id: commercialActId
                }],
                'ospSelected': isSecondaryRenew ? true : false,
                'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase(),
            };
            // Añade seguro en caso de que se haya seleccionado
            if (device.insuranceSiebelId) {
                cartItemElement.cartItem.push(vm.createInsuranceCartItem(device, 'primary'));
            }


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

        obtainRateCartItemElement(commercialData, commercialActIndex) {
            let vm = this;
            let rateCartItemElement;
            if (commercialData && commercialData[commercialActIndex]
                && commercialData[commercialActIndex].ospTerminalWorkflow === 'secondary_renew'
                && commercialData[commercialActIndex].ospCartItemType
                && commercialData[commercialActIndex].ospCartItemSubtype
                && commercialData[commercialActIndex].originRate) {

                let idBundle = vm.getBundle();

                rateCartItemElement = {
                    'id': idBundle,
                    'action': 'New',
                    'product': {
                        'name': 'RENOVE_SECUNDARIO',
                        'description': '',
                        'productRelationship': [{
                            'type': 'tarifa'
                        }]
                    },
                    'productOffering': {
                        'id': idBundle,
                        'name': 'RENOVE_SECUNDARIO',
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
                    'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                    'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
                };
            } else {
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
            }
            return rateCartItemElement;
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
                action: 'Exclude',
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
            let svaCartItemElement;
            //let cartItemElementId, cartItemIndex, lastCartItemId, commercialActId: number;
            //let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
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

            let priceAlteration = [];

            if (sva.ratePricePromotional || sva.ratePriceTaxIncludedPromotional) {
                priceAlteration = [{
                    'name': sva.typePriceName ? sva.typePriceName : '',
                    'priceType': sva.priceType,
                    'applicationDuration': sva.applicationDuration,
                    'price': {
                        'dutyFreeAmount': {
                            'unit': 'EUR',
                            'value': sva.ratePricePromotional
                        },
                        'taxIncludedAmount': {
                            'unit': 'EUR',
                            'value': sva.ratePriceTaxIncludedPromotional
                        },
                        taxRate: sva.taxRate,
                        ospTaxRateName: sva.taxRateName
                    }
                }];
            }

            if (sva.ospTitulo) {
                let itemPrice;
                // Si no viene informado expresamente el precio del bono, añadimos 0 por defecto
                if (isBono) {
                    itemPrice = [
                        {
                            "price": {
                                "dutyFreeAmount": {
                                    "unit": "EUR",
                                    "value": 0
                                }
                                //se comenta esta parte ya que para la formacion del carrito con acciones NEW, el inyector no lo necesita, con pasarle el dutyFreeAmount es suficiente.
                                // "taxIncludedAmount": {
                                //     "value": 0,
                                //     "unit": "EUR"
                                // },
                                // "taxRate": 0.21,
                                // "ospTaxRateName": ""
                            },
                            "priceType": "siebelPriceSva"
                        }
                    ];
                } else {
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
                    'ospMandatory': false,
                    'ospObjectType': '',
                    'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                    'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
                };
            } else {
                if (sva.ratePricePromotional || sva.ratePriceTaxIncludedPromotional) {
                    priceAlteration = [{
                        'name': sva.typePriceName ? sva.typePriceName : '',
                        'priceType': sva.priceType,
                        'applicationDuration': sva.applicationDuration,
                        'price': {
                            'dutyFreeAmount': {
                                'unit': 'EUR',
                                'value': sva.ratePricePromotional
                            },
                            'taxIncludedAmount': {
                                'unit': 'EUR',
                                'value': sva.ratePriceTaxIncludedPromotional
                            },
                            taxRate: sva.taxRate,
                            ospTaxRateName: sva.taxRateName
                        }
                    }];
                    sva.itemPrice[commercialActIndex].priceAlteration = priceAlteration;
                }
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
                    'ospMandatory': false,
                    'ospObjectType': '',
                    'ospCartItemType': commercialData[commercialActIndex].ospCartItemType.toLowerCase(),
                    'ospCartItemSubtype': commercialData[commercialActIndex].ospCartItemSubtype.toLowerCase()
                };

                if (svaCartItemElement.itemPrice[0] && !svaCartItemElement.itemPrice[0].priceAlteration) {
                    svaCartItemElement.itemPrice[0].priceAlteration = [];
                }

                svaCartItemElement.itemPrice[0].priceAlteration = priceAlteration;
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

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#NACRateInShoppingCart
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @return {boolean} true si se ha llegado al carrito con una tarifa NAC
         * @description
         * Devuelve si se ha llegado al carrito con una tarifa NAC
         */
        NACRateInShoppingCart(): boolean {

            let response: boolean = false;

            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));

            if (commercialData && commercialData.length) {
                commercialData.forEach((commData) => {
                    if (commData.NACRateInShoppingCart) {
                        response = true;
                    }
                });
            }

            return response;
        }

        /**
 * @ngdoc method
 * @name orangeFeSARQ.Services:AddToShoppingCartSrv#SOHORateInShoppingCart
 * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
 * @return {boolean} true si se ha llegado al carrito con una tarifa SOHO
 * @description
 * Devuelve si se ha llegado al carrito con una tarifa SOHO
 */
        SOHORateInShoppingCart(): boolean {

            let response: boolean = false;

            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));

            if (commercialData && commercialData.length) {
                commercialData.forEach((commData) => {
                    if (commData.SOHORateInShoppingCart) {
                        response = true;
                    }
                });
            }

            return response;
        }

        createCommercialDataPacks(dato1?, dato2?) {

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

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#createBucketCartItem
         * @param {object} bucket elemento con la información del bono
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Crea un cartItem de tipo bucket
         */
        createBucketCartItem(bucket) {

            let bucketCartItem = {
                "id": bucket.id,
                "action": "New",
                "product": {
                    "productRelationship": [
                        {
                            "type": "bucket"
                        }
                    ],
                    "place": [],
                    "characteristic": [
                        {
                            "name": bucket.name,
                            "shortDescription": bucket.shortDescription
                        }
                    ],
                    "relatedParty": [],
                    "productSpecification": []
                },
                "productOffering": {
                    "id": bucket.id
                }
            };

            return bucketCartItem;
        }


        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#getBucketInShoppingCart
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Devuelve el id del bucket que hay en carrito (en principio, solo puede haber uno)
         */
        getBucketInShoppingCart() {

            let bucket: string;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));

            if (shoppingCart && shoppingCart.cartItem) {
                shoppingCart.cartItem.forEach((option: any) => {
                    if (option.ospSelected && option.cartItem) {
                        option.cartItem.forEach((item) => {
                            if (item.product && item.product.productRelationship && item.product.productRelationship[0]
                                && item.product.productRelationship[0].type === 'bucket') {
                                bucket = item.id;
                            }
                        });
                    }
                });
            }

            return bucket;
        }

        /**
         * @ngdoc method
         * @name orangeFeSARQ.Services:AddToShoppingCartSrv#getFullBucketInShoppingCart
         * @methodOf orangeFeSARQ.Services:AddToShoppingCartSrv
         * @description
         * Devuelve el bucket que hay en carrito
         */
        getFullBucketInShoppingCart() {

            let bucket;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));

            if (shoppingCart && shoppingCart.cartItem) {
                shoppingCart.cartItem.forEach((option: any) => {
                    if (option.ospSelected && option.cartItem) {
                        option.cartItem.forEach((item) => {
                            if (item.product && item.product.productRelationship && item.product.productRelationship[0]
                                && item.product.productRelationship[0].type === 'bucket') {
                                bucket = item;
                            }
                        });
                    }
                });
            }

            return bucket;
        }

        /*
        Devuelve true si aplica promoción al pack y false en otro caso
        */
        hasPromotion(rate: any) {

            let isPromo: boolean = false;

            // Averiguamos si hay promociones en las líneas adicionales
            if (rate.groupName === 'Convergente_NAC') {
                isPromo = !isNaN(rate.ratePriceTaxIncludedPromotional) || !isNaN(rate.ratePricePromotional);

                // Si no hay promoción en la principal, comprobamos las adicionales
                // y si alguna tiene promo, hay que pintarlo
                if (!isPromo && rate.NACLines) {
                    rate.NACLines.forEach((line) => {
                        if (!isNaN(line.ratePriceTaxIncludedPromotional) || !isNaN(line.ratePricePromotional)) {
                            isPromo = true;
                        }
                    });
                }
            } else { // Si no es NAC, hacemos la comprobación normal
                isPromo = !isNaN(rate.ratePriceTaxIncludedPromotional) || !isNaN(rate.ratePricePromotional);
            }

            return isPromo;
        }

        /*
        getComercialActs() {
            let vm = this;
            let lastCartItemId: number;
            let commercialActId: number;
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = vm.getSelectedCommercialAct();

            if (commercialActIndex !== -1 && commercialData[commercialActIndex].id !== null) {
                commercialActId = Number(commercialData[commercialActIndex].id);
            }
            if (shoppingCart !== null && commercialData !== null && commercialData[commercialActIndex].isCompletedAC &&
                commercialData[commercialActIndex].ospIsSelected) {
                shoppingCart = vm.deleteElementInCartItem(shoppingCart, commercialActId);
                commercialData[commercialActIndex].isCompletedAC = false;
                sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
            }
            lastCartItemId = vm.getLastCartItemId(shoppingCart, commercialActId);

        }
        /*
        
        isFdcSite() {
            const loginData = JSON.parse(sessionStorage.getItem('loginData'));
            return loginData.site === 'fichadecliente';
        }
    }
}
