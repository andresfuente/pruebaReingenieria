module OrangeFeSARQ.Services {
    'use strict';

    export class VapListSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private url: string;
        public genericConstant;
        private vapDataApiUrl;
        private brand;
		private site: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
            vm.vapDataApiUrl = vm.genericConstant.vapDataUrl;
            vm.brand = vm.genericConstant.brand;
			vm.site = vm.genericConstant.site;
        }

        getVapData(msisdn: string, ID: string, componentName: string = 'pendingPaymentComp'): any {
            let vm = this;
            let _search: Object = {
                queryParams: {
					segment: vm.site === 'eCareEmpresas' ? 'business' : 'residential'
				},
                // Cuando metamos la brand, lo meteremos como primer parámetro dentro de éste array (vm.brand) y así ya funcionaría.
                urlParams: [vm.brand, 'vapData', 'OSP', ID, msisdn]
            };
            return vm.httpCacheGett(vm.vapDataApiUrl, _search, componentName)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    return error;
                });
        }
    }
}
