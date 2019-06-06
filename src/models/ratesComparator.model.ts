
module ratesComparator.Models {

    /**
     * @ngdoc model
     * @name ratesComparator.Models:Rate
     * @author Isabel Matas
     * @description
     * Modelo para las tarifas en el comparador
     */
    export class Rate {
        public name: string;
        public siebelId: string;
        public description: string;
        public ratePrice: number;
        public ratePriceTaxIncluded: number;
        public ratePriceTaxIncludedPromotional: number;
        public ratePricePromotional: number;
        public paymentsNumber: number;
        public typeService: string;
        public taxRate : number;
        public taxRateName : string;
        public terminals: Array<ratesComparator.Models.Terminal>;
        public applicationDuration : number;
        public ospTecnology: string;

        public groupName: string;

        // Atributos para NAC
        public nacPrice = 0;
        public nacPriceTaxIncluded: number;
        public nacPricePromotional: number;
        public nacPriceTaxIncludedPromotional: number;

        public bucket: Object;

        /**
         * @ngdoc method
         * @name ratesComparator.Models:Rate#constructor
         * @methodOf ratesComparator.Models:Rate
         * @param {Object} rate Tarifa de la que obtener la informacion para crear la tarifa segun el modelo
         * @description
         * Crea una tarifa para utilizar el comparador. 
         * - siebelId {string} ID siebel
         * - name {string} nombre
         * - ratePrice {number} precio sin impuestos
         * - ratePriceTaxIncluded {number} precio con impuestos
         * - description {string} descripcion
         * - terminals {Array<ratesComparator.Models.Terminal>} array de terminales para el cruce
         */
        constructor(rate) {

            this.siebelId = rate.siebelId;
            this.name = rate.name;
            this.ratePrice = rate.taxFreePrice;
            this.ratePriceTaxIncluded = rate.taxIncludedPrice;
            this.ratePriceTaxIncludedPromotional = rate.ratePriceTaxIncludedPromotional;
            this.ratePricePromotional = rate.ratePricePromotional;
            this.description = rate.description;
            this.typeService = rate.typeService;
            this.taxRate = rate.taxRate;
            this.taxRateName = rate.taxRateName;
            this.terminals = [];
            this.ospTecnology = rate.ospTecnology;
            this.applicationDuration = rate.applicationDuration;

            this.groupName = rate.groupName;

            this.nacPrice = rate.nacPrice;
            this.nacPriceTaxIncluded = rate.nacPriceTaxIncluded;
            this.nacPricePromotional = rate.nacPricePromotional;
            this.nacPriceTaxIncludedPromotional = rate.nacPriceTaxIncludedPromotional;

            this.bucket = rate.bucket;
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
        public taxIncludedAmount: OrangeMosaicFileTerminalFilePriceDetail =  new OrangeMosaicFileTerminalFilePriceDetail();
    }
    export class OrangeMosaicFileTerminalFilePriceDetail {
        public unit: string;
        public value: number;
    }

    export class Terminal {
        public siebelId: string;
        public description: string;
        public brand: string;
        public name: string;
        public priceType: string;
        public insuranceSiebelId;
        public insuranceSelected;
        public srcImage: string;
        public initialPrice: number;
        public monthlyPrice: number;
        public totalPrice: number;
        public totalPriceFree: number;
        public litDeadlines: number;
        public totalPaid: number;
        public uniquePaid: number;
        public uniquePaidFree: number;
        public monthlyPriceFree: number;
        public initialPriceFree: number;
        public IMEI: string;
        public stock: number;
        public error: boolean;
        public cpSiebel : string;
        public cpDescription : string;
        public cpDuration : string;
        public savingPrice: number;
        public savingPriceFree: number;

        public selected = false;
        public plazos = false;
        public unico = false;
        public insurancePrice: number;
        public insurancePriceFree: number;
        public itemPrice: Array<ratesComparator.Models.OrangeMosaicFileTerminalFileIPriceItem>;

