module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.CommercialCampaignsSrv
     * @description
     * Servicio que realiza la llamada a la API CommercialCampaigns
     */
    export class CommercialCampaignsSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public commercialCampaignsAPIUrl: string;
        private storeProvince: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
            vm.setStoreProvince();
        }

        setInjections($injector) {
            let vm = this;

            vm.commercialCampaignsAPIUrl = vm.genericConstant.commercialCampaigns;
        }
        /**
         * @ngdoc method
         * @name ratesParent.Services:RatesParentSrv#getStoreProvince
         * @methodOf ratesParent.Services:MosaicFileSrv
         * @description
         * Establece el nombre de la provincia de la tienda  
         */
        setStoreProvince() {
            let vm = this;
            let shopInfo = JSON.parse(sessionStorage.getItem('shopInfo'));
            if (shopInfo && shopInfo.province && shopInfo.province !== '') {
                vm.storeProvince = shopInfo.province;
            } else {
                vm.storeProvince = 'MADRID';
            }
        }

        /**
         * @ngdoc method
         * @name OFC.Services.CommercialCampaignsSrv#getComercialCampaings85205()
         * @methodOf OFC.Services.CommercialCampaignsSrv
         * @param {string} individualPublicId Identificador de linea.
         * @param {string} comp Componente.
         * @description Obtiene los datos de las campañas comerciales de un cliente
         * @returns {object} Devuelve una promesa con el response.
         */
        getComercialCampaings85205(individualPublicId, comp: string) {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    'individualPublicId': individualPublicId
                },
                urlParams: [vm.genericConstant.brand, 'getComercialCampaings85205']
            };

            return vm.getComercialCampaings85205Response(_search,comp); 
        }


        getComercialCampaings85205FDC(individualPublicId, comp: string, parameters:any) {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    'individualPublicId': individualPublicId,
                    'motivoCamp' : parameters.motivoCampana,
                    'tipologia1' : parameters.tipologia1,
                    'tipologia2': parameters.tipologia2,
                    'tipologia3': parameters.tipologia3
                },
                urlParams: [vm.genericConstant.brand, 'getComercialCampaings85205']
            };

            return vm.getComercialCampaings85205Response(_search,comp); 
        }

        getComercialCampaings85205Response(_search, comp ){
            let vm = this;
            let _headers = new HashMap<string, string>();
            _headers.set('locationName', _.deburr(vm.storeProvince.toUpperCase()));
            return vm.httpCacheGeth(vm.commercialCampaignsAPIUrl, _search, _headers, comp, true)
                .then((response) => {
                  return {
                    "result": [
                      {
                        "idUser": "650531495",
                        "saldoDisponible": null,
                        "campaignNum": [
                          {
                            "desc": null,
                            "nomCampaign": "Venta a Plazos PDV TV Top Riesgo",
                            "codCampaign": "1-17005626564",
                            "detalleProductos": [
                              {
                                "idProducto": "1-6SBTRUM",
                                "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                "codSAP": "3100348",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-7GI98ZC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-951L5A1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-951T82O",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HFEZGV",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HPZX11",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HPZX5F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HPZX85",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9Z0FTZG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AIKZDAK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AIKZDK0",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV47UJ4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3QM0QD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3TOQIC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3U2T7I",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3U2TIC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B46UDN9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7ETWCB",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7EZAX1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7EZB7X",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGAYTIX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGBQLHJ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGCPLEX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BN2LQJX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BPWL7C1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQDD0C1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQDD0IX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSFAFAD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSFAFHF",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSI1T7L",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSI1T8H",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSQ0QWR",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BVQS3NN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BVRJY0Z",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q41HS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YP6",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YS4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YUG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YYK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0SFMUT",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0SFMWJ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0SFN1R",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50A32P",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50KE1K",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CEGA5GH",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWKWR",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWL0F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWL1V",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWL4P",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFJZT",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFK6T",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJYHFZ5",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CN0JIMR",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2A8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2HI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2KC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPIHPXI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPIHQ2A",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW3Y4AN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4E7H1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4TDW9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4TDXZ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4TE2T",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CYOCVNZ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CZON71E",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CZON77M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5CXM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZKY",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B802K",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B803Q",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B804M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D10UE7X",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D10UEAH",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D10UEBN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D4ZPYV1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D4ZPZAL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D506MXL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D506MZ1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "desc": null,
                            "nomCampaign": "Renove al mejor precio con descuento",
                            "codCampaign": "1-16017113757",
                            "detalleProductos": [
                              {
                                "idProducto": "1-6SBTRUM",
                                "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                "codSAP": "3100348",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1R00",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1R00",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-89KAQCQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-95CPZ4J",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9PDSTO8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9Z0XJFS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A3IO19F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A8BW6TE",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A8IXS1H",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A8J53PX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AA7E4VI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ABBHZWG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ABQDV1S",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ABQDV3M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AHE7TF9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ARAKHCX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AS2F3XD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV3NKTY",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV47UBK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV47UDE",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AZHCYYO",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AZHCZ1U",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AZHN0AU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3FITOB",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B41Z59C",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B45AQ55",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7ETW5D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B8BRL7B",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBPRDUC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBPRDWU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBPRE06",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBWIJ51",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBWIJ6P",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGL7GKS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGL7GNQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGL7GOM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGLMNSU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBF7",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBI1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBLP",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBQ9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BPRX7AP",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BPWL7L1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQDX6E8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSQ0QTB",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUPZ4M2",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUPZ4QK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BVUO2F3",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YR8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C2UNGW8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50A346",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50KE3U",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C5AM2TV",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C99NFWL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C99NG2W",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C99NGE8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CEFX6Z5",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CEFX73N",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CIC58SN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CIC58WN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFJPN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFJTX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJZHMPN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHPD4F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2TI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPI8CLU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPJ53PK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPJ53WA",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQ2K80D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW3Y43D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW3Y4IU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4E7BC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5D0Q",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5D64",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5DA4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZR8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZTK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZYQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZZM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B800I",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0Y63Y7",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0Y63ZD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D4ZPYRL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6WFDTP",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "idUser": "650644112",
                        "saldoDisponible": null,
                        "campaignNum": [
                          {
                            "desc": null,
                            "nomCampaign": "Venta a Plazos PDV TV Top Riesgo",
                            "codCampaign": "1-19829449151",
                            "detalleProductos": [
                              {
                                "idProducto": "1-6SBTRUM",
                                "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                "codSAP": "3100348",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-7GI98ZC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-951L5A1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-951T82O",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HFEZGV",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HPZX11",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HPZX5F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HPZX85",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9Z0FTZG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AIKZDAK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AIKZDK0",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV47UJ4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3QM0QD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3TOQIC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3U2T7I",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3U2TIC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B46UDN9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7ETWCB",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7EZAX1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7EZB7X",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGAYTIX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGBQLHJ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGCPLEX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BN2LQJX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BPWL7C1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQDD0C1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQDD0IX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSFAFAD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSFAFHF",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSI1T7L",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSI1T8H",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSQ0QWR",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BVQS3NN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BVRJY0Z",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q41HS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YP6",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YS4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YUG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YYK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0SFMUT",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0SFMWJ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0SFN1R",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50A32P",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50KE1K",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CEGA5GH",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWKWR",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWL0F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWL1V",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWL4P",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFJZT",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFK6T",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJYHFZ5",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CN0JIMR",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2A8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2HI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2KC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPIHPXI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPIHQ2A",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW3Y4AN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4E7H1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4TDW9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4TDXZ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4TE2T",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CYOCVNZ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CZON71E",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CZON77M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5CXM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZKY",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B802K",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B803Q",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B804M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D10UE7X",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D10UEAH",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D10UEBN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D4ZPYV1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D4ZPZAL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D506MXL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D506MZ1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "desc": null,
                            "nomCampaign": "Renove al mejor precio con descuento",
                            "codCampaign": "1-17006978323",
                            "detalleProductos": [
                              {
                                "idProducto": "1-6SBTRUM",
                                "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                "codSAP": "3100348",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1R00",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1R00",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-89KAQCQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-95CPZ4J",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9PDSTO8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9Z0XJFS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A3IO19F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A8BW6TE",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A8IXS1H",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A8J53PX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AA7E4VI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ABBHZWG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ABQDV1S",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ABQDV3M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AHE7TF9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ARAKHCX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AS2F3XD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV3NKTY",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV47UBK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV47UDE",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AZHCYYO",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AZHCZ1U",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AZHN0AU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3FITOB",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B41Z59C",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B45AQ55",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7ETW5D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B8BRL7B",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBPRDUC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBPRDWU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBPRE06",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBWIJ51",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBWIJ6P",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGL7GKS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGL7GNQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGL7GOM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGLMNSU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBF7",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBI1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBLP",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBQ9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BPRX7AP",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BPWL7L1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQDX6E8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSQ0QTB",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUPZ4M2",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUPZ4QK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BVUO2F3",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YR8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C2UNGW8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50A346",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50KE3U",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C5AM2TV",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C99NFWL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C99NG2W",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C99NGE8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CEFX6Z5",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CEFX73N",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CIC58SN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CIC58WN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFJPN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFJTX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJZHMPN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHPD4F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2TI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPI8CLU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPJ53PK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPJ53WA",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQ2K80D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW3Y43D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW3Y4IU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4E7BC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5D0Q",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5D64",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5DA4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZR8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZTK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZYQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZZM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B800I",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0Y63Y7",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0Y63ZD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D4ZPYRL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6WFDTP",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "idUser": "600453846",
                        "saldoDisponible": null,
                        "campaignNum": [
                          {
                            "desc": null,
                            "nomCampaign": "Venta a Plazos PDV TV Top Riesgo",
                            "codCampaign": "1-19829449151",
                            "detalleProductos": [
                              {
                                "idProducto": "1-6SBTRUM",
                                "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                "codSAP": "3100348",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-7GI98ZC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-951L5A1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-951T82O",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HFEZGV",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HPZX11",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HPZX5F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9HPZX85",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9Z0FTZG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AIKZDAK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AIKZDK0",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV47UJ4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3QM0QD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3TOQIC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3U2T7I",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3U2TIC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B46UDN9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7ETWCB",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7EZAX1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7EZB7X",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGAYTIX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGBQLHJ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGCPLEX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BN2LQJX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BPWL7C1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQDD0C1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQDD0IX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSFAFAD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSFAFHF",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSI1T7L",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSI1T8H",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSQ0QWR",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BVQS3NN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BVRJY0Z",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q41HS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YP6",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YS4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CAY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CAY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YUG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YYK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0SFMUT",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0SFMWJ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0SFN1R",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50A32P",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CA8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CA8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50KE1K",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CEGA5GH",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWKWR",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWL0F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWL1V",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJTWL4P",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFJZT",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFK6T",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJYHFZ5",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CB5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CB5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CN0JIMR",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2A8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2HI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2KC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPIHPXI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPIHQ2A",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW3Y4AN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4E7H1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4TDW9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4TDXZ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4TE2T",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CBU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CBU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CYOCVNZ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CZON71E",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CZON77M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5CXM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZKY",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B802K",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B803Q",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B804M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D10UE7X",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D10UEAH",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D10UEBN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CC8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CC8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D4ZPYV1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D4ZPZAL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D506MXL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D506MZ1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R9CCJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R9CCJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "desc": null,
                            "nomCampaign": "Renove al mejor precio con descuento",
                            "codCampaign": "1-17006978323",
                            "detalleProductos": [
                              {
                                "idProducto": "1-6SBTRUM",
                                "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                "codSAP": "3100348",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1R00",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1R00",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-89KAQCQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-95CPZ4J",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9PDSTO8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9Z0XJFS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A3IO19F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A8BW6TE",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A8IXS1H",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A8J53PX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AA7E4VI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ABBHZWG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ABQDV1S",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ABQDV3M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AHE7TF9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ARAKHCX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AS2F3XD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV3NKTY",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV47UBK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV47UDE",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AZHCYYO",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AZHCZ1U",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AZHN0AU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B3FITOB",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B41Z59C",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B45AQ55",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B7ETW5D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B8BRL7B",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBPRDUC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBPRDWU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBPRE06",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBWIJ51",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BBWIJ6P",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGL7GKS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGL7GNQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGL7GOM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BGLMNSU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBF7",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBI1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBLP",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJJBQ9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BPRX7AP",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BPWL7L1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQDX6E8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BSQ0QTB",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUPZ4M2",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUPZ4QK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BVUO2F3",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0Q7YR8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C2UNGW8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50A346",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50KE3U",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C5AM2TV",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C99NFWL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C99NG2W",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C99NGE8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CEFX6Z5",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZ9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZ9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CEFX73N",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CIC58SN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CIC58WN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFJPN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJUFJTX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CJZHMPN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHPD4F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPHV2TI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPI8CLU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPJ53PK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QYS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QYS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CPJ53WA",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQ2K80D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW3Y43D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QXU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QXU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW3Y4IU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CW4E7BC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QY7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QY7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5D0Q",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5D64",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B5DA4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZR8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZTK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZYQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B7ZZM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0B800I",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0Y63Y7",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D0Y63ZD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D4ZPYRL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6WFDTP",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D7R1QZX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D7R1QZX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    "error": {
                      "code": 107,
                      "message": "Error en el MDW 85205",
                      "description": "CORE_ERR-000004 Falta el campo Login en el mensaje",
                      "infoURL": null,
                      "details": []
                    }
                  }
                    }, (err) => {
                        return {
                          "result": [
                            {
                              "idUser": "650531495",
                              "saldoDisponible": null,
                              "campaignNum": [
                                {
                                  "desc": null,
                                  "nomCampaign": "Venta a Plazos PDV TV Top Riesgo",
                                  "codCampaign": "1-20848897119",
                                  "detalleProductos": [
                                    {
                                      "idProducto": "1-6SBTRUM",
                                      "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                      "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                      "codSAP": "3100348",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-7GI98ZC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-951L5A1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-951T82O",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HFEZGV",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HPZX11",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HPZX5F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HPZX85",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9Z0FTZG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AIKZDAK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AIKZDK0",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV47UJ4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3QM0QD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3TOQIC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3U2T7I",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3U2TIC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B46UDN9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7ETWCB",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7EZAX1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7EZB7X",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGAYTIX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGBQLHJ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGCPLEX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BN2LQJX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BPWL7C1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQDD0C1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQDD0IX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSFAFAD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSFAFHF",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSI1T7L",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSI1T8H",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSQ0QWR",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BVQS3NN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BVRJY0Z",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q41HS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YP6",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YS4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YUG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YYK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0SFMUT",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0SFMWJ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0SFN1R",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50A32P",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50KE1K",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CEGA5GH",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWKWR",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWL0F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWL1V",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWL4P",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFJZT",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFK6T",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJYHFZ5",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CN0JIMR",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2A8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2HI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2KC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPIHPXI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPIHQ2A",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW3Y4AN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4E7H1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4TDW9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4TDXZ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4TE2T",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CYOCVNZ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CZON71E",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CZON77M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5CXM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZKY",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B802K",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B803Q",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B804M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D10UE7X",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D10UEAH",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D10UEBN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D4ZPYV1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D4ZPZAL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D506MXL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D506MZ1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  "desc": null,
                                  "nomCampaign": "Renove al mejor precio con descuento",
                                  "codCampaign": "1-17006978323",
                                  "detalleProductos": [
                                    {
                                      "idProducto": "1-6SBTRUM",
                                      "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                      "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                      "codSAP": "3100348",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1R00",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1R00",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-89KAQCQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-95CPZ4J",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9PDSTO8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9Z0XJFS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A3IO19F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A8BW6TE",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A8IXS1H",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A8J53PX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AA7E4VI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ABBHZWG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ABQDV1S",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ABQDV3M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AHE7TF9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ARAKHCX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AS2F3XD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV3NKTY",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV47UBK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV47UDE",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AZHCYYO",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AZHCZ1U",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AZHN0AU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3FITOB",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B41Z59C",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B45AQ55",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7ETW5D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B8BRL7B",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBPRDUC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBPRDWU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBPRE06",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBWIJ51",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBWIJ6P",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGL7GKS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGL7GNQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGL7GOM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGLMNSU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBF7",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBI1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBLP",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBQ9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BPRX7AP",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BPWL7L1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQDX6E8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSQ0QTB",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUPZ4M2",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUPZ4QK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BVUO2F3",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YR8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C2UNGW8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50A346",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50KE3U",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C5AM2TV",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C99NFWL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C99NG2W",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C99NGE8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CEFX6Z5",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CEFX73N",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CIC58SN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CIC58WN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFJPN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFJTX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJZHMPN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHPD4F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2TI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPI8CLU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPJ53PK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPJ53WA",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQ2K80D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW3Y43D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW3Y4IU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4E7BC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5D0Q",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5D64",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5DA4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZR8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZTK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZYQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZZM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B800I",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0Y63Y7",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0Y63ZD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D4ZPYRL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6WFDTP",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "idUser": "650644112",
                              "saldoDisponible": null,
                              "campaignNum": [
                                {
                                  "desc": null,
                                  "nomCampaign": "Venta a Plazos PDV TV Top Riesgo",
                                  "codCampaign": "1-20848897119",
                                  "detalleProductos": [
                                    {
                                      "idProducto": "1-6SBTRUM",
                                      "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                      "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                      "codSAP": "3100348",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-7GI98ZC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-951L5A1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-951T82O",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HFEZGV",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HPZX11",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HPZX5F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HPZX85",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9Z0FTZG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AIKZDAK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AIKZDK0",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV47UJ4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3QM0QD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3TOQIC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3U2T7I",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3U2TIC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B46UDN9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7ETWCB",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7EZAX1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7EZB7X",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGAYTIX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGBQLHJ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGCPLEX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BN2LQJX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BPWL7C1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQDD0C1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQDD0IX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSFAFAD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSFAFHF",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSI1T7L",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSI1T8H",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSQ0QWR",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BVQS3NN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BVRJY0Z",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q41HS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YP6",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YS4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YUG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YYK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0SFMUT",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0SFMWJ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0SFN1R",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50A32P",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50KE1K",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CEGA5GH",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWKWR",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWL0F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWL1V",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWL4P",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFJZT",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFK6T",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJYHFZ5",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CN0JIMR",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2A8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2HI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2KC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPIHPXI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPIHQ2A",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW3Y4AN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4E7H1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4TDW9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4TDXZ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4TE2T",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CYOCVNZ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CZON71E",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CZON77M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5CXM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZKY",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B802K",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B803Q",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B804M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D10UE7X",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D10UEAH",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D10UEBN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D4ZPYV1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D4ZPZAL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D506MXL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D506MZ1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  "desc": null,
                                  "nomCampaign": "Renove al mejor precio con descuento",
                                  "codCampaign": "1-17006978323",
                                  "detalleProductos": [
                                    {
                                      "idProducto": "1-6SBTRUM",
                                      "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                      "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                      "codSAP": "3100348",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1R00",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1R00",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-89KAQCQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-95CPZ4J",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9PDSTO8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9Z0XJFS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A3IO19F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A8BW6TE",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A8IXS1H",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A8J53PX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AA7E4VI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ABBHZWG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ABQDV1S",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ABQDV3M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AHE7TF9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ARAKHCX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AS2F3XD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV3NKTY",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV47UBK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV47UDE",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AZHCYYO",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AZHCZ1U",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AZHN0AU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3FITOB",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B41Z59C",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B45AQ55",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7ETW5D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B8BRL7B",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBPRDUC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBPRDWU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBPRE06",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBWIJ51",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBWIJ6P",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGL7GKS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGL7GNQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGL7GOM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGLMNSU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBF7",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBI1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBLP",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBQ9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BPRX7AP",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BPWL7L1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQDX6E8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSQ0QTB",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUPZ4M2",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUPZ4QK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BVUO2F3",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YR8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C2UNGW8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50A346",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50KE3U",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C5AM2TV",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C99NFWL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C99NG2W",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C99NGE8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CEFX6Z5",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CEFX73N",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CIC58SN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CIC58WN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFJPN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFJTX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJZHMPN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHPD4F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2TI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPI8CLU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPJ53PK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPJ53WA",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQ2K80D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW3Y43D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW3Y4IU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4E7BC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5D0Q",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5D64",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5DA4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZR8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZTK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZYQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZZM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B800I",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0Y63Y7",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0Y63ZD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D4ZPYRL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6WFDTP",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "idUser": "600453846",
                              "saldoDisponible": null,
                              "campaignNum": [
                                {
                                  "desc": null,
                                  "nomCampaign": "Venta a Plazos PDV TV Top Riesgo",
                                  "codCampaign": "1-20848897119",
                                  "detalleProductos": [
                                    {
                                      "idProducto": "1-6SBTRUM",
                                      "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                      "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                      "codSAP": "3100348",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-7GI98ZC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-951L5A1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-951T82O",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HFEZGV",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HPZX11",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HPZX5F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9HPZX85",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9Z0FTZG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AIKZDAK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AIKZDK0",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV47UJ4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3QM0QD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3TOQIC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3U2T7I",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3U2TIC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B46UDN9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7ETWCB",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7EZAX1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7EZB7X",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGAYTIX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGBQLHJ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGCPLEX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BN2LQJX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BPWL7C1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQDD0C1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQDD0IX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSFAFAD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSFAFHF",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSI1T7L",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSI1T8H",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSQ0QWR",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BVQS3NN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BVRJY0Z",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q41HS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YP6",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YS4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CAY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CAY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YUG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YYK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0SFMUT",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0SFMWJ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0SFN1R",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50A32P",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CA8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CA8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50KE1K",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CEGA5GH",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWKWR",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWL0F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWL1V",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJTWL4P",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFJZT",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFK6T",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJYHFZ5",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CB5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CB5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CN0JIMR",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2A8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2HI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2KC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPIHPXI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPIHQ2A",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW3Y4AN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4E7H1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4TDW9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4TDXZ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4TE2T",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CBU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CBU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CYOCVNZ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CZON71E",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CZON77M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5CXM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZKY",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B802K",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B803Q",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B804M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D10UE7X",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D10UEAH",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D10UEBN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CC8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CC8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D4ZPYV1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D4ZPZAL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D506MXL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D506MZ1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R9CCJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R9CCJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  "desc": null,
                                  "nomCampaign": "Renove al mejor precio con descuento",
                                  "codCampaign": "1-17006978323",
                                  "detalleProductos": [
                                    {
                                      "idProducto": "1-6SBTRUM",
                                      "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                      "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                      "codSAP": "3100348",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1R00",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1R00",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-89KAQCQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-95CPZ4J",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9PDSTO8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9Z0XJFS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A3IO19F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A8BW6TE",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A8IXS1H",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A8J53PX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AA7E4VI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ABBHZWG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ABQDV1S",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ABQDV3M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AHE7TF9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ARAKHCX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AS2F3XD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV3NKTY",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV47UBK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV47UDE",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AZHCYYO",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AZHCZ1U",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AZHN0AU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B3FITOB",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B41Z59C",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B45AQ55",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B7ETW5D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B8BRL7B",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBPRDUC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBPRDWU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBPRE06",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBWIJ51",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BBWIJ6P",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGL7GKS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGL7GNQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGL7GOM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BGLMNSU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBF7",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBI1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBLP",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJJBQ9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BPRX7AP",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BPWL7L1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQDX6E8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BSQ0QTB",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUPZ4M2",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUPZ4QK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BVUO2F3",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0Q7YR8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C2UNGW8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50A346",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50KE3U",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C5AM2TV",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C99NFWL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C99NG2W",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C99NGE8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CEFX6Z5",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZ9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZ9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CEFX73N",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CIC58SN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CIC58WN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFJPN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJUFJTX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CJZHMPN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHPD4F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPHV2TI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPI8CLU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPJ53PK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QYS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QYS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CPJ53WA",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQ2K80D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW3Y43D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QXU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QXU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW3Y4IU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CW4E7BC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QY7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QY7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5D0Q",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5D64",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B5DA4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZR8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZTK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZYQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B7ZZM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0B800I",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0Y63Y7",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D0Y63ZD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D4ZPYRL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6WFDTP",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D7R1QZX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D7R1QZX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ],
                          "error": {
                            "code": 107,
                            "message": "Error en el MDW 85205",
                            "description": "CORE_ERR-000004 Falta el campo Login en el mensaje",
                            "infoURL": null,
                            "details": []
                          }
                        }
                        
                      }
                );
        }
    }

    // Registration
    angular.module('commercialCampaignsSrv', [])
        .service('commercialCampaignsSrv', OrangeFeSARQ.Services.CommercialCampaignsSrv);
}
