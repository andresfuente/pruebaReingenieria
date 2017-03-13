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
        public clientAPIUrl:string;
        public genericConstant;
        public CV;
        public hootAPIUrl:string;
        public mdgData:any;
        public utils:any;

        constructor($injector, public $q) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get("genericConstant");
            vm.CV = $injector.get("customerViewStore");
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
        getUser(param:string, clientId:string, componentName:string = 'locatorComp'):any {
            let vm = this;
            let promise = vm.$q.defer();
            if (param === 'individualPublicId' && vm.utils.isNif(clientId)) {
                param = 'residential';
            } else if (param === 'individualPublicId' && vm.utils.isCif(clientId)) {
                param = 'business';
            } else if (param === 'publicKey') {
                param = 'telephoneNumber';
            } else if (param === 'individualPublicId' && (!vm.utils.isNif(clientId) && !vm.utils.isCif(clientId))){
                param = 'residential';
            }

            let _search:Object = {
                queryParams: {},
                urlParams: [vm.genericConstant.brand, 'customerView', param, clientId]

            };

            vm.httpCacheGett(vm.clientAPIUrl, _search, componentName)
                .then(
                    (response) => {
                        if (response.data && response.data.customer) {
                            if (response.data.customer.individual && response.data.customer.individual.id) {
                                localStorage.setItem('id', JSON.stringify(response.data.customer.individual.id));
                            }
                            else {
                                localStorage.setItem('id', JSON.stringify(response.data.customer.organization.id));
                            }
                        }

                        vm.getMdgUser(param, clientId);
                        // response.data.mdg = vm.mdgData;
                        promise.resolve(response.data);
                    },
                    (error) => {
                        promise.reject(error.data);
                    });
            return promise.promise;

        }

        getMdgUser(param:string, clientId:string, componentName:string = 'locatorComp') {
            let vm = this;

            let _search:Object = {
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
