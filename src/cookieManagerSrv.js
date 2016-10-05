var OrangeFeSARQ;
(function (OrangeFeSARQ) {
    var Services;
    (function (Services) {
        'use strict';
        var CookieManager = (function () {
            function CookieManager() {
            }
            CookieManager.prototype.getCookie = function (name) {
                var i, cookie, cookieName, cookieValue, cookiesArray = window.document.cookie.split(';');
                for (i = 0; i < cookiesArray.length; i += 1) {
                    cookieName = cookiesArray[i].substr(0, cookiesArray[i].indexOf('='));
                    cookieValue = cookiesArray[i].substr(cookiesArray[i].indexOf('=') + 1);
                    cookieName = cookieName.replace(/^\s+|\s+$/g, '');
                    if (cookieName === name) {
                        try {
                            cookie = angular.isObject(JSON.parse(_.unescape(cookieValue))) ? JSON.parse(_.unescape(cookieValue)) : cookieValue;
                        }
                        catch (e) {
                            cookie = _.unescape(cookieValue);
                        }
                    }
                }
                return cookie;
            };
            CookieManager.prototype.setCookie = function (cookieName, cookieValue, expiresIn) {
                var expirationDate = new Date(), finalCookie;
                expirationDate.setTime(expirationDate.getTime() + (expiresIn * 1000));
                finalCookie = _.escape(_.isPlainObject(cookieValue) ? JSON.stringify(cookieValue) : cookieValue)
                    + ((expiresIn === undefined) ? '' : '; expires=' + expirationDate.toUTCString());
                window.document.cookie = cookieName + '=' + finalCookie;
            };
            CookieManager.prototype.removeCookie = function (cookieName) {
                window.document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            };
            return CookieManager;
        }());
        Services.CookieManager = CookieManager;
        angular.module('cookieManager', [])
            .service('cookieSrv', CookieManager);
    })(Services = OrangeFeSARQ.Services || (OrangeFeSARQ.Services = {}));
})(OrangeFeSARQ || (OrangeFeSARQ = {}));
//# sourceMappingURL=cookieManagerSrv.js.map