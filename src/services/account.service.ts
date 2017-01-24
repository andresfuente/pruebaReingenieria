module OrangeFeSARQ.Services {
    'use strict';

    export class AccountSrv extends OrangeFeSARQ.Services.ParentService {
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
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
        }

        getData(idType, idNumber, msisdn, componentName = 'new_account') {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    idType: idType,
                    idNumber: idNumber,
                    fixedNumber: msisdn
                },
                urlParams: [vm.genericConstant.marca, 'getEmails']

            };

            return vm.httpCacheGett(vm.url, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }

        putMail(data: newAccount.Models.NewMailRequest, componentName = 'row_input_email'): ng.IPromise <newAccount.Models.NewMailResponse> {
            let vm = this;

            let _search: Object = {
                queryParams: data,
                urlParams: ['email', 'new']
            };
            // Llamada al post con la url +  datos + url para descachear
            return vm.httpPut(vm.urlRedirectEmail, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });

        }
		
		passChange(data: newAccount.Models.PassChangeEmailRequest, componentName = 'row_input_email'): ng.IPromise <newAccount.Models.PassChangeResponse> {
            let vm = this;

            let _search: Object = {
                queryParams: data,
                urlParams: ['email', 'password']
            };
            // Llamada al post con la url +  datos + url para descachear
            return vm.httpPost(vm.urlRedirectEmail, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });

        }
		
		checkMail(data: newAccount.Models.NewMailRequest,componentName = 'row_input_email') : ng.IPromise <any>{ 
			let vm = this;

            let _search: Object = {
                queryParams: {
					login:data.accountLogin,
					domain:data.accountDomain
				},
                urlParams: ['email', 'check']
            };
            // Llamada al post con la url +  datos + url para descachear
            return vm.httpCacheGett(vm.urlRedirectEmail, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
		}

        redirectEmail(userLogin: string, userDomain: string, userEmail: string, userOperation: string, componentName = 'row_input_email'): any {
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
			return vm.httpPost(vm.urlRedirectEmail, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }

        getRedirectedAccount(userLogin: string, userDomain: string, componentName: string = 'row_input_email'): any {
            let vm = this;
            let _search: Object = {
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