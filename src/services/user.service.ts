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
            if (param === 'individualPublicId' && vm.utils.isNif(clientId)) {
                param = 'residential';
            } else if (param === 'individualPublicId' && vm.utils.isCif(clientId)) {
                param = 'business';
            } else if (param === 'publicKey') {
                param = 'telephoneNumber';
            } else if (param === 'individualPublicId' && (!vm.utils.isNif(clientId) && !vm.utils.isCif(clientId))) {
                param = 'residential';
            }

            let _search: Object = {
                queryParams: {
                    'onlyActive':vm.genericConstant.onlyActive
                },
                urlParams: [vm.genericConstant.brand, 'customerView', param, clientId]

            };

            //TODO PRUEBA FASTDATA
            if(vm.genericConstant.site === 'FichaCliente' && window.location.hostname === 'fichadecliente-uat.int.si.orange.es'){
                switch (clientId){
                    case '24130682W':
                        vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        break;
                    case '18000712S':
                        vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        break;
                    case '26496966T':
                        vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        break;
                    case '44138785Z':
                        vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        break;
                    case '71558378L':
                        vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        break;
                    case '05422521H':
                        vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        break;
                    case '50185084G':
                        vm.clientAPIUrl = 'api/customerViewFastData/v1';
                        break;
                    default:
                        vm.clientAPIUrl = 'api/customerView/v1';
                        break;
                }
            }

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
    }
}
