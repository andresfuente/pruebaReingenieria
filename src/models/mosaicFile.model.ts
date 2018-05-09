/**
 * Modelo de datos para la respuesta del microservicio correspondiente a terminales
 */
module mosaicFile.Models {
    'use strict';
    /* tslint:disable no-any */

    import DateTimeFormat = Intl.DateTimeFormat;
    /*
     Modelo de datos para rellenar la plantilla
     */
    export class OrangeMosaicFileTerminal {
        public variants: OrangeMosaicFileTerminalVariant[];
        public OWCS: OrangeMosaicFileOWCS;
        // Datos específicos para ficha del terminal
        public status: string;
        private deferred: ng.IDeferred<{}>;
        public promise: ng.IPromise<{}>;

        constructor(serviceData?: any, deferred?: ng.IDeferred<{}>) {

            this.status = 'loading';
            this.deferred = deferred;
            this.promise = deferred ? deferred.promise : null;
        }

        loadCatalogViewData(serviceData: any, ospCustomerSegment: string, priceName: string, mosaicFileCompOWCSStore?: any) {
            if (serviceData && serviceData.length) {
                let deviceSpecification = serviceData.deviceSpecification;
                this.variants = this.generateTerminalVariants(serviceData, ospCustomerSegment, priceName, mosaicFileCompOWCSStore);
            } else {
                this.setError('Error in catalogViewData response');
            }
        }

        loadStockData(serviceData) {
            // tslint:disable-next-line
            let variantsMap = _['keyBy'](this.variants, 'id');

            _.forEach(serviceData, (stock) => {
                if (_.has(variantsMap, stock.sap)) {
                    variantsMap[stock.sap].stock = stock.disponible;
                }
            });

            this.completeLoad();
        }

        setError(errorMsg) {
            this.status = 'error';
            if (this.deferred) {
                this.deferred.reject(errorMsg);
            }
        }

        completeLoad() {
            this.status = 'loaded';
            if (this.deferred) {
                this.deferred.resolve(this);
            }
        }

        private generateTerminalVariants(serviceData: any, ospCustomerSegment: string, priceName: string, mosaicFileCompOWCSStore?: any) {
            let variants = [];

            serviceData.forEach((terminalVariant) => {
                let variant = new OrangeMosaicFileTerminalVariant(terminalVariant, ospCustomerSegment, priceName, mosaicFileCompOWCSStore);
                variants.push(variant);
            });
            return variants;
        }
    }
    export class OrangeMosaicFileOWCS {
        public litPriceButton = '';
        public litMoreInfoButton = '';
        public litMonthObjetive = '';
        public litSince = '';
        public litMonthPrice = '';
        public litNPaym = '';
        public litInitialPayPlus = '';
        public litEqualEur = '';
        public litEur = '';
        public litSaving = '';
        public litUniquePay = '';
        public litMovilInsurance = '';