        /**
         * @ngdoc method
         * @name ratesComparator.Models:Terminal#constructor
         * @methodOf ratesComparator.Models:Terminal
         * @param {Object} terminal Terminal de la que obtener la informacion para crear la tarifa segun el modelo
         * @param {Object} priceData Datos de los precios (deviceOffering) del terminal
         * @description
         * Crea un terminal para utilizar el comparador.
         */
        constructor(terminal, priceData) {
            this.siebelId = terminal.siebelId;
            this.description = terminal.description;
            this.brand = terminal.brand;
            this.insuranceSiebelId = terminal.insuranceSiebelId;
            this.insuranceSelected = terminal.insuranceSelected;
            this.srcImage = terminal.srcImage;
            this.name = terminal.name;
            this.cpSiebel = terminal.cpSiebel;
            this.cpDescription = terminal.cpDescription;
            this.cpDuration = terminal.cpDuration;

            if (terminal.stock) {
                this.stock = terminal.stock;
            }

            if (terminal.IMEI) {
                this.IMEI = terminal.IMEI;
            }

            let priceItemRtc: ratesComparator.Models.OrangeMosaicFileTerminalFileIPriceItem;
            let filePriceRtc: ratesComparator.Models.OrangeMosaicFileTerminalFilePrice;

            if (priceData && priceData.length) {
                if (priceData[0].deviceOfferingPrice && priceData[0].deviceOfferingPrice.length > 0) {
                    // Array de precios
                    this.itemPrice = [];
                    priceData.forEach((deviceOff, x) => {
                        deviceOff.deviceOfferingPrice.forEach((priceRtc, i) => {

                            /* Precios del terminal */
                            priceItemRtc = new ratesComparator.Models.OrangeMosaicFileTerminalFileIPriceItem();
                            filePriceRtc = new ratesComparator.Models.OrangeMosaicFileTerminalFilePrice();
                            // Id
                            priceRtc.relatedProductOffering.forEach(itemRtc => {
                                if ((priceRtc.priceType === 'inicial' && itemRtc.name === 'Cuota inicial') ||
                                    (priceRtc.priceType === 'cuota' && itemRtc.name === 'Cuota mensual')) {
                                    priceItemRtc.id = itemRtc.id;
                                }
                            });
                            if (priceRtc.Price) {
                                // Agregando precio sin impuesto
                                filePriceRtc.dutyFreeAmount.unit = priceRtc.Price.currencyCode;
                                filePriceRtc.dutyFreeAmount.value = priceRtc.Price.dutyFreeAmount;
                                // Agregando precio con impuesto
                                filePriceRtc.taxIncludedAmount.unit = priceRtc.Price.currencyCode;
                                filePriceRtc.taxIncludedAmount.value = priceRtc.Price.taxIncudedAmount; // Corregir
                                // Recogiendo impuestos
                                filePriceRtc.taxRate = priceRtc.Price.taxRate;
                                filePriceRtc.ospTaxRateName = priceRtc.Price.ospTaxRateName;
                                // Creando el objeto item price
                                priceItemRtc.priceType = priceRtc.priceType;
                                priceItemRtc.price = filePriceRtc;
                            }
                            // Duracion de las cuotas
                            if (priceRtc.priceType === 'cuota') {
                                priceItemRtc.recurringChargePeriod = Number(priceRtc.applicationDuration);
                            }
                            // Añadiendo el precio al arreglo de precios del terminal
                            this.itemPrice.push(priceItemRtc);
                            if (priceRtc.priceType && priceRtc.priceType === 'unico') {
                                this.uniquePaid = priceRtc.Price.taxIncudedAmount;
                                this.uniquePaidFree = priceRtc.Price.dutyFreeAmount;
                            }
                            if (priceRtc.priceType && priceRtc.priceType === 'inicial') {
                                this.initialPrice = priceRtc.Price.taxIncudedAmount;
                                this.initialPriceFree = priceRtc.Price.dutyFreeAmount;
                            }
                            if (priceRtc.priceType && priceRtc.priceType === 'cuota') {
                                this.litDeadlines = priceRtc.applicationDuration;
                                this.monthlyPrice = priceRtc.Price.taxIncudedAmount;
                                this.monthlyPriceFree = priceRtc.Price.dutyFreeAmount;
                                // Si se puede se calcula el precio total
                                if (this.initialPrice !== undefined) {
                                    this.totalPrice = this.initialPrice + this.monthlyPrice * this.litDeadlines;
                                    this.totalPriceFree = this.initialPriceFree + this.monthlyPriceFree * this.litDeadlines;
                                }else {
                                    this.totalPrice = this.monthlyPrice * this.litDeadlines;
                                    this.totalPriceFree = this.monthlyPriceFree * this.litDeadlines;
                                }
                            }
                            this.savingPrice = this.uniquePaid - this.totalPrice;
                            this.savingPriceFree = this.uniquePaidFree - this.totalPriceFree;
                        });

                        // Logica para recoger el seguro de la OT
                        if (deviceOff.recommendedProductOffering) {
                            deviceOff.recommendedProductOffering.forEach(recommended => {
                                if (recommended.productOfferingPrice) {
                                    recommended.productOfferingPrice.forEach(price => {
                                        // Identificador para localizar el precio del seguro
                                        if (price.name === 'Precio del seguro movil') {
                                            this.insurancePrice = price.price.taxIncudedAmount;
                                            this.insurancePriceFree = price.price.dutyFreeAmount;
                                        }

                                    });
                                }
                            });
                        }
                    });
                }
                this.error = false;
            } else {
                this.error = true;
            }
        }
    }

