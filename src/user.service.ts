module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name locator.UserSrv
     * @description
     * #rest
     * Servicio que busca un cliente en funcion de distintos parámetros
     */
    export interface IUserSrv {
        getUser(param:string, clientId:string):any;
    }

    export class UserSrv implements IUserSrv {
        static $inject = ['$http', 'genericConstant', 'httpCacheOrange'];
        public clientAPIUrl:string;

        constructor(private $http, private genericConstant, private httpCacheOrange) {
            let vm = this;
            vm.clientAPIUrl = vm.genericConstant.customerView;
        }

        /**
         * @ngdoc method
         * @name #getUser(param:string, clientId:string)
         * @methodOf locator.UserSrv
         * @returns {object} Devuelve una promesa con el response
         */
        getUser(param:string, clientId:string):any {
            let vm = this;
			
			switch(param) {
				case 'individualPublicId':
					param = 'residencial';
					break;
				case 'publicKey':
					param = 'telephoneNumber';
					break;			
			}
			
			
            let _search:Object = {
                queryParams: {
                  
                },
                urlParams: ['orange', 'customerView',  param , clientId]

            };
			
            return vm.httpCacheOrange.gett(vm.clientAPIUrl, _search)
                .then(
                    (response)=> {
                        return response.data;
                    },
                    (error)=> {
                        return error.error;
                    });
        }

    }
}
