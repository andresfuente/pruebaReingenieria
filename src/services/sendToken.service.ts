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

  
    getToken(msisdn: string, componentName: string){
      let vm = this;

      let _search  = {
          queryParams: {
            msisdn: msisdn
          },
          urlParams: [vm.genericConstant.brand,'getTokenRepair']
      }

      return vm.httpCacheGett(vm.genericConstant.token,_search, componentName)
        .then(
          (response) => {
              return response.data.chain;
          },
          (error) => {
            return error;
          }
        );
      
    }


    sendTokenMessage(msisdn: string, token: string, componentName: string) {

      let vm = this;
      let _search = {
        body: {

          "msisdn": msisdn,
          "template": "9000000",
          "version": "",
          "numFields": "1",
          "parameters": [
            {
              "name": "TOKEN",
              "value": token
            }
          ]

        },
        urlParams: ['communications', 'sendSms'],
      };
      
      return vm.httpPost(vm.genericConstant.communications, _search, componentName)
        .then(
          (response) => {
            return response.data;
          },
          (error) => {
            throw error.data;
          }
        );
    }
  }
}      