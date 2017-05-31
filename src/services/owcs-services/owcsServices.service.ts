module OrangeFeSARQ.Services {
  'use strict';

  export class OwcsServices extends OrangeFeSARQ.Services.ParentService {
    static $inject = ['$injector'];
    public genericConstant: any;

    constructor(public $injector) {
      super($injector);
      let vm = this;
      vm.setInjections($injector);
      vm.initComp();
    }

    setInjections($injector) {
      let vm = this;
      vm.genericConstant = $injector.get('genericConstant');
    }

    initComp() {
      let vm = this;
    }

    getOfertaFijoEspejo(originMorgane: string, compName): any {
      let vm = this;
      let API: string = vm.genericConstant.ofertaFijoEspejo;
      let SITE: string = vm.genericConstant.site;
      let _search: Object = {
        queryParams: {},
        urlParams: [SITE, originMorgane]
      };
      return vm.httpCacheGett(API, _search)
        .then(function(response) {
          return response.data.productSpecification;
        })
        .catch(function(error) {
          return error;
        });
    }
  }
}
