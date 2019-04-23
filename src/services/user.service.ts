module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name locator.UserSrv
     * @description
     * #rest
     * Servicio que busca un cliente en funcion de distintos parámetros
     */
    export class UserSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector', '$q'];
        public clientAPIUrl: string;
        public customerManagementAPI: string;
        public genericConstant;
        public CV;
        public hootAPIUrl: string;
        public mdgData: any;
        public utils: any;

        constructor($injector, public $q) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
            vm.CV = $injector.get('customerViewStore');
            vm.customerManagementAPI = vm.genericConstant.customerManagement;
            vm.clientAPIUrl = vm.genericConstant.customerView;
            vm.hootAPIUrl = vm.genericConstant.hoot;
            vm.utils = $injector.get('utils');
        }

        /**
         * @ngdoc method
         * @name #getUser(param:string, clientId:string)
         * @methodOf locator.UserSrv
         * @returns {object} Devuelve una promesa con el response
         */
        getUser(param: string, clientId: string, componentName: string = 'locatorComp'): any {
            let vm = this;
            let promise = vm.$q.defer();

            param = vm.getParamsGetUser(param, clientId);

            let _search: Object = vm.objSearch();

            vm.httpCacheGett(vm.clientAPIUrl, _search, componentName)
                .then(
                    (response) => {
                        if (response.data && response.data.customer && componentName !== 'shopping_cart_resume') {
                            if (response.data.customer.individual && response.data.customer.individual.id) {
                                localStorage.setItem('id', JSON.stringify(response.data.customer.individual.id));
                            } else {
                                localStorage.setItem('id', JSON.stringify(response.data.customer.organization.id));
                            }
                            vm.getMdgUser(param, clientId); // Cuando se realiza la llamada al Plan amigo no es necesario esta llamada
                        }
                        // - response.data.mdg = vm.mdgData;
                        promise.resolve(response.data);
                    },
                    (error) => {
                        promise.reject(error.data);
                    });
            return promise.promise;
        }

        /**
         * @ngdoc method
         * @name #getUser(param:string, clientId:string)
         * @methodOf locator.UserSrv
         * @returns {object} Replica al metodo getUser pero
         * devuelve un error para controlar en función al status
         */
        getUserWithStatus(param: string, clientId: string, componentName: string = 'locatorComp'): any {
            let vm = this;
            let promise = vm.$q.defer();

            param = vm.getParamsGetUser(param, clientId);

            let _search: Object = vm.objSearch();

            //TODO PRUEBA FASTDATA
            // if(vm.genericConstant.site === 'FichaCliente' && window.location.hostname === 'fichadecliente-uat.int.si.orange.es'){
                // switch (clientId){
                    // case '24130682W':
                        // vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        // break;
                    // case '18000712S':
                        // vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        // break;
                    // case '26496966T':
                        // vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        // break;
                    // case '44138785Z':
                        // vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        // break;
                    // case '71558378L':
                        // vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        // break;
                    // case '05422521H':
                        // vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        // break;
                    // case '50185084G':
                        // vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        // break;
                    // default:
                        // vm.clientAPIUrl = 'api/customerView/v1';
                        // break;
                // }
            // }

            vm.httpCacheGett(vm.clientAPIUrl, _search, componentName)
                .then(
                    (response) => {
                        if (response.data && response.data.customer && componentName !== 'shopping_cart_resume') {
                            if (response.data.customer.individual && response.data.customer.individual.id) {
                                localStorage.setItem('id', JSON.stringify(response.data.customer.individual.id));
                            } else {
                                localStorage.setItem('id', JSON.stringify(response.data.customer.organization.id));
                            }
                            vm.getMdgUser(param, clientId); // Cuando se realiza la llamada al Plan amigo no es necesario esta llamada
                        }
                        // - response.data.mdg = vm.mdgData;
                        promise.resolve(response.data);
                    },
                    (error) => {
                        promise.reject(error);
                    });
            return promise.promise;
        }

        /**
         * @ngdoc method
         * @name #getJazztelUser(param:string, clientId:string, componentName:string)
         * @methodOf locator.UserSrv
         * @param {param}
         * @param {clientId} Documento de identificacion de cliente
         * @param {componentName} Nombre del componente
         * @returns {object} Busca el recurso en el customerView de empresas
         */
        getJazztelUser(param: string, clientId: string, componentName: string = 'prescoring'): any {
            let vm = this;
            let promise = vm.$q.defer();
            let marca;
            if (param === 'publicKey') {
                param = 'telephoneNumber';
            }
            marca = 'jazztel';
            let _search: Object = {
                queryParams: {
                    'onlyActive': vm.genericConstant.onlyActive,
                },
                urlParams: [marca, 'customerView', param, clientId]

            };

            vm.httpCacheGett(vm.clientAPIUrl, _search, componentName)
                .then(
                    (response) => {
                        if (response.data && response.data.customer) {
                            if (response.data.customer.individual && response.data.customer.individual.id) {
                                localStorage.setItem('id', JSON.stringify(response.data.customer.individual.id));
                            } else {
                                localStorage.setItem('id', JSON.stringify(response.data.customer.organization.id));
                            }
                            vm.getMdgUser(param, clientId); // Cuando se realiza la llamada al Plan amigo no es necesario esta llamada
                        }
                        // - response.data.mdg = vm.mdgData;
                        promise.resolve(response.data);
                    },
                    (error) => {
                        promise.reject(error);
                    });
            return promise.promise;
        }

        /**
         * @ngdoc method
         * @name #getAmenaUser(param:string, clientId:string, componentName:string)
         * @methodOf locator.UserSrv
         * @param {param} individualPublicId
         * @param {clientId} Documento de identificacion de cliente
         * @param {componentName} Nombre del componente
         * @returns {object} Busca el recurso en el customerView de empresas
         */

        getBusinessUser(param: string, clientId: string, componentName: string = 'locatorComp') {
            let vm = this;

            let promise = vm.$q.defer();
            let _search: Object = {
                queryParams: {
                    'onlyActive': vm.genericConstant.onlyActive,
                    'timestamp': new Date().getTime()
                },
                urlParams: [vm.genericConstant.brand, 'customerView', param, clientId]
            };

            vm.httpCacheGett(vm.genericConstant.customerViewB2B, _search, componentName)
                .then(
                (response) => {
                    if (response.data && response.data.customer) {
                        if (response.data.customer.individual && response.data.customer.individual.id) {
                            localStorage.setItem('id', JSON.stringify(response.data.customer.individual.id));
                        } else {
                            localStorage.setItem('id', JSON.stringify(response.data.customer.organization.id));
                        }
                    }

                    vm.getMdgUser(param, clientId);
                    // - response.data.mdg = vm.mdgData;
                    promise.resolve(response.data);
                },
                (error) => {
                    promise.reject(error.data);
                });
            return promise.promise;
        }


        /**
         * @ngdoc method
         * @name #getAmenaUser(param:string, clientId:string, componentName:string)
         * @methodOf locator.UserSrv
         * @param {param} individualPublicId
         * @param {clientId} Documento de identificacion de cliente
         * @param {componentName} Nombre del componente
         * @returns {object} Devuelve una promesa con la respuesta del CustomerView para clientes Amena
         */

        getAmenaUser(param: string, clientId: string, componentName: string): any {
            let vm = this;
            let promise = vm.$q.defer();

            param = vm.getParamsGetUser(param, clientId);

            let _search: Object = {
                queryParams: {
                    'onlyActive': vm.genericConstant.onlyActive
                },
                urlParams: ['amena', 'customerView', param, clientId]

            };

            vm.httpCacheGett(vm.clientAPIUrl, _search, componentName)
                .then(
                    (response) => {
                        if (response.data && response.data.customer) {
                            if (response.data.customer.individual && response.data.customer.individual.id) {
                                localStorage.setItem('id', JSON.stringify(response.data.customer.individual.id));
                            } else {
                                localStorage.setItem('id', JSON.stringify(response.data.customer.organization.id));
                            }
                        }

                        vm.getMdgUser(param, clientId);
                        // - response.data.mdg = vm.mdgData;
                        promise.resolve(response.data);
                    },
                    (error) => {
                        promise.reject(error.data);
                    });
            return promise.promise;
        }

        getManagementSegment(param, inputValue: string, componentName?): any {
            let vm = this;
            let returnValue: boolean = false;
            let promise = vm.$q.defer();
            //let clientData = JSON.parse(sessionStorage.getItem('clientData'));

            let _search: any = {
                queryParams: {
                    brand: 'orange'
                },
                urlParams: ['customer'],
            };

            if (param && param !== 'publicKey' && _search.queryParams) {
                _search.queryParams.publicId = inputValue;
            } else {
                _search.queryParams.publicKey = inputValue;
            }

            vm.httpCacheGett(vm.customerManagementAPI, _search, componentName)
                .then((response) => {
                    if (response && response.data && response.data.customer && response.data.customer.characteristic[0] 
                        && response.data.customer.characteristic[0].value) {
                            promise.resolve(response.data.customer.characteristic[0].value);
                    } else {
                        promise.resolve(false);
                    }
                })
                .catch(function (error) {
                    promise.reject(error);
                });

            return promise.promise;
        }
    
        getMdgUser(param: string, clientId: string, componentName: string = 'locatorComp') {
            let vm = this;

            let _search: Object = {
                queryParams: {},
                urlParams: [vm.genericConstant.brand, 'mdg', param, clientId]
            };

            vm.httpCacheGett(vm.hootAPIUrl, _search, componentName, true)
                .then(
                    (response) => {
                        if (response.data.mdgRest) {
                            vm.CV.mdg = response.data.mdgRest;
                        }
                    },
                    (error) => {
                        vm.CV.mdg = {error: error};

                    });
        }

        getParamsGetUser(param: string, clientId: string) : string {
            let vm = this;

            let returnParam = param;

            if (param === 'individualPublicId' && vm.utils.isNif(clientId)) {
                returnParam = 'residential';
            } else if (param === 'individualPublicId' && vm.utils.isCif(clientId)) {
                returnParam = 'business';
            } else if (param === 'publicKey') {
                returnParam = 'telephoneNumber';
            } else if (param === 'individualPublicId' && (!vm.utils.isNif(clientId) && !vm.utils.isCif(clientId))) {
                returnParam = 'residential';
            }

            return returnParam;
        } 

        objSearch(){
            let vm = this;
            let _search: Object = {
                queryParams: {
                    'onlyActive': vm.genericConstant.onlyActive,
                },
                urlParams: [vm.genericConstant.brand, 'customerView', param, clientId]

            };
            return _search;
        }
    }
}
