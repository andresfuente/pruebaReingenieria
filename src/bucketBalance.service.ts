module OrangeFeSARQ.Services {
    'use strict';

    export class BucketBalanceSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public bucketBalanceAPIUrl: string;
        public searchUrl: string;
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

        getBalanceByMsisdn(msisdn: string, param: string, componentName: string = 'more-megas-comp'): any {
            let vm = this;
            let _search: any;
            vm.bucketBalanceAPIUrl = vm.genericConstant.bucketBalance;
            _search = {
                queryParams: {
                    publicKey: msisdn,
                    productBucket: ''
                },
                urlParams: ['orange', 'usageReport', 'OSP']

            };

            if (param === 'Line') {
                _search.queryParams.productBucket = 'line';
                //vm.bucketBalanceAPIUrl = vm.genericConstant.bucketBalanceLineAPIUrl;
            } else if (param === 'Bonus') {
                //_search.queryParams.productBucket = 'bonus';
                //vm.bucketBalanceAPIUrl = vm.genericConstant.bucketBalanceBonusAPIUrl;
                //_search = {};
                //TO-DO: para llamar a la api
                _search.queryParams.productBucket = 'bonus';
            }
            return vm.httpCacheGett(vm.bucketBalanceAPIUrl, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }


        getBalanceByDoc(nif: string, param: string, componentName: string = 'more-megas-comp'): any {
            let vm = this;
            let _search: any;
            vm.bucketBalanceAPIUrl = vm.genericConstant.bucketBalance;
            _search = {
                queryParams: {
                    individualPublicId: nif,
                    productBucket: ''
                },
                urlParams: ['orange', 'usageReport', 'OSP']
            };

            if (param === 'Line') {
                _search.queryParams.productBucket = 'line';
                //vm.bucketBalanceAPIUrl = vm.genericConstant.bucketBalanceLineAPIUrl;
            } else if (param === 'Bonus') {
                //_search.queryParams.productBucket = 'bonus';
                //vm.bucketBalanceAPIUrl = vm.genericConstant.bucketBalanceBonusAPIUrl;
                //_search = {};
                //TO-DO: para llamar a la api
                _search.queryParams.productBucket = 'bonus';
            }
            return vm.httpCacheGett(vm.bucketBalanceAPIUrl, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }


    }
}
