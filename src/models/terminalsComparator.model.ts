module terminalsComparator.Models {

    export class OrangeMosaicFileTerminalFilePriceDetail {
        public unit: string;
        public value: number;
    }

    export class OrangeMosaicFileTerminalFilePrice {
        public taxRate: number;
        public ospTaxRateName: string;
        public dutyFreeAmount: OrangeMosaicFileTerminalFilePriceDetail = new OrangeMosaicFileTerminalFilePriceDetail();
        public taxIncludedAmount: OrangeMosaicFileTerminalFilePriceDetail =  new OrangeMosaicFileTerminalFilePriceDetail();
    }

    export class OrangeMosaicFileTerminalFileIPriceItem {
        public id: string;
        public name: string;
        public priceType: string;
        public price: OrangeMosaicFileTerminalFilePrice;
        public recurringChargePeriod: number;
    }

    export class Feature {
        label: string;
        value: string | boolean;      
    }

    export class Category {
        name: string;
        title: string;
        items: Array<Feature>;
        constructor(){            
            this.items = [];
        }
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
        public itemPrice: Array<terminalsComparator.Models.OrangeMosaicFileTerminalFileIPriceItem>;
        public features: Array<Category>;
        

        /**
         * @ngdoc method
         * @name terminalsComparator.Models:Terminal#constructor
         * @methodOf terminalsComparator.Models:Terminal
         * @param {Object} terminal Terminal de la que obtener la informacion para crear la tarifa segun el modelo
         * @param {Object} priceData Datos de los precios (deviceOffering) del terminal
         * @description
         * Crea un terminal para utilizar el comparador de terminales
         */
        constructor(terminal, OWCSOptions, responseOptions) {
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
            this.features = [];

            // Mapea las características de cada terminal
            this.loopOWCSOptions(OWCSOptions, responseOptions);

            if (terminal.stock) {
                this.stock = terminal.stock;
            }

            if (terminal.IMEI) {
                this.IMEI = terminal.IMEI;
            }

            let priceItem: terminalsComparator.Models.OrangeMosaicFileTerminalFileIPriceItem = new terminalsComparator.Models.OrangeMosaicFileTerminalFileIPriceItem();
            let filePrice: terminalsComparator.Models.OrangeMosaicFileTerminalFilePrice = new terminalsComparator.Models.OrangeMosaicFileTerminalFilePrice();

            if (terminal.itemPrice) {
                // Array de precios
                this.itemPrice = [];
                
                this.loopTerminalItemPrice(terminal, priceItem, filePrice);

            } else {
                this.error = true;
            }
            
        }


        private loopTerminalItemPrice(terminal: any, priceItem: OrangeMosaicFileTerminalFileIPriceItem, filePrice: OrangeMosaicFileTerminalFilePrice) {
            _.forEach(terminal.itemPrice, item => {
                priceItem.id = item.id;
                // Agregando precio sin impuesto
                filePrice.dutyFreeAmount.unit = item.price.dutyFreeAmount.unit;
                filePrice.dutyFreeAmount.value = item.price.dutyFreeAmount.value;
                // Agregando precio con impuesto
                filePrice.taxIncludedAmount.unit = item.price.taxIncludedAmount.unit;
                filePrice.taxIncludedAmount.value = item.price.taxIncludedAmount.value;
                // Recogiendo impuestos
                filePrice.taxRate = item.taxRate;
                filePrice.ospTaxRateName = item.ospTaxRateName;
                // Creando el objeto item price
                priceItem.priceType = item.priceType;
                priceItem.price = filePrice;
                // Añadiendo el precio al arreglo de precios del terminal
                this.itemPrice.push(priceItem);
                if (item.priceType && item.priceType === 'inicial') {
                    this.initialPrice = item.price.taxIncludedAmount.value;
                    this.initialPriceFree = item.price.dutyFreeAmount.value;
                }
                if (item.priceType && item.priceType === 'cuota') {
                    priceItem.recurringChargePeriod = Number(item.recurringChargePeriod); // Duración de las cuotas
                    this.litDeadlines = item.recurringChargePeriod;
                    this.monthlyPrice = item.price.taxIncludedAmount.value;
                    this.monthlyPriceFree = item.price.dutyFreeAmount.value;
                    // Si se puede se calcula el precio total
                    if (this.initialPrice !== undefined) {
                        this.totalPrice = this.initialPrice + this.monthlyPrice * this.litDeadlines;
                        this.totalPriceFree = this.initialPriceFree + this.monthlyPriceFree * this.litDeadlines;
                    }
                    else {
                        this.totalPrice = this.monthlyPrice * this.litDeadlines;
                        this.totalPriceFree = this.monthlyPriceFree * this.litDeadlines;
                    }
                }
                if (item.priceType && item.priceType === 'unico') {
                    this.uniquePaid = item.price.taxIncludedAmount.value;
                    this.uniquePaidFree = item.price.dutyFreeAmount.value;
                }
            });
        }

        private loopOWCSOptions(OWCSOptions: any, responseOptions: any) {
            OWCSOptions.forEach(owcs => {
                if (owcs.name) {
                    let category = new Category();
                    category.name = owcs.name;
                    category.title = owcs.title;
                    if (owcs.listOptionsLiteral) {
                        this.loopOwcsListOptionsLiteral(owcs, responseOptions, category);
                    }
                    this.features.push(category);
                }
            });
        }

        private loopOwcsListOptionsLiteral(owcs: any, responseOptions: any, category: Category) {
            owcs.listOptionsLiteral.forEach(optionLiteral => {
                let feature = new Feature();
                feature.label = optionLiteral.value;
                feature.value = '';
                responseOptions.forEach(y => {
                    if (y.ospCharCategory && y.ospCharCategory === owcs.name) {
                        if (y.name && y.name === optionLiteral.name) {
                            if (y.characteristicValue[0].unitOfMeasure) {
                                feature.value = y.characteristicValue[0].value + ' ' + y.characteristicValue[0].unitOfMeasure;
                            }
                            else {
                                feature.value = y.characteristicValue[0].value;
                            }
                        }
                    }
                });
                category.items.push(feature);
            });
        }
    }

}