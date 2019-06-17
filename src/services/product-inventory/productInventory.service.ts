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

    allServicesContracted (msisdn: string, componentName: string = 'productInventorySrv', refresh: boolean = false, brand: string) {
      let vm = this;
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
        urlParams: [brand, METHOD, msisdn]
      };
      return vm.httpCacheGett(vm.contractedServicesAPIUrl, _search, componentName, refresh)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
          return error;
        });
    }

    getServicesContracted(msisdn: string, componentName: string = 'productInventorySrv', refresh: boolean = false): any {
      let vm = this;
      let BRAND = vm.genericConstant.brand;
      return vm.allServicesContracted(msisdn, componentName, refresh, BRAND);      
    }

    getServicesContractedJazztel(msisdn: string, componentName: string = 'productInventorySrv', refresh: boolean = false): any {
      let vm = this;
      let BRAND = 'jazztel';
      return vm.allServicesContracted(msisdn, componentName, refresh, BRAND);
    }

    getPaymentServices(msisdn: string, componentName: string = 'productInventorySrv', refresh: boolean = false): any {
      let vm = this;
      let BRAND = vm.genericConstant.brand;
      let METHOD = 'identityServices';
      let _search: Object = {
        queryParams: {
          'publicKey': msisdn
        },
        urlParams: [BRAND, METHOD]
      };
      return vm.httpCacheGett(vm.contractedServicesAPIUrl, _search, componentName, refresh)
        .then(function (response) {
          if (response.data) {
            return response.data;
          }
          throw response.data.error;
        })
        .catch(function (error) {
          return error.data;
        });
    }

    getContractedServices(_search, componentName: string) {
      let vm = this;

      return vm.httpCacheGett(vm.contractedServicesAPIUrl, _search, componentName)
        .then(
          (response) => {
            return response.data;
          }
        )
        .catch(
          (error) => {
            throw error.data;
          }
        )
        ;
    }

    getRoamingState(msisdn: string, doc: string, compName: string = 'productInventorySrv'): ng.IPromise<any> {
      let vm = this;

      const METHOD = 'verifyDataRoamLikeAtHomeStatus';

      let _search: Object = {
        queryParams: {
          publicKey: msisdn,
          publicId: doc
        },
        urlParams: ['product', METHOD]
      }

      return vm.httpCacheGett(vm.contractedServicesAPIUrl, _search, compName)
        .then(
          (response) => {
            if (response && response.data) {
              return response.data;
            }
            return response;

          },
          (error) => {
            if (error && error.data) {
              return error.data;
            }
            return error;
          });

    }
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:ProductInventoryService#getPaymentServices
     * @description
     * #rest
     * Servicio que busca un cliente en funcion de distintos parámetros
     */
    comprobarGrupo(codigoGrupo, segment?): any {
      let vm = this;

      let METHOD = 'services';

      // parametro obligatorio lineCategory
      // segmento no coge residential
      // el numero no vale el de por defecto 666666666

      let _search: Object = {
        queryParams: {
          lineCategory: 'mobile',          
          queryType: 'infoGrupo',
          groupId: codigoGrupo,
        },
        urlParams: [vm.genericConstant.brand, METHOD, '666666666']
      };
      
      return vm.httpCacheGett(vm.contractedServicesAPIUrl, _search)
        .then(function (response) {
          if (response.data) {
            return response.data;
          } else {
            throw response.data.error;
          }
        })
        .catch(function (error) {
          return error.data;
        });
    }

  }
}
