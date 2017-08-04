module OrangeFeSARQ.Services {
    'use strict';

    export class GetConfigurationSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private url: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
        }

        getData(msisdn:string = null) {
            let vm = this;
			
            let _search: Object = {
                queryParams: {},
                urlParams: []

            };

            return vm.httpCacheGett(vm.genericConstant.getConfiguration, _search)
                .then(
                    (successData) => {
                        let str: string = JSON.stringify(successData);
                        successData = JSON.parse(str.replace(/"\/sites/g, '"sites'));
                        OrangeFeSARQ.Controllers.ParentController.shared.properties = successData.data.properties;
                        return successData;
                    },
                    (errorData) => {
                        return errorData;
                    }
                );
        }
    }
    angular.module('getConfigurationModule', [])
        .service('GetConfigurationSrv', OrangeFeSARQ.Services.GetConfigurationSrv);
}
