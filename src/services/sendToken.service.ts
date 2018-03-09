module OrangeFeSARQ.Services {
  'use strict';
  export class SendTokenSrv extends OrangeFeSARQ.Services.ParentService {
    static $inject = ['$injector'];
    public genericConstant;

    constructor($injector) {
      super($injector);
      let vm = this;
      vm.setInjections($injector);

    }
    setInjections($injector) {
      let vm = this;
    }
    getToken(msisdn: any, componentName: string) {
      let vm = this;
      let _search  = {
          queryParams: {
            "msisdn": msisdn,
          },
          urlParams: [vm.genericConstant.brand, 'tokenManager']
      };

      return vm.httpCacheGett(vm.genericConstant.token, _search, componentName)
        .then(
          (response) => {
              return response;
          },
          (error) => {
            return error;
          }
        );
    }

    checkToken(msisdn: any, token: any, componentName: string) {
      let vm = this;
      let _search  = {
          queryParams: {
            "msisdn": msisdn,
            "token": token
          },
          urlParams: ['tokenValidate']
      };

      return vm.httpCacheGett(vm.genericConstant.token, _search, componentName)
        .then(
          (response) => {
              return response;
          },
          (error) => {
            return error;
          }
        );
    }
  }
}
