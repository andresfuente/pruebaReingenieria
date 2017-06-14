module OrangeFeSARQ.Services {
    'use strict';

    export class GetdataClientSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private url: string;
        public genericConstant;
        public CV;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
            vm.CV = $injector.get('customerViewStore');
        }

        getData() {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: [vm.genericConstant.site, 'getUser']

            };

            return vm.httpCacheGett(vm.genericConstant.getDataClient, _search, 'GENERIC', true)
                .then(
                (successData) => {
                    // Lleno el customerViewStore
                    if (successData.data) {
						if(successData.data.user){ // Eliminar el 34 del principio
							successData.data.user = successData.data.user.replace(/^34/, '');
						}
                        vm.CV.loginData = successData.data;
                    }
                },
                (errorData) => {
                    return errorData;
                }
                );
        }
    }
    angular.module('getDataClientSrvModule', [])
        .service('getDataClientSrv', OrangeFeSARQ.Services.GetdataClientSrv);
}
