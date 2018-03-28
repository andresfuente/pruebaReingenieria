module ratesComparator.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name ratesComparator.Services:RatesComparatorSrv
     * @author Isabel Matas
     * @description
     * Servicio del componente comparador de tarifas y terminales
     */
    export class RatesComparatorSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        // Inject vars
        private spinnerBlockSrv;

        public customerSegment;
        public customerProvince;
        public storeProvince;

        /**
         * @ngdoc method
         * @name ratesComparator.Services:RatesComparatorSrv#constructor
         * @methodOf ratesComparator.Services:RatesComparatorSrv
         * @param {Object} $injector
         * @description
         * Incluye las dependencias necesarias e inicializa el servicio
         */
        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        /** @ngdoc method
         * @name ratesComparator.Services:RatesComparatorSrvsetInjections
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf ratesComparator.Services:RatesComparatorSrv
         * @description
         * Incluye las dependencias necesarias
         */
        setInjections($injector) {
            let srv = this;
            srv.spinnerBlockSrv = $injector.get('spinnerBlockSrv');
        }

        /** @ngdoc method
         * @name ratesComparator.Services:RatesComparatorSrv#getTerminalData
         * @methodOf ratesComparator.Services:RatesComparatorSrv
         * @param {ratesComparator.Models.Rate} rate Tarifa
         * @param {Object} terminal Terminal
         * @param {number} isExistingCustomer cliente existente
         * @param {string} commercialAction Tipo de acto comercial [portabilidad/alta/migracion/renove]
         * @param {string} portabilityOrigin Origen de portabilidad [pospago/prepago]
         * @param {string} riskLevel Nivel de riesgo del cliente [alto/medio/bajo]
         * @param {string} channel Canal al que hacer la consulta
         * @param {string} profile Perfil con el que hacer la consulta
         * @param {string} priceType Tipo de precio con el que hacer la consulta
         * @param {string} nameSgmr Nombre de la campaña
         * @description
         * Consulta al deviceCatalog la informacion del terminal cruzado con la tarifa que se pasan como parametro
         */
        getTerminalData(
            rate: ratesComparator.Models.Rate,
            terminal,
            isExistingCustomer: number,
            commercialAction: string,
            portabilityOrigin: string,
            riskLevel: string,
            channel: string,
            profile: string,
            nameSgmr: string

        ) {
            let vm = this;
            if(riskLevel === 'bajo' || riskLevel === 'medio') {
                riskLevel += ',alto';
            }
            if(commercialAction.toLowerCase() === 'migracion') {
                portabilityOrigin = 'todos';
                nameSgmr = '';
            }

            vm.setCustomerData();
            vm.setStoreProvince();

            // CABECERA PANGEA
            let _headers = {
                'Geolocation-local': vm.storeProvince.toUpperCase(),
                'Geolocation-client': vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase()
            };
            // CABECERA HASHMAP
            // let _headers = new HashMap<string, string>();
            // _headers.set('Geolocation-local', vm.storeProvince ? vm.storeProvince : 'Madrid');
            // _headers.set('Geolocation-client', vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase());

            let params = {
                channel: channel,
                isExistingCustomer: isExistingCustomer,
                commercialAction: commercialAction.toLowerCase(),
                portabilityOrigin: portabilityOrigin,
                deviceOfferingId: terminal.siebelId,
                riskLevel: riskLevel,
                relatedProductOffering: rate.siebelId,
                profile: profile,
                'deviceOffering.category.name': 'primario',
                campaignName: nameSgmr,
                fields: 'deviceOffering'
            };
            return vm.httpCacheGeth(vm.genericConstant.getTerminalDetails, {queryParams: params}, _headers
                    ).then((response) => {
                        if(response.data.length > 0) {
                            let data = {
                                rateSiebelId: rate.siebelId,
                                terminalsiebelId: terminal.siebelId,
                                deviceOffering: response.data[0].deviceOffering
                            };
                            return data;

                        } else {
                            let data = {
                                rateSiebelId: rate.siebelId,
                                terminalsiebelId: terminal.siebelId,
                                deviceOffering: response.data
                            };
                            return data;
                        }

            }).catch((error) => {
                    throw error;
              });
        }
        /**
         * @ngdoc method
         * @name ratesComparator.Services:RatesComparatorSrv#setCustomerProvince
         * @methodOf ratesComparator.Services:RatesComparatorSrv
         * @description
         * Establece la provincia y el segmento del cliente
         */
        setCustomerData() {
            let vm = this;
            let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            // Si los datos de clientes se encuentran en el session storage
            if (clientData !== null) {
                // Segmento                
                if (clientData.ospCustomerSegment && clientData.ospCustomerSegment.length > 0) {
                    vm.customerSegment = clientData.ospCustomerSegment;
                }
                // Provincia                
                if (clientData.postalContact && clientData.postalContact.stateOrProvince &&
                    clientData.postalContact.stateOrProvince.length > 0) {
                        vm.customerProvince = clientData.postalContact.stateOrProvince;
                }
            }
        }

        /**
         * @ngdoc method
         * @name ratesComparator.Services:RatesComparatorSrv#getStoreProvince
         * @methodOf ratesComparator.Services:RatesComparatorSrv
         * @description
         * Establece el nombre de la provincia de la tienda  
         */
        setStoreProvince() {
            let vm = this;
            let shopInfo = JSON.parse(sessionStorage.getItem('shopInfo'));
            if (shopInfo !== null && shopInfo.province) {
                vm.storeProvince = shopInfo.province;
            } else {
                vm.storeProvince = 'Madrid';
            }
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:RatesComparator#getClientType
         * @methodOf OrangeFeSARQ.Services:RatesComparator
         * @param {string} siebelId idSiebel de la tarifa con la que se llama a la OT
         * @description
         * Calcula el tipo de cliente con el que se hace la llamada a la OT         
         */
        getClientType(siebelId: string) {
            let vm = this;
            let type = '2'; // Por defecto es el valor que se devuelve

            let cv = sessionStorage.getItem('cv');

            if (!cv || cv === null || cv === undefined) {
                let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));

                // Buscamos el tipo de esta tarifa en commercial data
                if (commercialData && commercialData.length > 0) {
                    let currentAct : any = _.find(commercialData, {'ospIsSelected': true});

                    if (currentAct !== null && currentAct.rates && currentAct.rates.length > 0) {
                        let movilFijoRate : any = _.find(currentAct.rates, function (rate : any) {
                            if (rate.siebelId === siebelId && rate.typeService === 'movil_fijo') {
                                return rate;
                            }
                        });

                        let movilRate : any = _.find(currentAct.rates, function (rate : any) {
                            if (rate.siebelId === siebelId && rate.typeService === 'movil') {
                                return rate;
                            }
                        });

                        if (movilFijoRate !== undefined && movilFijoRate !== null) {
                            type = '2';
                        } else if (movilRate !== undefined && movilRate !== null) {
                            type = '0';
                        }
                    }
                }
            } else {
                let clientData = JSON.parse(sessionStorage.getItem('clientData'));

                if (clientData && clientData.clientType) {
                    type = clientData.clientType;
                }
            }

            return type;
        }
    }
}
