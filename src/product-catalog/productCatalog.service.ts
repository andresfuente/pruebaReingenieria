module OrangeFeSARQ.Services {
    'use strict';

    export class ProductCatalogService {
        static $inject = ['$injector'];
        public productCatalogAPIUrl: string;
        public searchUrl: string;
        public sufixProductSpecification: any;
        public sufixProductOffering: any;
        public httpCacheOrange: any;
        public genericConstant: any;
        public $q: any;
        constructor(public $injector) {
            let vm = this;
            const OSP: string = 'OSP';
            
            vm.httpCacheOrange = $injector.get('httpCacheOrange');
            vm.$q = $injector.get('$q');
            vm.genericConstant = $injector.get('genericConstant');

            vm.productCatalogAPIUrl = vm.genericConstant.productCatalog;
            // vm.productCatalogAPIUrl = 'api/daf2/APIProductCatalogOSP/1';

            vm.sufixProductSpecification = ['productSpecification', OSP];
            vm.sufixProductOffering = ['productOffering', OSP];

        }

        // daf2/APIProductCatalogOSP/1/productSpecification/OSP
        // daf2/APIProductCatalogOSP/1/productOffering/OSP
        getProductSpecification(): any {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: vm.sufixProductSpecification
            };
            return vm.httpCacheOrange.gett(vm.productCatalogAPIUrl, _search)
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
            return vm.httpCacheOrange.gett(vm.productCatalogAPIUrl, _search)
                .then(function(response) {
                    return response.data.productOffering;
                })
                .catch(function(error) {
                    return error;
                });
        }

        getFamilyRates(): any {
            let vm = this;
            let url = vm.genericConstant.getRatesOwcs;
            return vm.httpCacheOrange.gett(url)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    return error;
                });
        }
    }

}
