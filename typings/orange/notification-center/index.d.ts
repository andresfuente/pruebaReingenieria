declare module OrangeFeSARQ {
}
declare module OrangeFeSARQ.Components {
    class InformationCenterComponent implements ng.IComponentOptions {
        controller: Function;
        template: string | Function;
        constructor();
    }
}
declare module OrangeFeSARQ.Components {
    class LoadCenterComponent implements ng.IComponentOptions {
        controller: Function;
        template: string | Function;
        constructor();
    }
}
declare module OrangeFeSARQ.Components {
    class NotificationCenterComponent implements ng.IComponentOptions {
        controller: Function;
        template: string | Function;
        constructor();
    }
}
declare module OrangeFeSARQ.Controllers {
    class InformationMessagesCenterCtrl {
        $injector: any;
        private messageToShow;
        static $inject: string[];
        informationCenterSrv: any;
        callbackfunction: any;
        constructor($injector: any);
        setInjections($injector: any): void;
        initComp(): void;
        setCallbackFunction(fun: any): void;
        closeMessage: () => void;
    }
}
declare module OrangeFeSARQ.Controllers {
    class LoadCenterCtrl {
        $injector: any;
        private messageToShow;
        static $inject: string[];
        loadCenterSrv: any;
        constructor($injector: any);
        setInjections($injector: any): void;
        initComp(): void;
        closeMessage(): void;
    }
}
declare module OrangeFeSARQ.Controllers {
    class NotificationMessagesCenterCtrl {
        $injector: any;
        private messageQueue;
        static $inject: string[];
        notificationCenterSrv: any;
        constructor($injector: any);
        setInjections($injector: any): void;
        initComp(): void;
        closeMessage: (idxErrorMsg: number) => void;
    }
}
declare module OrangeFeSARQ.Services {
    interface IInformationCenterSrv {
        messageToShow: Array<any>;
        addInformationMessage(typeMsg: number, title?: string, message?: string): void;
        closeMessage(): void;
    }
    class InformationCenterSrv implements IInformationCenterSrv {
        private $timeout;
        messageToShow: Array<any>;
        static $inject: string[];
        callbackfunction: any;
        constructor($timeout: ng.ITimeoutService);
        /** Queue a success alert message */
        addInformationMessage(typeMsg: number, title?: string, message?: string): void;
        /** Close an specific message (the user clicks on the close icon) */
        closeMessage(): void;
    }
}
declare module OrangeFeSARQ.Services {
    interface ILoadCenterSrv {
        loadPage: Array<any>;
        addLoad(typeMsg: number, message?: string): void;
        closeLoadPage(): void;
    }
    class LoadCenterSrv implements ILoadCenterSrv {
        loadPage: Array<any>;
        constructor();
        /** Queue a success alert message */
        addLoad(typeMsg: number, message?: string): void;
        /** Close an specific message (the user clicks on the close icon) */
        closeLoadPage(): void;
    }
}
declare module OrangeFeSARQ.Services {
    interface INotificationCenterSrv {
        messageQueue: Array<NotificationCenterMessage>;
        addSuccessMessage(title: string, message: string, expirationTimeInSec?: number): void;
        addWarningMessage(title: string, message: string, expirationTimeInSec?: number): void;
        addInfoMessage(title: string, message: string, expirationTimeInSec?: number): void;
        addErrorMessage(title: string, message: string, expirationTimeInSec?: number): void;
        closeMessage(errorPos: number): void;
        cleanAllMessages(): void;
        canMessageToBeScheduled(messageToSchedule: NotificationCenterMessage): boolean;
    }
    class NotificationCenterSrv implements INotificationCenterSrv {
        private $timeout;
        messageQueue: Array<NotificationCenterMessage>;
        static $inject: string[];
        constructor($timeout: ng.ITimeoutService);
        /** Queue a success alert message */
        addSuccessMessage(title: string, message: string, expirationTimeInSec?: number): void;
        /** Queue a warning alert message */
        addWarningMessage(title: string, message: string, expirationTimeInSec?: number): void;
        /** Queue an info alert message */
        addInfoMessage(title: string, message: string, expirationTimeInSec?: number): void;
        /** Queue an error alert message */
        addErrorMessage(title: string, message: string, expirationTimeInSec?: number): void;
        /** Close an specific message (the user clicks on the close icon) */
        closeMessage(idxErrorMsg: number): void;
        /** Remove all messages from the queue */
        cleanAllMessages(): void;
        /** Queue an alert message with an expiration time (autoclosable) */
        addScheduledAlertMessage(messageToSchedule: NotificationCenterMessage): void;
        /** Close a scheduled message */
        closeScheduledMessage(messageToSchedule: NotificationCenterMessage): void;
        /** Generate an unique id for scheduled messages */
        obtainTimestampMessageId(): number;
        /** Checks if a message can be scheduled into queue */
        canMessageToBeScheduled(messageToSchedule: NotificationCenterMessage): boolean;
    }
}
declare type NotificationCenterMessageType = 'success' | 'warning' | 'info' | 'error';
declare type NotificationCenterMessage = {
    timestampId?: number;
    title: string;
    message: string;
    msgType: NotificationCenterMessageType;
    animationClass?: string;
    autoclosable?: {
        expiresInSecs: number;
    };
};
