module OrangeFeSARQ.Services {
    'use strict';

    export class ProductOrderSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private urlProductOrder: string;
        private brand: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.urlProductOrder = vm.genericConstant.productOrder;
            vm.brand = vm.genericConstant.brand;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        getData(msisdn: string, action: string, code: string, services: string, segment:string = '', componentName: string = 'orange_tv_contract'): ng.IPromise <any>{
            let vm = this;
            let _search: Object = {
                queryParams: {
                    publicKey: msisdn,
                    action: action,
					idPromo: code,
					services: services,
                    segment: segment
                },
                urlParams: [vm.brand, 'managOrangeTV']
            };

            return vm.httpCacheGett(vm.urlProductOrder, _search, componentName)
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