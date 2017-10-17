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
            vm.http = $injector.get('$http');
        }

        getData() {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: [vm.genericConstant.site, 'getUser']

            };

            return vm.http.get(vm.genericConstant.getDataClient + '/' + vm.genericConstant.site + '/' + 'getUser')
                .then(
                (successData) => {
                    // Lleno el customerViewStore
                    if (successData.data) {
                        vm.customerViewStore.loginData = successData.data;
						if(vm.customerViewStore.info){
							vm.customerViewStore.loginData.allLines = vm.getAllLines();
						}else{
							//watch
							vm.$scope.$watch(
								() => vm.customerViewStore.info,
								(newValue, oldValue) => {
									if (newValue !== oldValue && newValue !== null) {
										vm.customerViewStore.loginData.allLines = vm.getAllLines();
									}
								}
							);
						}
                    }
                },
                (errorData) => {
                    return errorData;
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
