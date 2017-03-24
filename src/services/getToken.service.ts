module OrangeFeSARQ.Services {
    'use strict';

    export class GetTokenSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private url: string;
        public genericConstant;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }


        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get("genericConstant");
        }

        getData() {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: []

            };

            return vm.httpCacheGett(vm.genericConstant.getDataClient, _search)
                .then(
                (successData) => {
                    return successData;
                },
                (errorData) => {
                    return errorData;
                }
                );
        }
    }
    angular.module('getDataClientSrvModule', [])
        .service('getDataClientSrv', OrangeFeSARQ.Services.getImagesSrv);
}
