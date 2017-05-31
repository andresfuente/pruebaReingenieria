module OrangeFeSARQ.Services {
  'use strict';

  export class ChangeOfferSrv extends OrangeFeSARQ.Services.ParentService {
    static $inject = ['$injector'];
    private url: string;
    public genericConstant;

    constructor(public $injector) {
      super($injector);
      let vm = this;
      vm.setInjections($injector);
    }

    setInjections($injector) {
      let vm = this;
      vm.genericConstant = $injector.get('genericConstant');
    }

    setOffer(msisdn: string, ospIDtype: string, ospId: string, origin: string, dest: string, compName: string) {
      let vm = this;
      let apiUrl: string = vm.genericConstant.changeOffer;
      let brand: string = vm.genericConstant.brand;
      let method = 'changeOffer';

      let request: changeOffer.Models.changeOffer_request
        = <changeOffer.Models.changeOffer_request>{
          'telefono': msisdn,
          'tipoDoc': ospIDtype,
          'doc': ospId,
          'codOfertaOrigen': origin,
          'codPromoOrigen': '0',
          'codOfertaDestino': dest,
          'codPromoDestino': '0',
        };
      // request.contractType = contractType;

      let _search: Object = {
        queryParams: request,
        urlParams: [brand, method, msisdn]
      };

      return vm.httpPost(apiUrl, _search, compName)
        .then((successData) => {
          if (successData.data && successData.data) {
          }
          throw successData.data.error;
        })
        .catch((errorData) => {
          return errorData.data;
        });
    }
  }
}
