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

        loadRates(specificationData, offeringData, bucketInfo?) {
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

                    let rate: Rate = new Rate(specification, productOffering, bucketInfo);

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
        public implicitSVAList: string = ''; // Lista de los Id's de los SVA implícitos separados por coma

        public svaInfoList: Array<ratesParent.Models.RateSVA> = []; // Array con la información de los SVA's asociados
        public isTVSvaList = false; // Variable para saber si existen SVA's de TV
        public allSVAChildrenList: Array<ratesParent.Models.RateSVA> = []; // Lista con todos los SVA hijos. 
        public otherSvaInfoList: Array<ratesParent.Models.RateSVA> = [];
        public selectedSvaList: Array<ratesParent.Models.RateSVA> = [];
        public newRateConditions: boolean = false;
        public associatedLine: Array<Object>;
        public defaultLines: Array<Object>;

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

        public nacPriceTaxIncluded: number;
        public nacPrice: number;
        public nacPriceTaxIncludedPromotional: number;
        public nacPricePromotional: number;

        public descriptionPromotion;
        public applicationDuration;
        public recurringChargePeriodPromotion: string; // Tipo de promoción

        // Atributos para NAC
        public bucket: RateBucket;
        public NACLines: Rate[] = [];

        public optionalFeatures: Array<OptionalFeature> = []; 
        private pagoAplazado: any = 'Pago aplazado';

        constructor(rateData, priceData, bucketInfo?) {
            this.rateSubName = rateData.ospTitulo;
            this.rateDescription = rateData.description;
            this.siebelId = rateData.id;
            this.groupName = rateData.ospGroupName;
            this.typeService = rateData.ospTypeService;

            // Inicializamos a 0 los precios auxiliares del pack NAC
            this.nacPrice = 0;
            this.nacPriceTaxIncluded = 0;
            this.nacPricePromotional = 0;
            this.nacPriceTaxIncludedPromotional = 0;

            // Checkea si el id y el idTecnologia son distintos (Es LOVE, es decir Convergente y principal)
            if (rateData.ospTecnology !== rateData.id && rateData.ospTypeService === 'movil_fijo') {
                this.ospTecnology = rateData.ospTecnology;
            }

            this.pack = (typeof (rateData.ospFraseComercial) !== 'undefined' && rateData.ospFraseComercial !== null) ?
                rateData.ospFraseComercial : '';

            if (rateData.productSpecCharacteristic) {
                rateData.productSpecCharacteristic.forEach(element => {
                    if (element.ospCategory === 'highlight' || element.name === 'CARACTERISTICATECNOLOGIA') {
                        let raProductBundle = new RatesProductBundle(element.attachment ? element.attachment.href : '',
                            element.name,
                            element.ospCategory,
                            element.description,
                            element.productSpecSubcharacteristic);
                        this.productBundle.push(raProductBundle);
                    }

                    if (element.ospCategory === 'BUCKET' && element.ospId) {
                        this.bucket = new RateBucket(element.name, element.ospId, element.ospOrden, element.ospLargeDescription, element.description, element.ospImagen);
                    } else if (bucketInfo && rateData.ospGroupName === 'Convergente_NAC') {
                        this.bucket = new RateBucket('', bucketInfo, '', '', '', '');
                    }
                    if (rateData.ospGroupName === 'Convergente_NAC' && element.ospCategory === 'optional' && element.ospId) {
                        let optionalFeature: OptionalFeature = undefined;
                        let img: string = '';
                        if (element.attachment && element.attachment.href){
                            img = element.attachment.href
                        }
                        if (element.name === '#lineas#') {
                            optionalFeature = new OptionalFeature(element.ospId, img, element.name);
                        } else {
                            optionalFeature = new OptionalFeature(element.ospId, img, element.name, element.productSpecSubcharacteristic);
                        }        
                        if (!_.some(this.optionalFeatures, {ospId: element.ospId})) {
                            this.optionalFeatures.push(optionalFeature);
                        }
                    }
                });
            }
            // Se obtienen los Id's de los SVA de la tarifa
            if (rateData.productSpecificationRelationship) {
                rateData.productSpecificationRelationship.forEach(element => {
                    if (element.type.toLowerCase() === 'sva' && element.id !== '') {
                        this.relatedSVAList === '' ? this.relatedSVAList = this.relatedSVAList.concat(element.id) :
                            this.relatedSVAList = this.relatedSVAList.concat(',' + element.id);
                    }

                    if (element.type.toLowerCase() === 'implicitsva' && element.id !== '') {
                        this.implicitSVAList === '' ? this.implicitSVAList = this.implicitSVAList.concat(element.id) :
                            this.implicitSVAList = this.implicitSVAList.concat(',' + element.id);
                    }
                });
            }

            // Buscamos lineas asociadas en productSpecificationRelationship del rate 
            let associatedLine = [];
            associatedLine = _.filter(rateData.productSpecificationRelationship, { type: 'associatedLine' });

            if (associatedLine !== undefined && associatedLine.length !== 0) {
                this.associatedLine = associatedLine;
            }

            // Buscamos líneas por defecto para packs
            let defaultLines = [];
            defaultLines = _.filter(rateData.productSpecificationRelationship, { type: 'defaultLine' });

            if (defaultLines && defaultLines.length > 0) {
                this.defaultLines = defaultLines;
            }

            for (let i in priceData) {
                if (priceData.length > 0) {
                    if (priceData[i].isBundle) {
                        // Buscamos si afecta el revamp de tarifas Love 
                        if (priceData[i].bundledProductOffering && priceData[i].bundledProductOffering[0] && priceData[i].bundledProductOffering[0].id === rateData.id) {
                            // Comprobamos la fecha 
                            let fechaServicio = priceData[i].validFor && priceData[i].validFor.endDateTime ? priceData[i].validFor.endDateTime : null;
                            let fechaLocal: any = new Date();
                            let fechaServicioTransf = new Date(fechaServicio);
                            let fechaLocalTransf = new Date(fechaLocal);
                            let urlNewConditions = priceData[i].attachment && priceData[i].attachment[0] && priceData[i].attachment[0].url ? priceData[i].attachment[0].url : '';
                            // Si el string no es una fecha o si fechaSrv es null, undefined o vacio y fechaSrv es posterios a fecha local
                            if (fechaServicioTransf && fechaServicioTransf > fechaLocalTransf && urlNewConditions) {
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
                                    let techSiebelPrice = _.find(priceData[i].productOfferingPrice[j].price, function (price: any) {
                                        return price.priceType === 'techSiebelPriceRate';
                                    });

                                    let productOfferingPriceAlteration = priceData[i].productOfferingPrice[j].
                                        productOfferingPriceAlteration;

                                    // Precio fijo para packEntry NAC
                                    let precioFijo;

                                    if (productOfferingPriceAlteration && productOfferingPriceAlteration.price
                                        && productOfferingPriceAlteration.recurringChargePeriod === 'Precio fijo') {
                                        precioFijo = productOfferingPriceAlteration.price;
                                    }

                                    // Precios tarifa con promociones
                                    if (promotionalPrice) {
                                        this.typePriceName = promotionalPrice.priceType;
                                        this.taxRate = promotionalPrice.taxRate;
                                        this.taxRateName = promotionalPrice.ospTaxRateName;
                                        if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
                                            this.ratePriceTaxIncludedPromotional = promotionalPrice.taxIncludedAmount;
                                            this.ratePricePromotional = promotionalPrice.dutyFreeAmount;
                                        } else {
                                            this.ratePriceTaxIncludedPromotional = promotionalPrice.taxIncludedAmount;
                                            this.ratePricePromotional = promotionalPrice.dutyFreeAmount;
                                        }
                                    } else if (productOfferingPriceAlteration && !precioFijo) {
                                        this.typePriceName = productOfferingPriceAlteration.priceType;
                                        this.descriptionPromotion = productOfferingPriceAlteration.description;
                                        this.applicationDuration = productOfferingPriceAlteration.applicationDuration;
                                        this.recurringChargePeriodPromotion = productOfferingPriceAlteration.recurringChargePeriod;
                                        if (productOfferingPriceAlteration.price && productOfferingPriceAlteration.price !== null) {
                                            this.taxRate = productOfferingPriceAlteration.price.taxRate;
                                            this.taxRateName = productOfferingPriceAlteration.price.ospTaxRateName;
                                            this.ratePriceTaxIncludedPromotional = productOfferingPriceAlteration.price.taxIncludedAmount;
                                            this.ratePricePromotional = productOfferingPriceAlteration.price.dutyFreeAmount;
                                        }
                                    }

                                    // Precios tarifas sin promo
                                    if (precioFijo) { // Prioritario el de packEntry
                                        this.typePriceName = precioFijo.priceType;
                                        this.taxRate = precioFijo.taxRate;
                                        this.taxRateName = precioFijo.ospTaxRateName;
                                        if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
                                            this.ratePriceTaxIncluded = precioFijo.taxIncludedAmount;
                                            this.ratePrice = precioFijo.dutyFreeAmount;
                                        } else {
                                            this.rateOfferingPriceTaxInluded = precioFijo.taxIncludedAmount;
                                            this.rateOfferingPrice = precioFijo.dutyFreeAmount;
                                        }
                                    } else if (commercialPrice) {
                                        this.typePriceName = commercialPrice.priceType;
                                        this.taxRate = commercialPrice.taxRate;
                                        this.taxRateName = commercialPrice.ospTaxRateName;
                                        if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
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
                                        if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
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
                                        if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
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
                                        if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
                                            this.ratePriceTaxIncluded = ratePrice.taxIncludedAmount;
                                            this.ratePrice = ratePrice.dutyFreeAmount;
                                        } else {
                                            this.rateOfferingPriceTaxInluded = ratePrice.taxIncludedAmount;
                                            this.rateOfferingPrice = ratePrice.dutyFreeAmount;
                                        }
                                    } else if (techSiebelPrice) {
                                        this.typePriceName = techSiebelPrice.priceType;
                                        this.taxRate = techSiebelPrice.taxRate;
                                        this.taxRateName = techSiebelPrice.ospTaxRateName;
                                        if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
                                            this.ratePriceTaxIncluded = techSiebelPrice.taxIncludedAmount;
                                            this.ratePrice = techSiebelPrice.dutyFreeAmount;
                                        } else {
                                            this.rateOfferingPriceTaxInluded = techSiebelPrice.taxIncludedAmount;
                                            this.rateOfferingPrice = techSiebelPrice.dutyFreeAmount;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (priceData[i].bundledProductOffering && _.find(priceData[i].bundledProductOffering, { 'id': rateData.id })) {
                            // Recoger info
                            let info: RatePopupInfo = new RatePopupInfo(priceData[i].name, priceData[i].description);
                            this.pupupInfo.push(info);
                        }
                    }
                }
            }

            let descripcionCompleta = rateData.description + ((rateData.ospLargeDescription != null) ? ' <br/> ' + rateData.ospLargeDescription : "");
            let info: RatePopupInfo = new RatePopupInfo('titulo', descripcionCompleta);
            this.pupupInfo.push(info);
            // && rateData.productSpecCharacteristic[i].ospLargeDescription != null 
            for (let i in rateData.productSpecCharacteristic) {
                if (rateData.productSpecCharacteristic[i].ospCategory === 'highlight') {
                    let info: RatePopupInfo = new RatePopupInfo(rateData.productSpecCharacteristic[i].name, rateData.productSpecCharacteristic[i].ospLargeDescription);
                    this.pupupInfo.push(info);
                }
            }
            for (let i in rateData.productSpecCharacteristic) {
                if (rateData.productSpecCharacteristic[i].ospCategory === 'implicit') {
                    let repetida = false;
                    for (let j in this.pupupInfo) {
                        if (rateData.productSpecCharacteristic[i].name === this.pupupInfo[j].name) {
                            repetida = true;
                        }
                    }
                    if (!repetida) {
                        let info: RatePopupInfo = new RatePopupInfo(rateData.productSpecCharacteristic[i].name, rateData.productSpecCharacteristic[i].ospLargeDescription);
                        this.pupupInfo.push(info);
                    }
                }
            }
        }
    }

    export class RatesProductBundle {
        public image: string;
        public title: string;
        public type: string;
        public description: string;
        public subcharacteristic: RatesSubcharacteristic[] = [];

        constructor(src: string, name: string, type: string, description: string, subchar) {
            this.image = src;
            this.title = name;
            this.type = type;
            this.description = description;
            this.subcharacteristic = [];

            if (subchar && subchar.length > 0) {
                let elem: RatesSubcharacteristic;

                for (let i = 0; i < subchar.length; i++) {
                    this.subcharacteristic.push(
                        new RatesSubcharacteristic(subchar[i].name, subchar[i].description, subchar[i].ospLargeDescription)
                    );
                }
            }
        }
    }

    export class RatesSubcharacteristic {
        public name: string;
        public description: string;
        public largeDescription: string;

        constructor(name: string, description: string, largeDescription: string) {
            this.name = name;
            this.description = description;
            this.largeDescription = largeDescription;
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
        public ospTv: string;
        // Promociones SVA
        public typePriceName: string;
        public taxRate: number;
        public taxRateName: string;
        public ratePriceTaxIncludedPromotional: number;
        public ratePricePromotional: number;
        public descriptionPromotion: string;
        public applicationDuration: number;

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
                    sva.ospTv = (currentSVA.ospTv ? _.snakeCase(currentSVA.ospTv) : '');

                    // Se estable el precio del SVA
                    if (offeringData) {
                        offeringData.productOffering.forEach(currentSVAOffering => {
                            if (currentSVAOffering.productSpecification &&
                                currentSVAOffering.productSpecification.id === currentSVA.id) {
                                if (currentSVAOffering.productOfferingPrice) {
                                    currentSVAOffering.productOfferingPrice.forEach(priceElement => {
                                        svaPriceItem = new RatePriceItem();
                                        
                                        if (priceElement) {
                                            let priceSVA: any = _.find(priceElement.price, { priceType: 'priceSva' });
                                            let siebelPriceSva: any = _.find(priceElement.price, { priceType: 'siebelPriceSva' });

                                            svaPriceItem.priceType = priceElement.priceTypeSVA ? priceElement.priceTypeSVA : 'Recurring';

                                            if (priceSVA && priceSVA !== null) {
                                                svaPriceItem.price.taxRate = priceSVA.taxRate;
                                                svaPriceItem.price.ospTaxRateName = priceSVA.ospTaxRateName;
                                                svaPriceItem.price.dutyFreeAmount.unit = priceSVA.currencyCode;
                                                svaPriceItem.price.dutyFreeAmount.value = priceSVA.dutyFreeAmount;
                                                svaPriceItem.price.taxIncludedAmount.value = priceSVA.taxIncludedAmount;
                                                svaPriceItem.price.taxIncludedAmount.unit = priceSVA.currencyCode;
                                            } else if (siebelPriceSva && siebelPriceSva !== null) {
                                                svaPriceItem.price.taxRate = siebelPriceSva.taxRate;
                                                svaPriceItem.price.ospTaxRateName = siebelPriceSva.ospTaxRateName;
                                                svaPriceItem.price.dutyFreeAmount.unit = siebelPriceSva.currencyCode;
                                                svaPriceItem.price.dutyFreeAmount.value = siebelPriceSva.dutyFreeAmount;
                                                svaPriceItem.price.taxIncludedAmount.value = siebelPriceSva.taxIncludedAmount;
                                                svaPriceItem.price.taxIncludedAmount.unit = siebelPriceSva.currencyCode;
                                            }

                                            if (customerSegment.toLocaleLowerCase() === 'residencial') {
                                                sva.price = svaPriceItem.price.taxIncludedAmount.value;
                                            } else {
                                                sva.price = svaPriceItem.price.dutyFreeAmount.value;
                                            }
                                            sva.itemPrice.push(svaPriceItem);
                                        }
                                        // Precio promocionado
                                        if (priceElement.productOfferingPriceAlteration) {
                                            sva.typePriceName = priceElement.productOfferingPriceAlteration.priceType;
                                            sva.descriptionPromotion = priceElement.productOfferingPriceAlteration.description;
                                            sva.applicationDuration = priceElement.productOfferingPriceAlteration.applicationDuration;
                                            if (priceElement.productOfferingPriceAlteration.price && priceElement.productOfferingPriceAlteration.price !== null) {
                                                sva.taxRate = priceElement.productOfferingPriceAlteration.price.taxRate;
                                                sva.taxRateName = priceElement.productOfferingPriceAlteration.
                                                    price.ospTaxRateName;
                                                sva.ratePriceTaxIncludedPromotional = priceElement.productOfferingPriceAlteration.
                                                    price.taxIncludedAmount;
                                                sva.ratePricePromotional = priceElement.productOfferingPriceAlteration.
                                                    price.dutyFreeAmount;
                                            }
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
        public priceTypeSVA: any;
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

    export class RateBucket {
        public name: string;
        public id: string;
        public shortDescription: string;
        public largeDescription: string;
        public quantity: string
        public img: string;
        
        constructor(name: string, id: string, shortDesc: string, largeDesc: string, quantity: string, img: string) {
            this.name = name;
            this.id = id;
            this.shortDescription = shortDesc;
            this.largeDescription = largeDesc;
            this.quantity = quantity;
            this.img = img;
        }
    }

    export class OptionalFeature {
        public ospId: string;
        public img: string;
        public name: string;
        public subFeatures: Array<any> = [];
        
        constructor(ospId: string, img: string, name: string, subFeatures?: Array<any>) {
            this.ospId = ospId;
            this.img = img;
            this.name = name;
            this.subFeatures = this.getSubFeatures(subFeatures);
        }

        getSubFeatures(subFeatures) {
            let res = [];
            _.forEach(subFeatures, (subFeature) => {
                let img: string = '';
                if (subFeature.attachment && subFeature.attachment.href){
                    img = subFeature.attachment.href
                }
                res.push(new SubFeature(subFeature.ospId, img, subFeature.name));
            });
            return res;
        }
    }

    export class SubFeature {
        public ospId: string;
        public img: string;
        public name: string;

        constructor(ospId: string, img: string, name: string) {
            this.ospId = ospId;
            this.img = img;
            this.name = name;
        }
    }
}