        constructor(OWCS) {

            OWCS.forEach((lit, i) => {
                switch (lit.name) {
                    case 'lit.boton.precios': {
                        this.litPriceButton = lit.value;
                        break;
                    }
                    case 'lit.mas-info': {
                        this.litMoreInfoButton = lit.value;
                        break;
                    }
                    case 'lit.objetivo.mes': {
                        this.litMonthObjetive = lit.value;
                        break;
                    }
                    case 'lit.desde': {
                        this.litSince = lit.value;
                        break;
                    }
                    case 'lit.euro.mes': {
                        this.litMonthPrice = lit.value;
                        break;
                    }
                    case 'lit.plazos': {
                        this.litNPaym = lit.value;
                        break;
                    }
                    case 'lit.plus.pago.inicial': {
                        this.litInitialPayPlus = lit.value;
                        break;
                    }
                    case 'lit.euro.igual': {
                        this.litEqualEur = lit.value;
                        break;
                    }
                    case 'lit.euro': {
                        this.litEur = lit.value;
                        break;
                    }
                    case 'lit.ahorro': {
                        this.litSaving = lit.value;
                        break;
                    }
                    case 'lit.euro.pago.unico': {
                        this.litUniquePay = lit.value;
                        break;
                    }
                    case 'lit.seguro.movil': {
                        this.litMovilInsurance = lit.value;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            });
        }
    }
    export class OrangeMosaicFileTerminalIcon {
        public src: string;
        public description: string;
        constructor(src: string, description: string) {
            this.src = src;
            this.description = description;
        }
    }
    export class OrangeMosaicFileTerminalVariant {
        public codColor: string;
        public altColor: string;
        public dataColor: string;
        public srcImage: string;
        public litSubTitle: string;
        public litPrice: number;
        public siebelId: string;
        public initialPaid: number;
        public uniquePaid: number;
        public totalPaid: number;
        public saving = 0;
        public litInsurancePaid: number;
        public promoZoneSrc: string;
        public promoZoneActive: string;
        public litDeadlines: number;
        public stock: number;
        public realStockPeninsula: any;
        public realStockCanary: any;
        public virtualStockPeninsula: any;
        public virtualStockCanary: any;
        public insuranceSiebelId: string = '';

        public id: number;
        public litTitle: string;
        public mSellsTop: string;
        public mSellsTopTitle: string;
        public litOutstanding: string;

        // CP
        public cpSiebel: string;
        public cpDescription: string;
        public cpDuration : string;

        public icon: OrangeMosaicFileTerminalIcon[] = [];

        public itemPrice: Array<OrangeMosaicFileTerminalFileIPriceItem> = [];
        public fileCharacteristic: OrangeMosaicFileTerminalCharacteristicsLvl1[] = [];
        public fileCompatible: OrangeMosaicFileTerminalCompatible[] = [];
        public fileDescription = new OrangeMosaicFileTerminalFileDescription();
        public video: string;
        public fileReview: OrangeMosaicFileTerminalFileReview;
        public fileUserView: OrangeMosaicFileTerminalFileUserView;
        public name: string;
        public imageGalery: string[] = [];
        public zoomImage: string;
        public topSell: OrangeMosaicFileTerminalFileTerminalIcon;
        public formTitle: string;
        public formText: string;
        public anchor: string[] = [];
        private renewRates = [];
        private prepaidRenewPrices = [];

        constructor(serviceData: any, ospCustomerSegment: string, priceName: string, mosaicFileCompOWCSStore?: any) {

            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = _.findIndex(commercialData, function (currentCommercialAct: any) {
                return currentCommercialAct.ospIsSelected === true;
            });
            // Banderas para controlar las opciones de la cámara
            let backCamera = false;
            let frontCamera = false;
            this.mSellsTop = serviceData[''];
            this.litOutstanding = serviceData['']; // Hasta 10gb de regalo
            this.stock = 0;
            this.realStockPeninsula = 0;
            this.realStockCanary = 0;
            this.virtualStockPeninsula = 0;
            this.virtualStockCanary = 0;

            // Item Price
            let priceItem: OrangeMosaicFileTerminalFileIPriceItem;
            let filePrice: OrangeMosaicFileTerminalFilePrice;

            if (serviceData) {
                // DEVICE STOCK (TLV)
                if(serviceData.deviceStock && serviceData.deviceStock.length > 0) {
                    this.realStockPeninsula = (serviceData.deviceStock[0].quantityInStock
                                            && serviceData.deviceStock[0].stockType === 'real'
                                            && serviceData.deviceStock[0].geographicSite.name === 'peninsula')
                                            ? (serviceData.deviceStock[0].quantityInStock > 500
                                            ? '+500' : serviceData.deviceStock[0].quantityInStock) : 0;
                    this.virtualStockPeninsula = (serviceData.deviceStock[1].quantityInStock
                                            && serviceData.deviceStock[1].stockType === 'virtual'
                                            && serviceData.deviceStock[1].geographicSite.name === 'peninsula')
                                            ? (serviceData.deviceStock[1].quantityInStock > 500
                                            ? '+500' : serviceData.deviceStock[1].quantityInStock) : 0;
                    this.realStockCanary = (serviceData.deviceStock[2].quantityInStock
                                            && serviceData.deviceStock[2].stockType === 'real'
                                            && serviceData.deviceStock[2].geographicSite.name === 'canarias')
                                            ? (serviceData.deviceStock[2].quantityInStock > 500
                                            ? '+500' : serviceData.deviceStock[2].quantityInStock) : 0;
                    this.virtualStockCanary = (serviceData.deviceStock[3].quantityInStock
                                            && serviceData.deviceStock[3].stockType === 'virtual'
                                            && serviceData.deviceStock[3].geographicSite.name === 'canarias')
                                            ? (serviceData.deviceStock[3].quantityInStock > 500
                                            ? '+500' : serviceData.deviceStock[3].quantityInStock) : 0;
                }
                // DEVICE SPECIFICATION
                if (serviceData.deviceSpecification) {
                    this.name = serviceData.deviceSpecification.name ? serviceData.deviceSpecification.name : '';
                    this.id = serviceData.deviceSpecification.id ? serviceData.deviceSpecification.id : '';
                    this.litTitle = serviceData.deviceSpecification.brand ? serviceData.deviceSpecification.brand : '';
                    this.fileDescription.text = serviceData.deviceSpecification.ospLargeDescription ?
                        serviceData.deviceSpecification.ospLargeDescription : ''; // Cambiar en un futuro por ospFullDescription
                    this.litSubTitle = serviceData.deviceSpecification.description ? serviceData.deviceSpecification.description : '';
                    this.srcImage = serviceData.deviceSpecification.attachment.length ?
                        serviceData.deviceSpecification.attachment[0].href : '';

                    if (serviceData.deviceSpecification.attachment && serviceData.deviceSpecification.attachment.length) {
                        this.video = '';
                        serviceData.deviceSpecification.attachment.forEach((image, i) => {
                            if (image.href && image.type && image.type === 'Imagen') {
                                this.imageGalery.push(image.href);
                            } else if (image.href && image.type && image.type === 'Video') {
                                if(this.video.indexOf('mp4') === -1) {
                                    this.video = image.href;
                                }
                            }
                        });
                    }
                    if (serviceData.deviceSpecification.characteristic && serviceData.deviceSpecification.characteristic.length) {
                        let iconArray = [];
                        serviceData.deviceSpecification.characteristic.forEach((characteristic, x) => {
                            switch (characteristic.ospCharCategory) {
                                case 'Color': {
                                    if (characteristic.characteristicValue.length > 0) {
                                        characteristic.characteristicValue.forEach((characteristicValue, z) => {
                                            if (characteristicValue.valueType && characteristicValue.valueType === 'Hexadecimal' &&
                                                characteristicValue.value) {
                                                this.codColor = characteristicValue.value;
                                            } else {
                                                this.altColor = characteristicValue.value;
                                            }
                                        });
                                    }
                                    break;
                                }
                                case 'compatibleServices': {
                                    if (characteristic.characteristicValue && characteristic.characteristicValue.length) {
                                        characteristic.characteristicValue.forEach((characteristicValue, z) => {
                                            if (characteristicValue.value) {
                                                let compatibleServices: OrangeMosaicFileTerminalCompatible =
                                                    new OrangeMosaicFileTerminalCompatible(characteristicValue.value);
                                                this.fileCompatible.push(compatibleServices);
                                            }
                                        });
                                    }
                                    break;
                                }
                                case 'highlightIcon': {
                                    // Si tiene attachment y dentro de este, href y ospAltText, se crea el terminalIcon
                                    if (characteristic.characteristicAttachment && characteristic.characteristicAttachment.length > 0) {
                                        if (characteristic.characteristicAttachment && characteristic.characteristicAttachment.length > 0) {
                                            if (characteristic.characteristicAttachment &&
                                                characteristic.characteristicAttachment.length > 0) {
                                                characteristic.characteristicAttachment.forEach(function (characteristicAttachment, z) {
                                                    if (characteristicAttachment.href && characteristicAttachment.ospAltText) {
                                                        let terminalIcon = new OrangeMosaicFileTerminalIcon(characteristicAttachment.href,
                                                            characteristicAttachment.ospAltText);
                                                        iconArray.push(terminalIcon);
                                                    }
                                                });
                                                this.icon = iconArray;
                                            }
                                        }
                                    }
                                    break;
                                }
                                case 'isMonthObjective': {
                                    this.litOutstanding = characteristic.description;
                                    break;
                                }
                                default: {
                                    // Se busca caracteristica de nivel 1
                                    let group = _.find(this.fileCharacteristic, { title: characteristic.description });
                                    // Si no existe
                                    if (!group) {
                                        // Se crea el nivel 1
                                        let characteristicNew: OrangeMosaicFileTerminalCharacteristicsLvl1 =
                                            new OrangeMosaicFileTerminalCharacteristicsLvl1;
                                        if (characteristic.characteristicAttachment && characteristic.characteristicAttachment.length > 0 &&
                                            characteristic.characteristicAttachment[0].href) {
                                            characteristicNew.image = characteristic.characteristicAttachment[0].href;
                                        }
                                        if (characteristic.description) {
                                            characteristicNew.title = characteristic.description;
                                        }
                                        // Si tiene hijo, se crea y se añade al objeto de nivel 1
                                        if (characteristic.characteristicValue.length > 0) {
                                            let objects;
                                            characteristic.characteristicValue.forEach((characteristicValue, z) => {
                                                if (characteristic.name && characteristicValue.value) {
                                                    if (characteristicValue.value === 'true') {
                                                        characteristicValue.value = 'Si';
                                                    } else if (characteristicValue.value === 'false') { characteristicValue.value = 'No'; }
                                                    let characteristicValueNew: OrangeMosaicFileTerminalCharacteristicsLvl2 =
                                                        new OrangeMosaicFileTerminalCharacteristicsLvl2(characteristic.name,
                                                            characteristicValue.value);
                                                    let groupOWCS = _.find(mosaicFileCompOWCSStore.listOption,
                                                        { name: characteristic.ospCharCategory });
                                                    let child;
                                                    if (groupOWCS && groupOWCS['listOptionsLiteral']) {
                                                        child = _.find(groupOWCS['listOptionsLiteral'], { name: characteristic.name });
                                                    }
                                                    if (groupOWCS && child) {
                                                        characteristicValueNew.name = child.value;
                                                        characteristicNew.subCharacteristicsList.push(characteristicValueNew);
                                                    }
                                                }
                                            });
                                        }
                                        let groupOWCS = _.find(mosaicFileCompOWCSStore.listOption,
                                            { name: characteristic.ospCharCategory });
                                        let child;
                                        if (groupOWCS && groupOWCS['listOptionsLiteral']) {
                                            child = _.find(groupOWCS['listOptionsLiteral'], { name: characteristic.name });
                                        }
                                        if (groupOWCS && child) {
                                            this.fileCharacteristic.push(characteristicNew);
                                        }
                                    } else { // Si existe
                                        // Si hay hijo, se añade al objeto
                                        if (characteristic.characteristicValue.length > 0) {
                                            characteristic.characteristicValue.forEach((characteristicValue, z) => {
                                                if (characteristic.name && characteristicValue.value) {
                                                    let objects;

                                                    if (characteristicValue.value === 'true') {
                                                        characteristicValue.value = 'Si';
                                                    } else if (characteristicValue.value === 'false') {
                                                        characteristicValue.value = 'No';
                                                    }
                                                    let characteristicValueNew: OrangeMosaicFileTerminalCharacteristicsLvl2 =
                                                        new OrangeMosaicFileTerminalCharacteristicsLvl2(characteristic.name,
                                                            characteristicValue.value);
                                                    let groupOWCS = _.find(mosaicFileCompOWCSStore.listOption,
                                                        { name: characteristic.ospCharCategory });
                                                    let child;
                                                    if (groupOWCS && groupOWCS['listOptionsLiteral']) {
                                                        child = _.find(groupOWCS['listOptionsLiteral'], { name: characteristic.name });
                                                    }
                                                    if (groupOWCS && child) {
                                                        characteristicValueNew.name = child.value;
                                                        if (characteristicValueNew.name === 'Cámara trasera'
                                                            && characteristicValueNew.value === 'Si') {
                                                            backCamera = true;
                                                        }
                                                        if (characteristicValueNew.name === 'Cámara frontal'
                                                            && characteristicValueNew.value === 'Si') {
                                                            frontCamera = true;
                                                        }

                                                        group.subCharacteristicsList.push(characteristicValueNew);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                    break;
                                }
                            }

                        });
                    }
                    // CARACTERISTICAS OWCS
                    let fileCharacteristicTemp: OrangeMosaicFileTerminalCharacteristicsLvl1[] = [];
                    if (mosaicFileCompOWCSStore && mosaicFileCompOWCSStore.listOption && mosaicFileCompOWCSStore.listOption.length > 0) {
                        mosaicFileCompOWCSStore.listOption.forEach((optionOWCS, z) => {
                            this.fileCharacteristic.forEach((characteristic, y) => {
                                if (optionOWCS.title === characteristic.title) {
                                    let fileCharacteristicLVL2Temp: OrangeMosaicFileTerminalCharacteristicsLvl2[] = [];
                                    optionOWCS.listOptionsLiteral.forEach((optionOWCSChield, j) => {
                                        characteristic.subCharacteristicsList.forEach((characteristicChield, k) => {
                                            if (optionOWCSChield.value === characteristicChield.name) {
                                                if ((characteristicChield.name === 'Resolución de la cámara trasera' && backCamera)
                                                    || (characteristicChield.name === 'Resolución de la cámara frontal' &&
                                                        frontCamera) || (characteristicChield.name !== 'Resolución de la cámara trasera'
                                                            && characteristicChield.name !== 'Resolución de la cámara frontal')) {
                                                    fileCharacteristicLVL2Temp.push(characteristicChield);
                                                }
                                            }

                                        });
                                    });
                                    characteristic.subCharacteristicsList = fileCharacteristicLVL2Temp;
                                    fileCharacteristicTemp.push(characteristic);
                                }
                            });
                        });
                    }
                    this.fileCharacteristic = fileCharacteristicTemp;
                }

                // DEVICE OFFERING
                if (serviceData.deviceOffering && serviceData.deviceOffering.length) {
                    let deviceOffering = serviceData.deviceOffering;
                    // ID del modelo del terminal
                    this.siebelId = deviceOffering[0].id;

                    // Si existe el offeringPrice y no esta vacio
                    if (deviceOffering && deviceOffering.length > 0) {
                        // Se recorre todo el array de precios
                        serviceData.deviceOffering.forEach((deviceOff, x) => {
                            if (deviceOff.deviceOfferingPrice && deviceOff.deviceOfferingPrice.length > 0) {
                                deviceOff.deviceOfferingPrice.forEach((price, i) => {

                                    /* Precios del terminal */
                                    priceItem = new OrangeMosaicFileTerminalFileIPriceItem();
                                    filePrice = new OrangeMosaicFileTerminalFilePrice();

                                    // Id
                                    price.relatedProductOffering.forEach(item => {
                                        if ((price.priceType === 'inicial' && item.name === 'Cuota inicial') ||
                                            (price.priceType === 'cuota' && item.name === 'Cuota mensual')) {
                                            priceItem.id = item.id;
                                        }
                                    });
                                    if (price.Price) {
                                        // Agregando precio sin impuesto
                                        filePrice.dutyFreeAmount.unit = price.Price.currencyCode;
                                        filePrice.dutyFreeAmount.value = price.Price.dutyFreeAmount;
                                        // Agregando precio con impuesto
                                        filePrice.taxIncludedAmount.unit = price.Price.currencyCode;
                                        filePrice.taxIncludedAmount.value = price.Price.taxIncudedAmount; // Corregir
                                        // Recogiendo impuestos
                                        filePrice.taxRate = price.Price.taxRate;
                                        filePrice.ospTaxRateName = price.Price.ospTaxRateName;
                                        // Creando el objeto item price
                                        priceItem.priceType = price.priceType;
                                        priceItem.price = filePrice;
                                    }
                                    // Duracion de las cuotas
                                    if (price.priceType === 'cuota') {
                                        priceItem.recurringChargePeriod = Number(price.applicationDuration);
                                    }
                                    // Añadiendo el precio al arreglo de precios del terminal
                                    this.itemPrice.push(priceItem);

                                    if (price.name === priceName) {
                                        if (price.priceType && price.priceType === 'inicial') {
                                            if (ospCustomerSegment.toLocaleLowerCase() === 'residencial') {
                                                this.initialPaid = price.Price.taxIncudedAmount;
                                            } else {
                                                this.initialPaid = price.Price.dutyFreeAmount;
                                            }
                                        }
                                        if (price.priceType && price.priceType === 'cuota') {
                                            this.litDeadlines = price.applicationDuration;
                                            if (ospCustomerSegment.toLocaleLowerCase() === 'residencial') {
                                                this.litPrice = price.Price.taxIncudedAmount;
                                            } else {
                                                this.litPrice = price.Price.dutyFreeAmount;
                                            }
                                            // Si se puede se calcula el precio total
                                            if (this.initialPaid !== undefined) {
                                                this.totalPaid = this.initialPaid + this.litPrice * this.litDeadlines;
                                            }
                                        }
                                        if (price.priceType && price.priceType === 'unico') {
                                            if (ospCustomerSegment.toLocaleLowerCase() === 'residencial') {
                                                this.uniquePaid = price.Price.taxIncudedAmount;
                                            } else {
                                                this.uniquePaid = price.Price.dutyFreeAmount;
                                            }
                                        }
                                    }
                                });
                            }

                            // Añadir CP Primario y Secundario
                            for (let i = 0; i < deviceOffering.length; i++) {
                                if (deviceOffering[i].deviceOfferingPrice && deviceOffering[i].deviceOfferingPrice.length !== 0) {
                                    for (let j = 0; j < deviceOffering[i].deviceOfferingPrice.length; j++) {
                                        if (deviceOffering[i].deviceOfferingPrice[j].relatedProductOffering && deviceOffering[i].deviceOfferingPrice[j].relatedProductOffering.length !== 0) {
                                            for (let k = 0; k < deviceOffering[i].deviceOfferingPrice[j].relatedProductOffering.length; k++) {
                                                if (deviceOffering[i].deviceOfferingPrice[j].relatedProductOffering[k]) {
                                                    let cpCategory = null;
                                                    if (deviceOffering[i].deviceOfferingPrice[j].name === 'primario'){
                                                        cpCategory = _.find(deviceOffering[i].deviceOfferingPrice[j].relatedProductOffering[k].category, { 'name': 'CPT-CPC' });
                                                    } else if (deviceOffering[i].deviceOfferingPrice[j].name === 'secundario'){
                                                        cpCategory = _.find(deviceOffering[i].deviceOfferingPrice[j].relatedProductOffering[k].category, { 'name': 'CPD' });
                                                    }
                                                    if (cpCategory !== undefined) {
                                                        this.cpSiebel = deviceOffering[i].deviceOfferingPrice[j].relatedProductOffering[k].id;
                                                        this.cpDuration = deviceOffering[i].deviceOfferingPrice[j].relatedProductOffering[k].productOfferingTerm[0].duration;
                                                        this.cpDescription = deviceOffering[i].deviceOfferingPrice[j].relatedProductOffering[k].name;
                                                        break;
                                                    }
                                                }
                                            }
                                        }

                                    }
                                }
                            }

                            // Seguro movil.
                            if (deviceOff.recommendedProductOffering && deviceOff.recommendedProductOffering.length) {
                                if (deviceOff.recommendedProductOffering[0].name === 'Seguro movil') {
                                    if (ospCustomerSegment.toLocaleLowerCase() === 'residencial') {
                                        this.litInsurancePaid =
                                            deviceOff.recommendedProductOffering[0].productOfferingPrice[0].price.taxIncudedAmount;
                                    } else {
                                        this.litInsurancePaid =
                                            deviceOff.recommendedProductOffering[0].productOfferingPrice[0].price.dutyFreeAmount;
                                    }
                                    this.insuranceSiebelId = deviceOff.recommendedProductOffering[0].id;
                                }
                            }
                        });
                    }
                    // Si se puede se calcula el ahorro    
                    if (this.litDeadlines && this.litPrice && this.uniquePaid) {
                        this.saving = this.uniquePaid - this.totalPaid;
                    } else { // No se puede calcular el ahorro
                        this.saving = 0;
                    }
                }
                
                if(commercialData[commercialActIndex].ospTerminalWorkflow) {
                    // Renove prepago
                    if (commercialData[commercialActIndex].ospTerminalWorkflow.toLocaleLowerCase() === 'prepaid_renew') {
                        commercialData[commercialActIndex].prepaidProducts.forEach((product, i) => {
                            if (product.codSAP === serviceData.deviceSpecification.id) {
                                product.offertDetails.forEach((offert, i) => {
                                    let prepaidPrice = {
                                        valorRecarga: offert.valorRecarga,
                                        valorPuntos: offert.valorPuntos,
                                        valorEruros: offert.valorEruros
                                    }
                                    this.prepaidRenewPrices.push(prepaidPrice);
                                });
                            }
                        });
                    }
                    // Si es renove primario se guardan todas las tarifas asociadas
                    if (commercialData[commercialActIndex].ospTerminalWorkflow.toLocaleLowerCase() === 'primary_renew' ||
                        commercialData[commercialActIndex].ospTerminalWorkflow.toLocaleLowerCase() === 'best_renove') {
                        serviceData.deviceOffering.forEach((deviceOff, x) => {
                            if (deviceOff.deviceOfferingPrice && deviceOff.deviceOfferingPrice.length) {
                                deviceOff.deviceOfferingPrice.forEach((price, x) => {
                                    if (price.relatedProductOffering && price.relatedProductOffering.length) {
                                        price.relatedProductOffering.forEach((product) => {
                                            if (product.isBundle) {
                                                let rate = {
                                                    name: product.name,
                                                    bundleId: product.id
                                                }
                                                let isInRenewRates = _.find(this.renewRates, { siebelId: rate.bundleId });
                                                if (!isInRenewRates) {
                                                    this.renewRates.push(rate);
                                                }
                                            }
                                        })
                                    }
                                });
                            }
                        });
                    }
                }

            }
        }

    }
    export class OrangeMosaicFileTerminalCharacteristicsLvl1 {
        public image: string;
        public title: string;
        public subCharacteristicsList: OrangeMosaicFileTerminalCharacteristicsLvl2[] = [];

        constructor() {

        }
    }
    export class OrangeMosaicFileTerminalCharacteristicsLvl2 {
        public name: string;
        public value: string;

        constructor(name: string, value: string) {
            this.value = value;
            this.name = name;
        }
    }
    export class OrangeMosaicFileTerminalCompatible {
        public header: string;
        public content: string;

        constructor(content: string) {
            this.content = content;
        }
    }
    export class OrangeMosaicFileTerminalFileDescription {
        public text: string;
        public image: string;

        constructor() {

        }
    }
    export class OrangeMosaicFileTerminalFileReview {
        public header: string;
        public client: string;
        public date: string;
        public content: string;

        constructor() {

        }
    }
    export class OrangeMosaicFileTerminalFileUserView {
        public leftInactive: string;
        public leftActive: string;
        public relProducts: OrangeMosaicFileTerminalFileUserViewRelProducts[] = [];

        constructor(leftInactive, leftActive, relProducts) {
            this.leftActive = leftActive;
            this.leftInactive = leftInactive;
            this.relProducts = relProducts;
        }
    }
    export class OrangeMosaicFileTerminalFileUserViewRelProducts {
        public image: string;
        public brand: string;
        public model: string;
        public price: number;
        public nPayments: number;

        constructor() {

        }
    }
    export class OrangeMosaicFileTerminalFileTerminalIcon {
        public image: string;
        public description: string;
        constructor(image: string, description: string) {
            this.image = image;
            this.description = description;
        }
    }
    export class OrangeMosaicFileTerminalFileIPriceItem {
        public id: string;
        public name: string;
        public priceType: string;
        public price: OrangeMosaicFileTerminalFilePrice;
        public recurringChargePeriod: number;
    }
    export class OrangeMosaicFileTerminalFilePrice {
        public taxRate: number;
        public ospTaxRateName: string;
        public dutyFreeAmount: OrangeMosaicFileTerminalFilePriceDetail = new OrangeMosaicFileTerminalFilePriceDetail();
        public taxIncludedAmount: OrangeMosaicFileTerminalFilePriceDetail = new OrangeMosaicFileTerminalFilePriceDetail();
    }
    export class OrangeMosaicFileTerminalFilePriceDetail {
        public unit: string;
        public value: number;
    }
    export class DataOT {
        public channel: string;
        public profile: string;
        public isExistingCustomer: string;
        public ospCustomerSegment: string;
        public ospCartItemType: string;
        public ospCartItemSubType: string;
        public relatedRateResidential: string;
        public relatedRateBusiness: string;
        public relatedTypeResidential: string;
        public relatedTypeBusiness: string;
        public relatedRatePrepaid: string;
        public relatedTypePrepaid: string;
        public creditRiskRating: string;
        public numLinesResidential: string;
        public numLinesBussines: string;
        public stateOrProvince: string;
        public priceName: string;
        public campana_txt: string;

        constructor() {
            this.channel = '';
            this.profile = '';
            this.isExistingCustomer = '';
            this.ospCustomerSegment = '';
            this.ospCartItemType = '';
            this.ospCartItemSubType = '';
            this.relatedRateResidential = '';
            this.relatedRateBusiness = '';
            this.relatedTypeResidential = '';
            this.relatedTypeBusiness = '';
            this.relatedRatePrepaid = '';
            this.relatedTypePrepaid = '';
            this.creditRiskRating = '';
            this.numLinesResidential = '';
            this.numLinesBussines = '';
            this.priceName = '';
        }
    }
}
