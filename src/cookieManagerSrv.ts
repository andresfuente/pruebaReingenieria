module OrangeFeSARQ.Services {
    'use strict';

    export interface ICookieManager {
        getCookie(name : string) : string;
        setCookie(cookieName : string, cookieValue : string, expiresIn : number) : void;
        removeCookie(cookieName : string) : void;
    }

    /** Cookie manager to work with cookies */
    export class CookieManager implements ICookieManager {
        constructor() { }

        /** Obtains a cookie from the parameter name
         *    - name [string]: the name for the cookie to get
         */
        getCookie(name : string) : string {
            let i,
                cookie,
                cookieName,
                cookieValue,
                cookiesArray = window.document.cookie.split(';');

            for (i = 0; i < cookiesArray.length; i += 1) {
                cookieName = cookiesArray[i].substr(0, cookiesArray[i].indexOf('='));
                cookieValue = cookiesArray[i].substr(cookiesArray[i].indexOf('=') + 1);
                cookieName = cookieName.replace(/^\s+|\s+$/g, '');
                if (cookieName === name) {
                    try {
                        cookie = angular.isObject(JSON.parse(_.unescape(cookieValue))) ? JSON.parse(_.unescape(cookieValue)) : cookieValue;
                    } catch (e) {
                        cookie = _.unescape(cookieValue);
                    }
                }
            }
            return cookie;
        }

        /**
         * Set a cookie with a name, value and expires values from parameters
         *    - cookieName [string]: The name for the cookie to be set
         *    - cookieValue [string]: The value for the cookie to be set
         *    - expiresIn [number]: The seconds for the cookie to be expired
         */
        setCookie(cookieName : string, cookieValue : string, expiresIn : number) : void {
            let expirationDate = new Date(),
                finalCookie;

            expirationDate.setTime(expirationDate.getTime() + (expiresIn * 1000));
            finalCookie = _.escape(
                _.isPlainObject(cookieValue) ? JSON.stringify(cookieValue)  : cookieValue)
                + ((expiresIn === undefined) ? '' : '; expires=' + expirationDate.toUTCString());
            window.document.cookie = cookieName + '=' + finalCookie;
        }

        /**
         *    Remove the cookie given by cookieName name
         *    - cookieName [string]: the name of the cookie to be deleted
         */
        removeCookie(cookieName : string) : void {
            window.document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }

    // Registration
    angular.module('cookieManager', [])
        .service('cookieSrv', CookieManager);

}
