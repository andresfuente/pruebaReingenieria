declare module fichaDeCliente {
}
declare module rowSwitch.Components {
    class RowSwitchComp implements ng.IComponentOptions {
        controller: Function;
        templateUrl: string | Function;
        controllerAs: string;
        bindings: any | Function | (any | Function)[];
        constructor();
    }
}
declare module rowSwitch.Controllers {
    class RowSwitchCtrl extends OrangeFeSARQ.Controllers.ParentController {
        $injector: any;
        static $inject: string[];
        private valueCheck;
        private checkbox;
        private todoBien;
        private clase;
        private classStatus;
        private urlMock;
        private msisdn;
        code: string;
        title: string;
        subtitle: string;
        InformationCenterSrv: any;
        rowSwitchSrv: any;
        rowSwitchIdsConstant: any;
        LoadCenterSrv: any;
        constructor($injector: any);
        setInjections(injector: any): void;
        doDigest(): void;
        inputChange(): void;
        initComp(): void;
        showModalMessage(typeMsg: number, title?: string, message?: string): void;
    }
}
declare module rowSwitch.Services {
    /**
     */
    interface IRowSwitchSrv {
    }
    /**
     */
    class RowSwitchSrv implements IRowSwitchSrv {
        private httpCacheOrange;
        private $http;
        static $inject: string[];
        constructor(httpCacheOrange: any, $http: any);
        getOptions(param: string, url: string, clientId: string): any;
    }
}
