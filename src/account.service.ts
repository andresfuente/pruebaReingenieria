module OrangeFeSARQ.Services {
    'use strict';

    export class AccountSrv extends OrangeFeSARQ.Services.ParentService  {
        static $inject = ['$injector'];
        private url: string;
        private urlMock: string;
        private urlRedirectEmail: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.url = vm.genericConstant.productInventory;
            vm.urlRedirectEmail = vm.genericConstant.fixedServices;
            vm.urlMock = '/mock/API/productInventoryGetEmails.json';
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        getData(idType, idNumber, msisdn) {
            let vm = this;
            let _search:Object = {
                queryParams: {
                    idType: idType,
                    idNumber: idNumber,
                    fixedNumber: msisdn
                },
                urlParams: ['productInventory', 'getEmails']

            };

            return vm.httpCacheOrange.gett(vm.url, _search)

            .then(
                    (successData)=> {
                        return successData;
                    },
                    (errorData)=> {
                        return errorData;
                    }
                );
        }

        redirectEmail(userLogin: string, userDomain: string, userEmail: string, userOperation: string): any {
            let vm = this;
            let data = {
                "login": userLogin.toLowerCase(),
                "domain": userDomain.toLowerCase(),
                "email": userEmail.toLowerCase(),
                "operation": userOperation
            };
            let _search: Object = {
                queryParams: data,
                urlParams: ['email', 'redirect']
            };
            // Llamada al post con la url +  datos + url para descachear
            return vm.httpCacheOrange.post(vm.urlRedirectEmail, _search)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    return error;
                });
        }

        getRedirectedAccount(userLogin: string, userDomain: string, componentName:string='rowInputEmailComp'): any {
            let vm = this;
            let _search:Object = {
                queryParams: {
                    login: userLogin.toLowerCase(),
                    domain: userDomain.toLowerCase()
                },
                urlParams: ['email', 'redirected']
            };
            
            return vm.httpCacheGett(vm.urlRedirectEmail, _search, componentName)
                .then((successData) => {
                    return successData;
                },
                (errorData) => {
                    return errorData;
                })
                .catch(function (error) {
                    return error;
                });
        }
    }
}