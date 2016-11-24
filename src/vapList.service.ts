module OrangeFeSARQ.Services {
    'use strict';
    /**
     */
    export class VapListSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private url: string;
        private genericConstant;
        private vapDataApiUrl;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get("genericConstant");
            vm.vapDataApiUrl = vm.genericConstant.vapDataUrl;
        }


        getVapData(msisdn: string, ID: string, componentName: string = 'pendingPaymentComp'): any {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    msisdn: msisdn,
                    ID: ID
                },
                urlParams: ['vapData', 'OSP']
            };
            return vm.httpCacheGett(vm.vapDataApiUrl, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }
    }
}
