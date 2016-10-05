module OrangeFeSARQ.Services {
    'use strict';

    /* tslint:disable no-any */

    // An HTTP interceptor is composed by 4 possible actions, request and response (OK and Error cases)
    export interface IInterceptor {
        request: Function;
        requestError: Function;
        response: Function;
        responseError: Function;
    }

    /**
     *    HTTP Generic error interceptor
     */
    export class HttpErrorInterceptor implements IInterceptor {
        public static $inject = ['$q', 'notificationCenterSrv', 'userInfoSrv'];

        public static Factory(
                $q: ng.IQService,
                notificationCenterSrv: OrangeFeSARQ.Services.INotificationCenterSrv,
                userInfoSrv: OrangeFeSARQ.Services.IUserInfoSrv) {
            return new HttpErrorInterceptor($q, notificationCenterSrv, userInfoSrv);
        }

        constructor(
            private $q: ng.IQService,
            private notificationCenterSrv: OrangeFeSARQ.Services.INotificationCenterSrv,
            private userInfoSrv: OrangeFeSARQ.Services.IUserInfoSrv
        ) { }

        // Request OK
        public request = (config): ng.IPromise<any> => {
            config.headers['X-ANGPOC-USER-ROL'] = this.userInfoSrv.getUserRol();
            return config;
        }

        // Response OK, without error
        public response = (responseSuccess): ng.IPromise<any> => {
            return responseSuccess || this.$q.when(responseSuccess);
        }

        // Request error
        public requestError = (requestFailure): ng.IPromise<any> => {
            // Determine if can recover the error: reply the request or something
            // A request can fail due to another interceptor => requestFailure === NameOfAnotherInterceptor
            // New promise? Pending to define the error management
            // requestFailure
            return this.$q.reject(requestFailure);
        }

        /**
            Response error. May be of interest the following fields:
                - responseFailure.status: HTTP error code
                - responseFailure.data: probably, the error returned
                - responseFailure.config: headers, method, url, transformers
        */
        public responseError = (responseFailure): ng.IPromise<any> => {
            //console.log('Response error HTTP code: ' + responseFailure.status);
            //console.log('Response error HTTP data: ' + responseFailure.data);
            this.notificationCenterSrv.addErrorMessage(
                'HTTP - ERROR ' + responseFailure.status,
                'Se ha producido un error al procesar su petición, por favor, inténtelo de nuevo unos instantes más tarde',
                5
            );
            return this.$q.reject(responseFailure);
        }
    }

    angular.module('errorInterceptor', [])
        .factory('HttpErrorInterceptor', HttpErrorInterceptor.Factory);

}
