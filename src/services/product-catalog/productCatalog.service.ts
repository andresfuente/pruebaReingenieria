module OrangeFeSARQ.Services {
    'use strict';

    export class ProductCatalogService extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public productCatalogAPIUrl: string;
        public searchUrl: string;
        public sufixProductSpecification: any;
        public sufixProductOffering: any;

        // Injector vars
        public genericConstant: any;
        public OSP: string = 'OSP';

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
            vm.initComp();
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
            vm.productCatalogAPIUrl = '/mock/API/productCatalog.json';
        }

        initComp() {
            let vm = this;
            vm.productCatalogAPIUrl = vm.genericConstant.productCatalog;

            vm.sufixProductSpecification = [vm.genericConstant.brand, vm.genericConstant.site, 'productSpecification', vm.OSP];
            vm.sufixProductOffering = [vm.genericConstant.brand, vm.genericConstant.site, 'productOffering', vm.OSP];

        }

        // - daf2/APIProductCatalogOSP/1/productSpecification/OSP
        getProductSpecification(): any {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: vm.sufixProductSpecification
            };
            return vm.httpCacheGett(vm.productCatalogAPIUrl, _search)
                .then(function (response) {
                    return response.data.productSpecification;
                })
                .catch(function (error) {
                    return error;
                });
        }

        // - daf2/APIProductCatalogOSP/1/productOffering/OSP
        getProductOffering(): any {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: vm.sufixProductOffering
            };
            return vm.httpCacheGett(vm.productCatalogAPIUrl, _search)
                .then(function (response) {
                    return response.data.productOffering;
                })
                .catch(function (error) {
                    return error;
                });
        }

        getFamilyRates(): any {
            let vm = this;
            let _search: Object = {};
            let url = vm.genericConstant.getRatesOwcs;
            return vm.httpCacheGett(url, _search)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }


        getProductBonusSpecification(tarifa: string): any {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    tarifa: tarifa
                },
                urlParams: [vm.genericConstant.brand, vm.genericConstant.site, 'productBonusSpecification', vm.OSP]
            };
            return vm.httpCacheGett(vm.productCatalogAPIUrl, _search)
                .then(function (response) {
                    return response.data.productSpecification;
                })
                .catch(function (error) {
                    throw error;
                });
        }
		
		getCodeSapProduct(codeSap : string ,productType : string , componentName : string = "vapList" ) : any {
			let vm = this;
			let terminalSap = "terminalSap/";
			let _search: Object = {
			queryParams: {
			codeSap : codeSap,
			productType : productType
			},
			urlParams: [vm.genericConstant.brand, terminalSap ]
			};
			
			return vm.httpCacheGett(vm.productCatalogAPIUrl, _search)
			.then(function (response) {
			if(response !== null) {
			return response.data;
			} else {
			throw response.error;
			}
			})
			.catch(function (error) {
			throw error.data;
			}); 
		}

        getRates(msisdn: string, contractType: string, tmCodeOrigen: string, componentName: string, segment?: string): any {
            let vm = this;
            let _search: any;
            let brand = vm.genericConstant.brand;
            let method = 'changeRateList';
            let request: OrangeFeSARQ.Models.productCatalog_getRates_request;
            if (segment) {
                request = {
                    contractType: contractType,
                    tmCodeOrigen: tmCodeOrigen,
                    segment: segment
                };
            } else {
                request = {
                    contractType: contractType,
                    tmCodeOrigen: tmCodeOrigen
                };
            }

            _search = {
                queryParams: request,
                urlParams: [brand, method, msisdn]
            };

            return vm.httpCacheGett(vm.genericConstant.productCatalog, _search, componentName)
                .then(function (response) {
                    if (response && response.data && response.data.error) {
                        throw response.data.error;
                    } else if (response && response.data && response.data.productSpecification) {
                        return response.data.productSpecification;
                    }
                    return response.data;
                })
                .catch(function (error) {
                    return error.data;
                });
        }
    }
}
