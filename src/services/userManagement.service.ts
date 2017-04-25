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



    }
}
