
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
            this.applicationDuration = rate.applicationDuration;
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

            let priceItem: ratesComparator.Models.OrangeMosaicFileTerminalFileIPriceItem;
            let filePrice: ratesComparator.Models.OrangeMosaicFileTerminalFilePrice;

            if (priceData && priceData.length) {
                if (priceData[0].deviceOfferingPrice && priceData[0].deviceOfferingPrice.length > 0) {
                    // Array de precios
                    this.itemPrice = [];
                    priceData.forEach((deviceOff, x) => {
                        deviceOff.deviceOfferingPrice.forEach((price, i) => {

                            /* Precios del terminal */
                            priceItem = new ratesComparator.Models.OrangeMosaicFileTerminalFileIPriceItem();
                            filePrice = new ratesComparator.Models.OrangeMosaicFileTerminalFilePrice();
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
                            if (price.priceType && price.priceType === 'inicial') {
                                this.initialPrice = price.Price.taxIncudedAmount;
                                this.initialPriceFree = price.Price.dutyFreeAmount;
                            }
                            if (price.priceType && price.priceType === 'cuota') {
                                this.litDeadlines = price.applicationDuration;
                                this.monthlyPrice = price.Price.taxIncudedAmount;
                                this.monthlyPriceFree = price.Price.dutyFreeAmount;
                                // Si se puede se calcula el precio total
                                if (this.initialPrice !== undefined) {
                                    this.totalPrice = this.initialPrice + this.monthlyPrice * this.litDeadlines;
                                    this.totalPriceFree = this.initialPriceFree + this.monthlyPriceFree * this.litDeadlines;
                                }else {
                                    this.totalPrice = this.monthlyPrice * this.litDeadlines;
                                    this.totalPriceFree = this.monthlyPriceFree * this.litDeadlines;
                                }
                            }
                            if (price.priceType && price.priceType === 'unico') {
                                this.uniquePaid = price.Price.taxIncudedAmount;
                                this.uniquePaidFree = price.Price.dutyFreeAmount;
                            }
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
}
