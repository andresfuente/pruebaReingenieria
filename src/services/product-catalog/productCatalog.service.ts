module OrangeFeSARQ.Services {
    'use strict';

    export class ProductCatalogService extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public productCatalogAPIUrl: string;
        public searchUrl: string;
        public sufixProductSpecification: any;
        public sufixProductOffering: any;

        //Injector vars
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
            vm.genericConstant = $injector.get("genericConstant");
            vm.productCatalogAPIUrl = "/mock/API/productCatalog.json";
        }

        initComp() {
            let vm = this;
            vm.productCatalogAPIUrl = vm.genericConstant.productCatalog;
            // vm.productCatalogAPIUrl = 'api/daf2/APIProductCatalogOSP/1';

            vm.sufixProductSpecification = [vm.genericConstant.brand, vm.genericConstant.site, 'productSpecification', vm.OSP];
            vm.sufixProductOffering = [vm.genericConstant.brand, vm.genericConstant.site, 'productOffering', vm.OSP];
        }

        // daf2/APIProductCatalogOSP/1/productSpecification/OSP
        // daf2/APIProductCatalogOSP/1/productOffering/OSP
        getProductSpecification(): any {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: vm.sufixProductSpecification
            };
            return vm.httpCacheGett(vm.productCatalogAPIUrl, _search)
                .then(function(response) {
                    return response.data.productSpecification;
                })
                .catch(function(error) {
                    return error;
                });
        }

        getProductOffering(): any {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: vm.sufixProductOffering
            };
            return vm.httpCacheGett(vm.productCatalogAPIUrl, _search)
                .then(function(response) {
                    return response.data.productOffering;
                })
                .catch(function(error) {
                    return error;
                });
        }

        getFamilyRates(): any {
            let vm = this;
            let _search: Object = {};
            let url = vm.genericConstant.getRatesOwcs;
            return vm.httpCacheGett(url, _search)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    return error;
                });
        }
    }

}
