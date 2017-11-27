module OrangeFeSARQ.Services {
    'use strict';

    export class HootSrv extends OrangeFeSARQ.Services.ParentService {
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

        getActualRate(msisdn: string, contractType: string, compName: string) {
            let vm = this;
            let apiUrl: string = vm.genericConstant.hoot;
            let brand: string = vm.genericConstant.brand;
            let method = 'rate';

            let request: OrangeFeSARQ.Models.hoot_getActualRate_request = <OrangeFeSARQ.Models.hoot_getActualRate_request>{};
            if (contractType === "AMENA") {
                request.contractType = "POSPAGO";
            } else {
                request.contractType = contractType;
            }
            let _search: Object = {
                queryParams: request,
                urlParams: [brand, method, msisdn]
            };

            return vm.httpCacheGett(apiUrl, _search, compName, true)
                .then(
                (successData) => {
                    if (successData.data && successData.data.ratePlan) {
                        return successData.data.ratePlan
                    }
                    throw successData.data.error;
                },
                (errorData) => {
                    return errorData.data;
                }
                );
        }

        getMainLine(brand: string, indPublicKey: string, site: string, compName: string, refresh: boolean = false) {
            let vm = this;
            let METHOD: string = 'principal';
            let apiUrl: string = vm.genericConstant.hoot;

            let _search: Object = {
                queryParams: {
                    individualPublicId: indPublicKey,
                    site: site,
                    onlyActive: true
                },
                urlParams: [brand, METHOD]
            };

            return vm.httpCacheGett(apiUrl, _search, compName, refresh)
                .then((succesData) => {
                    if (succesData && succesData.error) {
                        throw succesData.data;
                    }
                    return succesData.data;
                })
                .catch((errorData) => {
                    return errorData.data;
                });
        }

    }
    angular.module('hootModule', [])
        .service('hootSrv', OrangeFeSARQ.Services.HootSrv);
}
