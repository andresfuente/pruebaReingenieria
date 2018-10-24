module OrangeFeSARQ.Services {
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
        private typeMulticomparatorRenove: boolean = true;

        private billingAccountStore: OrangeFeSARQ.Services.BillingAccountStoreSrv;

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
            srv.billingAccountStore = $injector.get('billingAccountStoreSrv');
        }
        getTerminalDataMulticomparator(
            rate: ratesComparator.Models.Rate,
            terminal,
            isExistingCustomer: number,
            commercialAction: string,
            portabilityOrigin: string,
            riskLevel: string,
            channel: string,
            profile: string,
            nameSgmr: string,
            typeMulticomparator: string
        ) {
            let vm = this;
            switch (typeMulticomparator) {
                case "renove":
                    vm.typeMulticomparatorRenove = true
                    break;
                default:
                    vm.typeMulticomparatorRenove = false;
            }
            return vm.getTerminalData(rate, terminal, isExistingCustomer, commercialAction, portabilityOrigin, riskLevel, channel, profile, nameSgmr)
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
            nameSgmr: string,
            creditLimit?: number
        ) {
            let vm = this;
            if (riskLevel === 'bajo' || riskLevel === 'medio') {
                riskLevel += ',alto';
            }
            if (commercialAction.toLowerCase() === 'migracion') {
                portabilityOrigin = 'todos';
                nameSgmr = '';
            }

            vm.setCustomerData();
            vm.setStoreProvince();

            let clientGeolocation = 'Madrid'
            const currentBillingAddress = vm.billingAccountStore.getCurrentBillingAddress()
            if(currentBillingAddress && currentBillingAddress.stateOrProvince) {
                clientGeolocation = currentBillingAddress.stateOrProvince
            }

            // CABECERA PANGEA
            // let _headers = {
            //     'Geolocation-local': vm.storeProvince.toUpperCase(),
            //     'Geolocation-client': vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase()
            // };
            // CABECERA HASHMAP
            let _headers = new HashMap<string, string>();
            _headers.set('Geolocation-local', vm.storeProvince ? vm.storeProvince : 'Madrid');
            _headers.set('Geolocation-client', clientGeolocation.toUpperCase());

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
                fields: 'deviceOffering',
                creditLimit: creditLimit
            }; 

            if (creditLimit === undefined || creditLimit === null) {
                delete params.creditLimit;
            }

            // Prepago   
            if (sessionStorage.getItem('commercialData')) {
                let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
                let commercialActIndex = vm.getSelectedCommercialAct();
                if (commercialActIndex !== -1 && commercialData[commercialActIndex].ospCartItemSubtype && commercialData[commercialActIndex].ospCartItemSubtype === 'prepago') {
                    if (commercialAction === 'portabilidad') {
                        delete params.portabilityOrigin;
                    }
                }
            }
            // Cliente existente para Renove   
            if (sessionStorage.getItem('commercialData')) {
                let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
                let commercialActIndex = vm.getSelectedCommercialAct();
                if (commercialActIndex !== -1 && commercialData[commercialActIndex].ospCartItemType && commercialData[commercialActIndex].ospCartItemType.toLowerCase() === 'renove' && vm.typeMulticomparatorRenove) {
                    delete params.isExistingCustomer;
                    delete params.portabilityOrigin;
                    delete params.riskLevel;
                    delete params.profile;
                    delete params.creditLimit;
                }
            }

            return vm.httpCacheGeth(vm.genericConstant.getTerminalDetails, { queryParams: params }, _headers
            ).then((response) => {
                if (response.data.length > 0) {
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
        * @name ratesComparator.Services:RatesComparatorSrv#getSelectedCommercialAct
        * @methodOf OrangeFeSARQ.Services:RatesComparatorSrv
        * @description
        * @return {boolean} Retorna el indice del commercialData que se esta modificando,
        * en caso contrario retorna -1
        */
        getSelectedCommercialAct(): number {
            let commercialData = [];
            commercialData = JSON.parse(sessionStorage.getItem('commercialData'));

            return _.findIndex(commercialData, function (currentCommercialAct) {
                return currentCommercialAct.ospIsSelected === true;
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
                    let currentAct: any = _.find(commercialData, { 'ospIsSelected': true });

                    if (currentAct !== null && currentAct.rates && currentAct.rates.length > 0) {
                        let movilFijoRate: any = _.find(currentAct.rates, function (rate: any) {
                            if (rate.siebelId === siebelId && rate.typeService.toUpperCase() === 'MOVIL_FIJO') {
                                return rate;
                            }
                        });

                        let movilRate: any = _.find(currentAct.rates, function (rate: any) {
                            if (rate.siebelId === siebelId && rate.typeService.toUpperCase() !== 'MOVIL_FIJO') {
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

        /**
         * @ngdoc method
         * @name ratesComparatorSrv.Services:RatesComparatorSrv#getIdTechnologyString
         * @methodOf ratesComparatorSrv.Services:RatesComparatorSrv
         * @param {Array<string>} tecnologyList lista de tecnologias (id)
         * @description
         * Devuelve el listado de ids de las tecnologias como string  
         */
        getIdTechnologyString(idTechnologyList) {
            let technologyListString = '';
            for (let technology in idTechnologyList) {
                if ((idTechnologyList.length - 1).toString() === technology && idTechnologyList[technology]) {
                    technologyListString += idTechnologyList[technology];
                } else if (idTechnologyList[technology]) {
                    technologyListString += idTechnologyList[technology] + ',';
                }
            }
            return technologyListString;
        }

        /** @ngdoc method
         * @name ratesComparatorSrv.Services:RatesComparatorSrv#getSpecificationDataComparator
         * @methodOf ratesComparatorSrv.Services:RatesComparatorSrv
         * @param {string} productType tipo de los productos a consultar (rate)
         * @param {string} clientSegment segmento a consultar (Residencial/Empresas)
         * @param {string} contractType tipo de contrato (POSPAGO/PREPAGO)
         * @param {string} commercialAction acción comercial (renove | alta | portabilidad | migracion)
         * @param {boolean} isExistingCustomer es cliente existente?
         * @param {Array<string>} tecnologyList lista de tecnologias (id)
         * @param {string} ratesIdListString lista de tarifas (idBundle) a consultar
         * @param {string} releatedRatesClient Tarifas para el idParqueList
         * @description
         * Consulta al productSpecification del catalogo la información de las tarifas segun los parámetros de entrada
         */
        getSpecificationDataComparator(categoryParam: string, productType: string, clientSegment: string,
            contractType: string, commercialAction: string, isExistingCustomer: string, technologyList: Array<string>,
            ratesIdListString: string, releatedRatesClient: string, pack?: string, type?: string, defaultTechnology?: string, bucketId?: string): ng.IPromise<{} | void> {
            let vm = this;
            let technologyString = '';
            let ratesString = '';
            if (technologyList) {
                technologyString = vm.getIdTechnologyString(technologyList);
            }
            if (ratesIdListString) {
                ratesString = vm.getRatesString(ratesIdListString);
            }
            let params = {
                category: categoryParam, // Categoría [ Convergente | Convergente_NAC | Fijo | Movil | Mundo | Holiday ]
                productType: productType, // Tipo de producto (rate)
                segment: clientSegment, // Segmento del cliente (Residencial/Empresas),
                contractType: contractType, // POSPAGO/PREPAGO
                idOfertaComercialList: ratesString, // Listado de Id's de tarifas
                idTecnologiaList: technologyString, // Listado de id de tecnologia
                commercialAction: commercialAction, // Tipo de acto comercial
                isExistingCustomer: isExistingCustomer, // Cliente existente?,
                idParqueList: releatedRatesClient, // Tarifas del cliente
                pack: pack, // Pack de las tarifas
                type: type, // [movil/ movilfijo]
                defaultTechnology: defaultTechnology,
                bucketId: bucketId
            };

            if (!params.bucketId) {
                delete params.bucketId;
            }

            if ((categoryParam !== 'Convergente' && categoryParam !== 'Convergente_NAC') || defaultTechnology === 'Y') {
                delete params.idTecnologiaList;
            }
            if (ratesIdListString === '') {
                delete params.idOfertaComercialList;
            }
            if (technologyString === '') {
                delete params.idTecnologiaList;
            }
            if (!releatedRatesClient || releatedRatesClient === '') {
                delete params.idParqueList;
            }


            // CABECERA PANGEA
            // let _headers = {
            //     'Geolocation-local': vm.storeProvince.toUpperCase(),
            //     'Geolocation-client': vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase()
            // };
            // CABECERA HASHMAP
            vm.setCustomerData();
            vm.setStoreProvince();

            let clientGeolocation = 'Madrid'
            const currentBillingAddress = vm.billingAccountStore.getCurrentBillingAddress()
            if(currentBillingAddress && currentBillingAddress.stateOrProvince) {
                clientGeolocation = currentBillingAddress.stateOrProvince
            }

            let _headers = new HashMap<string, string>();
            _headers.set('Geolocation-local', vm.storeProvince ? vm.storeProvince : 'Madrid');
            _headers.set('Geolocation-client', clientGeolocation.toUpperCase());

            return vm.httpCacheGeth(vm.genericConstant.getRates + '/' + vm.genericConstant.brand + '/productSpecificationv2View/OSP',
                { queryParams: params }, _headers)
                .then((response) => {
                    return {
                        specificationData: response.data
                    };
                })
                .catch((error) => {
                    throw error;
                });
        }

        /** @ngdoc method
         * @name ratesComparatorSrv.Services:RatesComparatorSrv#getOfferingDataComparator
         * @methodOf ratesComparatorSrv.Services:RatesComparatorSrv
         * @param {string} productType tipo de los productos a consultar (rate)
         * @param {string} clientSegment segmento a consultar (Residencial/Empresas)
         * @param {string} contractType tipo de contrato (POSPAGO/PREPAGO)
         * @param {string} commercialAction acción comercial (renove | alta | portabilidad | migracion)
         * @param {boolean} isExistingCustomer es cliente existente?
         * @param {Array<string>} tecnologyList lista de tecnologias (id)
         * @param {string} ratesIdListString lista de tarifas (idBundle) a consultar
         * @param {string} releatedRatesClient Tarifas para el idParqueList
         * @description
         * Consulta al productOffering del catalogo la información de las tarifas segun los parámetros de entrada
         */
        getOfferingDataComparator(categoryParam: string, productType: string, clientSegment: string,
            contractType: string, commercialAction: string, isExistingCustomer: string, specificationData, technologyList,
            ratesIdListString: string, releatedRatesClient: string, pack?: string, type?: string, defaultTechnology?: string, bucketId?: string) {
            let srv = this;
            let technologyString = '';
            let ratesString = '';
            if (ratesIdListString) {
                ratesString = srv.getRatesString(ratesIdListString);
            }
            if (technologyList) {
                technologyString = srv.getIdTechnologyString(technologyList);
            }
            let params = {
                category: categoryParam, // Categoría [ Convergente | Convergente_NAC | Fijo | Movil | Mundo | Holiday ]
                productType: productType, // Tipo de producto (rate)
                segment: clientSegment,  // Segmento del cliente (Residencial/Empresas)
                contractType: contractType, // POSPAGO/PREPAGO
                idOfertaComercialList: ratesString, // Listado de Id's de tarifas 
                idTecnologiaList: technologyString, // Listado de id de tecnologia
                commercialAction: commercialAction, // Tipo de acto comercial
                isExistingCustomer: isExistingCustomer, // Cliente existente?
                idParqueList: releatedRatesClient, // Tarifas del cliente
                pack: pack,
                type: type,
                defaultTechnology: defaultTechnology,
                bucketId: bucketId
            };

            if (!params.bucketId) {
                delete params.bucketId;
            }

            if ((categoryParam !== 'Convergente' && categoryParam !== 'Convergente_NAC') || defaultTechnology === 'Y') {
                delete params.idTecnologiaList;
            }

            if (ratesIdListString === '') {
                delete params.idOfertaComercialList;
            }
            if (technologyString === '') {
                delete params.idTecnologiaList;
            }
            if (!releatedRatesClient || releatedRatesClient === '') {
                delete params.idParqueList;
            }


            // CABECERA PANGEA
            // let _headers = {
            //     'Geolocation-local': srv.storeProvince.toUpperCase(),
            //     'Geolocation-client': srv.customerProvince ? srv.customerProvince.toUpperCase() : srv.storeProvince.toUpperCase()
            // };
            // CABECERA HASHMAP
            let _headers = new HashMap<string, string>();
            srv.setCustomerData();
            srv.setStoreProvince();

            let clientGeolocation = 'Madrid'
            const currentBillingAddress = srv.billingAccountStore.getCurrentBillingAddress()
            if(currentBillingAddress && currentBillingAddress.stateOrProvince) {
                clientGeolocation = currentBillingAddress.stateOrProvince
            }

            _headers.set('Geolocation-local', srv.storeProvince ? srv.storeProvince.toUpperCase() : 'Madrid');
            _headers.set('Geolocation-client', clientGeolocation.toUpperCase());

            return srv.httpCacheGeth(srv.genericConstant.getRates + '/' + srv.genericConstant.brand + '/productOfferingv2View/OSP',
                { queryParams: params }, _headers)
                .then((response) => {
                    let rates: ratesParent.Models.Rates = new ratesParent.Models.Rates();
                    rates.loadRates(specificationData, response.data);
                    return rates;
                })
                .catch((error) => {
                    throw error;
                });

        }

        /**
         * @ngdoc method
         * @name ratesComparatorSrv.Services:RatesParentSrv#getRatesString
         * @methodOf ratesComparatorSrv.Services:RatesComparatorSrv
         * @param {Array<Object>} ratesList lista de tarifas (idBundle) a transformar
         * @description
         * Devuelve el listado de idBundle de las tarifas como string  
         */
        getRatesString(ratesList) {
            let ratesListString = '';
            for (let rate in ratesList) {
                if ((ratesList.length - 1).toString() === rate && ratesList[rate].bundleId) {
                    ratesListString += ratesList[rate].bundleId;
                } else if (ratesList[rate].bundleId) {
                    ratesListString += ratesList[rate].bundleId + ',';
                }
            }
            return ratesListString;
        }

    }
}
