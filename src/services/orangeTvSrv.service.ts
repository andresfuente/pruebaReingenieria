module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:OrangeTvSrv
     * @author Daniel Sanchez Alvarez
     * @description
     * Servicio del productCatalog
     */
    export class OrangeTvSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        private productContractedTranslateSrv: OrangeFeSARQ.Service.ProductContractedTranslateSrv;
        private $rootScope: any;
        private utils;
        private $q: ng.IQService;

        private PC: any;
        private CV: any;
        private PT: string;
        private CN: string;

        private fixedLines: any;
        private OTVFixedLines: any;

        private orangeTVFixedProducts: any;

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:OrangeTvSrv#constructor
         * @methodOf OrangeFeSARQ.Services:OrangeTvSrv
         * @param {Object} $injector Componente que necesita el parent injector
         * @description
         * Incluye las dependencias necesarias e inicializa el servicio
         */
        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.orangeTVFixedProducts = [];
            vm.OTVFixedLines = [];
            vm.fixedLines = [];

            vm.setInjections($injector);
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:OrangeTvSrv#setInjections
         * @methodOf OrangeFeSARQ.Services:OrangeTvSrv
         * @param {Object} $injector Componente que necesita el parent injector.
         * @description
         * Incluye las dependencias necesarias
         */
        setInjections($injector) {
            let vm = this;

            vm.$q = vm.$injector.get('$q');
            vm.utils = $injector.get('utils');
            vm.$rootScope = $injector.get('$rootScope');
            vm.productContractedTranslateSrv = $injector.get('productContractedTranslateSrv');
        }

        initialize(PC: any, CV:any, PT: string, CN: string) {
            let vm = this;

            vm.PC = PC;
            vm.CV = CV;
            vm.PT = PT;
            vm.CN = CN;

            vm.getOrangeTVBasicProducts();
        }
        /**
         * @ngdoc method
         * @name myOrangeTv.Controllers:myOrangeTvCtrl#getOrangeTVBasicProducts
         * @methodOf myOrangeTv.Controllers:myOrangeTvCtrl
         * @description
         * 
         * Recoge del Product Specification todos los productos Orange TV Basicos
         */
        getOrangeTVBasicProducts() {
            let vm = this;

            for (let i = 0; i < vm.PC.specification.length; i++) {
                const product = vm.PC.specification[i];
                for (let j = 0; j < product.bundledProductSpecification.length; j++) {
                    const bundledProduct = product.bundledProductSpecification[j];
                    // Los productos básicos de Orange TV vienen en el bundledProductSpecification
                    if (bundledProduct.id === vm.PT) {
                        vm.orangeTVFixedProducts.push(product);
                    }
                }
            }

            vm.getLinesWithOrangeTV();
        }

        /**
         * @ngdoc method
         * @name myOrangeTv.Controllers:myOrangeTvCtrl#getLinesWithOrangeTV
         * @methodOf myOrangeTv.Controllers:myOrangeTvCtrl
         * @description
         * 
         * Recoge todas las lineas fijas del cliente y cruza los productos de cada linea con el Product Specification
         */
        getLinesWithOrangeTV() {
            let vm = this;
            let fixedLinesPos: number = 0;
            let promises = [];

            // Accedemos a todas las lineas del cliente y comprobamos con una promesa multiple si cada una de ellas tiene orange TV contratado
            if (vm.CV && vm.CV.loginData && vm.CV.loginData.allLines) {
                vm.CV.loginData.allLines.forEach(line => {
                    if (vm.utils.isFixedLine(line.msisdn)) {
                        vm.fixedLines.push({ 'msisdn': line.msisdn, "hasOrangeTV": false, 'channels': [] });
                        promises.push(vm.productContractedTranslateSrv.getServicesContracted(line.msisdn, 'fixed', vm.genericConstant.brand, 'services', vm.CN));
                    }
                });
            }

            vm.$q.all(promises).then((response) => {
                let fixedLinesProducts = response;

                if (fixedLinesProducts) {
                    // Se recogen los productos de todas las lineas fijas
                    for (let i = 0; i < fixedLinesProducts.length; i++) {
                        const pI = fixedLinesProducts[i]['product'];
                        // Cruza los productos de todas las lineas fijas con los productos Orange TV del Product Specification
                        vm.matchInventoryWithCatalog(pI, fixedLinesPos);
                        fixedLinesPos++;
                    }
                    vm.OTVFixedLines = vm.fixedLines;
                    vm.$rootScope.$emit('getOrangeTVLines', vm.OTVFixedLines);
                } else {
                    // KO
                }
            }).catch((error) => {
                // KO
            })
        }

        /**
         * @ngdoc method
         * @name myOrangeTv.Controllers:myOrangeTvCtrl#matchInventoryWithCatalog
         * @param pI Product Inventory
         * @param fixedLinesPos Posicion de la linea en el array
         * @methodOf myOrangeTv.Controllers:myOrangeTvCtrl
         * @description
         * 
         * Cruza los productos de todas las lineas fijas con los productos Orange TV del Product Specification
         */
        matchInventoryWithCatalog(pI, fixedLinesPos) {
            let vm = this;

            // Introducimos en vm.fixedLines cada linea fija, si tiene orangeTV y los canales contratados
            for (let i = 0; i < pI.length; i++) {
                const lineProduct = pI[i];
                for (let j = 0; j < vm.orangeTVFixedProducts.length; j++) {
                    const fixedProduct = vm.orangeTVFixedProducts[j];
                    if (lineProduct.id === fixedProduct.productNumber) {
                        vm.fixedLines[fixedLinesPos].hasOrangeTV = true;
                        vm.fixedLines[fixedLinesPos].channels.push({ "name": fixedProduct.name, "index": fixedProduct.ospGroupIndex });
                    }
                }
            }
            vm.formatChannels(vm.fixedLines[fixedLinesPos]);
        }

        /**
         * @ngdoc method
         * @name myOrangeTv.Controllers:myOrangeTvCtrl#formatChannel
         * @param channels Canales de la linea seleccionada
         * @methodOf myOrangeTv.Controllers:myOrangeTvCtrl
         * @description
         * 
         * Formatea los canales ordenandolos por index y añadiendo un " + " si hay mas de 1 canal
         */
        formatChannels(groupChannels) {
            let vm = this;
            let listChannels = [];

            // Se ordenan los canales en funcion del ospGroupIndex del P. Catalog
            groupChannels.channels = _.sortBy(groupChannels.channels, "index");
            groupChannels.channels.forEach(channel => {
                listChannels.push(channel.name);
            });
            groupChannels.formattedChannels = listChannels.join(" + ");
        }
    }

    angular.module('orangeTvSrv', [])
        .service('orangeTvSrv', OrangeFeSARQ.Services.OrangeTvSrv);
}
