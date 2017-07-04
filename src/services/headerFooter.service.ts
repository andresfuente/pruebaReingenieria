module OrangeFeSARQ.Services {
    'use strict';

    export class GetHeaderFooter extends OrangeFeSARQ.Services.ParentService {
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
                queryParams: msisdn ? {realSalto: msisdn} : {},
                urlParams: [vm.genericConstant.site, 'getHeaderFooter']

            };

            return vm.httpCacheGett(vm.genericConstant.getHeader, _search)
                .then(
                    (successData) => {
                        let str: string = JSON.stringify(successData);
                        successData = JSON.parse(str.replace(/"\/sites/g, '"sites'));
                        OrangeFeSARQ.Controllers.ParentController.shared.properties =
                            successData.data.properties;
                        return successData;
                    },
                    (errorData) => {
                        return errorData;
                    }
                );
        }
    }
    angular.module('getHeaderFooterModule', [])
        .service('getHeaderFooterSrv', OrangeFeSARQ.Services.GetHeaderFooter);
}
