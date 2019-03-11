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
                    productBucket: '',
                    publicKey: msisdn,
                    'onlyActive':vm.genericConstant.onlyActive
                },
                urlParams: [vm.genericConstant.brand, 'usageReport', 'OSP']

            };

            if (param === 'Line') {
                _search.queryParams.productBucket = 'line';
                
            } else if (param === 'Bonus') {
                
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
                    productBucket: '',
                    'onlyActive':vm.genericConstant.onlyActive
                },
                urlParams: [vm.genericConstant.brand, 'usageReport', 'OSP']
            };

            if (param === 'Line') {
                _search.queryParams.productBucket = 'line';
                // - vm.bucketBalanceAPIUrl = vm.genericConstant.bucketBalanceLineAPIUrl;
            } else if (param === 'Bonus') {
                /*_search.queryParams.productBucket = 'bonus';
                vm.bucketBalanceAPIUrl = vm.genericConstant.bucketBalanceBonusAPIUrl;
                _search = {};
                TO-DO: para llamar a la api*/
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

        getCreditBucketBalanceTransactions(msisdn: string, startDate: Date, endDate: Date, transaction: string, componentName: string = 'balance-transfer-log-comp'): any {
            let vm = this;
            let _search: any;
            vm.bucketBalanceAPIUrl = vm.genericConstant.bucketBalance;
            let startDateStr: string = d3.time.format('%d/%m/%Y')(startDate);
            let endDateStr: string = d3.time.format('%d/%m/%Y')(endDate);
            _search = {
                queryParams: {
                    publicKey: msisdn,
                    startDate: startDateStr,
                    endDate: endDateStr,
                    transactions: transaction
                },
                urlParams: [vm.genericConstant.brand, 'creditBucketBalanceTransactions']
            };

            return vm.httpCacheGett(vm.bucketBalanceAPIUrl, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error.data;
                });
        }
    }
}
