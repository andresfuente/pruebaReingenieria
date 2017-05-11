declare module OrangeFeSARQ.Components {
    class ParentComponent implements ng.IComponentOptions {
        templateUrl: string | Function;
        controller: string | Function | (string | Function)[];
        bindings: any | Function | (any | Function)[];
        constructor();
        setBindings(bindings: any): void;
    }
}
declare module OrangeFeSARQ {
}
declare module OrangeFeSARQ.Components {
    class GraphsCom {
        controller: string | Function;
        controllerAs: string;
        template: string | Function;
        bindings: {
            [binding: string]: string;
        };
        constructor();
    }
}
declare module graphs.controller {
    class GraphsController {
        private options;
        private optionsController;
        constructor();
        actualizarOpciones: () => void;
        private formatoEjes();
    }
}
declare module renderContent {
}
declare module renderContent.Components {
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
    class RenderDynamicLayoutComp implements ng.IComponentOptions {
        bindings: {
            [binding: string]: string;
        };
        controller: string | Function;
        template: string | Function;
        controllerAs: string;
        constructor();
    }
}
declare module OrangeFeSARQ.Controllers {
    /**
     * @ngdoc controller
     * @name renderLayout.Controllers:RenderDynamicLayoutCtrl
     * @description
     * Controlador de renderLayout
     */
    class RenderDymamicLayoutCtrl extends OrangeFeSARQ.Controllers.ParentController {
        $injector: any;
        $scope: ng.IScope;
        $sce: ng.ISCEService;
        static $inject: string[];
        private dynamicLayoutMetaData;
        body: any;
        private flexGridW;
        constructor($injector: any, $scope: ng.IScope, $sce: ng.ISCEService);
        genLayout(): void;
    }
}
declare module OrangeFeSARQ {
}
declare module OrangeFeSARQ.Components {
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
declare module OrangeFeSARQ {
}
declare module OrangeFeSARQ.Components {
    class ValidatorCom {
        controller: string | Function;
        controllerAs: string;
        template: string | Function;
        bindings: {
            [binding: string]: string;
        };
        constructor();
    }
}
declare module validator.controller {
    class ValidatorController {
        private valid;
        private validation;
        private validator;
        constructor();
        validador: () => void;
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
    /**
     * @ngdoc controller
     * @name OrangeFeSARQ.Controllers:parentController
     * @description
     * Controlador padre que inyecta servicios básicos de las aplicaciones.
     * Estos servicios estan accesibles desde las siguientes variables:
     * ```js
     * public isFinished = false;
     * static shared : any = {};
     * public httpCacheOrange : OrangeFeSARQ.Services.HttpCache;
     * public $rootRouter;
     * public $window;
     * public $location;
     * public genericConstant;
     * public literalConstant;
     * public orangeOwcs : OrangeFeSARQ.Services.OrangeOwcs;
     * public customerViewStore : OrangeFeSARQ.Services.CustomerViewStore;
     * public notificationCenterSrv;
     * public informationCenterSrv;
     * public LoadCenterSrv;
     * public msisdnStore : OrangeFeSARQ.Services.MsisdnStore;
     * public utils;
     * public localStorageManager : OrangeFeSARQ.Services.LocalStorageManager;
     * public sessionStorageManager : OrangeFeSARQ.Services.SessionStorageManager;
     * public userService : OrangeFeSARQ.Services.CustomerView;
     * public $filter;
     * public $q;
     * private logger : OrangeFeSARQ.Services.LoggingManager;
     * public messageCatalog : OrangeFeSARQ.Services.MessageCatalog;
     * public config : OrangeFeSARQ.Models.APPConfig;
     * public assetid: string;
     * public assettype: string;
     * public compName: string;
     * public popupSrv : any;
     * public compNameToError : string;
     * ```
     *
     * @example
     * ```js
     * export class ComCtrl extends OrangeFeSARQ.Controllers.ParentController{
     *         static $inject = ['$injector'];
     *
     *         constructor($injector) {
     *             super($injector);
     *             let vm = this;
     * }
     * ```
     *
     */
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
        private logger;
        messageCatalog: OrangeFeSARQ.Services.MessageCatalog;
        config: OrangeFeSARQ.Models.Component;
        popupSrv: any;
        private _class;
        private _find;
        index: number;
        testLog: any;
        assetid: string;
        assettype: string;
        compName: string;
        compNameToError: string;
        private watcher;
        private watcherDestroy;
        $http: ng.IHttpService;
        constructor($injector: any);
        getIndex(): number;
        $onDestroy(): void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#info
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @param {string} messageCode codigo del mensaje
         * @param {string} message Contenido del mensaje
         * @description
         * genera una traza de info en consola o la envia a un MS en función de la configuración del componente
         * @example
         * ```js
         *  vm.info('messageCode','message')
         * ```
         * @return {void} void
         */
        info(messageCode: string, message: string): void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#warn
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @param {string} messageCode codigo del mensaje
         * @param {string} message Contenido del mensaje
         * @description
         * genera una traza de warn en consola o la envia a un MS en función de la configuración del componente
         * @example
         * ```js
         *  vm.warn('messageCode','message')
         * ```
         * @return {void} void
         */
        warn(messageCode: string, message: string): void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#error
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @param {string} errorCode codigo de error
         * @param {string} errorMessage mensaje de error
         * @description
         * genera una traza de error en consola o la envia a un MS en función de la configuración del componente
         * @example
         * ```js
         *  vm.error('errorCode','errorMessage')
         * ```
         * @return {void} void
         */
        error(errorCode: string, errorMessage: string): void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#watch
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @param {Function} watchExpression watchExpression.
         * @param {Fuction} listener listener.
         * @param {boolean=} [destroy=true] elimina el watcher tras el destroy del componente
         * @description
         * Crea un watcher gestionable por el componente
         * @example
         * ```js
         *  vm.watch(function () { return vm.msisdnStore.msisdn; }, function (newValue, oldValue) {
         *          if (newValue !== oldValue) {
         *              if (vm.msisdnStore.msisdn) {
         *                   vm.msisdn = vm.msisdnStore.msisdn;
         *                   vm.callExpeditService();
         *               }
         *           }
         *       });
         * ```
         * @return {void} void
         */
        watch(watchExpression: Function, listener: Function, destroy?: boolean): void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#newProcess
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @description
         * Genera un nuevo ID de proceso con el fin de tener tener trazabilidad sobre todas las peticiones en el backend
         * @example
         * ```js
         *  vm.newProcess();
         * ```
         * @return {void} void
         */
        newProcess(): void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#finishProcess
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @description
         * Finaliza un proceso funcionali cambiando el ID de proceso a 001 (navegación basica por el portal)
         * @example
         * ```js
         *  vm.finishProcess();
         * ```
         * @return {void} void
         */
        finishProcess(): void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#httpCacheGett
         * @param {string} url de la api sin parametros.
         * @param {Object} params Parámetros en queryString y path.
         * @param {boolean=} [refresh=false] Invalida la cache por defecto false
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @description
         * Servicio de cache con configuracion de componente.
         * @example
         * ```js
         * let _search:Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get']
         *    };
         *  vm.httpCacheGett("URL", _search);
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpCacheGett(url: string, params: any, refresh?: boolean): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#httpCacheGeth
         * @param {string} url de la api sin parametros.
         * @param {Object} params Parámetros en queryString y path.
         * @param {Object} headers parametros  de cabecera http.
         * @param {boolean=} [refresh=false] Invalida la cache por defecto false
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @description
         * Servicio de cache con configuracion de componente ( pasandole cabeceras).
         * @example
         * ```js
         * let _search:Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get']
         *    };
         * let _headers =  {
         * 'Component-Name': 'locator'
         * }
         *  vm.httpCacheGeth("URL", _search, _headers);
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpCacheGeth(url: string, params: any, headers: any, refresh?: boolean): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#saveInSession
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @description
         * Guarda en el sessionStorage el catalog de mensajes (recursos),
         * CustomerView y msisdn, solo debe llamarse cuando sea necesario recargar la SPA
         * @example
         * ```js
         *  vm.saveInSession();
         * ```
         * @return {void} void
         */
        saveInSession(): void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#httpPut
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @param {string} url de la api sin parametros.
         * @param {any} data JSON con el body de la petición, PathParameters y QueryString.
         * @param {any=} [config={}] parametros de configuración de la petición http, por ejemplo cabeceras.
         * @description
         * Realiza una petición PUT HTTP considerando el componente a la hora de gestionar una posible respuesta erronea de MS
         * @example
         * ```js
         * let data : Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get'],
         *        body: { }
         *    };
         *  vm.httpPut('URL', data);
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpPut(url: string, data: any, config?: {}): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#httpPost
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @param {string} url de la api sin parametros.
         * @param {any} data JSON con el body de la petición, PathParameters y QueryString.
         * @param {any=} [config={}] parametros de configuración de la petición http, por ejemplo cabeceras.
         * @description
         * Realiza una petición POST HTTP considerando el componente a la hora de gestionar una posible respuesta erronea de MS
         * @example
         * ```js
         * let data : Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get'],
         *        body: { }
         *    };
         *  vm.httpPost('URL', data);
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpPost(url: string, data: any, config?: {}): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers:parentController#httpDelete
         * @methodOf OrangeFeSARQ.Controllers:parentController
         * @param {string} url de la api sin parametros.
         * @param {any} data PathParameters y QueryString.
         * @param {any=} [config={}] parametros de configuración de la petición http, por ejemplo cabeceras.
         * @description
         * Realiza una petición DELETE HTTP considerando el componente a la hora de gestionar una posible respuesta erronea de MS
         * @example
         * ```js
         *         let data : Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get']
         *    };
         *  vm.httpDelete('URL', data);
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpDelete(url: string, data: any, config?: {}): ng.IPromise<any>;
        setInjections($injector: any): void;
        setBindData(): void;
        initComp(): void;
        prepareTest(params: any[], functions: any[]): void;
        showModalMessage(typeMsg: number, title?: string, message?: string): void;
        setLogTestValue(name: any, value: any): void;
        fillStore(): void;
        getName(vm: any): string;
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
    /**
     * @ngdoc object
     * @name OrangeFeSARQ.Models:Logger
     * @description
     * Clase que guarda la configuración de logs para cada componente.
     * ```js
     * fileAppender: boolean;
     * consoleAppender: boolean;
     * ```
     */
    class Logger {
        fileAppender: string;
        consoleAppender: string;
        constructor();
    }
    /**
     * @ngdoc object
     * @name OrangeFeSARQ.Models:Cache
     * @description
     * Clase que guarda la configuración de cache para cada componente.
     * ```js
     * enabled: boolean;
     * expirationTime: number;
     * ```
     */
    class Cache {
        enabled: boolean;
        expirationTime: number;
        constructor();
    }
    /**
     * @ngdoc object
     * @name OrangeFeSARQ.Models:Component
     * @description
     * Clase wrapper de Cache y Logger para cada componente.
     * ```js
     * componentName: string;
     * logger: Logger;
     * Cache: Cache;
     * ```
     */
    class Component {
        componentName: string;
        logger: Logger;
        cache: Cache;
        constructor();
    }
    class API {
        APIPath: string;
        cache: Cache;
        constructor();
    }
    /**
     * @ngdoc object
     * @name OrangeFeSARQ.Models:APPConfig
     * @description
     * Clase wrapper para componentes y APIs.
     * ```js
     * components: Component[];
     * APIs: API[];
     * ```
     */
    class APPConfig {
        components: Component[];
        APIs: API[];
    }
}
declare module OrangeFeSARQ.Models {
    class RowContent {
        queryMode: boolean;
        listLabel: any[];
        listOption: any[];
        colorChartAlternative: any;
        listDeepLink: any[];
        managementMode: boolean;
        title: string;
        subtitleMoreInfo: any;
        listImage: any[];
        labelAngular: string;
        emptyMessage: string;
        urlMoreInfo: string;
        listMessageValidation: any[];
        id: any;
        listModule: any[];
        accordion: boolean;
        modeMoreInfo: string;
        numMax: number;
        listPages: any[];
        richText: any[];
        assetType: string;
        listModuleSwitch: any[];
        compId: string;
        colorChart: any;
        moreInformacion: any;
        listTable: any[];
        subtitle: any;
        information: any;
        titleMoreInfo: string;
        desc: any;
        moduleMode: any;
        parents: any[];
    }
    class CentralSection {
        rowContent: RowContent[];
        name: string;
        rating: number;
        flexGridWidth: string;
        assetType: string;
    }
    class DynamicLayout {
        c: string;
        footer: boolean;
        centralSection: CentralSection[];
        locale: string;
        layoutId: string;
        headerSection: any[];
        topSection: any[];
        bottomSection: any[];
        site: string;
        footerSection: any[];
        leftSection: any[];
        header: boolean;
        rightSection: any[];
        cid: number;
    }
    class DynamicLayoutRow {
        cells: DynamicLayoutCell[];
        constructor();
    }
    class DynamicLayoutCell {
        labelSection: string;
        style: string;
        compId: string;
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
    /**
     * @ngdoc object
     * @name OrangeFeSARQ.Models:Trace
     * @description
     * Clase que guarda información de la traza que utilizara el servicio loggerSrv
     * ```js
     *  app: string;
     *  component: string;
     *  code: string;
     *  message: string;
     *  datetime: string;
     *  sessionId: string;
     *  msisdn : string;
     *  level: string;
     * ```
     */
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
        private static camelToUnderscoreTrimmer(value);
    }
}
declare module OrangeFeSARQ.Services {
    interface IMessageCatalog {
        getMessage(id: string): OrangeFeSARQ.Models.Message;
        getErrorModule(): any;
        getCatalog(): OrangeFeSARQ.Models.CatalogMessage;
        getGenericError(): any;
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
        getGenericError: () => any;
        getCatalog: () => Models.CatalogMessage;
    }
}
declare module OrangeFeSARQ.Services {
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:ParentService
     * @description
     * Controlador padre que inyecta servicios básicos de las aplicaciones.
     * Estos servicios estan accesibles desde las siguientes variables:
     * ```js
     * public httpCacheOrange : OrangeFeSARQ.Services.HttpCache;
     * public genericConstant;
     * ```
     *
     * @example
     * ```js
     * export class serviceSrv extends OrangeFeSARQ.Services.ParentService{
     *
     *         constructor(public $injector) {
     *             super($injector);
     *             let vm = this;
     * }
     * ```
     *
     */
    class ParentService {
        $injector: any;
        static $inject: string[];
        httpCacheOrange: OrangeFeSARQ.Services.HttpCache;
        genericConstant: any;
        private $http;
        constructor($injector: any);
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ParentService#httpCacheGett
         * @param {string} url de la api sin parametros.
         * @param {Object} params Parámetros en queryString y path.
         * @param {string} componentName Nombre del componente desde el que se invoca el servicio para
         *  gestionar la respuesta con el catalogo, por defecto "noComponent"
         * @param {boolean=} [refresh=false] Invalida la cache por defecto false
         * @methodOf OrangeFeSARQ.Services:ParentService
         * @description
         * Servicio de cache con configuracion de API.
         * @example
         * ```js
         * let _search:Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get']
         *    };
         *  vm.httpCacheGett("URL", _search);
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpCacheGett(url: string, params: any, componentName?: string, refresh?: boolean): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ParentService#httpCacheGeth
         * @param {string} url de la api sin parametros.
         * @param {Object} params Parámetros en queryString y path.
         * @param {Object} headers parametros  de cabecera http.
         * @param {string} componentName Nombre del componente desde el que se invoca
         * el servicio para gestionar la respuesta con el catalogo, por defecto "noComponent"
         * @param {boolean=} [refresh=false] Invalida la cache por defecto false
         * @methodOf OrangeFeSARQ.Services:ParentService
         * @description
         * Servicio de cache con configuracion de API (pasandole cabeceras).
         * @example
         * ```js
         * let _search:Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get']
         *    };
         * let _headers =  {
         * 'Component-Name': 'locator'
         * }
         *  vm.httpCacheGeth("URL", _search, _headers);
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpCacheGeth(url: string, params: any, headers: any, componentName?: string, refresh?: boolean): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ParentService#httpPut
         * @methodOf OrangeFeSARQ.Services:ParentService
         * @param {string} url de la api sin parametros.
         * @param {any} data JSON con el body de la petición, PathParameters y QueryString.
         * @param {any=} [config={}] parametros de configuración de la petición http, por ejemplo cabeceras.
         * @description
         * Realiza una petición PUT HTTP considerando el componente a la hora de gestionar una posible respuesta erronea de MS
         * @example
         * ```js
         * let data : Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get'],
         *        body: { }
         *    };
         *  vm.httpPut('URL', data, 'loginComp');
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpPut(url: string, data: any, compName: string, config?: {}): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ParentService#httpPost
         * @methodOf OrangeFeSARQ.Services:ParentService
         * @param {string} url de la api sin parametros.
         * @param {any} data JSON con el body de la petición, PathParameters y QueryString.
         * @param {any=} [config={}] parametros de configuración de la petición http, por ejemplo cabeceras.
         * @description
         * Realiza una petición POST HTTP considerando el componente a la hora de gestionar una posible respuesta erronea de MS
         * @example
         * ```js
         * let data : Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get'],
         *        body: { }
         *    };
         *  vm.httpPost('URL', data, 'loginComp');
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpPost(url: string, data: any, compName: string, config?: {}): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ParentService#httpDelete
         * @methodOf OrangeFeSARQ.Services:ParentService
         * @param {string} url de la api sin parametros.
         * @param {any} data PathParameters y QueryString.
         * @param {any=} [config={}] parametros de configuración de la petición http, por ejemplo cabeceras.
         * @description
         * Realiza una petición DELETE HTTP considerando el componente a la hora de gestionar una posible respuesta erronea de MS
         * @example
         * ```js
         *  let data : Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get']
         *    };
         *  vm.httpDelete('URL', data, 'loginComp');
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpDelete(url: string, data: any, compName: string, config?: {}): ng.IPromise<any>;
        private configURL(url, data, compName, config?);
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ParentService#httpPutFull
         * @methodOf OrangeFeSARQ.Services:ParentService
         * @param {string} url de la api sin parametros.
         * @param {any} data JSON con el body de la petición, PathParameters y QueryString.
         * @param {any=} [config={}] parametros de configuración de la petición http, por ejemplo cabeceras.
         * @description
         * Realiza una petición PUT HTTP considerando el componente a la hora de gestionar una posible respuesta erronea de MS
         * @example
         * ```js
         * let data : Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get'],
         *        body: { }
         *    };
         *  vm.httpPut('URL', data, 'loginComp');
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpPutFull(url: string, data: any, compName: string, config?: {}): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ParentService#httpPutFull
         * @methodOf OrangeFeSARQ.Services:ParentService
         * @param {string} url de la api sin parametros.
         * @param {any} data JSON con el body de la petición, PathParameters y QueryString.
         * @param {any=} [config={}] parametros de configuración de la petición http, por ejemplo cabeceras.
         * @description
         * Realiza una petición PUT HTTP considerando el componente a la hora de gestionar una posible respuesta erronea de MS
         * @example
         * ```js
         * let data : Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get'],
         *        body: { }
         *    };
         *  vm.httpPut('URL', data, 'loginComp');
         * ```
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        httpPostFull(url: string, data: any, compName: string, config?: {}): ng.IPromise<any>;
    }
}
declare module OrangeFeSARQ.Services {
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:appConfigSrv
     * @module AppConfigManager
     * @description
     * Servicio que carga el fichero de configuración de componentes appConfig.json para que  dicha configuración
     * este accesible desde los distintos componentes
     */
    class AppConfigManager implements ng.IServiceProvider {
        private appConfigComponents;
        private appConfigAPIs;
        constructor();
        init: () => void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:appConfigSrv#getComponentConfig
         * @param {string} componentName nombre del componente (modulo).
         * @methodOf OrangeFeSARQ.Services:appConfigSrv
         * @description
         * Devuelve la configuración asociada al componente:
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.appConfig.getComponentConfig('componentName')
         * ```
         * @return {OrangeFeSARQ.Models.Component} Component
         */
        getComponentConfig: (componentName: string) => Models.Component;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:appConfigSrv#getAPIConfig
         * @param {string} APIPath Path de la API a invocar.
         * @methodOf OrangeFeSARQ.Services:appConfigSrv
         * @description
         * Devuelve la configuración asociada al componente:
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.appConfig.getAPIConfig('APIName')
         * ```
         * @return {OrangeFeSARQ.Models.Component} Component
         */
        getAPIConfig: (APIPath: string) => Models.API;
        $get(): AppConfigManager;
    }
}
declare module OrangeFeSARQ.Services {
    interface ICookieManager {
        getCookie(name: string): string;
        setCookie(cookieName: string, cookieValue: string, expiresIn: number): void;
        removeCookie(cookieName: string): void;
    }
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:cookieSrv
     * @module cookieManager
     * @description
     * Interfaz para manejo de cookies de los navegadores
     */
    class CookieManager implements ICookieManager {
        constructor();
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:cookieSrv#setEntry
         * @param {string} name nombre de la cookie a recuperar.
         * @methodOf OrangeFeSARQ.Services:cookieSrv
         * @description
         * getter para cookies
         *
         * @return {object} cookie
         */
        getCookie(name: string): string;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:cookieSrv#setCookie
         * @param {string} cookieName nombre de la cookie a crear.
         * @param {string} cookieValue contenido de la cookie.
         * @param {number} TTL TTL de la cookie en segundos.
         * @methodOf OrangeFeSARQ.Services:cookieSrv
         * @description
         * crea una nueva cookie a partir de los parametros de entrada
         *
         * @return {void} void
         */
        setCookie(cookieName: string, cookieValue: string, expiresIn: number): void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:cookieSrv#removeCookie
         * @param {string} cookieName nombre de la cookie a crear.
         * @methodOf OrangeFeSARQ.Services:cookieSrv
         * @description
         * elimina una cookie a partir de su ID.
         *
         * @return {void} void
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
     * @module customerView
     * @description
     * Servicio que recupera información del usuario (customerView) y la almacena.
     * este accesible desde los distintos componentes
     */
    class CustomerView extends OrangeFeSARQ.Services.ParentService implements ICustomerView {
        $injector: any;
        static $inject: string[];
        clientAPIUrl: string;
        private _info;
        private _usageReport;
        genericConstant: any;
        httpCache: any;
        customerViewStoreSrv: OrangeFeSARQ.Services.CustomerViewStore;
        sessionStorageSrv: OrangeFeSARQ.Services.SessionStorageManager;
        constructor($injector: any);
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:customerViewSrv#getUser
         * @param {string} param parametros de busqueda del usuario.
         * @param {string} clientId ID del cliente a buscar.
         * @methodOf OrangeFeSARQ.Services:customerViewSrv
         * @description
         * Devuelve y guarda la informacion del usuario del servicio de CustomerView,
         * si existe en el sessionStorage la recupera y la borra, si no invoca a la API.
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
         * @name OrangeFeSARQ.Services:customerViewSrv#getUsageReport
         * @methodOf OrangeFeSARQ.Services:customerViewSrv
         * @description
         * Recupera la informacion del customerView B2B, usageReport sin invocar al servicio de backend
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.userService.getUsageReport()
         * ```
         * @return {object} JSON usageReport
         */
        getUsageReport: () => any;
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
        setCustomer: (json: any) => void;
    }
}
declare module OrangeFeSARQ.Services {
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:customerViewStore
     * @module customerViewStore
     * @description
     * Store con la info del customerView
     */
    class CustomerViewStore {
        constructor();
        private _info;
        private _usageReport;
        private _mdg;
        private _loginData;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:customerViewStore#info
         * @methodOf OrangeFeSARQ.Services:customerViewStore
         * @description
         * getter del customerView.
         * Se desaconseja utilizar este servicio, para persisir y acceder al customerView se dispone del servicio userService
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.customerViewStore.info()
         * ```
         * @return {object} info
         */
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:customerViewStore#info
         * @param {object} JSON del CustomerView a persistir.
         * @methodOf OrangeFeSARQ.Services:customerViewStore
         * @description
         * setter del customerView
         * Se desaconseja utilizar este servicio, para persisir y acceder al customerView se dispone del servicio userService
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.customerViewStore.info = JSON
         * ```
         * @return {void} void
         */
        info: any;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:customerViewStore#usageReport
         * @methodOf OrangeFeSARQ.Services:customerViewStore
         * @description
         * getter del usageReport para CustomerB2B.
         * Se desaconseja utilizar este servicio, para persisir y acceder al customerView se dispone del servicio userService
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.customerViewStore.usageReport()
         * ```
         * @return {object} usageReport
         */
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:customerViewStore#usageReport
         * @param {object} JSON del CustomerView.usageReport a persistir.
         * @methodOf OrangeFeSARQ.Services:customerViewStore
         * @description
         * setter del usageReport para CustomerB2B
         * Se desaconseja utilizar este servicio, para persisir y acceder al customerView se dispone del servicio userService
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.customerViewStore.usageReport = JSON
         * ```
         * @return {void} void
         */
        usageReport: any;
        mdg: any;
        loginData: any;
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
     * @name OrangeFeSARQ.Services:httpCacheOrange
     * @module httpCache
     * @description
     * Servicio que  gestiona todas las peticiones HTTP de la aplicacion.
     * cacheado de peticiones GET en función de la configuración propia del componente
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
         * @name OrangeFeSARQ.Services:httpCacheOrange#post
         * @param {string} url de la api sin parametros.
         * @param {Object} params Parámetros
         * @param {string=} [resetCacheKey=''] restea las llamadas a una url
         * @methodOf OrangeFeSARQ.Services:httpCacheOrange
         * @description
         * realiza la peticion post, los parámetros que recibe son:
         * @example
         * Typical usage
         * ```js
         *  return vm.httpCacheOrange.post(vm.genericConstant.activityRegister,
         *  _search,'/sites/REST/controller/GridController/FichaCliente')
         * .then(function (response) {
         *          return response.data;
         *       })
         * .catch(function (error) {
         *           return error;
         *       })
         * }
         * ```
         *
         * @return {Object} Type ng.IPromise<any>
         */
        post(url: string, params: any, resetCacheKey?: string): ng.IPromise<any>;
        put(url: string, params: any, resetCacheKey?: any): ng.IPromise<any>;
        private static extractProperties(obj);
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:httpCacheOrange#gett
         * @param {string} url de la api sin parametros.
         * @param {Object} params Parámetros en queryString y path.
         * @param {number=} [time=(1000 * 5 * 60)] Tiempo de vida de la cache por defecto 5 mimutos.
         * @param {boolean=} [refresh=false] Invalida la cache por defecto false
         * @methodOf OrangeFeSARQ.Services:httpCacheOrange
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
        gett(url: string, params: any, time?: number, refresh?: boolean): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:httpCacheOrange#gettConfig
         * @param {string} url de la api sin parametros.
         * @param {Object} params Parámetros en queryString y path.
         * @param {object} componentConfig de cache del componente.
         * @param {object} APIConfig de cache del api.
         * @param {boolean=} [refresh=false] Invalida la cache por defecto false
         * @methodOf OrangeFeSARQ.Services:httpCacheOrange
         * @description
         * Servicio de cache con configuracion de componente.
         * @example
         * Ver implementacion ParentController.httpCacheGett
         */
        gettConfig(url: string, params: any, componentConfig: OrangeFeSARQ.Models.Cache, APIConfig: OrangeFeSARQ.Models.Cache, refresh?: boolean): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:httpCacheOrange#getth
         * @param {string} url de la api sin parametros.
         * @param {Object} params Parámetros en queryString y path.
         * @param {Object} headers Cabecera de la petición.
         * @param {number=} [time=(1000 * 5 * 60)] Tiempo de vida de la cache por defecto 5 mimutos.
         * @param {boolean=} [refresh=false] Invalida la cache por defecto false
         * @methodOf OrangeFeSARQ.Services:httpCacheOrange
         * @description
         * realiza una peticion GET pasandole una parametros en el header
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
         * let _headers =  {
         * 'Component-Name': 'locator'
         * }
         * return vm.httpCacheOrange.getth(vm.clientAPIUrl, _search, _headers)
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
        getth(url: string, params: any, headers: any, time?: number, refresh?: boolean): ng.IPromise<any>;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:httpCacheOrange#getthConfig
         * @param {string} url de la api sin parametros.
         * @param {Object} params Parámetros en queryString y path.
         * @param {Object} headers Cabecera de la petición.
         * @param {object} componentConfig de cache del componente.
         * @param {object} APIConfig de cache del componente.
         * @param {boolean=} [refresh=false] Invalida la cache por defecto false
         * @methodOf OrangeFeSARQ.Services:httpCacheOrange
         * @description
         * Servicio de cache con configuracion de componente ( con pase de cabeceras).
         * @example
         * Ver implementacion ParentController.httpCacheGeth
         * ```js
         * let vm = this;
         * let _search:Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get']
         *    };
         * let _headers =   {
         * 'Component-Name': 'locator'
         * }
         * return vm.httpCacheOrange.getthConfig(vm.clientAPIUrl, _search, _headers)
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
        getthConfig(url: string, params: any, headers: any, componentConfig: OrangeFeSARQ.Models.Cache, APIConfig: OrangeFeSARQ.Models.Cache, refresh?: boolean): ng.IPromise<any>;
        private getConfig(componentConfig, APIConfig, key, url, _search, refresh);
        private static mixCache(cacheComp, cacheAPI);
    }
}
declare module OrangeFeSARQ.Services {
    interface ILocalStorageManager {
        getEntry(key: string): any;
        setEntry(key: string, value: any): any;
        removeEntry(key: string): void;
    }
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:localStorageSrv
     * @module localStorageManager
     * @description
     * Interfaz del localStorage de HTML
     */
    class LocalStorageManager implements ILocalStorageManager {
        constructor();
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:localStorageSrv#getEntry
         * @param {string} key ID del objeto a recuperar.
         * @methodOf OrangeFeSARQ.Services:localStorageSrv
         * @description
         * getter del localStorage
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.localStorageManager.getEntry('key')
         * ```
         * @return {object} JSON
         */
        getEntry(key: string): any;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:localStorageSrv#setEntry
         * @param {string} key ID del objeto a guardar.
         * @param {object} object objeto a guardar.
         * @methodOf OrangeFeSARQ.Services:localStorageSrv
         * @description
         * setter del localStorage
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.localStorageManager.setEntry('key',object)
         * ```
         * @return {void} void
         */
        setEntry(key: string, object: any): any;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:localStorageSrv#removeEntry
         * @param {string} key ID del objeto a eliminar.
         * @methodOf OrangeFeSARQ.Services:localStorageSrv
         * @description
         * Elimina un objeto del localStorage a partir de su ID
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.localStorageManager.removeEntry('key')
         * ```
         * @return {void} void
         */
        removeEntry(key: string): void;
    }
}
declare module OrangeFeSARQ.Services {
    interface ILoggingManager {
        info(componentName: string, messageCode: string, message: string, loggerAppenders: OrangeFeSARQ.Models.Logger): void;
        warn(componentName: string, messageCode: string, message: string, loggerAppenders: OrangeFeSARQ.Models.Logger): void;
        error(componentName: string, errorCode: string, errorMessage: string, loggerAppenders: OrangeFeSARQ.Models.Logger): void;
        critical(componentName: string, errorCode: string, errorMessage: string): void;
        sendTraces(trace: OrangeFeSARQ.Models.Trace): void;
    }
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:loggerSrv
     * @module loggingManager
     * @description
     * Servicio que gestiona las trazas de los SPA, tanto por consola como contra un servicio de backends.
     */
    class LoggingManager implements ILoggingManager {
        private $http;
        private $log;
        private appConfigSrv;
        private uuidSrv;
        private msisdnStore;
        private genericConstant;
        private $rootElement;
        static $inject: string[];
        private appName;
        constructor($http: ng.IHttpService, $log: ng.ILogService, appConfigSrv: OrangeFeSARQ.Services.AppConfigManager, uuidSrv: OrangeFeSARQ.Services.IUUID, msisdnStore: OrangeFeSARQ.Services.MsisdnStore, genericConstant: any, $rootElement: ng.IRootElementService);
        sendTraces: (trace: Models.Trace) => void;
        traceConsole: (trace: Models.Trace) => void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:loggerSrv#info
         * @param {string} componentName nombre del componente (modulo).
         * @param {string} messageCode código del mensaje.
         * @param {string} message mensaje .
         * @param {object} loggerAppenders configuracion de logging para ese componente.
         * @methodOf OrangeFeSARQ.Services:loggerSrv
         * @description
         * Genera una traza de info en consola y/o backends, dependiente de la configuración de componente (appConfig.json).
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.logger.info('componentName', '001', 'mensaje, error generico', false);
         * ```
         *
         * @return {void} void
         */
        info: (componentName: string, messageCode: string, message: string, loggerAppenders: Models.Logger) => void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:loggerSrv#warn
         * @param {string} componentName nombre del componente (modulo).
         * @param {string} messageCode código del mensaje.
         * @param {string} message mensaje .
         * @param {object} loggerAppenders configuracion de logging para ese componente.
         * @methodOf OrangeFeSARQ.Services:loggerSrv
         * @description
         * Genera una traza de warning en consola y/o backends, dependiente de la configuración de componente (appConfig.json).
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.logger.warn('componentName', '001', 'mensaje, error generico', false);
         * ```
         *
         * @return {void} void
         */
        warn: (componentName: string, messageCode: string, message: string, loggerAppenders: Models.Logger) => void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:loggerSrv#error
         * @param {string} componentName nombre del componente (modulo).
         * @param {string} errorCode código de error.
         * @param {string} errorMessage mensaje de error.
         * @param {object} loggerAppenders configuracion de logging para ese componente.
         * @methodOf OrangeFeSARQ.Services:loggerSrv
         * @description
         * Genera una traza de error en consola y/o backends, dependiente de la configuración de componente (appConfig.json).
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.logger.error('componentName', '001', 'mensaje, error generico', false);
         * ```
         *
         * @return {void} void
         */
        error: (componentName: string, errorCode: string, errorMessage: string, loggerAppenders: Models.Logger) => void;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:loggerSrv#error
         * @param {string} componentName nombre del componente (modulo).
         * @param {string} errorCode código de error.
         * @param {string} errorMessage mensaje de error.
         * @param {boolean} newProcess indicador de nuevo proceso funcional de la app.
         * @methodOf OrangeFeSARQ.Services:loggerSrv
         * @description
         * Genera una traza de error critico en consola y/o backends, dependiente de la configuración de componente (appConfig.json).
         * No debe invocarse programaticamente desde las aplicaciones, es llamado cuando se da algun error Javascript.
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.logger.error('componentName', '001', 'mensaje, error generico', false);
         * ```
         *
         * @return {void} void
         */
        critical: (componentName: string, errorCode: string, errorMessage: string) => void;
    }
}
declare module OrangeFeSARQ.Services {
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:msisdnStore
     * @module msisdnStore
     * @description
     * Store del misdn
     */
    class MsisdnStore {
        private _msisdn;
        constructor();
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:msisdnStore#msidn
         * @methodOf OrangeFeSARQ.Services:msisdnStore
         * @description
         * getter del msisdn
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.msisdnStore.msisdn()
         * ```
         * @return {string} msisdn
         */
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:msisdnStore#msidn
         * @param {string} misdn misdn a guardar.
         * @methodOf OrangeFeSARQ.Services:msisdnStore
         * @description
         * setter del msisdn
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.msisdnStore.msisdn('value')
         * ```
         * @return {void} void
         */
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
        private $injector;
        static $inject: string[];
        keys: any;
        private layoutsIds;
        constructor(httpCacheOrange: any, genericConstant: any, $injector: any);
        setDataInStore(section: any): void;
        changeComp(element: any): any;
        getLayoutMetada(key: string, exp?: number): any;
        private getLayout(key, exp?);
        getLayoutMetadaConcat(key: string, exp?: number): any;
        changeLayaoutMetada(layoutMetaData: any): any;
        changeSection(section: any): any;
        addAsset(comp: any): any;
        getAllLayoutIds(): void;
        getDynamicViewLayoutMetada(key: string, exp?: number): any;
        getDinamicLayoutMetada(key: string, exp?: number): any;
    }
}
declare module OrangeFeSARQ.Services {
    interface ISessionStorageManager {
        getEntry(key: string): any;
        setEntry(key: string, value: any): any;
        removeEntry(key: string): void;
    }
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:sessionStorageSrv
     * @module sessionStorageManager
     * @description
     * Interfaz del sessionStorage
     */
    class SessionStorageManager implements ISessionStorageManager {
        constructor();
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:sessionStorageSrv#getEntry
         * @param {string} key ID del objeto a recuperar.
         * @methodOf OrangeFeSARQ.Services:sessionStorageSrv
         * @description
         * getter del sessionStorage
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.sessionStorageManager.getEntry('key')
         * ```
         * @return {object} objeto persistido en la sesion
         */
        getEntry(key: string): any;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:sessionStorageSrv#setEntry
         * @param {string} key ID del objeto a guardar.
         * @param {object} object objeto a guardar.
         * @methodOf OrangeFeSARQ.Services:sessionStorageSrv
         * @description
         * setter del sessionStorage
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.sessionStorageManager.setEntry('key', object)
         * ```
         * @return {void} void
         */
        setEntry(key: string, object: any): any;
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:sessionStorageSrv#removeEntry
         * @param {string} key ID del objeto a eliminar.
         * @methodOf OrangeFeSARQ.Services:sessionStorageSrv
         * @description
         * elimina un objeto del sessionStorage a partir de su ID
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.sessionStorageManager.removeEntry('key')
         * ```
         * @return {void} void
         */
        removeEntry(key: string): void;
    }
}
declare module OrangeFeSARQ.Services {
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
        finishProcess(): void;
        getProcessId(): string;
    }
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:uuidSrv
     * @module uuidManager
     * @description
     * Servicio que genera los ID de sesión y transacciones (procesos).
     * Interno de arquitectura, no utilizar desde SPA
     */
    class UUID implements ng.IServiceProvider {
        private sessionId;
        private processId;
        private processCount;
        private lastSessionIdSegment;
        constructor();
        generateRandomSequence: () => string;
        roundTwoDigits: (num: number) => string;
        getSessionId: () => string;
        $get(): IUUID;
        getProcessId: () => string;
        generateSessionId: (appId: string) => void;
        newProcess: () => void;
        finishProcess: () => void;
    }
}
