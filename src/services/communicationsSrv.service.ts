module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OFC.Services.CommunicationsSrv
     * @description
     * Servicio que realiza la llamada a la API Communications
     */
    export class CommunicationsSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public communicationListAPIUrl: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;

            vm.communicationListAPIUrl = vm.genericConstant.communications;
        }

        /**
         * @ngdoc method
         * @name OFC.Services.CommunicationsSrv#postCommunicationList()
         * @methodOf OFC.Services.CommunicationsSrv
         * @param {object} body cuerpo de la llamada
         * @param {string} componentName Componente.
         * @description
         * Envía una comunicación
         * @returns {object} Devuelve una promesa con el response.
         */
        postCommunicationList(body: any, componentName: string): any {
            let vm = this;

            let _search: Object = {
                queryParams:  body,
                urlParams: ['communications']
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
        postTemplate(body: any, componentName: string) : any {
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
        .service('communicationsSrv', CommunicationsSrv);
}
