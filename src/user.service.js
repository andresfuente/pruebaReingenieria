var FdC;
(function (FdC) {
    var Services;
    (function (Services) {
        'use strict';
        var UserSrv = (function () {
            function UserSrv($http, genericConstant, httpCacheOrange) {
                this.$http = $http;
                this.genericConstant = genericConstant;
                this.httpCacheOrange = httpCacheOrange;
                var vm = this;
                vm.clientAPIUrl = vm.genericConstant.customerView;
            }
            UserSrv.prototype.getUser = function (param, clientId) {
                var vm = this;
                var _search = {
                    queryParams: (_a = {},
                        _a[param] = clientId,
                        _a
                    ),
                    urlParams: ['orange', 'customerView', 'get']
                };
                return vm.httpCacheOrange.gett(vm.clientAPIUrl, _search)
                    .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error.error;
                });
                var _a;
            };
            UserSrv.$inject = ['$http', 'genericConstant', 'httpCacheOrange'];
            return UserSrv;
        }());
        Services.UserSrv = UserSrv;
        angular.module('userSrv', [])
            .service('userSrv', UserSrv);
    })(Services = FdC.Services || (FdC.Services = {}));
})(FdC || (FdC = {}));
//# sourceMappingURL=user.service.js.map