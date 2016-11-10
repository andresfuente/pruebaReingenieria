declare module renderContent {
}
declare module renderContent.Components {
    /**
     */
    class RenderContentComp implements ng.IComponentOptions {
        bindings: {
            [binding: string]: string;
        };
        controller: string | Function | (string | Function)[];
        template: string | Function;
        constructor();
    }
}
declare module renderContent.Controllers {
    /**
     * @ngdoc controller
     * @name renderContent.Controllers:RenderContentCtrl
     * @description
     * Controlador de renderContent
     */
    class RenderContentCtrl extends OrangeFeSARQ.Controllers.ParentController {
        $injector: any;
        static $inject: string[];
        private templateOut;
        private $templateCache;
        private templat;
        constructor($injector: any);
        setInjection($injector: any): void;
        initComp(): void;
    }
}
declare module OrangeFeSARQ {
}
declare module OrangeFeSARQ.Components {
    /**
     */
    class RenderLayoutComp implements ng.IComponentOptions {
        bindings: {
            [binding: string]: string;
        };
        controller: string | Function;
        template: string | Function;
        constructor();
    }
}
declare module OrangeFeSARQ.Controllers {
    /**
     * @ngdoc controller
     * @name renderLayout.Controllers:RenderLayoutCtrl
     * @description
     * Controlador de renderLayout
     */
    class RenderLayoutCtrl extends OrangeFeSARQ.Controllers.ParentController {
        $injector: any;
        static $inject: string[];
        layoutMetaData: any;
        constructor($injector: any);
    }
}
declare module OrangeFeSARQ.Controllers {
    /** Main Arquitecture Controller */
    class OrangeArqCtrl {
    }
}
declare module OrangeFeSARQ.Controllers {
    interface IParentController {
        getIndex(): number;
        $onDestroy(): any;
        setInjections($injector: any): void;
        setBindData(): void;
        initComp(): void;
    }
    /** Main Arquitecture Controller */
    class ParentController implements IParentController {
        $injector: any;
        static $inject: string[];
        static _$index: any[];
        isFinished: boolean;
        static shared: any;
        httpCacheOrange: OrangeFeSARQ.Services.HttpCache;
        $rootRouter: any;
        $window: any;
        $location: any;
        genericConstant: any;
        literalConstant: any;
        orangeOwcs: OrangeFeSARQ.Services.OrangeOwcs;
        customerViewStore: OrangeFeSARQ.Services.CustomerViewStore;
        notificationCenterSrv: any;
        informationCenterSrv: any;
        LoadCenterSrv: any;
        msisdnStore: OrangeFeSARQ.Services.MsisdnStore;
        utils: any;
        localStorageManager: OrangeFeSARQ.Services.LocalStorageManager;
        sessionStorageManager: OrangeFeSARQ.Services.SessionStorageManager;
        userService: OrangeFeSARQ.Services.CustomerView;
        $filter: any;
        $q: any;
        messageCatalog: OrangeFeSARQ.Services.MessageCatalog;
        private _class;
        private _find;
        index: number;
        testLog: any;
        constructor($injector: any);
        getIndex(): number;
        $onDestroy(): void;
        saveInSession(): void;
        setInjections($injector: any): void;
        setBindData(): void;
        initComp(): void;
        prepareTest(params: any[], functions: any[]): void;
        showModalMessage(typeMsg: number, title?: string, message?: string): void;
        setLogTestValue(name: any, value: any): void;
    }
}
declare module OrangeFeSARQ.Filters {
    /** Filter to format the msisdn number following the pattern "AAA BBB CCC" */
    function MSISDNFilter(): Function;
}
declare module OrangeFeSARQ.Filters {
    /** Filter to safe/sanitize from URL resource */
    function OWCSSanitizeHtml($sce: any): Function;
}
declare module OrangeFeSARQ.Models {
    class Logger {
        fileAppender: boolean;
        consoleAppender: boolean;
        constructor();
    }
    class Cache {
        enabled: boolean;
        expirationTime: number;
        autoUpdate: boolean;
    }
    class APPConfig {
        componentName: string;
        logger: Logger;
        Cache: Cache;
        constructor();
    }
}
declare module OrangeFeSARQ.Models {
    /**
     * @ngdoc object
     * @name OrangeFeSARQ.Models:Message
     * @description
     * Clase que guarda la información sobre un mensaje particular del catalogo de mensaje.
     * ```js
     *  codeAngular: string;
     *  code: string;
     *  error_api: string;
     *  title: string;
     *  desc: any;
     *  typeMessage: string;
     * ```
     */
    class Message {
        code: string;
        error_api: string;
        title: string;
        desc: any;
        typeMessage: string;
    }
    /**
     * @ngdoc object
     * @name OrangeFeSARQ.Models:CatalogMessage
     * @description
     * Clase que contiene todo el catalog de mensajes y modulo de error.
     * ```js
     *  site: string;
     *  messageList: any;
     *   errorModule: any;
     *   locale: string;
     * ```
     */
    class CatalogMessage {
        site: string;
        messageList: any;
        errorModule: any;
        locale: string;
        constructor(messageList: any, errorModule: any, site: string, locale: string);
    }
}
declare module OrangeFeSARQ.Models {
    class Trace {
        app: string;
        component: string;
        code: string;
        message: string;
        datetime: string;
        sessionId: string;
        msisdn: string;
        level: string;
        constructor(app: string, component: string, code: string, message: string, sessionId: string, msisdn: string, level: string);
    }
    class TraceList {
        traces: Trace[];
        constructor();
    }
}
declare module OrangeFeSARQ.Models {
    interface IUserInfoModel {
        msisdn: number;
        name: string;
        surname: string;
    }
}
declare module OrangeFeSARQ.Services {
    /**
     *    HTTP Generic error interceptor
     */
    class HttpMSInterceptor implements ng.IHttpInterceptor {
        private $q;
        private $injector;
        static $inject: string[];
        private hm;
        static Factory($q: ng.IQService, $injector: ng.auto.IInjectorService): HttpMSInterceptor;
        constructor($q: ng.IQService, $injector: ng.auto.IInjectorService);
        request: (config: any) => ng.IPromise<any>;
        response: (responseSuccess: any) => ng.IPromise<any>;
        responseError: (responseFailure: any) => ng.IPromise<any>;
        private checkResponse;
    }
}
declare module OrangeFeSARQ.Services {
    interface IMessageCatalog {
        getMessage(id: string): OrangeFeSARQ.Models.Message;
        getErrorModule(): any;
        getCatalog(): OrangeFeSARQ.Models.CatalogMessage;
    }
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:MessageCatalogSrv
     * @module messageCatalogManager
     * @description
     * Servicio que recupera de WCS un catalogo de mensajes, spinner, y modulo de error y lo almacena para que este accesible.
     * desde los rcomponentes.
     * Es necesario definir el recurso de WCS en el genericConstant con la clave 'CatalogMessageUrl'
     *
     */
    class MessageCatalog implements IMessageCatalog {
        private $injector;
        private $q;
        private $http;
        private sessionStorageSrv;
        static $inject: string[];
        private catalogMessage;
        appConfig: any;
        constructor($injector: any, $q: ng.IQService, $http: ng.IHttpService, sessionStorageSrv: OrangeFeSARQ.Services.SessionStorageManager);
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MessageCatalogSrv#getConfig
         * @param {string} id id del mensaje, atributo "codeAngular" del catalogo.
         * @methodOf OrangeFeSARQ.Services:MessageCatalogSrv
         * @description
         * Devuelve información sobre el mensaje recuperado. Ver Modelo OrangeFeSARQ.Models.Message
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.messageCatalog.getMessage('idMessage');
         * ```
         *
         * @return {OrangeFeSARQ.Models.Message} Message
         */
        getMessage: (id: string) => Models.Message;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MessageCatalogSrv#getErrorModule
         * @methodOf OrangeFeSARQ.Services:MessageCatalogSrv
         * @description
         * Devuelve información sobre el modulo de error. Ver modelo OrangeFeSARQ.Models.ErrorModule.
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.messageCatalog.getErrorModule();
         * ```
         *
         * @return {OrangeFeSARQ.Models.ErrorModule} ErrorModule
         */
        getErrorModule: () => any;
        hasMessage: () => boolean;
        getCatalog: () => Models.CatalogMessage;
    }
}
declare module OrangeFeSARQ.Services {
    class AppConfigManager implements ng.IServiceProvider {
        private appConfig;
        constructor();
        init: () => void;
        getConfig: (componentName: string) => Models.APPConfig;
        $get(): AppConfigManager;
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
declare module OrangeFeSARQ.Services {
    interface ICustomerView {
        getUser(param: string, clientId: string): any;
        getInfo(): any;
    }
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:customerViewSrv
     *@module customerView
     * @description
     * Servicio que recupera información del usuario (customerView) y la almacena.
     * este accesible desde los distintos componentes
     */
    class CustomerView implements ICustomerView {
        private $http;
        private $injector;
        static $inject: string[];
        clientAPIUrl: string;
        private _info;
        genericConstant: any;
        httpCache: any;
        customerViewStoreSrv: OrangeFeSARQ.Services.CustomerViewStore;
        sessionStorageSrv: OrangeFeSARQ.Services.SessionStorageManager;
        constructor($http: any, $injector: any);
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:customerViewSrv#getUser
         * @param {string} param parametros de busqueda del usuario.
         * @param {string} clientId ID del cliente a buscar.
         * @methodOf OrangeFeSARQ.Services:customerViewSrv
         * @description
         * Devuelve y guarda la informacion del usuario del servicio de CustomerView, si existe en el sessionStorage la recupera y la borra, si no invoca a la API.
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.userService.getUser('params','clientId')
         * ```
         * @return {object} JSON Api CustomerView
         */
        getUser(param: string, clientId: string): any;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:customerViewSrv#getInfo
         * @methodOf OrangeFeSARQ.Services:customerViewSrv
         * @description
         * Recupera la informacion del customerView sin invocar al servicio de backend
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.userService.getInfo()
         * ```
         * @return {object} JSON Api CustomerView
         */
        getInfo: () => any;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:customerViewSrv#setInfo
         * @methodOf OrangeFeSARQ.Services:customerViewSrv
         * @description
         * setter del customerView
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.userService.info(JSON)
         * ```
         * @return {void} void
         */
        setInfo: (json: any) => void;
    }
}
declare module OrangeFeSARQ.Services {
    class CustomerViewStore {
        constructor();
        private _info;
        info: any;
    }
}
declare module OrangeFeSARQ.Services {
    interface IDocumentValidator {
        validateNif(nif: string): boolean;
        validateNie(nie: string): boolean;
    }
    class DocumentValidator implements IDocumentValidator {
        private LETTERS;
        private DNI_REGEX;
        private NIE_REGEX;
        /**
         * Method to validate if the document provided as parameter is valid or not.
         */
        validateNif: (nif: string) => boolean;
        /**
         * Method to validate if the document provided as argument is valid or not.
         */
        validateNie: (nie: string) => boolean;
    }
}
declare module OrangeFeSARQ.Services {
}
declare module OrangeFeSARQ.Services {
    interface IHttp302RedirectInterceptor {
        response: Function;
    }
    class Http302RedirectInterceptor implements IHttp302RedirectInterceptor {
        private $q;
        private $injector;
        static $inject: string[];
        private genericConstant;
        static Factory($q: ng.IQService, $injector: any): Http302RedirectInterceptor;
        constructor($q: ng.IQService, $injector: any);
        response: (responseSuccess: any) => ng.IPromise<any>;
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
    class HttpCache {
        private $http;
        private $q;
        private $cacheFactory;
        static $inject: string[];
        static keys: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $cacheFactory: ng.ICacheFactoryService);
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
        post(url: string, params: any, resetCacheKey?: string): ng.IPromise<any>;
        put(url: string, params: any, resetCacheKey?: any): ng.IPromise<any>;
        extractProperties(obj: any): string;
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
        private userInfoSrv;
        static $inject: string[];
        static Factory($q: ng.IQService, userInfoSrv: OrangeFeSARQ.Services.IUserInfo): HttpErrorInterceptor;
        constructor($q: ng.IQService, userInfoSrv: OrangeFeSARQ.Services.IUserInfo);
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
declare module OrangeFeSARQ.Services {
    interface ILoggingManager {
        info(componentName: string, errorCode: string, errrorMessage: string, newProcess: boolean): void;
        warn(componentName: string, errorCode: string, errrorMessage: string): void;
        error(componentName: string, errorCode: string, errrorMessage: string): void;
        critical(componentName: string, errorCode: string, errrorMessage: string): void;
        sendTraces(trace: OrangeFeSARQ.Models.Trace): void;
    }
    class LoggingManager implements ILoggingManager {
        private $http;
        private $log;
        private AppConfig;
        private uuidSrv;
        private msisdnStore;
        static $inject: string[];
        constructor($http: ng.IHttpService, $log: ng.ILogService, AppConfig: OrangeFeSARQ.Services.AppConfigManager, uuidSrv: OrangeFeSARQ.Services.IUUID, msisdnStore: OrangeFeSARQ.Services.MsisdnStore);
        sendTraces: (trace: Models.Trace) => void;
        traceConsole: (trace: Models.Trace) => void;
        info: (componentName: string, errorCode: string, errrorMessage: string, newProcess: boolean) => void;
        warn: (componentName: string, errorCode: string, errorMessage: string) => void;
        error: (componentName: string, errorCode: string, errorMessage: string) => void;
        critical: (componentName: string, errorCode: string, errorMessage: string) => void;
    }
}
declare module OrangeFeSARQ.Services {
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
         Ssutituye los componentes no validos
         */
        changeComp(element: any): any;
        /**
         Ssutituye los componentes no validos
         */
        checkCompId(section: any): any;
        /**
         Recover a property from sessionStorage
         */
        getLayoutMetada(key: string, exp?: number): any;
    }
}
declare module OrangeFeSARQ.Services {
    interface IApiOrchestator {
    }
    class ApiOrchestator implements IApiOrchestator {
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
declare module OrangeFeSARQ.Services {
    interface IUserInfo {
        changeCurrentLineSelected(newMsisdn: string): void;
        setUserRol(rol: string): void;
        getUserRol(): string;
    }
    class UserInfo implements IUserInfo {
        private userRol;
        constructor();
        changeCurrentLineSelected: (newMsisdn: string) => void;
        setUserRol: (rol: string) => void;
        getUserRol: () => string;
    }
}
declare module OrangeFeSARQ.Services {
    /**
     *    HTTP Generic error interceptor
     */
    class HttpUUIDInterceptor implements ng.IHttpInterceptor {
        private $q;
        private uuidSrv;
        static $inject: string[];
        static Factory($q: ng.IQService, uuidSrv: OrangeFeSARQ.Services.IUUID): HttpUUIDInterceptor;
        constructor($q: ng.IQService, uuidSrv: OrangeFeSARQ.Services.IUUID);
        request: (config: any) => ng.IPromise<any>;
    }
    interface IUUID {
        getSessionId(): string;
        generateRandomSequence(): string;
        roundTwoDigits(num: number): string;
        generateSessionId(appId: string): void;
        newProcess(): void;
        getProcessId(): string;
    }
    /**
     * @ngdoc controller
     * @name dashboard.controller:ControllerName
     * @description
     * A description of the controller, service or filter
     */
    class UUID implements ng.IServiceProvider {
        private sessionId;
        private processId;
        constructor();
        generateRandomSequence: () => string;
        roundTwoDigits: (num: number) => string;
        getSessionId: () => string;
        $get(): IUUID;
        getProcessId: () => string;
        generateSessionId: (appId: string) => void;
        newProcess: () => void;
    }
}
declare module OrangeFeSARQ.Tests.Filters {
}
declare module OrangeFeSARQ.Tests.Filters {
}
declare module OrangeFeSARQ.Tests.Services {
}
declare module OrangeFeSARQ.Tests.Services {
}
declare module OrangeFeSARQ.Tests.Services {
}
declare module OrangeFeSARQ.Tests.Services {
}
