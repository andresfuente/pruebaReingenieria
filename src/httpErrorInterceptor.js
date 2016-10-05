var OrangeFeSARQ;
(function (OrangeFeSARQ) {
    var Services;
    (function (Services) {
        'use strict';
        var HttpErrorInterceptor = (function () {
            function HttpErrorInterceptor($q, notificationCenterSrv, userInfoSrv) {
                var _this = this;
                this.$q = $q;
                this.notificationCenterSrv = notificationCenterSrv;
                this.userInfoSrv = userInfoSrv;
                this.request = function (config) {
                    config.headers['X-ANGPOC-USER-ROL'] = _this.userInfoSrv.getUserRol();
                    return config;
                };
                this.response = function (responseSuccess) {
                    return responseSuccess || _this.$q.when(responseSuccess);
                };
                this.requestError = function (requestFailure) {
                    return _this.$q.reject(requestFailure);
                };
                this.responseError = function (responseFailure) {
                    _this.notificationCenterSrv.addErrorMessage('HTTP - ERROR ' + responseFailure.status, 'Se ha producido un error al procesar su petición, por favor, inténtelo de nuevo unos instantes más tarde', 5);
                    return _this.$q.reject(responseFailure);
                };
            }
            HttpErrorInterceptor.Factory = function ($q, notificationCenterSrv, userInfoSrv) {
                return new HttpErrorInterceptor($q, notificationCenterSrv, userInfoSrv);
            };
            HttpErrorInterceptor.$inject = ['$q', 'notificationCenterSrv', 'userInfoSrv'];
            return HttpErrorInterceptor;
        }());
        Services.HttpErrorInterceptor = HttpErrorInterceptor;
        angular.module('errorInterceptor', [])
            .factory('HttpErrorInterceptor', HttpErrorInterceptor.Factory);
    })(Services = OrangeFeSARQ.Services || (OrangeFeSARQ.Services = {}));
})(OrangeFeSARQ || (OrangeFeSARQ = {}));
//# sourceMappingURL=httpErrorInterceptor.js.map