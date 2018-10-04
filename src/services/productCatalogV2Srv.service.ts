module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:ProductCatalogV2Srv
     * @author Juan Ruiz & Joaquín Casas
     * @description
     * Servicio del productCatalog
     */
    export class ProductCatalogV2Srv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogV2Srv#constructor
         * @methodOf OrangeFeSARQ.Services:ProductCatalogV2Srv
         * @param {Object} $injector componente que necesita el parent injector
         * @description
         * Incluye las dependencias necesarias e inicializa el servicio
         */
        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogV2Srv#setInjections
         * @methodOf OrangeFeSARQ.Services:ProductCatalogV2Srv
         * @param {Object} $injector componente que necesita el parent injector.
         * @description
         * Incluye las dependencias necesarias
         */
        setInjections($injector) {
            let vm = this;
        }


        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogV2Srv#getProductOfferingv2View
         * @methodOf OrangeFeSARQ.Services:ProductCatalogV2Srv
         * @description
         * Obtiene los datos del offering
         */
        getProductOfferingv2View(idOfertaComercialList, productType, idTecnologiaList, componentName) {
            let vm = this;

            let _search = {
                queryParams: {
                    idOfertaComercialList,
                    productType,
                    idTecnologiaList,
                },
                urlParams: [vm.genericConstant.brand, 'productOfferingv2View/OSP']
            };

            return vm.httpCacheGett(vm.genericConstant.productCatalog, _search, componentName)
                .then((response) => {
                    return response.data;

                })
                .catch((error) => {
                    return error;
                });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogV2Srv#getProductCatalog
         * @methodOf OrangeFeSARQ.Services:ProductCatalogV2Srv
         * @param {Object} channel información del carrito
         * @param 
         * @param {string} componentName nombre del componente
         * @description
         * Obtiene los datos del specification de un producto a través de Solr
         */
        getProductCatalogSpecificationV2(contractType, category, segment, commercialAction,
            productType, isExistingCustomer, idOfertaComercialList, componentName) {
            let vm = this;

            let _search = {
                queryParams: {
                    contractType: contractType,
                    category: category,
                    segment: segment,
                    commercialAction: commercialAction,
                    productType: productType,
                    isExistingCustomer: isExistingCustomer,
                    idOfertaComercialList: idOfertaComercialList
                },
                urlParams: [vm.genericConstant.brand, 'productSpecificationv2View/OSP']
            };

            return vm.httpCacheGett(vm.genericConstant.productCatalog, _search, componentName)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error;
                });
        }

        getProductCatalogPrincipalLineV2(idOfertaComercialList) {
            let vm = this;

            let _search = {
                queryParams: {
                    idOfertaComercialList: idOfertaComercialList,
                    productType: 'rate'
                },
                urlParams: [vm.genericConstant.brand, 'productSpecificationv2View/OSP']
            };

            return vm.httpCacheGett(vm.genericConstant.productCatalog, _search)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error;
                });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogV2Srv#getProductCatalogOfferingV2
         * @methodOf OrangeFeSARQ.Services:ProductCatalogV2Srv
         * @param {Array} svasList lista de SVAS
         * @param 
         * @param {string} componentName nombre del componente
         * @description
         * Obtiene los datos de los SVAS recomendados de una tarifa
         */
        getProductCatalogSVAS(svasList, isExistingCustomer, segment, commercialAction, idBundle, componentName) {
            let vm = this;

            let _search = {
                queryParams: {
                    commercialAction: commercialAction,
                    productType: 'sva',
                    idSvaList: svasList,
                    segment: segment,
                    isExistingCustomer: isExistingCustomer,
                    bundleId: idBundle
                },
                urlParams: [vm.genericConstant.brand, 'productOfferingv2View/OSP']
            };

            return vm.httpCacheGett(vm.genericConstant.productCatalog, _search, componentName)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error;
                });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogV2Srv#getSpecificationSVAS
         * @methodOf OrangeFeSARQ.Services:ProductCatalogV2Srv
         * @param {Array} svasList lista de SVAS
         * @param 
         * @param {string} componentName nombre del componente
         * @description
         * Obtiene los datos de los SVAS recomendados de una tarifa
         */
        getSpecificationSVAS(svasList, isExistingCustomer, segment, commercialAction, idBundle, componentName) {
            let vm = this;

            let _search = {
                queryParams: {
                    commercialAction: commercialAction,
                    productType: 'sva',
                    idSvaList: svasList,
                    segment: segment,
                    isExistingCustomer: isExistingCustomer,
                    bundleId: idBundle
                },
                urlParams: [vm.genericConstant.brand, 'productSpecificationv2View/OSP']
            };

            return vm.httpCacheGett(vm.genericConstant.productCatalog, _search, componentName)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error;
                });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogV2Srv#getProductCatalogOffering
         * @methodOf OrangeFeSARQ.Services:ProductCatalogV2Srv
         * @param {Array} queryParams Objeto con todos los campos para la consulta
         * @param {string} componentName nombre del componente
         * @description
         * Obtiene el catalog offering de los datos proporcionados
         */
        getProductCatalogOffering(queryParams: OrangeFeSARQ.Models.ProductOfferingV2QueryParams, compName: string): ng.IPromise<any> {
            let vm = this;

            let _search = {
                queryParams: queryParams,
                urlParams: [vm.genericConstant.brand, 'productOfferingv2View/OSP']
            };

            return vm.httpCacheGett(vm.genericConstant.productCatalog, _search, compName)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error;
                });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogV2Srv#getProductCatalogSpecification
         * @methodOf OrangeFeSARQ.Services:ProductCatalogV2Srv
         * @param {Array} queryParams Objeto con todos los campos para la consulta
         * @param {string} componentName nombre del componente
         * @description
         * Obtiene el catalog specification de los datos proporcionados
         */
        getProductCatalogSpecification(queryParams: OrangeFeSARQ.Models.ProductSpecificationV2QueryParams, compName: string): ng.IPromise<any> {
            let vm = this;

            let _search = {
                queryParams: queryParams,
                urlParams: [vm.genericConstant.brand, 'productSpecificationv2View/OSP']
            };

            return vm.httpCacheGett(vm.genericConstant.productCatalog, _search, compName)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error;
                });
        }
    }

    angular.module('productCatalogV2Srv', [])
        .service('productCatalogV2Srv', OrangeFeSARQ.Services.ProductCatalogV2Srv);
}
