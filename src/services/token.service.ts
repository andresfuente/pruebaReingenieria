module OrangeFeSARQ.Services {
    'use strict';

    export class TokenSrv extends OrangeFeSARQ.Services.ParentService {
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

            let request: OrangeFeSARQ.Models.getToken_request = <OrangeFeSARQ.Models.getToken_request>{};
            request.inputString = msisdn;
            request.key = key;

            let _search: Object = {
                queryParams: request,
                urlParams: [brand, 'aes', 'encrypt']
            };

            return vm.httpCacheGett(apiUrl, _search, compName)
                .then(
                    (successData) => {
                        return successData;
                    },
                    (errorData) => {
                        return errorData;
                    }
                );
        }

        genToken(body: any, compName: string = 'tokenSrv') {
            let vm = this;
            let apiUrl: string = vm.genericConstant.token;
            const method: string = 'token';
            const brand: string = vm.genericConstant.brand;

            let _search: Object = {
                body: body,
                urlParams: [brand, method]
            };

            return vm.httpPost(apiUrl, _search, compName)
                .then( (response) => {
                    return response.data;
                })
                .catch( (error) => {
                    return error.data;
                });
        }
    }
    angular.module('tokenModule', [])
        .service('tokenSrv', OrangeFeSARQ.Services.TokenSrv);
}
