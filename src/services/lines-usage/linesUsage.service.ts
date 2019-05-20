module OrangeFeSARQ.Services {
  'use strict';
  /**
   * @ngdoc service
   * @name linesList.LinesListSrv
   * @description
   * #rest
   * Servicio que busca las l�neas de un cliente ne funcion de distintos par�metros
   */
  export class LinesUsageSrv extends OrangeFeSARQ.Services.ParentService {
    static $inject = ['$injector'];
    public linesUsageAPIUrl: string;
    public genericConstant: any;
    public subperfil;
    public LINESLIST = "lines-list";

    constructor(public $injector) {
      super($injector);
      let vm = this;
      vm.setInjection($injector);
      vm.initService($injector);
      vm.subperfil = null;
    }

    setInjection($injector) {
      let vm = this;
      vm.genericConstant = $injector.get('genericConstant');
    }

    initService($injector) {
      let vm = this;
      vm.linesUsageAPIUrl = vm.genericConstant.linesUsage;
    }

    setSubperfil(subperfil) {
      let vm = this;
      vm.subperfil = subperfil;
    }

    getSubperfil() {
      let vm = this;
      return vm.subperfil;
    }

    resetSubperfil() {
      let vm = this;
      vm.subperfil = null;
    }

    getLineUsage(typeParam: string, dataUser: string, componentName: string = this.LINESLIST): any {
      let vm = this;
      let METHOD = 'linesUsage';
      let _search = {
        queryParams: {
          'onlyActive': vm.genericConstant.onlyActive
        },
        urlParams: [vm.genericConstant.brand, METHOD, 'get']
      };
      _search.queryParams[typeParam] = dataUser;


      return vm.httpCacheGett(vm.linesUsageAPIUrl, _search, componentName)
        .then(function (response) {
          let _resp = response.data;
          if (_resp.error) {
            throw _resp.error;
          }
          return _resp.LinesUsage;
        })
        .catch(function (error) {
          throw error;
        });
    }

    getLineUsageAmena(typeParam: string, dataUser: string, componentName: string = this.LINESLIST): any {
      let vm = this;
      let METHOD = 'linesUsage';
      let _search = {
        queryParams: {
          'onlyActive': vm.genericConstant.onlyActive
        },
        urlParams: ['amena', METHOD, 'get']
      };
      _search.queryParams[typeParam] = dataUser;


      return vm.httpCacheGett(vm.linesUsageAPIUrl, _search, componentName)
        .then(function (response) {
          let _resp = response.data;
          if (_resp.error) {
            throw _resp.error;
          }
          return _resp.LinesUsage;
        })
        .catch(function (error) {
          throw error;
        });
    }

    getGroupedLinesUsage(typeParam: string, dataUser: string, componentName: string = this.LINESLIST): any {
      let vm = this;
      let METHOD = 'groupedLinesUsage';
      let _search = {
        queryParams: {
          'onlyActive': vm.genericConstant.onlyActive
        },
        urlParams: [vm.genericConstant.brand, METHOD, 'get']
      };
      _search.queryParams[typeParam] = dataUser;

      return vm.httpCacheGett(vm.linesUsageAPIUrl, _search, componentName)
        .then(function (response) {
          let _resp = response.data;
          if (_resp.error) {
            throw _resp.error;
          }
          return _resp.linesUsageGrouped;
        })
        .catch(function (error) {
          throw error;
        });
    }
  }
}
