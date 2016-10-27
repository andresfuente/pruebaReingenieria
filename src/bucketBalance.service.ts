module OrangeFeSARQ.Service{
    'use strict';

    export class BucketBalanceSrv {
        static $inject = ['$injector', '$q'];
        public bucketBalanceAPIUrl: string;
        public searchUrl: string;
        public httpCacheOrange;
        public genericConstant;

        constructor(public $injector, private $q) {
            let vm = this;
            vm.setInjections($injector);           

        }

        setInjections($injector) {
            let vm = this;
            vm.httpCacheOrange = $injector.get('httpCacheOrange');
            vm.genericConstant = $injector.get('genericConstant');
        }

        getBalanceByMsisdn(msisdn: string, param: string): any {
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

            if(param === 'Line'){
                _search.queryParams.productBucket = 'line';                
                //vm.bucketBalanceAPIUrl = vm.genericConstant.bucketBalanceLineAPIUrl;
            }else if(param === 'Bonus'){
                //_search.queryParams.productBucket = 'bonus';
                //vm.bucketBalanceAPIUrl = vm.genericConstant.bucketBalanceBonusAPIUrl;
                //_search = {};
                //TO-DO: para llamar a la api
                _search.queryParams.productBucket = 'bonus';  
            }
            return vm.httpCacheOrange.gett(vm.bucketBalanceAPIUrl, _search)
            //return vm.httpCacheOrange.gett(vm.bucketBalanceAPIUrl, {})
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }



    }
}
