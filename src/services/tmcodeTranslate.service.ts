module OrangeFeSARQ.Services {
    'use strict';

    export class TmCodeTranslateSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private url: string;
        public genericConstant;
        public productCatalogAPIUrl: string;


        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
            vm.productCatalogAPIUrl = '/mock/API/productCatalog.json';
        }

        httpProductCatalog = function (tmcode, componentName: string = 'borrarComp'): any {
            let vm = this;

            let _search: Object = {
                queryParams: {},
                urlParams: []
            };

            return vm.httpCacheGett(vm.productCatalogAPIUrl, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    return err;
                });
        };
    }
}
