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
                            "nomCampaign": "Renove VAP Canal",
                            "codCampaign": "1-13095878118",
                            "detalleProductos": [
                              {
                                "idProducto": "1-ABOBOTM",
                                "descripcionComercial": "ALCATEL 2051 PLATA",
                                "descripcionSAP": "ALCATEL 2051 PLATA",
                                "codSAP": "3001441",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-ABOEA02",
                                "descripcionComercial": "ALCATEL 2008 PLATA",
                                "descripcionSAP": "ALCATEL 2008 PLATA",
                                "codSAP": "3001495",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B78Y9BX",
                                "descripcionComercial": "ALCATEL 2038 NEGRO",
                                "descripcionSAP": "ALCATEL 2038 NEGRO",
                                "codSAP": "3001738",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B2H1M60",
                                "descripcionComercial": "ORANGE GAMA 203 NEGRO",
                                "descripcionSAP": "ORANGE GAMA 203 NEGRO",
                                "codSAP": "3001739",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHWD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHWD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-6SBTRUM",
                                "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                "codSAP": "3100348",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHWE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHWE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-94UPABO",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHWA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHWA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-991T57L",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHWB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHWB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9PQ67NI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHWC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHWC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9YZ5PIS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHW9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHW9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A2UQKRE",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHW8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHW8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A8IOQ1M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-A8IOQ46",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AEVEKNC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AS86850",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHW7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHW7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-AV8QU12",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B0KRKIA",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHU7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHU7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B0L2TPQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B0LBGKL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHU8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHU8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B0LBGLH",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B0LBGMN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B47G9EG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B47G9FW",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B8MZEEK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BCIHFZ2",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BCWDLQ4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BCWDLRA",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BCWDLS6",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BH9E8GU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BNGZL3K",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BNGZL4G",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOITIBO",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJ80CG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJ80LE",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJPJMO",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BOJPJQC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQN6XLO",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQN6XMU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHU9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHU9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQN6XNQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQN6XOM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQN6XRK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQN6XUG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUVDS1C",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUVDS34",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHV4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHV4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUVDS40",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUVDS4W",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUVDS6C",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUVDS78",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0UTY7U",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0UTY9A",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHV3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHV3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CAUK50W",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CAUK51Q",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHV7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHV7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CAUK52K",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHV8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHV8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CAUK53E",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHV9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHV9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CAUK54S",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CAUK55M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CENYYOI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CENYYPC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CENYYQ6",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CENYYR0",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CENYYRU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CENYYTS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKBSAA8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKBSAB2",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHU1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHU1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKBSABW",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHU2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHU2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKBSAD0",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKBSADU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHU0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHU0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKBSAEY",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHU4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHU4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKBSAFS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHU3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHU3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKBSAGM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJIQMG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJIQNK",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJIQQ2",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHV1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHV1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJIQQW",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHV2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHV2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWADU1G",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWADU2A",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWADU48",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHU5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHU5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWADU66",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHU6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHU6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWADU70",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D175AAW",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D175AC0",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHUX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHUX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D175AD4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHV0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHV0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D175ADY",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHV5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHV5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D175AES",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHV6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHV6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D175AFW",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D175AIE",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D17PLDS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D17PLEM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHW0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHW0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D17PLFQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHW1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHW1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6O3GL8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6O3GM2",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6O3GNG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6O3GOA",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6P3PHC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHTY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHTY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6P3PI6",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6P3PJ0",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHVI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHVI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6P3PJU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHW2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHW2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6P3PKO",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHW3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHW3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6P3PLS",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHW4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHW4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6P3PMM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHW5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHW5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6P3PNG",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D72IHW6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D72IHW6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "desc": null,
                            "nomCampaign": "Renove VAP PDV TV y objetos conectados.",
                            "codCampaign": "1-19975409141",
                            "detalleProductos": [
                              {
                                "idProducto": "1-6SBTRUM",
                                "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                "codSAP": "3100348",
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IM2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IM2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-9YYYF4G",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762II6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762II6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B4A1G9A",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B4A1GAC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-B4A1GAV",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BCIHG60",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IJX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IJX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BCIHG7A",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IJV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IJV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BH9P31D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BQNTXY9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IK1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IK1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUZ04VI",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IK3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IK3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUZG4LM",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IK6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IK6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BUZG4NU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IK5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IK5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-BWDFF9Q",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IL9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IL9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0VLOAN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKB",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKB",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0VLOBR",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKA",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKA",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0VLOEJ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IL7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IL7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C0VLOH1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IL1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IL1",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C50VPVX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IJW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IJW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C51CTS8",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IK2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IK2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C51CTWO",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILR",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILR",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C51CU6O",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C51NKUQ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IL6",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IL6",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C51NL14",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IL5",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IL5",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-C51NL50",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IL4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IL4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CENYZ63",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IL2",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IL2",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKBSAHL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKCA4YX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IK8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IK8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKCA51D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IK4",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IK4",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKCA54B",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IL8",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IL8",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CKCA57L",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJIQS5",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILQ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILQ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJUDJN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IJY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IJY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJUDM1",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IK0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IK0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJUDNN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJUDOZ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKL",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKL",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJUDQL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJUDRX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILK",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILK",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CQJUDUB",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IL3",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IL3",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWB4Y03",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWB4Y15",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILP",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILP",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWB4Y39",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IK7",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IK7",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWB4Y4B",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IK9",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IK9",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWB4Y5D",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWB4Y6F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKN",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKN",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CWB4Y7R",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILC",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILC",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CZPA5M2",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CZPA5R0",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-CZPA5SC",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D181AEL",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D181AFN",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILS",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILS",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D181AI3",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILT",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILT",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D181AJ5",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILU",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILU",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D18HH4F",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILV",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILV",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D18HH61",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKG",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKG",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D18HH7N",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKI",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKI",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D18HH99",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKH",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKH",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D18HHBZ",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKJ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKJ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6P3PRF",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IJZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IJZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R22ST",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKO",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKO",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R22TV",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IKZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IKZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R22UX",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IL0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IL0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R22W9",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILD",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILD",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R22XB",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILE",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILE",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R22YD",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILF",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILF",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R22ZU",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILM",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILM",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R237K",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILW",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILW",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R238M",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILX",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILX",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R239O",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILY",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILY",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R23B0",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762ILZ",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762ILZ",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R23C2",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IM0",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IM0",
                                    "valorPuntos": 0,
                                    "valorEruros": 0
                                  }
                                ]
                              },
                              {
                                "idProducto": "1-D6R23D4",
                                "descripcionComercial": null,
                                "descripcionSAP": null,
                                "codSAP": null,
                                "offertDetails": [
                                  {
                                    "codOferta": "1-D762IM1",
                                    "valorRecarga": null,
                                    "idOfertaCatalogo": "1-D762IM1",
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
                                  "nomCampaign": "Renove VAP Canal",
                                  "codCampaign": "1-13095878118",
                                  "detalleProductos": [
                                    {
                                      "idProducto": "1-ABOBOTM",
                                      "descripcionComercial": "ALCATEL 2051 PLATA",
                                      "descripcionSAP": "ALCATEL 2051 PLATA",
                                      "codSAP": "3001441",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-ABOEA02",
                                      "descripcionComercial": "ALCATEL 2008 PLATA",
                                      "descripcionSAP": "ALCATEL 2008 PLATA",
                                      "codSAP": "3001495",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B78Y9BX",
                                      "descripcionComercial": "ALCATEL 2038 NEGRO",
                                      "descripcionSAP": "ALCATEL 2038 NEGRO",
                                      "codSAP": "3001738",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B2H1M60",
                                      "descripcionComercial": "ORANGE GAMA 203 NEGRO",
                                      "descripcionSAP": "ORANGE GAMA 203 NEGRO",
                                      "codSAP": "3001739",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHWD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHWD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-6SBTRUM",
                                      "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                      "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                      "codSAP": "3100348",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHWE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHWE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-94UPABO",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHWA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHWA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-991T57L",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHWB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHWB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9PQ67NI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHWC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHWC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9YZ5PIS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHW9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHW9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A2UQKRE",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHW8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHW8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A8IOQ1M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-A8IOQ46",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AEVEKNC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AS86850",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHW7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHW7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-AV8QU12",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B0KRKIA",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHU7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHU7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B0L2TPQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B0LBGKL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHU8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHU8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B0LBGLH",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B0LBGMN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B47G9EG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B47G9FW",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B8MZEEK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BCIHFZ2",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BCWDLQ4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BCWDLRA",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BCWDLS6",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BH9E8GU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BNGZL3K",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BNGZL4G",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOITIBO",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJ80CG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJ80LE",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJPJMO",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BOJPJQC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQN6XLO",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQN6XMU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHU9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHU9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQN6XNQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQN6XOM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQN6XRK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQN6XUG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUVDS1C",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUVDS34",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHV4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHV4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUVDS40",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUVDS4W",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUVDS6C",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUVDS78",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0UTY7U",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0UTY9A",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHV3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHV3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CAUK50W",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CAUK51Q",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHV7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHV7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CAUK52K",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHV8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHV8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CAUK53E",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHV9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHV9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CAUK54S",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CAUK55M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CENYYOI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CENYYPC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CENYYQ6",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CENYYR0",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CENYYRU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CENYYTS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKBSAA8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKBSAB2",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHU1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHU1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKBSABW",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHU2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHU2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKBSAD0",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKBSADU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHU0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHU0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKBSAEY",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHU4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHU4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKBSAFS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHU3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHU3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKBSAGM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJIQMG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJIQNK",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJIQQ2",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHV1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHV1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJIQQW",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHV2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHV2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWADU1G",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWADU2A",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWADU48",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHU5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHU5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWADU66",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHU6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHU6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWADU70",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D175AAW",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D175AC0",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHUX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHUX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D175AD4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHV0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHV0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D175ADY",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHV5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHV5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D175AES",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHV6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHV6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D175AFW",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D175AIE",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D17PLDS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D17PLEM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHW0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHW0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D17PLFQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHW1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHW1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6O3GL8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6O3GM2",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6O3GNG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6O3GOA",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6P3PHC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHTY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHTY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6P3PI6",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6P3PJ0",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHVI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHVI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6P3PJU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHW2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHW2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6P3PKO",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHW3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHW3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6P3PLS",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHW4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHW4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6P3PMM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHW5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHW5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6P3PNG",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D72IHW6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D72IHW6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  "desc": null,
                                  "nomCampaign": "Renove VAP PDV TV y objetos conectados.",
                                  "codCampaign": "1-19975409141",
                                  "detalleProductos": [
                                    {
                                      "idProducto": "1-6SBTRUM",
                                      "descripcionComercial": "TRIPLESIM 4G MULTISIM",
                                      "descripcionSAP": "TRIPLESIM 4G MULTISIM",
                                      "codSAP": "3100348",
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IM2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IM2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-9YYYF4G",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762II6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762II6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B4A1G9A",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B4A1GAC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-B4A1GAV",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BCIHG60",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IJX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IJX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BCIHG7A",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IJV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IJV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BH9P31D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BQNTXY9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IK1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IK1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUZ04VI",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IK3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IK3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUZG4LM",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IK6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IK6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BUZG4NU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IK5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IK5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-BWDFF9Q",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IL9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IL9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0VLOAN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKB",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKB",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0VLOBR",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKA",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKA",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0VLOEJ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IL7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IL7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C0VLOH1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IL1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IL1",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C50VPVX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IJW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IJW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C51CTS8",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IK2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IK2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C51CTWO",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILR",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILR",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C51CU6O",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C51NKUQ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IL6",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IL6",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C51NL14",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IL5",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IL5",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-C51NL50",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IL4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IL4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CENYZ63",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IL2",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IL2",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKBSAHL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKCA4YX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IK8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IK8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKCA51D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IK4",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IK4",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKCA54B",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IL8",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IL8",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CKCA57L",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJIQS5",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILQ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILQ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJUDJN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IJY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IJY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJUDM1",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IK0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IK0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJUDNN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJUDOZ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKL",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKL",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJUDQL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJUDRX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILK",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILK",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CQJUDUB",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IL3",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IL3",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWB4Y03",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWB4Y15",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILP",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILP",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWB4Y39",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IK7",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IK7",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWB4Y4B",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IK9",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IK9",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWB4Y5D",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWB4Y6F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKN",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKN",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CWB4Y7R",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILC",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILC",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CZPA5M2",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CZPA5R0",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-CZPA5SC",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D181AEL",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D181AFN",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILS",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILS",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D181AI3",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILT",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILT",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D181AJ5",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILU",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILU",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D18HH4F",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILV",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILV",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D18HH61",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKG",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKG",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D18HH7N",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKI",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKI",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D18HH99",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKH",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKH",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D18HHBZ",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKJ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKJ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6P3PRF",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IJZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IJZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R22ST",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKO",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKO",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R22TV",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IKZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IKZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R22UX",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IL0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IL0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R22W9",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILD",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILD",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R22XB",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILE",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILE",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R22YD",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILF",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILF",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R22ZU",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILM",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILM",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R237K",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILW",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILW",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R238M",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILX",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILX",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R239O",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILY",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILY",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R23B0",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762ILZ",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762ILZ",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R23C2",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IM0",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IM0",
                                          "valorPuntos": 0,
                                          "valorEruros": 0
                                        }
                                      ]
                                    },
                                    {
                                      "idProducto": "1-D6R23D4",
                                      "descripcionComercial": null,
                                      "descripcionSAP": null,
                                      "codSAP": null,
                                      "offertDetails": [
                                        {
                                          "codOferta": "1-D762IM1",
                                          "valorRecarga": null,
                                          "idOfertaCatalogo": "1-D762IM1",
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