    /**
     * @ngdoc model
     * @name ratesComparator.Models:RatePrimaryRenew
     * @author 
     * @description
     * Modelo para las tarifas renove primario en el comparador
     */
    export class RatePrimaryRenew {
        public name: string;
        public siebelId: string;
        public description: string;
        public ratePrice: number;
        public ratePriceTaxIncluded: number;
        public ratePriceTaxIncludedPromotional: number;
        public ratePricePromotional: number;
        public paymentsNumber: number;
        public typeService: string;
        public taxRate : number;
        public taxRateName : string;
        public terminals: Array<ratesComparator.Models.Terminal>;
        public applicationDuration : number;
        public ospTecnology: string;

        public bucket: Object;
        public groupName: string;

        /**
         * @ngdoc method
         * @name ratesComparator.Models:Rate#constructor
         * @methodOf ratesComparator.Models:Rate
         * @param {Object} rate Tarifa de la que obtener la informacion para crear la tarifa segun el modelo
         * @description
         * Crea una tarifa para utilizar el comparador. 
         * - siebelId {string} ID siebel
         * - name {string} nombre
         * - ratePrice {number} precio sin impuestos
         * - ratePriceTaxIncluded {number} precio con impuestos
         * - description {string} descripcion
         * - terminals {Array<ratesComparator.Models.Terminal>} array de terminales para el cruce
         */
        constructor(rate) {

            this.siebelId = rate.siebelId;
            this.name = rate.rateSubName;
            this.ratePrice = rate.ratePrice;
            this.ratePriceTaxIncluded = rate.ratePriceTaxIncluded;
            //this.ratePriceTaxIncludedPromotional = rate.ratePriceTaxIncludedPromotional;
            //this.ratePricePromotional = rate.ratePricePromotional;
            _.forEach(rate.productBundle, (productBundle) => {
                if (productBundle.title === 'CARACTERISTICATECNOLOGIA') {
                    this.description = productBundle.description;
                    return;
                }
            });
            this.typeService = rate.typeService;
            this.taxRate = rate.taxRate;
            this.taxRateName = rate.taxRateName;
            this.terminals = [];
            //this.applicationDuration = rate.applicationDuration;
            this.ospTecnology = rate.ospTecnology;

            this.bucket = rate.bucket;

            this.groupName = rate.groupName;
        }
    }
}
