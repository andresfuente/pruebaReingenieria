var FdC;
(function (FdC) {
    var Services;
    (function (Services) {
        'use strict';
        var AmortizationSrv = (function () {
            function AmortizationSrv($injector) {
                this.$injector = $injector;
                var vm = this;
                vm.setInjections($injector);
            }
            AmortizationSrv.prototype.setInjections = function ($injector) {
                var vm = this;
                vm.httpCacheOrange = $injector.get('httpCacheOrange');
                vm.genericConstant = $injector.get('genericConstant');
            };
            AmortizationSrv.prototype.getVap = function (msisdn, id) {
                var vm = this;
                var _search = {
                    queryParams: {
                        msisdn: msisdn,
                        ID: id
                    },
                    urlParams: []
                };
                return vm.httpCacheOrange.gett(vm.genericConstant.amortizationApi, _search)
                    .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error.error;
                });
            };
            AmortizationSrv.$inject = ['$injector'];
            return AmortizationSrv;
        }());
        Services.AmortizationSrv = AmortizationSrv;
        angular.module('amortizationSrvModule', [])
            .service('amortizationSrv', AmortizationSrv);
    })(Services = FdC.Services || (FdC.Services = {}));
})(FdC || (FdC = {}));
//# sourceMappingURL=amortization.service.js.map