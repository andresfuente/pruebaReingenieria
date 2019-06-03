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
            vm.genericConstant = $injector.get('genericConstant');
        }

        getData(msisdn: string = null) {
            let vm = this;

            let _search: Object = {
                urlParams: [vm.genericConstant.site, 'getHeaderFooter'],
                queryParams: msisdn ? { realSalto: msisdn } : {}
            };

            return vm.httpCacheGett(vm.genericConstant.getHeader, _search)
                .then(
                (successData) => {
                    let str: string = JSON.stringify(successData);
                    // Añadimos también Amena porque recogeremos las properties de GetConfiguration
                    successData = JSON.parse(str.replace(/"\/sites/g, '"sites'));
                    if (vm.genericConstant.site !== 'eCareResidencialAmena' && vm.genericConstant.site !== 'eCareResidencial' ) {
                        OrangeFeSARQ.Controllers.ParentController.shared.properties = successData.data.properties;
                    }
                    
                    return successData;
                },
                (errorData) => {

                    return errorData;
                }
                );
        }

        getDataCLU(params) {
            let vm = this;

            let _search: Object = {
                queryParams: params ? params : {},
                urlParams: [vm.genericConstant.site, 'getHeaderFooter']

            };

            return vm.httpCacheGett(vm.genericConstant.getHeader, _search)
                .then(
                (successData) => {
                    let str: string = JSON.stringify(successData);
                    successData = JSON.parse(str.replace(/"\/sites/g, '"sites'));
                    // Añadimos también Amena porque recogeremos las properties de GetConfiguration
                    if (vm.genericConstant.site !== 'eCareResidencial' && vm.genericConstant.site !== 'eCareResidencialAmena') {
                        OrangeFeSARQ.Controllers.ParentController.shared.properties =
                            successData.data.properties;
                    }
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
