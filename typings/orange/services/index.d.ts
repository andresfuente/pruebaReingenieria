declare module FdC.Services {
    /**
     * @ngdoc service
     * @name amortization.AmortizationSrv
     * @description
     * #rest
     * Servicio que busca un cliente en funcion de distintos parámetros
     */
    class AmortizationSrv {
        $injector: any;
        static $inject: string[];
        httpCacheOrange: any;
        genericConstant: any;
        constructor($injector: any);
        setInjections($injector: any): void;
        /**
         * @ngdoc method
         * @name #getVap
         * @methodOf amortization.AmortizationSrv
         * @returns {object} Devuelve una promesa con el response
         */
        getVap(msisdn: string, id: string): any;
    }
}
declare module OrangeFeSARQ.Services {
    interface ICookieManager {
        getCookie(name: string): string;
        setCookie(cookieName: string, cookieValue: string, expiresIn: number): void;
        removeCookie(cookieName: string): void;
    }
    /** Cookie manager to work with cookies */
    class CookieManager implements ICookieManager {
        constructor();
        /** Obtains a cookie from the parameter name
         *    - name [string]: the name for the cookie to get
         */
        getCookie(name: string): string;
        /**
         * Set a cookie with a name, value and expires values from parameters
         *    - cookieName [string]: The name for the cookie to be set
         *    - cookieValue [string]: The value for the cookie to be set
         *    - expiresIn [number]: The seconds for the cookie to be expired
         */
        setCookie(cookieName: string, cookieValue: string, expiresIn: number): void;
        /**
         *    Remove the cookie given by cookieName name
         *    - cookieName [string]: the name of the cookie to be deleted
         */
        removeCookie(cookieName: string): void;
    }
}
declare module FdC.Services {
    class CustomerViewStore {
        constructor();
        private _info;
        info: any;
    }
}
declare module OrangeFeSARQ.Services {
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:HttpCacheOrange
     * @description
     * Clase que va a gestionar todas las peticiones Http de la aplicacion
     * se va a encargar de gestionar la cache en las peticiones get y de invalidar
     * en caso de que sea necesario
     */
    class HttpCacheOrange {
        private $http;
        private $q;
        private $cacheFactory;
        private utils;
        static $inject: string[];
        static keys: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $cacheFactory: ng.ICacheFactoryService, utils: any);
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:HttpCacheOrange#post
         * @param {string} url de la api sin parametros.
         * @param {Object} requestParams Parámetros
         * @param {string=} [resetCacheKey=''] restea las llamadas a una url
         * @methodOf OrangeFeSARQ.Services:HttpCacheOrange
         * @description
         * realiza la peticion post, los parámetros que recibe son:
         * @example
         * Typical usage
         * ```js
         *  return vm.httpCacheOrange.post(vm.genericConstant.activityRegister, _search,'/sites/REST/controller/GridController/FichaCliente')
         * .then(function (response) {
         *          return response.data;
         *       })
         * .catch(function (error) {
         *           return error;
         *       });
         *
         * }
         * ```
         *
         * @return {Object} Type ng.IPromise<any>
         */
        post(url: string, requestParams: any, resetCacheKey?: string): ng.IPromise<any>;
        put(url: string, params: any, resetCacheKey?: any): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:HttpCacheOrange#get
         * @param {string} url de la api sin parametros.
         * @param {Object} params Parámetros en el siguiente formato  .
         * @param {number=} [time=(1000 * 0.5 * 60)] Tiempo de vida de la cache por defecto 5 mimutos.
         * @param {boolean=} [refresh=false] Invalida la cache por defecto false
         * @methodOf OrangeFeSARQ.Services:HttpCacheOrange
         * @description
         * realiza la peticion get
         * @example
         * Typical usage
         * ```js
         * let vm = this;
         * let _search:Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get']

         *    };
         * return vm.httpCacheOrange.gett(vm.clientAPIUrl, _search)
         * .then(function (response) {
         *            return response.data;
         *        })
         * .catch(function (error) {
         *             return error;
         *        });
         * ```
         *
         * @return {Object} Type ng.IPromise<any>
         */
        gett(url: string, params: any, time: number, refresh: boolean): ng.IPromise<any>;
    }
}
declare module OrangeFeSARQ.Services {
    interface IInterceptor {
        request: Function;
        requestError: Function;
        response: Function;
        responseError: Function;
    }
    /**
     *    HTTP Generic error interceptor
     */
    class HttpErrorInterceptor implements IInterceptor {
        private $q;
        private notificationCenterSrv;
        private userInfoSrv;
        static $inject: string[];
        static Factory($q: ng.IQService, notificationCenterSrv: OrangeFeSARQ.Services.INotificationCenterSrv, userInfoSrv: OrangeFeSARQ.Services.IUserInfoSrv): HttpErrorInterceptor;
        constructor($q: ng.IQService, notificationCenterSrv: OrangeFeSARQ.Services.INotificationCenterSrv, userInfoSrv: OrangeFeSARQ.Services.IUserInfoSrv);
        request: (config: any) => ng.IPromise<any>;
        response: (responseSuccess: any) => ng.IPromise<any>;
        requestError: (requestFailure: any) => ng.IPromise<any>;
        /**
         Response error. May be of interest the following fields:
         - responseFailure.status: HTTP error code
         - responseFailure.data: probably, the error returned
         - responseFailure.config: headers, method, url, transformers
         */
        responseError: (responseFailure: any) => ng.IPromise<any>;
    }
}
declare module OrangeFeSARQ.Services {
    interface ILocalStorageManager {
        getEntry(key: string): any;
        setEntry(key: string, value: any): any;
        removeEntry(key: string): void;
    }
    class LocalStorageManager implements ILocalStorageManager {
        constructor();
        /**
         Recover a property from localStorage
         */
        getEntry(key: string): any;
        /**
         Save the object in the property key in localStorage
         */
        setEntry(key: string, object: any): any;
        /**
         Removes a property key in localStorage
         */
        removeEntry(key: string): void;
    }
}
declare module FdC.Services {
    class MsisdnStore {
        private _msisdn;
        constructor();
        msisdn: string;
    }
}
declare module OrangeFeSARQ.Services {
    interface IOrangeOwcs {
        getLayoutMetada(key: string, exp: number): any;
    }
    class OrangeOwcs implements IOrangeOwcs {
        private httpCacheOrange;
        private genericConstant;
        private owcsIdsConstant;
        private $injector;
        static $inject: string[];
        keys: any;
        constructor(httpCacheOrange: any, genericConstant: any, owcsIdsConstant: any, $injector: any);
        setDataInStore(section: any): void;
        setDataHeader(section: any): void;
        setDataFooter(section: any): void;
        /**
         Recover a property from sessionStorage
         */
        getLayoutMetada(key: string, exp?: number): any;
    }
}
declare module OrangeFeSARQ.Services {
    interface IApiOrchestatorSrv {
    }
    class ApiOrchestatorSrv implements IApiOrchestatorSrv {
        private $http;
        private orangeModelMapper;
        private pendingOperations;
        static $inject: string[];
        constructor($http: ng.IHttpService);
        get: (tag: string, url: string, cb: Function) => void;
        existsDataModel: (tag: string) => boolean;
        isPendingOperation: (tag: string) => boolean;
    }
}
declare module OrangeFeSARQ.Services {
    interface ISessionStorageManager {
        getEntry(key: string): any;
        setEntry(key: string, value: any): any;
        removeEntry(key: string): void;
    }
    class SessionStorageManager implements ISessionStorageManager {
        constructor();
        /**
         Recover a property from sessionStorage
         */
        getEntry(key: string): any;
        /**
         Save the object in the property key in sessionStorage
         */
        setEntry(key: string, object: any): any;
        /**
         Removes a property key in sessionStorage
         */
        removeEntry(key: string): void;
    }
}
declare module FdC.Services {
    /**
     * @ngdoc service
     * @name locator.UserSrv
     * @description
     * #rest
     * Servicio que busca un cliente en funcion de distintos parámetros
     */
    interface IUserSrv {
        getUser(param: string, clientId: string): any;
    }
    class UserSrv implements IUserSrv {
        private $http;
        private genericConstant;
        private httpCacheOrange;
        static $inject: string[];
        clientAPIUrl: string;
        constructor($http: any, genericConstant: any, httpCacheOrange: any);
        /**
         * @ngdoc method
         * @name #getUser(param:string, clientId:string)
         * @methodOf locator.UserSrv
         * @returns {object} Devuelve una promesa con el response
         */
        getUser(param: string, clientId: string): any;
    }
}
declare module OrangeFeSARQ.Services {
    interface IUserInfoSrv {
        changeCurrentLineSelected(newMsisdn: string): void;
        setUserRol(rol: string): void;
        getUserRol(): string;
    }
    class UserInfoSrv implements IUserInfoSrv {
        private userRol;
        constructor();
        changeCurrentLineSelected: (newMsisdn: string) => void;
        setUserRol: (rol: string) => void;
        getUserRol: () => string;
    }
}
declare module OrangeFeSARQ.Services {
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:Utils
     * @description
     * Clase que contine diversas funciones/utilidades
     */
    class Utils {
        private $injector;
        static $inject: string[];
        constructor($injector: any);
        escapeHtml(source: string): string;
        unescapeHtml(source: string): string;
        extractJs(source: string): string[];
        formatMBRound(value: any): any;
        formatMBTrunc(value: any): any;
        extractProperties(obj: any): string;
        fillcustomerViewStore(value: any, inputDocument: any): any;
        isNifNie(document: string): boolean;
        isCif(cif: string): boolean;
    }
}