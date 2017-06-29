module OrangeFeSARQ.Services {
  'use strict';

  export class ProductInventoryService extends OrangeFeSARQ.Services.ParentService {
    static $inject = ['$injector'];
    public contractedServicesAPIUrl: string;
    public searchUrl: string;
    private utils;
    public genericConstant;

    constructor($injector) {
      super($injector);
      let vm = this;
      vm.setInjections($injector);
      vm.contractedServicesAPIUrl = vm.genericConstant.productInventory;
    }

    setInjections($injector) {
      let vm = this;
      vm.utils = $injector.get('utils');
    }

    getServicesContracted(msisdn: string, componentName: string = 'productInventorySrv'): any {
      let vm = this;
      let BRAND = vm.genericConstant.brand;
      let METHOD = 'services';
      let type = vm.utils.isFixedLine(msisdn) ? 'fixed' : 'mobile';
      let request;
      request = {};
      request.lineCategory = type;
      request.onlyActive = vm.genericConstant.onlyActive;
      if (!vm.utils.isFixedLine(msisdn)) {
        request.source = 'mdw';
      }
      let _search: Object = {
        queryParams: request,
        urlParams: [BRAND, METHOD, msisdn]
      };
      return vm.httpCacheGett(vm.contractedServicesAPIUrl, _search, componentName)
        .then(function(response) {
          if (response.data && response.data.product) {
            return response.data.product;
          }
          throw response.data.error;
        })
        .catch(function(error) {
          return error.data;
        });
    }
  }
}
