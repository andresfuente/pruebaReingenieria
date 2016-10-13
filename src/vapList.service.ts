module vapList.Services {
    'use strict';
    /**
     */
    export class VapListSrv {
        static $inject = ['httpCacheOrange', '$q', 'genericConstant'];
        public vapDataApiUrl: string;

        constructor(private httpCacheOrange, private $q, private genericConstant) {
            let vm = this;
            vm.vapDataApiUrl = vm.genericConstant.vapDataUrl;
            vm.httpCacheOrange;
            vm.$q;
        }

        /**
         */
        getVapData(msisdn: string, ID: string): any {
            let vm = this;
            let _search:Object = {
                queryParams: {
                      msisdn: msisdn,
                      ID: ID
                  },
                urlParams: ['vapData', 'OSP']
            };
            return vm.httpCacheOrange.gett(vm.vapDataApiUrl, _search)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }
    }
	
    angular.module('VapListServiceModule', [])
        .service('vapListSrv', vapList.Services.VapListSrv);
}
