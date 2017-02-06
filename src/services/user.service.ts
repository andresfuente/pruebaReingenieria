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

        constructor($injector, public $q) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get("genericConstant");
            vm.clientAPIUrl = vm.genericConstant.customerView;

        }

        /**
         * @ngdoc method
         * @name #getUser(param:string, clientId:string)
         * @methodOf locator.UserSrv
         * @returns {object} Devuelve una promesa con el response
         */
        getUser(param: string, clientId: string,componentName:string='locatorComp'): any {
            let vm = this;
            let promise = vm.$q.defer();
            switch (param) {
                case 'individualPublicId':
                    param = 'residential';
                    break;
                case 'publicKey':
                    param = 'telephoneNumber';
                    break;
            }

            let _search: Object = {
                queryParams: {},
                urlParams: [vm.genericConstant.brand, 'customerView', param, clientId]

            };

            return vm.httpCacheGett(vm.clientAPIUrl, _search,componentName)
                .then(
                (response) => {
					 if (response.data && response.data.customer){
						if (response.data.customer.individual && response.data.customer.individual.id) {
							localStorage.setItem('id', JSON.stringify(response.data.customer.individual.id));
						}
						else {
							localStorage.setItem('id', JSON.stringify(response.data.customer.organization.id));
						}
					 }
                    promise.resolve(response.data);
                },
                (error) => {
                    promise.reject(error.data);
                });
        }

    }
}
