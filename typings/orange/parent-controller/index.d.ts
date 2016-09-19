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
        httpCacheOrange: any;
        $rootRouter: any;
        $window: any;
        $location: any;
        genericConstant: any;
        literalConstant: any;
        orangeOwcs: any;
        customerViewStore: any;
        notificationCenterSrv: any;
        informationCenterSrv: any;
        LoadCenterSrv: any;
        msisdnStore: any;
        utils: any;
        localStorageManager: any;
        sessionStorageManager: any;
        private _class;
        private _find;
        index: number;
        userService: any;
        $filter: any;
        constructor($injector: any);
        getIndex(): number;
        $onDestroy(): void;
        setInjections($injector: any): void;
        setBindData(): void;
        initComp(): void;
        prepareTest(params: any[], functions: any[]): void;
        showModalMessage(typeMsg: number, title?: string, message?: string): void;
    }
}