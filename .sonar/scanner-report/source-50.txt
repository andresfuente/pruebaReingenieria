module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name discriminatorSrv.DiscriminatorSrv
     * @description
     * Servicio que realiza la llamada a la API Discriminator.
     */
    export class DiscriminatorSrv extends OrangeFeSARQ.Services.ParentService {
        static inject = ['$injector'];
        public genericConstant;
        public discriminatorSrvUrl: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }
        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
            vm.discriminatorSrvUrl = vm.genericConstant.discriminator;
        }
        /**
         * @ngdoc method
         * @name #postACSrv(Sfid:string, compomentName:string)
         * @methodOf discriminatorSrv.DiscriminatoriSrv
         * @returns {object} Devuelve una promesa con el response.
         */
        postAC(body, componentName: string): any {
            let vm = this;

            // Ponemos en mayúscula el DNI
            body.numDoc = body.numDoc.toUpperCase();

            let _search: Object = {
                // Valores variables
                queryParams: body,
                // Valores fijos
                urlParams: ['discriminacion']
            };

            return vm.httpPost(vm.discriminatorSrvUrl, _search, componentName)
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
         * @name discriminatorSrv.Services:discriminatorSrv#getClientType
         * @methodOf discriminatorSrv.Services:discriminatorSrv
         * @param {string} document documento identificador del cliente
         * @param {string} brand marca a la que hacer la llamada
         * @param {string} docType tipo del documento que se ha introducido
         * @param {string} clientType tipo del cliente sobre el que se quiere consultar
         * @param {string} componentName nombre del componente que hace la llamada
         * @param {string} refresh bandera para indicar si obligar a hacer la petición
         * @description
         * Obtiene la información del sistema en el que se encuentra el cliente
         * @return {Object} Una promesa con los datos del sistema al que pertenece el cliente
         */
        getClientType(document: string, brand: string, docType: string, clientType: string,
            componentName: string = 'discriminatorSrv', refresh: boolean = false): any {
            let vm = this;
            let method = 'GetSystem';
            let _search: Object = {
                queryParams: {
                    tipoDoc: docType,
                    numDoc: document,
                    tipoCliente: clientType
                },
                urlParams: [brand, method]
            };

            return vm.httpCacheGett(vm.discriminatorSrvUrl, _search, componentName, refresh)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error.data;
                });
        }

        
        /** @ngdoc method
         * @name discriminatorSrv.Services:discriminatorSrv#orderFeasibilityCheckRequestStep2
         * @methodOf discriminatorSrv.Services:discriminatorSrv
         * @param {discriminator.Models.OrderFeasibilityCheckRequest} checkRequest
         * @description
         * 
         */
        orderFeasibilityCheckRequestStep2(checkRequestStep2: discriminator.Models.Step2CheckRequest, fixedNumber?: string, CDM?): ng.IPromise<any> {
            let vm = this;
            
            let _queryParams;
            _queryParams = {};

            if(fixedNumber) {
                _queryParams = {
                    MSISDN: fixedNumber
                };
            }
            if(CDM) {
                _queryParams.CDM = CDM;
            }

            let _data = {
                body: checkRequestStep2,
                queryParams: _queryParams,
                urlParams: ['orderFeasibilityCheckRequestStep2']
            };

            return vm.httpPost(vm.genericConstant.serviceCoverageStep2, _data, 'discriminatorPopupComp')
                .then((response) => {
                    return response;
                }).catch((error) => {
                    throw error;
                });
        }


    }
    angular.module('discriminatorSrv', [])
        .service('discriminatorSrv', OrangeFeSARQ.Services.DiscriminatorSrv);
}