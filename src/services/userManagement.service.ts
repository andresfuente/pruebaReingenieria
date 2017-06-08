module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name userManagement.UserManagement
     * @description
     * #rest
     * Servicio que actualiza la contraseña
     */
    export class UserManagementSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public genericConstant;
        public informationCenter;
        public _httpCacheOrange;



        public url: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
            vm.url = vm.genericConstant.userManagement;

        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
            vm._httpCacheOrange = $injector.get('httpCacheOrange');
            vm.informationCenter = $injector.get('InformationCenterSrv');
        }


        setData(data, comp: string) {
            let vm = this;
              let _search: Object = {
                queryParams: data,
                urlParams: ['orange', 'managePassword']
            };

            return vm._httpCacheOrange.post(vm.url, _search, comp)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    return error.data;
                });
        }


        createUser(data, comp: string) {
            let vm = this;
              let _search: Object = {
                queryParams: data,
                urlParams: ['orange', 'createUser']
            };

            return vm.httpPost(vm.url, _search, comp)
                .then(function(response) {
                    vm.informationCenter.addInformationMessage(1, 'Usuario creado', '');
                    return response.data;
                })
                .catch(function(error) {
                    vm.informationCenter.addInformationMessage(2, error.data.error.title, error.data.error.desc);
                    return error;
                });        }


        changeUser(data, comp: string) {
            let vm = this;
              let _search: Object = {
                queryParams: data,
                urlParams: ['orange', 'changeUser']
            };

            return vm._httpCacheOrange.post(vm.url, _search, comp)
                .then(function(response) {
                    vm.informationCenter.addInformationMessage(1, 'Contraseña cambiada', '');
                    return response.data;
                })
                .catch(function(error) {
                    vm.informationCenter.addInformationMessage(2, error.data.error.title, error.data.error.desc);
                    return error.data;
                });
        }



    }
}
