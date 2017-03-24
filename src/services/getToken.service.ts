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
            vm.genericConstant = $injector.get('genericConstant');
        }

        getToken(msisdn: string, key: string, compName: string) {
            let vm = this;
            let apiUrl: string = vm.genericConstant.token;
            let brand: string = vm.genericConstant.brand;

            let request: OrangeFeSARQ.Models.getToken_request = <OrangeFeSARQ.models.getToken_request>{};
            request.inputString = msisdn;
            request.key = key;

            let _search: Object = {
                queryParams: request,
                urlParams: [brand, 'aes', 'encrypt']
            };

            return vm.httpCacheGett(vm.apiUrl, _search, compName)
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
    angular.module('getTokenModule', [])
        .service('getTokenSrv', OrangeFeSARQ.Services.GetTokenSrv);
}
