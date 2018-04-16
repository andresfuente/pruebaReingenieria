module ratesParent.Models {
    'use strict';

    export class Rates {
        public status: string;
        private deferred: ng.IDeferred<{}>;
        public promise: ng.IPromise<{}>;
        private customerSegment;

        public rateName: string; // Nombre de la pestaña
        public rates: Rate[] = []; /// Listado de tarifas
        constructor(deferred?: ng.IDeferred<{}>) {
            let vm = this;
            vm.status = 'loading';
            vm.deferred = deferred;
            vm.promise = deferred ? deferred.promise : null;
        }

        loadRates(specificationData, offeringData) {
            let vm = this;
            if (specificationData.productSpecification && offeringData.productOffering) {
                specificationData.productSpecification.forEach(function (specification) {
                    let productOffering = [];
                    offeringData.productOffering.forEach(function (offering) {
                        if (specification.id === offering.productSpecification.id ||
                            specification.id === offering.bundledProductOffering[0].id) {
                            productOffering.push(offering);
                        }
                    });
                    let rate: Rate = new Rate(specification, productOffering);
                    vm.rates.push(rate);
                });
            }
        }

        setError(errorMsg) {
            let vm = this;
            vm.status = 'error';
            if (vm.deferred) {
                vm.deferred.reject(errorMsg);
            }
        }

        completeLoad() {
            let vm = this;
            vm.status = 'loaded';
            if (vm.deferred) {
                vm.deferred.resolve(vm);
            }
        }
    }

    export class Rate {

        public rate;
        // Variables para una tarifa
        public rateSubName: string;
        public rateDescription: string;
        public siebelId: string;
        public groupName: string; // Familia 
        public typeService: string;
        public pack: string;
        public taxRate: number;
        public taxRateName: string;
        public typePriceName: string;
        public relatedSVAList: string = ''; // Lista de Id's de los SVA de la tarifa separados por coma
        public svaInfoList: Array<ratesParent.Models.RateSVA> = []; // Array con la información de los SVA's asociados
        public isTVSvaList = false; // Variable para saber si existen SVA's de TV
        public allSVAChildrenList: Array<ratesParent.Models.RateSVA> = []; // Lista con todos los SVA hijos. 
        public otherSvaInfoList: Array<ratesParent.Models.RateSVA> = [];
        public newRateConditions: boolean = false;

        // Id Tech

        public ospTecnology: string;

        // Estructura que contiene la fibra y las linea con sus respectivos iconos
        public productBundle: RatesProductBundle[] = [];
        public rateOfferingPrice: number; // Precio de la tarifa
        public rateOfferingPriceTaxInluded: number; // Precio de la tarifa        
        public ratePrice: number; // Precio de la tarifa sin impuestos
        public ratePriceTaxIncluded: number; // Precio con impuestos incluidos
        public additionalProductName: string; // Completa tu oferta
        // Estructura para la informacion de la tarifa
        public pupupInfo: RatePopupInfo[] = [];
        public pupupInfoNewConditions: RatePopupInfoDate[] = [];
        // Estructura para la lista de ofertas
        public additionalProductOptionList: RatesProductBundleAdditionalProductOptionList[] = [];
        // Título de recomendados
        public recommendedName: string;
        // Estructura para la lista de recomendados
        public recommendedList: RatesRecommendedProduct[] = [];
        // Promocion
        public ratePriceTaxIncludedPromotional;
        public ratePricePromotional;
        public descriptionPromotion;

        constructor(rateData, priceData) {
            this.rateSubName = rateData.ospTitulo;
            this.rateDescription = rateData.description;
            this.siebelId = rateData.id;
            this.groupName = rateData.ospGroupName;
            this.typeService = rateData.ospTypeService;

            // Checkea si el id y el idTecnologia son distintos (Es LOVE, es decir Convergente y principal)
            if (rateData.ospTecnology !== rateData.id && rateData.ospTypeService === 'movil_fijo') {
                this.ospTecnology = rateData.ospTecnology;
            }

            this.pack = (typeof (rateData.ospFraseComercial) !== 'undefined' && rateData.ospFraseComercial !== null) ?
                rateData.ospFraseComercial : '';

            if (rateData.productSpecCharacteristic) {
                rateData.productSpecCharacteristic.forEach(element => {
                    if (element.ospCategory === 'highlight') {
                        let raProductBundle: RatesProductBundle =
                        new RatesProductBundle(element.attachment ? element.attachment.href : '',
                                                element.name,
                                                element.ospCategory);
                        this.productBundle.push(raProductBundle);
                    }
                    /* if (element.name === 'CARACTERISTICATECNOLOGIA') {
                        let raProductBundle: RatesProductBundle =
                        new RatesProductBundle(element.attachment ? element.attachment.href : '',
                                                element.name,
                                                element.ospCategory);
                        this.productBundle.push(raProductBundle);
                    } */
                });
            }
            // Se obtienen los Id's de los SVA de la tarifa
            if (rateData.productSpecificationRelationship) {
                rateData.productSpecificationRelationship.forEach(element => {
                    if (element.type.toLowerCase() === 'sva' && element.id !== '') {
                        this.relatedSVAList === '' ? this.relatedSVAList = this.relatedSVAList.concat(element.id) :
                            this.relatedSVAList = this.relatedSVAList.concat(',' + element.id);
                    }
                });
            }
            for (let i in priceData) {
                if (priceData.length > 0) {
                    if (priceData[i].isBundle === true) {
                        // Buscamos si afecta el revamp de tarifas Love 
                        if (priceData[i].bundledProductOffering[0].id === rateData.id) {
                            // Comprobamos la fecha 
                            let fechaServicio = priceData[i].validFor.endDateTime;
                            let fechaLocal: any = new Date();
                            let fechaServicioTransf = new Date(fechaServicio);
                            let fechaLocalTransf = new Date(fechaLocal);
                            let urlNewConditions = priceData[i].attachment[0].url;
                            // Si el string no es una fecha o si fechaSrv es null, undefined o vacio y fechaSrv es posterios a fecha local
                            if (fechaServicioTransf && fechaServicioTransf !== undefined &&
                                fechaServicioTransf > fechaLocalTransf && urlNewConditions && urlNewConditions !== undefined) {
                                // Recogemos la info de fecha y url 
                                let infoNewConditions: RatePopupInfoDate =
                                    new RatePopupInfoDate(priceData[i].validFor.endDateTime, priceData[i].attachment[0].url);
                                this.pupupInfoNewConditions.push(infoNewConditions);
                                this.newRateConditions = true;
                            } else {
                                this.newRateConditions = false;
                            }

                            // Recoger precios
                            for (let j in priceData[i].productOfferingPrice) {
                                if (priceData[i].productOfferingPrice.length > 0) {
                                    let promotionalPrice = _.find(priceData[i].productOfferingPrice[j].price, function (price: any) {
                                        return price.priceType === 'promotionalCommercialPriceRate';
                                    });
                                    let commercialPrice = _.find(priceData[i].productOfferingPrice[j].price, function (price: any) {
                                        return price.priceType === 'commercialPriceRate';
                                    });
                                    let techSiebelProductBundlePrice = _.find(priceData[i].productOfferingPrice[j].price,
                                        function (price: any) {
                                            return price.priceType === 'techSiebelProductBundlePriceRate';
                                        });
                                    let siebelPrice = _.find(priceData[i].productOfferingPrice[j].price, function (price: any) {
                                        return price.priceType === 'siebelPriceRate';
                                    });
                                    let ratePrice = _.find(priceData[i].productOfferingPrice[j].price, function (price: any) {
                                        return price.priceType === 'priceRate';
                                    });
                                    let techniquePriceRate = _.find(priceData[i].productOfferingPrice[j].price, function (price: any) {
                                        return price.priceType === 'techniquePriceRate';
                                    });

                                    let productOfferingPriceAlteration = priceData[i].productOfferingPrice[j].
                                    productOfferingPriceAlteration;

                                    if (promotionalPrice) {
                                        this.typePriceName = promotionalPrice.priceType;
                                        this.taxRate = promotionalPrice.taxRate;
                                        this.taxRateName = promotionalPrice.ospTaxRateName;
                                        if (priceData[i].productOfferingPrice[j].priceType === 'Pago aplazado') {
                                            this.ratePriceTaxIncludedPromotional = promotionalPrice.taxIncludedAmount;
                                            this.ratePricePromotional = promotionalPrice.dutyFreeAmount;
                                        } else {
                                            this.ratePriceTaxIncludedPromotional = promotionalPrice.taxIncludedAmount;
                                            this.ratePricePromotional = promotionalPrice.dutyFreeAmount;
                                        }
                                    } else if (productOfferingPriceAlteration) {
                                        this.typePriceName = productOfferingPriceAlteration.priceType;
                                        this.taxRate = productOfferingPriceAlteration.price.taxRate;
                                        this.taxRateName = productOfferingPriceAlteration.price.ospTaxRateName;
                                        this.descriptionPromotion = productOfferingPriceAlteration.description;
                                        this.ratePriceTaxIncludedPromotional = productOfferingPriceAlteration.price.taxIncludedAmount;
                                        this.ratePricePromotional = productOfferingPriceAlteration.price.dutyFreeAmount;
                                    }

                                    if (commercialPrice) {
                                        this.typePriceName = commercialPrice.priceType;
                                        this.taxRate = commercialPrice.taxRate;
                                        this.taxRateName = commercialPrice.ospTaxRateName;
                                        if (priceData[i].productOfferingPrice[j].priceType === 'Pago aplazado') {
                                            this.ratePriceTaxIncluded = commercialPrice.taxIncludedAmount;
                                            this.ratePrice = commercialPrice.dutyFreeAmount;
                                        } else {
                                            this.rateOfferingPriceTaxInluded = commercialPrice.taxIncludedAmount;
                                            this.rateOfferingPrice = commercialPrice.dutyFreeAmount;
                                        }
                                    } else if (techSiebelProductBundlePrice) {
                                        this.typePriceName = techSiebelProductBundlePrice.priceType;
                                        this.taxRate = techSiebelProductBundlePrice.taxRate;
                                        this.taxRateName = techSiebelProductBundlePrice.ospTaxRateName;
                                        if (priceData[i].productOfferingPrice[j].priceType === 'Pago aplazado') {
                                            this.ratePriceTaxIncluded = techSiebelProductBundlePrice.taxIncludedAmount;
                                            this.ratePrice = techSiebelProductBundlePrice.dutyFreeAmount;
                                        } else {
                                            this.rateOfferingPriceTaxInluded = techSiebelProductBundlePrice.taxIncludedAmount;
                                            this.rateOfferingPrice = techSiebelProductBundlePrice.dutyFreeAmount;
                                        }
                                    } else if (siebelPrice) {
                                        this.typePriceName = siebelPrice.priceType;
                                        this.taxRate = siebelPrice.taxRate;
                                        this.taxRateName = siebelPrice.ospTaxRateName;
                                        if (priceData[i].productOfferingPrice[j].priceType === 'Pago aplazado') {
                                            this.ratePriceTaxIncluded = siebelPrice.taxIncludedAmount;
                                            this.ratePrice = siebelPrice.dutyFreeAmount;
                                        } else {
                                            this.rateOfferingPriceTaxInluded = siebelPrice.taxIncludedAmount;
                                            this.rateOfferingPrice = siebelPrice.dutyFreeAmount;
                                        }
                                    } else if (ratePrice) {
                                        this.typePriceName = ratePrice.priceType;
                                        this.taxRate = ratePrice.taxRate;
                                        this.taxRateName = ratePrice.ospTaxRateName;
                                        if (priceData[i].productOfferingPrice[j].priceType === 'Pago aplazado') {
                                            this.ratePriceTaxIncluded = ratePrice.taxIncludedAmount;
                                            this.ratePrice = ratePrice.dutyFreeAmount;
                                        } else {
                                            this.rateOfferingPriceTaxInluded = ratePrice.taxIncludedAmount;
                                            this.rateOfferingPrice = ratePrice.dutyFreeAmount;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (priceData[i].bundledProductOffering[0].id === rateData.id) {
                            // Recoger info
                            let info: RatePopupInfo = new RatePopupInfo(priceData[i].name, priceData[i].description);
                            this.pupupInfo.push(info);
                        }
                    }
                }
            }
        }
    }

    export class RatesProductBundle {
        public image: string;
        public title: string;
        public type: string;

        constructor(src: string, name: string, type: string) {
            this.image = src;
            this.title = name;
            this.type = type;
        }
    }

    export class RatePopupInfo {
        public name: string;
        public description: string;

        constructor(name: string, description: string) {
            this.name = name;
            this.description = description;
        }
    }

    export class RatePopupInfoDate {
        public date: string;
        public url: string;

        constructor(date: string, url: string) {
            this.date = date;
            this.url = url;
        }
    }

    export class RatesProductBundleAdditionalProductCheckList {
        public title: string;
        public price: number;
        public offeringPrice: number;
        public duringPrice: number;
        public firstDscription: string;
        public secondDescription: string;
        public additionalOffering: number;

        constructor(
            title: string,
            price: number,
            offeringPrice: number,
            duringPrice: number,
            firstDscription: string,
            secondDescription: string,
            additionalOffering: number
        ) {
            this.title = title;
            this.price = price;
            this.offeringPrice = offeringPrice;
            this.duringPrice = duringPrice;
            this.firstDscription = firstDscription;
            this.secondDescription = secondDescription;
            this.additionalOffering = additionalOffering;
        }
    }

    export class RatesRecommendedProduct {
        public image: string;
        public title: string;
        public price: number;
        public infoIcon: string;

        constructor(image: string, title: string, price: number, infoIcon: string) {
            this.image = image;
            this.title = title;
            this.price = price;
            this.infoIcon = infoIcon;
        }
    }

    export class RatesProductBundleAdditionalProductOptionList {
        public image: string;
        // Array que contiene todos los datos necesarios apra montar los input checks
        public additionalProductCheckList: RatesProductBundleAdditionalProductCheckList[] = [];

        constructor(image: string) {
            this.image = image;
        }
    }

    export class RateSVA {
        public id: string;
        public name: string;
        public description: string;
        public title: string;
        public price: number;
        public isSelected = false;
        public itemPrice: Array<RatePriceItem> = [];
        public category: string;
        public subCategory: string;
        public childrenList: string = ''; // Lista de Id's de los SVA hijos separados por coma
        public svaChildrenList: Array<RateSVA> = []; // Array de los SVA hijos
        public href: string;
        public show = true;
        // Promociones SVA
        public typePriceName: string;
        public taxRate: number;
        public taxRateName: string;
        public ratePriceTaxIncludedPromotional: number;
        public ratePricePromotional: number;
        public descriptionPromotion: string;

        /**
         * @ngdoc method
         * @name ratesParent.Models:RateSVA#createSVAList
         * @methodOf ratesParent.Models:RateSVA
         * @param specificationData información de los SVA's
         * @param offeringData precio de los SVA's
         * @param customerSegment 
         * @description Retorna la lista de SVA's creada a partir de la data retornada por las API`s
         */
        public static createSVAList(specificationData, offeringData, customerSegment): Array<RateSVA> {
            let sva: RateSVA;
            let svaPriceItem: RatePriceItem = new RatePriceItem();
            let svaList: Array<RateSVA> = [];
            if (specificationData) {
                specificationData.forEach(currentSVA => {
                    sva = new RateSVA();
                    currentSVA.id ? sva.id = currentSVA.id : sva.id = '';
                    currentSVA.name ? sva.name = currentSVA.name : sva.name = '';
                    currentSVA.description ? sva.description = currentSVA.description : sva.description = '';
                    currentSVA.ospTitulo ? sva.title = currentSVA.ospTitulo : sva.title = '';
                    sva.category = (currentSVA.ospGroupName ? currentSVA.ospGroupName.toLowerCase() : '');
                    sva.subCategory = (currentSVA.ospTypeService ? currentSVA.ospTypeService.toLowerCase() : '');
                    sva.childrenList = (currentSVA.ospExternalCode ? currentSVA.ospExternalCode : '');
                    sva.href = (currentSVA.href ? currentSVA.href : '');

                    // Se estable el precio del SVA
                    if (offeringData) {
                        offeringData.productOffering.forEach(currentSVAOffering => {
                            if (currentSVAOffering.productSpecification &&
                                currentSVAOffering.productSpecification.id === currentSVA.id) {
                                if (currentSVAOffering.productOfferingPrice) {
                                    currentSVAOffering.productOfferingPrice.forEach(priceElement => {
                                        svaPriceItem = new RatePriceItem();
                                        if (priceElement.priceType.toLowerCase() === 'pago aplazado') {
                                            priceElement.price.forEach(currentPrice => {
                                                // Precio sin iva si es residencial
                                                if (customerSegment.toLocaleLowerCase() === 'residencial') {
                                                    sva.price = currentPrice.taxIncludedAmount;
                                                } else { // Precio con iva si es empresa o autónomo 
                                                    sva.price = currentPrice.dutyFreeAmount;
                                                }
                                                // ItemPrice
                                                svaPriceItem.priceType = priceElement.priceType;
                                                svaPriceItem.price.taxRate = currentPrice.taxRate;
                                                svaPriceItem.price.ospTaxRateName = currentPrice.ospTaxRateName;
                                                svaPriceItem.price.dutyFreeAmount.unit = currentPrice.currencyCode;
                                                svaPriceItem.price.dutyFreeAmount.value = currentPrice.dutyFreeAmount;
                                                svaPriceItem.price.taxIncludedAmount.value = currentPrice.taxIncludedAmount;
                                                svaPriceItem.price.taxIncludedAmount.unit = currentPrice.currencyCode;
                                                sva.itemPrice.push(svaPriceItem);
                                            });
                                        }
                                        if (priceElement.productOfferingPriceAlteration) {
                                            sva.typePriceName = priceElement.productOfferingPriceAlteration.priceType;
                                            sva.taxRate = priceElement.productOfferingPriceAlteration.price.taxRate;
                                            sva.taxRateName = priceElement.productOfferingPriceAlteration.
                                                price.ospTaxRateName;
                                            sva.descriptionPromotion = priceElement.productOfferingPriceAlteration.description;
                                            sva.ratePriceTaxIncludedPromotional = priceElement.productOfferingPriceAlteration.
                                                price.taxIncludedAmount;
                                            sva.ratePricePromotional = priceElement.productOfferingPriceAlteration.
                                                price.dutyFreeAmount;
                                        }
                                    });
                                }
                            }
                        });
                        svaList.push(sva);
                    }
                });
            }
            return svaList;
        }
    }

    export class RatePriceItem {
        public id: string;
        public name: string;
        public priceType: string;
        public price: RatePrice = new RatePrice();
        public recurringChargePeriod: number;
    }
    export class RatePrice {
        public taxRate: number;
        public ospTaxRateName: string;
        public dutyFreeAmount: RatePriceDetail = new RatePriceDetail();
        public taxIncludedAmount: RatePriceDetail = new RatePriceDetail();
    }
    export class RatePriceDetail {
        public unit: string;
        public value: number;
    }

}
