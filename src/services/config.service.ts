module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name headerBlockSrv.HeaderBlockSrv
     * @description
     *
     */
    export class ConfigSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];


        public values;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.initService();
        }


        initService() {
            let vm = this;
            vm.httpCacheGett('conf.json', {})
                .then((response) => {
                    vm.values = response.data;
                });
        }
    }

    angular.module('configModule', [])
        .service('configSrv', OrangeFeSARQ.Services.ConfigSrv);

}
