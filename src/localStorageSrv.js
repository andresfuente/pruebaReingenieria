var OrangeFeSARQ;
(function (OrangeFeSARQ) {
    var Services;
    (function (Services) {
        'use strict';
        var LocalStorageManager = (function () {
            function LocalStorageManager() {
            }
            LocalStorageManager.prototype.getEntry = function (key) {
                console.log("ENTRA EN GETENTRY Y LA KEY ES ", JSON.parse(localStorage.getItem(key)));
                return JSON.parse(localStorage.getItem(key));
            };
            LocalStorageManager.prototype.setEntry = function (key, object) {
                try {
                    localStorage.setItem(key, JSON.stringify(object));
                    return { result: true, message: 'success' };
                }
                catch (e) {
                    return { result: false, message: e.message };
                }
            };
            LocalStorageManager.prototype.removeEntry = function (key) {
                console.log("REMOVE ENTRY");
                localStorage.removeItem(key);
            };
            return LocalStorageManager;
        }());
        Services.LocalStorageManager = LocalStorageManager;
        angular.module('localStorageManager', [])
            .service('localStorageSrv', LocalStorageManager);
    })(Services = OrangeFeSARQ.Services || (OrangeFeSARQ.Services = {}));
})(OrangeFeSARQ || (OrangeFeSARQ = {}));
//# sourceMappingURL=localStorageSrv.js.map