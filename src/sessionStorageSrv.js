var OrangeFeSARQ;
(function (OrangeFeSARQ) {
    var Services;
    (function (Services) {
        'use strict';
        var SessionStorageManager = (function () {
            function SessionStorageManager() {
            }
            SessionStorageManager.prototype.getEntry = function (key) {
                return sessionStorage.getItem(key);
            };
            SessionStorageManager.prototype.setEntry = function (key, object) {
                try {
                    sessionStorage.setItem(key, object);
                    return { result: true, message: 'success' };
                }
                catch (e) {
                    return { result: false, message: e.message };
                }
            };
            SessionStorageManager.prototype.removeEntry = function (key) {
                sessionStorage.removeItem(key);
            };
            return SessionStorageManager;
        }());
        Services.SessionStorageManager = SessionStorageManager;
        angular.module('sessionStorageManager', [])
            .service('sessionStorageSrv', SessionStorageManager);
    })(Services = OrangeFeSARQ.Services || (OrangeFeSARQ.Services = {}));
})(OrangeFeSARQ || (OrangeFeSARQ = {}));
//# sourceMappingURL=sessionStorageSrv.js.map