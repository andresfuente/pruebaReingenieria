module OrangeFeSARQ.Services {
    'use strict';

    export class GetHeaderFooter extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private url: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }


        setInjections($injector) {
            let vm = this;
        }

        getData() {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: [vm.genericConstant.site, 'getHeaderFooter']

            };

            return vm.httpCacheGett(vm.genericConstant.getHeader, _search)
                .then(
                    (successData)=> {
                        return successData;
                    },
                    (errorData)=> {
                        return errorData;
                    }
                );
        }
    }
    angular.module('getHeaderFooterModule', [])
        .service('getHeaderFooter', OrangeFeSARQ.Services.GetHeaderFooter);
}
