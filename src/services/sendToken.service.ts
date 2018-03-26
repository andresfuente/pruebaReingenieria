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
    getToken(msisdn: any, doc: any, componentName: string) {
      let vm = this;
      let _search  = {
          queryParams: {
            "msisdn": msisdn,
            "doc": doc
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

    checkToken(msisdn: any, token: any, jwt: any) {
      let vm = this;
      let _search  = {
          queryParams: {
            "msisdn": msisdn,
            "token": token
          },
          urlParams: ['tokenValidate']
      };
      let _headers = {
        "jwt_token_data": jwt
      };
      return vm.httpCacheGeth(vm.genericConstant.token, _search, _headers)
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
