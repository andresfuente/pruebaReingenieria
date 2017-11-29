module OrangeFeSARQ.Services {
    'use strict';

    export class GetdataClientSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private url: string;
        public genericConstant;
        public customerViewStore;
		public $scope;
        public http: ng.IHttpService | any;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
            vm.customerViewStore = $injector.get('customerViewStore');
			vm.$scope = $injector.get('$rootScope');
            // vm.http = $injector.get('$http');
        }

        getData(): ng.IPromise<any> {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: [vm.genericConstant.brand, 'getUser']

            };

            return vm.httpCacheGett(vm.genericConstant.getDataClient, _search)
                .then(
                (response) => {
                    // Lleno el customerViewStore
                    if (response.data && response.data.user) {
                        // Eliminamos los 34 en los telefonos
						let msisdn = response.data.user.user;
                        if ((/^34/).test(msisdn) &&
                         !(/[a-z A-Z]/).test(msisdn) && 
                        msisdn.length === 11) {
                                response.data.user.user = msisdn.replace(/^34/, '');
                        }
                        vm.customerViewStore.loginData = response.data.user;
						if (vm.customerViewStore.info) {
							vm.customerViewStore.loginData.allLines = vm.getAllLines();
						} else {
							// watch
							vm.$scope.$watch(
								() => vm.customerViewStore.info,
								(newValue, oldValue) => {
									if (newValue !== oldValue && newValue !== null) {
										vm.customerViewStore.loginData.allLines = vm.getAllLines();
									}
								}
							);
                        }
                        return response.data.user;
                    }else{
                        throw response.data;
                    }
                },
                (errorData) => {
                    return errorData.data;
                }
                );
        }
		
		getAllLines(): any {
		  let vm = this;
		  let _products = [];
	      let MOBILE: string = 'MSISDN';
	      let FIXED: string = 'Número teléfono fijo VoIP';
		  for (let i = 0; i < vm.customerViewStore.info.product.length; i++) {
		    let product = {
		      type: null,
		      msisdn: null
		    };
		    let _p = vm.customerViewStore.info.product[i];
            let _line: any; 
			_line = _.find(_p.productCharacteristic, { 'name': MOBILE }) || _.find(_p.productCharacteristic, { 'name': FIXED });

		    if (_line) {
				let typePhone = _line.name === MOBILE ? 'mobile' : 'FIXED';
				product.type = typePhone === 'fixed' ? typePhone : _p.ospProductType ;
				product.msisdn = _line.value;
				_products.push(product);
		    }
		  }
		  return _products;
		}
    }
    angular.module('getDataClientSrvModule', [])
        .service('getDataClientSrv', OrangeFeSARQ.Services.GetdataClientSrv);
}
