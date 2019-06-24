module addToShoppingCart.Test.Services {
    describe('addToShoppingCart', () => {
        let service: OrangeFeSARQ.Services.AddToShoppingCartSrv;
        let $injector;
        beforeEach(() => {
            includeDeps();
       
                       
        });

        beforeEach(angular.mock.inject((_addToShoppingCartSrv_) => {
            service = _addToShoppingCartSrv_;
        }));

        beforeEach(() => {
            inject((_$injector_) => {
                $injector = _$injector_;
                jasmine.getJSONFixtures().clearCache();
                jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';
            });
            
        });
        afterEach(() => jasmine.getJSONFixtures().clearCache());

        describe('injections', () => {
            it('should inject correctly', () => {
                expect(service).toBeDefined();
 
            });
        });

         /**
		 * @ngdoc test pack
		 * @author Aarón Isabel Díaz (aisabeld)
		 * @methodOf addToShoppingCart.Services:addToShoppingCartSrv
		 * @description
		 * Conjunto de test para el servicio addToShoppingCartSrv
		 */
        describe('Service to addToShoppingCartSrv ', () => {
            

            // describe('- SOHORateInShoppingCart()', () => {
            //     it('commercialData && commercialData.length', function () {
            //         service.SOHORateInShoppingCart();
            //         expect(service.SOHORateInShoppingCart).toBeEmpty;
            //     });
                
            // });

            describe('- putRateInShoppingCart()', () => {
                it('commercialData && commercialData.length', function () {
                    let rate = {
                        name: 'Go Empresas',
                        description: 'Tarifa Go',
                        groupName : 'Convergente_NAC',
                        typeService : 'movil_fijo',
                        selectedSvaList: {'name': '1'},
                        nacPricePromotional: 'Yes',
                        nacPriceTaxIncludedPromotional: 1
                    };

                    let clientData = {
                        clientType: "1",
                        docNumber: "29498892N",
                        ospIDtype: "NIF",
                        postalContact: {
                            id: "19419018",
                            ospIDsource: "Movil",
                            type: "postal address",
                            city: "ÉCIJA",
                            country: "ESPAÑA",
                            postCode: "41400",
                        },
                        firstName: "Stephen",
                        surname: "Bray",
                        ospCustomerSegment: "Residencial",
                        commercialActId: '123',
                        indexAC: 'Indice',
                        jazztelFibra: "0",
                        isLoveClient: true
                    };
                    window.sessionStorage.setItem('clientData', JSON.stringify(clientData));
                    
                    let shoppingCart = {
                        cartItem: [{
                            cartItem: [{
                                    product:{
                                            productRelationship: [
                                                {
                                                type: "tarifa",
                                                product: {
                                                    id: "56722356",
                                                    name:"Go"
                                                    }
                                                },
                                                {
                                                type: "tarifa",
                                                product: {
                                                    id: "125425",
                                                    name:"Love"
                                                    }
                                                }
                                            ], 
                                            name: "Love"
                                        },
                                    }],
                            product:{
                                        productRelationship: [
                                            {
                                            type: "isContainedIn",
                                            product: {
                                                id: "56722356"
                                                }
                                            }
                                        ], 
                                    },
                            ospCartItemSubtype: "POSPAGO"
                        }],
                        kidId: "1-24CVD"
                    };
                    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

                    let commercialData = [{
                        id: 1,
                        ospTerminalWorkflow: "change_rate",
                        isCompletedAC: true,
                        ospCartItemType: "change_rate",
                        ospCartItemSubtype: "pospago",
                        originType: "pospago",
                        ospIsSelected: true,
                        serviceNumber: "",
                        magazineMode: true,
                        terminals: [],
                        rate: [],
                        changeRateInfo: {
                            clickedLine: '123',
                            bundle: 'bundle'
                        },
                        nameSgmr: 'name'
                    }]
                    window.sessionStorage.setItem('commercialData', JSON.stringify(commercialData));

                    service.getSelectedCommercialAct = function () {
                        return 0;
                    };

                    service.hasPromotion = function () {
                        return true;
                    };
                    service.putRateInShoppingCart(rate);
                    expect(service.putRateInShoppingCart).toBeEmpty;
                });
                
            });

            describe('- putRateInShoppingCart()', () => {
                it('commercialData && commercialData.length', function () {
                    let rate = {
                        name: 'Go Empresas',
                        siebelId: 1,
                        description: 'Tarifa Go',
                        groupName : 'Mobile Only_NAC',
                        typeService : 'movil',
                        selectedSvaList: {'name': '1'},
                        typePriceName: 'euros',
                        nacPricePromotional: 123,
                        nacPriceTaxIncludedPromotional: 1,
                        ratePrice: 1,
                        ratePriceTaxIncluded:11,
                        ratePricePromotional: 123645,
                        ratePriceTaxIncludedPromotional: 12348,
                        bucket:{
                                id: 1,
                                name: 'nombreBucket',
                                shortDescription: 'descripcion'                        }
                            };

                    let clientData = {
                        clientType: "1",
                        docNumber: "29498892N",
                        ospIDtype: "NIF",
                        postalContact: {
                            id: "19419018",
                            ospIDsource: "Movil",
                            type: "postal address",
                            city: "ÉCIJA",
                            country: "ESPAÑA",
                            postCode: "41400",
                        },
                        firstName: "Stephen",
                        surname: "Bray",
                        ospCustomerSegment: "autonomo",
                        commercialActId: '123',
                        indexAC: 'Indice',
                        jazztelFibra: "0",
                        isLoveClient: true
                    };
                    window.sessionStorage.setItem('clientData', JSON.stringify(clientData));
                    
                    let shoppingCart = {
                        cartItem: [{
                            cartItem: [{
                                    product:{
                                            productRelationship: [
                                                {
                                                type: "tarifa",
                                                product: {
                                                    id: "56722356",
                                                    name:"Go"
                                                    }
                                                },
                                                {
                                                type: "tarifa",
                                                product: {
                                                    id: "125425",
                                                    name:"Love"
                                                    }
                                                }
                                            ], 
                                            name: "Love"
                                        },
                                    }],
                            product:{
                                        productRelationship: [
                                            {
                                            type: "isContainedIn",
                                            product: {
                                                id: "56722356"
                                                }
                                            }
                                        ], 
                                    },
                            ospCartItemSubtype: "POSPAGO"
                        }],
                        kidId: "1-24CVD"
                    };
                    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

                    let commercialData = [{
                        id: 1,
                        ospTerminalWorkflow: "change_rate",
                        isCompletedAC: true,
                        ospCartItemType: "change_rate",
                        ospCartItemSubtype: "pospago",
                        originType: "pospago",
                        ospIsSelected: true,
                        serviceNumber: "",
                        magazineMode: true,
                        terminals: [],
                        rate: [],
                        changeRateInfo: {
                            clickedLine: '123',
                            bundle: 'bundle'
                        },
                        nameSgmr: 'name'
                    }]
                    window.sessionStorage.setItem('commercialData', JSON.stringify(commercialData));

                    service.getSelectedCommercialAct = function () {
                        return 0;
                    };

                    service.hasPromotion = function () {
                        return true;
                    };
                    service.putRateInShoppingCart(rate);
                    expect(service.putRateInShoppingCart).toBeEmpty;
                });
                
            });

            describe('- hasPromotion()', () => {
                it('hasPromotion', function () {
                    let rate = {
                        name: 'Go Empresas',
                        siebelId: 1,
                        description: 'Tarifa Go',
                        groupName : 'Mobile Only_NAC',
                        typeService : 'movil',
                        selectedSvaList: {'name': '1'},
                        typePriceName: 'euros',
                        nacPricePromotional: 123,
                        nacPriceTaxIncludedPromotional: 1,
                        ratePrice: 1,
                        ratePriceTaxIncluded:11,
                        bucket:{
                                id: 1,
                                name: 'nombreBucket',
                                shortDescription: 'descripcion'  
                                },
                        NACLines: [{
                            ratePriceTaxIncludedPromotional: 1,
                            ratePricePromotional:2
                        }]                      
                    };

                    let clientData = {
                        clientType: "1",
                        docNumber: "29498892N",
                        ospIDtype: "NIF",
                        postalContact: {
                            id: "19419018",
                            ospIDsource: "Movil",
                            type: "postal address",
                            city: "ÉCIJA",
                            country: "ESPAÑA",
                            postCode: "41400",
                        },
                        firstName: "Stephen",
                        surname: "Bray",
                        ospCustomerSegment: "Residencial",
                        commercialActId: '123',
                        indexAC: 'Indice',
                        jazztelFibra: "0",
                        isLoveClient: true
                    };
                    window.sessionStorage.setItem('clientData', JSON.stringify(clientData));
                    
                    let shoppingCart = {
                        cartItem: [{
                            cartItem: [{
                                    product:{
                                            productRelationship: [
                                                {
                                                type: "tarifa",
                                                product: {
                                                    id: "56722356",
                                                    name:"Go"
                                                    }
                                                },
                                                {
                                                type: "tarifa",
                                                product: {
                                                    id: "125425",
                                                    name:"Love"
                                                    }
                                                }
                                            ], 
                                            name: "Love"
                                        },
                                    }],
                            product:{
                                        productRelationship: [
                                            {
                                            type: "isContainedIn",
                                            product: {
                                                id: "56722356"
                                                }
                                            }
                                        ], 
                                    },
                            ospCartItemSubtype: "POSPAGO"
                        }],
                        kidId: "1-24CVD"
                    };
                    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

                    let commercialData = [{
                        id: 1,
                        ospTerminalWorkflow: "change_rate",
                        isCompletedAC: true,
                        ospCartItemType: "change_rate",
                        ospCartItemSubtype: "pospago",
                        originType: "pospago",
                        ospIsSelected: true,
                        serviceNumber: "",
                        magazineMode: true,
                        terminals: [],
                        rate: [],
                        changeRateInfo: {
                            clickedLine: '123',
                            bundle: 'bundle'
                        },
                        nameSgmr: 'name'
                    }]
                    window.sessionStorage.setItem('commercialData', JSON.stringify(commercialData));

                    service.hasPromotion(rate);
                    expect(service.putRateInShoppingCart).toBeEmpty;
                });
                
            });

        });
    });
}

