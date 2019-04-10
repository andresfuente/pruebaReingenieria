module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.CommunicationsSrv
     * @description
     * Servicio que realiza la llamada a la API Communications
     */
    export class CommunicationsSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public communicationListAPIUrl: string;
        public communicationListAPIUrlV2: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.communicationListAPIUrl = vm.genericConstant.communications;
            vm.communicationListAPIUrlV2 = vm.genericConstant.communicationsV2;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.CommunicationsSrv#postCommunicationList()
         * @methodOf OrangeFeSARQ.Services.CommunicationsSrv
         * @param {object} body cuerpo de la llamada
         * @param {string} componentName Componente.
         * @description
         * Envía una comunicación
         * @returns {object} Devuelve una promesa con el response.
         */
        postCommunicationList(body: OrangeFeSARQ.Models.IBody, componentName) {
            let vm = this;

            let _search: Object = {
                queryParams:  body,
                urlParams: ['communications']
            };

            return vm.httpPost(vm.communicationListAPIUrl, _search, componentName)
                .then(
                    (response) => {
                        return response;
                    }
                )
                .catch(
                    (error) => {
                        return error;
                    }
                );
        }

        /**
         * @ngdoc method
         * @name OFC.Services.CommunicationsSrv#postTemplate()
         * @methodOf OFC.Services.CommunicationsSrv
         * @param {string} body cuerpo de la llamada
         * @param {string} componentName Componente.
         * @description
         * Envía una comunicación con un template
         * @returns {object} Devuelve una promesa con el response.
         */
        postTemplate(body: OrangeFeSARQ.Models.ITemplateBody2, componentName) {
            let vm = this;

            let _search: Object = {
                queryParams:  body,
                urlParams: ['communications', 'details']
            };

            return vm.httpPost(vm.communicationListAPIUrl, _search, componentName)
                .then(
                    (response) => {
                        return response.data;
                    }
                )
                .catch(
                    (error) => {
                        return error.data;
                    }
                );
        }

        sendEmail(body: any, componentName) : any {
            let vm = this;

            let _search: Object = {
                queryParams:  body,
                urlParams: ['communications', 'sendEmail', 'sires']
            };

            return vm.httpPost(vm.communicationListAPIUrl, _search, componentName)
                .then(
                    (response) => {
                        return response;
                    }
                )
                .catch(
                    (error) => {
                        return error;
                    }
                );
        }
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.CommunicationsSrv#sendEmailPost()
         * @methodOf OrangeFeSARQ.Services.CommunicationsSrv
         * @param {object} body cuerpo de la llamada
         * @param {string} componentName Componente.
         * @description
         * Enviar correo.
         * @returns {object} Devuelve una promesa con el response o error.
         */
        sendEmailPost(body: any, componentName) {
            let vm = this;

            let _search: Object = {
                queryParams: body,
                urlParams: ['communicationMessage']
            };

            vm.communicationListAPIUrl = 'api/communication/v2';

            return vm.httpPost(vm.communicationListAPIUrl, _search, componentName)
                .then(
                    (response) => {
                        return response.data;
                    }
                )
                .catch(
                    (error) => {
                        return error.data;
                    }
                );
        }

        getCommunicationList(body: OrangeFeSARQ.Models.IBody2, componentName) {
            let vm = this;

            let _search: Object = {
                queryParams: body,
                urlParams: ['communicationMessage']
            };

            return vm.httpCacheGett(vm.genericConstant.communication, _search, componentName)
                .then(
                    (response) => {
                        return response.data;
                    }
                )
                .catch(
                    (error) => {
                        return error.data;
                    }
                );
        }

        getTemplate(body: OrangeFeSARQ.Models.ITemplateBody2, componentName) {
            let vm = this;

            const customBody = {}

            let _search: Object = {
                queryParams: body,
                urlParams: ['communicationMessage']
            };

            return vm.httpCacheGett(vm.genericConstant.communication, _search, componentName)
                .then(
                    (response) => {
                        return response.data;
                    }
                )
                .catch(
                    (error) => {
                        return error.data;
                    }
                );
        }

        sendSMS(body: any, componentName) : any {
            let vm = this;

            let _search: Object = {
                queryParams:  body,
                urlParams: ['communicationMessage']
            };
            vm.communicationListAPIUrlV2 = 'api/communication/v2';


            return vm.httpPost(vm.communicationListAPIUrlV2, _search, componentName)
                .then(
                    (response) => {
                        return response.data;
                    }
                )
                .catch(
                    (error) => {
                        return error.data;
                    }
                );
        }
    }
    angular.module('communicationsSrv', [])
        .service('communicationsSrv', OrangeFeSARQ.Services.CommunicationsSrv);
}
