module OrangeFeSARQ.Service {
    'use strict';

    export class ProductContractedTranslateSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public contractedServicesAPIUrl: string;
        public searchUrl: string;
        public genericConstant;

        constructor($injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
            vm.contractedServicesAPIUrl = vm.genericConstant.productInventory;

        }

        setInjections($injector){
            let vm = this;
        }

        getServicesContracted(msisdn: string, type: string, brand: string, detail: string, componentName: string = 'contractedServicesComp' ): any {
            let vm = this;
            let _search: Object = {
                    queryParams: {
                        publicKey: msisdn,
                        lineCategory: type
                    },
                    urlParams: [brand, detail]
            };
            return vm.httpCacheGett(vm.contractedServicesAPIUrl, _search, componentName)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    return error;
                });
        }

    }
}
