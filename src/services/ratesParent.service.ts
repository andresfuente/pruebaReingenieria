module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:RatesParentSrv
     * @author Isabel Matas
     * @description
     * Servicio del componente contenedor del catalogo tarifas
     */
    export class RatesParentSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        private spinnerBlockSrv;
        private addToShoppingCartSrv: OrangeFeSARQ.Services.AddToShoppingCartSrv;
        private customerProvince: string;
        private storeProvince: string;
        private customerSegment: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
            vm.setCustomerData();
            vm.setStoreProvince();
        }

        setInjections($injector) {
            let vm = this;
            vm.spinnerBlockSrv = $injector.get('spinnerBlockSrv');
            vm.addToShoppingCartSrv = $injector.get('addToShoppingCartSrv');
        }

        /** @ngdoc method
         * @name ratesParent.Services:RatesParentSrv#getSpecificationData
         * @methodOf ratesParent.Services:RatesParentSrv
         * @param {string} categoryParam categoria de las tarifas a consultar
         * @param {string} productType tipo de los productos a consultar (rate)
         * @param {string} clientSegment segmento a consultar (Residencial/Empresas)
         * @param {string} contractType tipo de contrato (POSPAGO/PREPAGO)
         * @param {string} commercialAction acción comercial (renove | alta | portabilidad | migracion)
         * @param {boolean} isExistingCustomer es cliente existente?
         * @param {Array<string>} tecnologyList lista de tecnologias (id)
         * @param {string} ratesIdListString lista de tarifas (idBundle) a consultar
         * @description
         * Consulta al productSpecification del catalogo la información de las tarifas segun los parámetros de entrada
         */
        getSpecificationData(categoryParam: string, productType: string, clientSegment: string,
            contractType: string, commercialAction: string, isExistingCustomer: string, technologyList: Array<string>,
            ratesIdListString: string, pack?: string, type?: string): ng.IPromise<{} | void> {
            let vm = this;
            let technologyString = '';
            if (technologyList) {
                technologyString = vm.getIdTechnologyString(technologyList);
            }
            let params = {
                category: categoryParam, // Familia tarifa 
                productType: productType, // Tipo de producto (rate)
                segment: clientSegment, // Segmento del cliente (Residencial/Empresas),
                contractType: contractType, // POSPAGO/PREPAGO
                idOfertaComercialList: ratesIdListString, // Listado de Id's de tarifas
                idTecnologiaList: technologyString, // Listado de id de tecnologia
                commercialAction: commercialAction, // Tipo de acto comercial
                isExistingCustomer: isExistingCustomer, // Cliente existente?,
                pack: pack, // Pack de las tarifas
                type: type // [movil/ movilfijo]
            };
            // Si la categoria no es convergente se eliminan los parametros para la tecnologia
            if (categoryParam !== 'Convergente') {
                delete params.idTecnologiaList;
            }
            // Si alguna de las listas queda vacia no se pasa como parametro en la llamada
            if (ratesIdListString === '') {
                delete params.idOfertaComercialList;
            }
            if (technologyString === '') {
                delete params.idTecnologiaList;
            }

            // CABECERA PANGEA
            let _headers = {
                'Geolocation-local': vm.storeProvince.toUpperCase(),
                'Geolocation-client': vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase()
            };
            // CABECERA HASHMAP
            // let _headers = new HashMap<string, string>();
            // _headers.set('Geolocation-local', vm.storeProvince ? vm.storeProvince : 'Madrid');
            // _headers.set('Geolocation-client', vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase());

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
         * @name ratesParent.Services:RatesParentSrv#getOfferingData
         * @methodOf ratesParent.Services:RatesParentSrv
         * @param {string} categoryParam categoria de las tarifas a consultar
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
        getOfferingData(categoryParam: string, productType: string, clientSegment: string,
            contractType: string, commercialAction: string, isExistingCustomer: string, specificationData, technologyList,
            ratesIdListString: string, releatedRatesClient: string, pack?: string, type?: string) {
            let srv = this;
            let technologyString = '';
            if (technologyList) {
                technologyString = srv.getIdTechnologyString(technologyList);
            }
            let params = {
                category: categoryParam, // Familia tarifa 
                productType: productType, // Tipo de producto (rate)
                segment: clientSegment,  // Segmento del cliente (Residencial/Empresas)
                contractType: contractType, // POSPAGO/PREPAGO
                idOfertaComercialList: ratesIdListString, // Listado de Id's de tarifas 
                idTecnologiaList: technologyString, // Listado de id de tecnologia
                commercialAction: commercialAction, // Tipo de acto comercial
                isExistingCustomer: isExistingCustomer, // Cliente existente?
                idParqueList: releatedRatesClient, // Tarifas del cliente
                pack: pack,
                type: type
            };
            // Si la categoria no es convergente se eliminan los parametros para la tecnologia            
            if (categoryParam !== 'Convergente') {
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
            let _headers = {
                'Geolocation-local': srv.storeProvince.toUpperCase(),
                'Geolocation-client': srv.customerProvince ? srv.customerProvince.toUpperCase() : srv.storeProvince.toUpperCase()
            };
            // CABECERA HASHMAP
            // let _headers = new HashMap<string, string>();
            // _headers.set('Geolocation-local', srv.storeProvince.toUpperCase());
            // _headers.set('Geolocation-client', srv.customerProvince ? srv.customerProvince.toUpperCase() : srv.storeProvince.toUpperCase());

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

        /** @ngdoc method
         * @name OrangeFeSARQ.Services:RatesParentSrv#getSpecificationData
         * @methodOf ratesParent.Services:RatesParentSrv
         * @param {string} idSvaList Lista de Id's de SVA's separados por coma
         * @description
         * Consulta al productSpecification de la lista de SVA's de la tarifa
         */
        getSVASpecificationData(idSvaList: string): ng.IPromise<{} | void> {
            let srv = this;
            let params = {
                productType: 'sva', // Tipo de producto
                idSvaList: idSvaList, // Lista de Id´s de SVA
            };

            // CABECERA PANGEA
            let _headers = {
                'Geolocation-local': srv.storeProvince.toUpperCase(),
                'Geolocation-client': srv.customerProvince ? srv.customerProvince.toUpperCase() : srv.storeProvince.toUpperCase()
            };
            // CABECERA HASHMAP
            // let _headers = new HashMap<string, string>();
            // _headers.set('Geolocation-local', srv.storeProvince.toUpperCase());
            // _headers.set('Geolocation-client', srv.customerProvince ? srv.customerProvince.toUpperCase() : srv.storeProvince.toUpperCase());

            return srv.httpCacheGeth(srv.genericConstant.getRates + '/' + srv.genericConstant.brand + '/productSpecificationv2View/OSP',
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
         * @name ratesParent.Services:RatesParentSrv#getSVAOfferingData
         * @methodOf ratesParent.Services:RatesParentSrv
         * @param {string} idSvaList Lista de Id's de SVA's separados por coma
         * @param specificationData data del productSpecification del SVA
         * @description
         * Consulta al productOffering de la lista de SVA's de la tarifa
         */
        getSVAOfferingData(idSvaList: string, specificationData) {
            let srv = this;
            let customerSegment = srv.getCustomerSegment();
            let params = {
                productType: 'sva', // Tipo de producto
                idSvaList: idSvaList, // Lista de Id´s de SVA
            };

            // CABECERA PANGEA
            let _headers = {
                'Geolocation-local': srv.storeProvince.toUpperCase(),
                'Geolocation-client': srv.customerProvince ? srv.customerProvince.toUpperCase() : srv.storeProvince.toUpperCase()
            };
            // CABECERA HASHMAP
            // let _headers = new HashMap<string, string>();
            // _headers.set('Geolocation-local', srv.storeProvince.toUpperCase());
            // _headers.set('Geolocation-client', srv.customerProvince ? srv.customerProvince.toUpperCase() : srv.storeProvince.toUpperCase());

            return srv.httpCacheGeth(srv.genericConstant.getRates + '/' + srv.genericConstant.brand + '/productOfferingv2View/OSP',
                { queryParams: params }, _headers)
                .then((response) => {
                    return ratesParent.Models.RateSVA.createSVAList(specificationData, response.data, customerSegment);
                })
                .catch((error) => {
                    throw error;
                });

        }

        filterSVAs(idList: string) {
            let vm = this;

            let params = {
                productType: 'sva',
                idSvaList: idList
            };

            // CABECERA PANGEA
            let _headers = {
                'Geolocation-local': vm.storeProvince.toUpperCase(),
                'Geolocation-client': vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase()
            };
            // CABECERA HASHMAP
            // let _headers = new HashMap<string, string>();
            // _headers.set('Geolocation-local', vm.storeProvince.toUpperCase());
            // _headers.set('Geolocation-client', vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase());

            return vm.httpCacheGeth(vm.genericConstant.getRates + '/' + vm.genericConstant.brand + '/productSpecificationv2View/OSP',
                { queryParams: params }, _headers)
                .then((responseSpecification) => {
                    return vm.httpCacheGeth(vm.genericConstant.getRates + '/' + vm.genericConstant.brand + '/productOffering2View/OSP',
                        { queryParams: params }, _headers)
                        .then((responseOffering) => {
                            return {
                                responseSpecification: responseSpecification.data,
                                responseOffering: responseOffering.data
                            }
                        })
                        .catch((error) => {
                            throw error;
                        });
                })
                .catch((error) => {
                    throw error;
                });
        }

        /** @ngdoc method
         * @name ratesParent.Services:RatesParentSrv#getSpecificationRenewData
         * @methodOf ratesParent.Services:RatesParentSrv
         * @param {string} productType tipo de los productos a consultar (rate)
         * @param {string} clientSegment segmento a consultar (Residencial/Empresas)
         * @param {string} contractType tipo de contrato (POSPAGO/PREPAGO)
         * @param {Array<Object>} ratesList lista de tarifas (idBundle) a consultar
         * @param {Array<string>} tecnologyList lista de tecnologias (id)
         * @description
         * Consulta al productSpecification del catalogo la información de las tarifas
         * para el renove primario segun los parámetros de entrada
         */
        getSpecificationRenewData(productType: string, clientSegment: string, ratesList, technologyList) {
            let vm = this;

            let ratesString = '';
            let technologyString = '';
            if (ratesList) {
                ratesString = vm.getRatesString(ratesList);
            }
            if (technologyList) {
                technologyString = vm.getIdTechnologyString(technologyList);
            }
            let params = {
                productType: productType, // Tipo de producto (rate)
                segment: clientSegment,  // Segmento del cliente (Residencial/Empresas)
                idOfertaComercialList: ratesString, // Listado de idBundle 
                idTecnologiaList: technologyString // Listado de id de tecnologia
            };
            if (ratesString === '') {
                delete params.idOfertaComercialList;
            }
            if (technologyString === '') {
                delete params.idTecnologiaList;
            }

            // CABECERA PANGEA
            let _headers = {
                'Geolocation-local': vm.storeProvince.toUpperCase(),
                'Geolocation-client': vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase()
            };
            // CABECERA HASHMAP
            // let _headers = new HashMap<string, string>();
            // _headers.set('Geolocation-local', vm.storeProvince.toUpperCase());
            // _headers.set('Geolocation-client', vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase());

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
         * @name ratesParent.Services:RatesParentSrv#getSpecificationRenewData
         * @methodOf ratesParent.Services:RatesParentSrv
         * @param {string} productType tipo de los productos a consultar (rate)
         * @param {string} clientSegment segmento a consultar (Residencial/Empresas)
         * @param {string} contractType tipo de contrato (POSPAGO/PREPAGO)
         * @param {Array<Object>} ratesList lista de tarifas (idBundle) a consultar
         * @param {Array<string>} tecnologyList lista de tecnologias (id)
         * @description
         * Consulta al productOffering del catalogo la información de las tarifas
         * para el renove primario segun los parámetros de entrada
         */
        getOfferingRenewData(productType: string, clientSegment: string,
            specificationData, ratesList, technologyList) {
            let vm = this;
            let ratesString = '';
            let technologyString = '';
            if (ratesList) {
                ratesString = vm.getRatesString(ratesList);
            }
            if (technologyList) {
                technologyString = vm.getIdTechnologyString(technologyList);
            }
            let params = {
                productType: productType, // Tipo de producto (rate)
                segment: clientSegment,  // Segmento del cliente (Residencial/Empresas)
                idOfertaComercialList: ratesString, // Listado de id Siebel 
                idTecnologiaList: technologyString // Listado de id de tecnologia
            };
            if (ratesString === '') {
                delete params.idOfertaComercialList;
            }
            if (technologyString === '') {
                delete params.idTecnologiaList;
            }

            // CABECERA PANGEA
            let _headers = {
                'Geolocation-local': vm.storeProvince.toUpperCase(),
                'Geolocation-client': vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase()
            };
            // CABECERA HASHMAP
            // let _headers = new HashMap<string, string>();
            // _headers.set('Geolocation-local', vm.storeProvince.toUpperCase());
            // _headers.set('Geolocation-client', vm.customerProvince ? vm.customerProvince.toUpperCase() : vm.storeProvince.toUpperCase());

            return vm.httpCacheGeth(vm.genericConstant.getRates + '/' + vm.genericConstant.brand + '/productOfferingv2View/OSP',
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
         * @name ratesParent.Services:RatesParentSrv#setCustomerProvince
         * @methodOf ratesParent.Services:MosaicFileSrv
         * @description
         * Establece la provincia del cliente
         */
        setCustomerData() {
            let srv = this;
            srv.customerProvince = 'Madrid'; // REMOVER
            let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            // Si los datos de clientes se encuentran en el session storage
            if (clientData !== null) {
                // Segmento                
                if (clientData.ospCustomerSegment && clientData.ospCustomerSegment.length > 0) {
                    srv.customerSegment = clientData.ospCustomerSegment;
                }
                // Provincia                
                if (clientData.postalContact && clientData.postalContact.stateOrProvince &&
                    clientData.postalContact.stateOrProvince.length > 0) {
                    srv.customerProvince = clientData.postalContact.stateOrProvince;
                }
            }
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
            if (shopInfo !== null && shopInfo.province) {
                vm.storeProvince = shopInfo.province;
            } else {
                vm.storeProvince = 'Madrid';
            }
        }

        /**
         * @ngdoc method
         * @name ratesParent.Services:RatesParentSrv#getRatesString
         * @methodOf ratesParent.Services:MosaicFileSrv
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

        /**
         * @ngdoc method
         * @name ratesParent.Services:RatesParentSrv#getIdTechnologyString
         * @methodOf ratesParent.Services:MosaicFileSrv
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

        /**
         * @ngdoc method
         * @name ratesParent.Services:RatesParentSrv#getCustomerSegment
         * @methodOf ratesParent.Services:MosaicFileSrv
         * @description
         * Devuelve el segmento del cliente 
         */
        getCustomerSegment(): string {
            let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            let defaultData = JSON.parse(sessionStorage.getItem('defaultData'));
            let customerSegment = '';
            if (defaultData && defaultData.ospCustomerSegment) {
                customerSegment = defaultData.ospCustomerSegment;
            }
            if (clientData && clientData.ospCustomerSegment) {
                customerSegment = clientData.ospCustomerSegment;
            }
            return customerSegment;
        }

        /**
         * llamada para validar el carrito que se le envía al servicio
         * @param body
         * @param componentName
         * @returns {IPromise<TResult>}
         */

        generateShoppingCart(rate: ratesParent.Models.Rate, componentName: string) {
            let vm = this;
            vm.addToShoppingCartSrv.putRateInShoppingCart(rate);
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));

            let _search = {
                body: {
                    ospCartItemReqPost: [
                        shoppingCart.cartItem[0]
                    ]
                },
                urlParams: ['ospShoppingCart'],
            };

            return vm.httpPost(vm.genericConstant.shoppingCart, _search, componentName)
                .then(
                    (response) => {
                        return response.data;
                    },
                    (error) => {
                        throw error.data;
                    }
                );
        }

        /**
         * llamada que te devuelve el listado de SVAs utilizando la respuesta del servicio de validación
         * @param body
         * @param componentName
         * @returns {IPromise<TResult>}
         */
        getSvas(body, componentName) {
            let srv = this;

            let _search = {
                body: body,
                urlParams: ['ospShoppingCart', 'cartItemProposal']
            };

            return srv.httpPostFull(srv.genericConstant.shoppingCart, _search, componentName)
                .then(
                    (response) => {
                        return response.data;
                    },
                    (error) => {
                        throw error.data;
                    }
                );
        }

        /**
         * llamada que te devuelve el listado de SVAs utilizando la respuesta del servicio de validación
         * @param {string} originRate tarifa de origen 
         * @returns {IPromise<TResult>}
         * @description Realiza la llamada al end point changeRateListv2 de productCatalog
         */
        changeRateListv2(originRate) {
            let srv = this;
            let ratesIdListString = '';
            let tariffList = [];
            return srv.httpCacheGeth(srv.genericConstant.productCatalog + srv.genericConstant.changeRateList + originRate,
                {}, {})
                .then((response) => {
                    if (response && response.data.error === null && response.data.tariffList) {
                        tariffList = response.data.tariffList;
                        // Se recorre el array de tarifas disponibles para realizar el cambio
                        tariffList.forEach((element, index) => {
                            // Se genera un string con cada uno de los siebelId de las tarifas, separados por coma
                            ratesIdListString += (index === (tariffList.length - 1)) ?
                                element.targetTariffId : element.targetTariffId + ',';
                        });
                        return ratesIdListString;
                    }
                })
                .catch((error) => {
                    throw error;
                });
        }
    }
    angular.module('RatesParentSrv', [])
        .service('RatesParentSrv', OrangeFeSARQ.Services.RatesParentSrv);
}