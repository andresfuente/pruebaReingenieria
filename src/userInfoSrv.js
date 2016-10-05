var OrangeFeSARQ;
(function (OrangeFeSARQ) {
    var Services;
    (function (Services) {
        'use strict';
        var UserInfoSrv = (function () {
            function UserInfoSrv() {
                var _this = this;
                this.changeCurrentLineSelected = function (newMsisdn) {
                };
                this.setUserRol = function (rol) {
                    _this.userRol = rol;
                };
                this.getUserRol = function () {
                    return _this.userRol;
                };
            }
            return UserInfoSrv;
        }());
        Services.UserInfoSrv = UserInfoSrv;
        angular.module('userInfoManager', [])
            .service('userInfoSrv', UserInfoSrv);
    })(Services = OrangeFeSARQ.Services || (OrangeFeSARQ.Services = {}));
})(OrangeFeSARQ || (OrangeFeSARQ = {}));
//# sourceMappingURL=userInfoSrv.js.map