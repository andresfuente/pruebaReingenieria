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
            if (sessionStorage.getItem('pangea-brand') === 'jazztel') {
                if (specificationData.productSpecification && offeringData.productOffering) {
                    specificationData.productSpecification.forEach(function (specification) {
                        let productOffering = [];
                        offeringData.productOffering.forEach(function (offering) {
                            offering.bundledProductOffering.forEach(element => {

                                if (element.name && element.name === 'bundleId') {
                                    if (!element.id) {
                                        element.id = offering.bundledProductOffering[0].id + '+' + offering.productSpecification.id + '+' + offering.productSpecification.ospProductNumber
                                    }

                                    if (!specification.bundledProductSpecification[0].id) {
                                        specification.bundledProductSpecification[0].id = specification.ospMorganeCode + '+' + specification.ospExternalCode + '+' + specification.productNumber;

                                    }

                                    if (specification.bundledProductSpecification[0].id === element.id) {
                                        productOffering.push(offering);
                                    }
                                }
                            });
                        });

                        let rate: Rate = new Rate(specification, productOffering, bucketInfo);

                        vm.rates.push(rate);
                    });
                }
            } else {
                if (specificationData.productSpecification && offeringData.productOffering) {
                    specificationData.productSpecification.forEach(function (specification) {
                        let productOffering = [];
                        offeringData.productOffering.forEach(function (offering) {
                            if (offering.isBundle) {
                                offering.bundledProductOffering.forEach(element => {

                                    if (specification.id && element.id && specification.id === element.id) {
                                        productOffering.push(offering);
                                    }

                                });
                            }
                        });

                        let rate: Rate = new Rate(specification, productOffering, bucketInfo);

                        vm.rates.push(rate);
                    });
                }

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
        // Pago Aplazado
        public pagoAplazado: any = 'Pago Aplazado'

        //Jazztel
        public characteristicJzz: RatesCharacteristicJzz[] = [];

        constructor(rateData, priceData, bucketInfo?) {


            // Checkea si el id y el idTecnologia son distintos (Es LOVE, es decir Convergente y principal)
            this.checkIdIdTechDiferences(rateData);

                if (!rateData.id) {
                    rateData.id = rateData.bundledProductSpecification[0].id;
                }

            this.loopProductSpecCharacteristicSettingProductBundleOrBucket(rateData, bucketInfo);
            // Se obtienen los Id's de los SVA de la tarifa
            this.getSVAIds(rateData);

            // Buscamos lineas asociadas en productSpecificationRelationship del rate 
            this.findAssociatedLine(rateData);

            // Buscamos líneas por defecto para packs
            this.findDefaultLines(rateData);

            this.loopPriceData(priceData, rateData);

            this.checkProductSpecCharacteristicOspCategory(rateData);
        }

        private checkProductSpecCharacteristicOspCategory(rateData: any) {
            let descripcionCompleta = rateData.description + ((rateData.ospLargeDescription != null) ? ' <br/> ' + rateData.ospLargeDescription : "");
            let info2: RatePopupInfo = new RatePopupInfo('titulo', descripcionCompleta);
            this.pupupInfo.push(info2);
            // && rateData.productSpecCharacteristic[i].ospLargeDescription != null 
            for (let i in rateData.productSpecCharacteristic) {
                if (rateData.productSpecCharacteristic[i].ospCategory === 'highlight') {
                    let info3: RatePopupInfo = new RatePopupInfo(rateData.productSpecCharacteristic[i].name, rateData.productSpecCharacteristic[i].ospLargeDescription);
                    this.pupupInfo.push(info3);
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
                            let info4: RatePopupInfo = new RatePopupInfo(rateData.productSpecCharacteristic[i].name, rateData.productSpecCharacteristic[i].ospLargeDescription);
                            this.pupupInfo.push(info4);
                        }
                    }
                }
            }
        }

        private loopPriceData(priceData: any, rateData: any) {
            for (let i in priceData) {
                if (priceData.length > 0) {
                    if (priceData[i].isBundle) {
                        // Buscamos si afecta el revamp de tarifas Love 
                        this.checkRevampLove(priceData, i, rateData);
                    }
                    else {
                        if (priceData[i].bundledProductOffering && _.find(priceData[i].bundledProductOffering, { 'id': rateData.id })) {
                            // Recoger info
                            let info1: RatePopupInfo = new RatePopupInfo(priceData[i].name, priceData[i].description);
                            this.pupupInfo.push(info1);
                        }
                    }
                }
            }
        }

        private checkRevampLove(priceData: any, i: string, rateData: any) {
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
                    let infoNewConditions: RatePopupInfoDate = new RatePopupInfoDate(priceData[i].validFor.endDateTime, priceData[i].attachment[0].url);
                    this.pupupInfoNewConditions.push(infoNewConditions);
                    this.newRateConditions = true;
                }
                else {
                    this.newRateConditions = false;
                }
                // Recoger precios
                this.getPrices(priceData, i);
            }
        }

        private getPrices(priceData: any, i: string) {
            for (let j in priceData[i].productOfferingPrice) {
                if (priceData[i].productOfferingPrice.length > 0) {
                    let promotionalPrice = _.find(priceData[i].productOfferingPrice[j].price, function (price: any) {
                        return price.priceType === 'promotionalCommercialPriceRate';
                    });
                    let commercialPrice = _.find(priceData[i].productOfferingPrice[j].price, function (price: any) {
                        return price.priceType === 'commercialPriceRate';
                    });
                    let techSiebelProductBundlePrice = _.find(priceData[i].productOfferingPrice[j].price, function (price: any) {
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
                    let arrayPromo;
                    ({ arrayPromo, precioFijo } = this.setPrecioFijoForNAC(productOfferingPriceAlteration, arrayPromo, precioFijo));
                    // Precios tarifa con promociones
                    this.getPromotionalPrice(promotionalPrice, priceData, i, j, productOfferingPriceAlteration, precioFijo);
                    // Precios tarifas sin promo
                    if (precioFijo) { // Prioritario el de packEntry
                        this.setPricePrecioFijo(precioFijo, priceData, i, j);
                    }
                    else if (commercialPrice) {
                        this.setPriceCommercialPrice(commercialPrice, priceData, i, j);
                    }
                    else if (techSiebelProductBundlePrice) {
                        this.setPriceTechSiebelProductBundlePrice(techSiebelProductBundlePrice, priceData, i, j);
                    }
                    else if (siebelPrice) {
                        this.setPriceSiebelPrice(siebelPrice, priceData, i, j);
                    }
                    else if (ratePrice) {
                        this.setPriceRatePrice(ratePrice, priceData, i, j);
                    }
                    else if (techSiebelPrice) {
                        this.setPriceTechSiebelPrice(techSiebelPrice, priceData, i, j);
                    }
                }
            }
        }

        private setPriceTechSiebelPrice(techSiebelPrice: any, priceData: any, i: string, j: string) {
            this.typePriceName = techSiebelPrice.priceType;
            this.taxRate = techSiebelPrice.taxRate;
            this.taxRateName = techSiebelPrice.ospTaxRateName;
            if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
                this.ratePriceTaxIncluded = techSiebelPrice.taxIncludedAmount;
                this.ratePrice = techSiebelPrice.dutyFreeAmount;
            }
            else {
                this.rateOfferingPriceTaxInluded = techSiebelPrice.taxIncludedAmount;
                this.rateOfferingPrice = techSiebelPrice.dutyFreeAmount;
            }
        }

        private setPriceRatePrice(ratePrice: any, priceData: any, i: string, j: string) {
            this.typePriceName = ratePrice.priceType;
            this.taxRate = ratePrice.taxRate;
            this.taxRateName = ratePrice.ospTaxRateName;
            if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
                this.ratePriceTaxIncluded = ratePrice.taxIncludedAmount;
                this.ratePrice = ratePrice.dutyFreeAmount;
            }
            else {
                this.rateOfferingPriceTaxInluded = ratePrice.taxIncludedAmount;
                this.rateOfferingPrice = ratePrice.dutyFreeAmount;
            }
        }

        private setPriceSiebelPrice(siebelPrice: any, priceData: any, i: string, j: string) {
            this.typePriceName = siebelPrice.priceType;
            this.taxRate = siebelPrice.taxRate;
            this.taxRateName = siebelPrice.ospTaxRateName;
            if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
                this.ratePriceTaxIncluded = siebelPrice.taxIncludedAmount;
                this.ratePrice = siebelPrice.dutyFreeAmount;
            }
            else {
                this.rateOfferingPriceTaxInluded = siebelPrice.taxIncludedAmount;
                this.rateOfferingPrice = siebelPrice.dutyFreeAmount;
            }
        }

        private setPriceTechSiebelProductBundlePrice(techSiebelProductBundlePrice: any, priceData: any, i: string, j: string) {
            this.typePriceName = techSiebelProductBundlePrice.priceType;
            this.taxRate = techSiebelProductBundlePrice.taxRate;
            this.taxRateName = techSiebelProductBundlePrice.ospTaxRateName;
            if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
                this.ratePriceTaxIncluded = techSiebelProductBundlePrice.taxIncludedAmount;
                this.ratePrice = techSiebelProductBundlePrice.dutyFreeAmount;
            }
            else {
                this.rateOfferingPriceTaxInluded = techSiebelProductBundlePrice.taxIncludedAmount;
                this.rateOfferingPrice = techSiebelProductBundlePrice.dutyFreeAmount;
            }
        }

        private setPriceCommercialPrice(commercialPrice: any, priceData: any, i: string, j: string) {
            this.typePriceName = commercialPrice.priceType;
            this.taxRate = commercialPrice.taxRate;
            this.taxRateName = commercialPrice.ospTaxRateName;
            if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
                this.ratePriceTaxIncluded = commercialPrice.taxIncludedAmount;
                this.ratePrice = commercialPrice.dutyFreeAmount;
            }
            else {
                this.rateOfferingPriceTaxInluded = commercialPrice.taxIncludedAmount;
                this.rateOfferingPrice = commercialPrice.dutyFreeAmount;
            }
        }

        private setPricePrecioFijo(precioFijo: any, priceData: any, i: string, j: string) {
            this.typePriceName = precioFijo.priceType;
            this.taxRate = precioFijo.taxRate;
            this.taxRateName = precioFijo.ospTaxRateName;
            if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
                this.ratePriceTaxIncluded = precioFijo.taxIncludedAmount;
                this.ratePrice = precioFijo.dutyFreeAmount;
            }
            else {
                this.rateOfferingPriceTaxInluded = precioFijo.taxIncludedAmount;
                this.rateOfferingPrice = precioFijo.dutyFreeAmount;
            }
        }

        private getPromotionalPrice(promotionalPrice: any, priceData: any, i: string, j: string, productOfferingPriceAlteration: any, precioFijo: any) {
            if (promotionalPrice) {
                this.setPromotionalPriceRatePricePromotional(promotionalPrice, priceData, i, j);
            }
            else if (productOfferingPriceAlteration && !precioFijo) {
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
        }

        private setPromotionalPriceRatePricePromotional(promotionalPrice: any, priceData: any, i: string, j: string) {
            this.typePriceName = promotionalPrice.priceType;
            this.taxRate = promotionalPrice.taxRate;
            this.taxRateName = promotionalPrice.ospTaxRateName;
            if (priceData[i].productOfferingPrice[j].priceType === this.pagoAplazado) {
                this.ratePriceTaxIncludedPromotional = promotionalPrice.taxIncludedAmount;
                this.ratePricePromotional = promotionalPrice.dutyFreeAmount;
            }
            else {
                this.ratePriceTaxIncludedPromotional = promotionalPrice.taxIncludedAmount;
                this.ratePricePromotional = promotionalPrice.dutyFreeAmount;
            }
        }

        private setPrecioFijoForNAC(productOfferingPriceAlteration: any, arrayPromo: any, precioFijo: any) {
            if (productOfferingPriceAlteration && productOfferingPriceAlteration.price) {
                if (productOfferingPriceAlteration.recurringChargePeriod) {
                    arrayPromo = productOfferingPriceAlteration.recurringChargePeriod.split('|');
                    if (arrayPromo && _.find(arrayPromo, (promo) => { return promo === 'Precio fijo'; })) {
                        precioFijo = productOfferingPriceAlteration.price;
                    }
                }
            }
            return { arrayPromo, precioFijo };
        }

        private findDefaultLines(rateData: any) {
            let defaultLines = [];
            defaultLines = _.filter(rateData.productSpecificationRelationship, { type: 'defaultLine' });
            if (defaultLines && defaultLines.length > 0) {
                this.defaultLines = defaultLines;
            }
        }

        private findAssociatedLine(rateData: any) {
            let associatedLine = [];
            associatedLine = _.filter(rateData.productSpecificationRelationship, { type: 'associatedLine' });
            if (associatedLine !== undefined && associatedLine.length !== 0) {
                this.associatedLine = associatedLine;
            }
        }

        private getSVAIds(rateData: any) {
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
        }

        private loopProductSpecCharacteristicSettingProductBundleOrBucket(rateData: any, bucketInfo: any) {
            if (rateData.productSpecCharacteristic) {
                rateData.productSpecCharacteristic.forEach(element => {
                    if (element.ospCategory === 'highlight' || element.name === 'CARACTERISTICATECNOLOGIA') {
                        let raProductBundle = new RatesProductBundle(element.attachment ? element.attachment.href : '', element.name, element.ospCategory, element.description, element.productSpecSubcharacteristic);
                        this.productBundle.push(raProductBundle);
                    }
                    if (element.ospCategory === 'BUCKET' && element.ospId) {
                        this.bucket = new RateBucket(element.name, element.ospId, element.ospOrden, element.ospLargeDescription, element.description, element.ospImagen);
                    }
                    else if (bucketInfo && rateData.ospGroupName === 'Convergente_NAC') {
                        this.bucket = new RateBucket('', bucketInfo, '', '', '', '');
                    }
                });
            }
        }

        private checkIdIdTechDiferences(rateData: any) {
            if (rateData.ospTecnology !== rateData.id && rateData.ospTypeService === 'movil_fijo') {
                this.ospTecnology = rateData.ospTecnology;
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

    export class RatesCharacteristicJzz {
        public description: string;

        constructor(description: string) {
            this.description = description;
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
                ({ sva, svaPriceItem } = RateSVA.loopSpecificationData(specificationData, sva, offeringData, svaPriceItem, customerSegment, svaList));
            }
            return svaList;
        }

        private static loopSpecificationData(specificationData: any, sva: RateSVA, offeringData: any, svaPriceItem: RatePriceItem, customerSegment: any, svaList: RateSVA[]) {
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
                svaPriceItem = RateSVA.setSvaPriceItem(offeringData, currentSVA, svaPriceItem, customerSegment, sva, svaList);
            });
            return { sva, svaPriceItem };
        }

        private static setSvaPriceItem(offeringData: any, currentSVA: any, svaPriceItem: RatePriceItem, customerSegment: any, sva: RateSVA, svaList: RateSVA[]) {
            if (offeringData) {
                offeringData.productOffering.forEach(currentSVAOffering => {
                    if (currentSVAOffering.productSpecification &&
                        currentSVAOffering.productSpecification.id === currentSVA.id) {
                        if (currentSVAOffering.productOfferingPrice) {
                            svaPriceItem = RateSVA.createSvaPriceItems(currentSVAOffering, svaPriceItem, customerSegment, sva);
                        }
                    }
                });
                svaList.push(sva);
            }
            return svaPriceItem;
        }

        private static createSvaPriceItems(currentSVAOffering: any, svaPriceItem: RatePriceItem, customerSegment: any, sva: RateSVA) {
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
                    }
                    else if (siebelPriceSva && siebelPriceSva !== null) {
                        svaPriceItem.price.taxRate = siebelPriceSva.taxRate;
                        svaPriceItem.price.ospTaxRateName = siebelPriceSva.ospTaxRateName;
                        svaPriceItem.price.dutyFreeAmount.unit = siebelPriceSva.currencyCode;
                        svaPriceItem.price.dutyFreeAmount.value = siebelPriceSva.dutyFreeAmount;
                        svaPriceItem.price.taxIncludedAmount.value = siebelPriceSva.taxIncludedAmount;
                        svaPriceItem.price.taxIncludedAmount.unit = siebelPriceSva.currencyCode;
                    }
                    if (customerSegment.toLocaleLowerCase() === 'residencial') {
                        sva.price = svaPriceItem.price.taxIncludedAmount.value;
                    }
                    else {
                        sva.price = svaPriceItem.price.dutyFreeAmount.value;
                    }
                    sva.itemPrice.push(svaPriceItem);
                }
                // Precio promocionado
                RateSVA.casePromotionalPrice(priceElement, sva);
            });
            return svaPriceItem;
        }

        private static casePromotionalPrice(priceElement: any, sva: RateSVA) {
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
}
