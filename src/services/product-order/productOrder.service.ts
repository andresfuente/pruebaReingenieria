module OrangeFeSARQ.Services {
  'use strict';

  export class ProductOrderSrv extends OrangeFeSARQ.Services.ParentService {
    static $inject = ['$injector'];
    private urlProductOrder: string;
    private brand: string;

    constructor(public $injector) {
      super($injector);
      let vm = this;
      vm.urlProductOrder = vm.genericConstant.productOrder;
      vm.brand = vm.genericConstant.brand;
      vm.setInjections($injector);
    }

    setInjections($injector) {
      let vm = this;
      vm.genericConstant = $injector.get('genericConstant');
    }

    getData(msisdn: string, action: string, code: string, services: string = '', segment: string = '', componentName: string = 'orange_tv_contract'): ng.IPromise<any> {
      let vm = this;
      let _search: Object = {
        queryParams: {
          publicKey: msisdn,
          action: action,
          idPromo: code,
          services: services,
          segment: segment
        },
        urlParams: [vm.brand, 'managOrangeTV']
      };

      return vm.httpCacheGett(vm.urlProductOrder, _search, componentName)
        .then(
        (successData) => {
          return successData;
        },
        (errorData) => {
          return errorData;
        })
        .catch(function(error) {
          return error;
        });
    }

    activateDesactivateProduct(msisdn: string, action: string, code: string, volumen: number = 0, price: number = 0, imei: string = '', componentName: string = 'generic_bonus'): ng.IPromise<any> {
      let vm = this;
      let queryParams = {};
      if (volumen !== 0 && price !== 0) {
        queryParams = {
          volumen: volumen,
          price: price,
          publicKey: msisdn,
          action: action,
          idPromo: code,
        };
      } else if (imei !== '') {
        queryParams = {
          imei: imei,
          publicKey: msisdn,
          action: action,
          idPromo: code,
        };
      } else {
        queryParams = {
          publicKey: msisdn,
          action: action,
          idPromo: code
        };
      }
      // No necesita brand porque esta llamada es solo parte de Orange
      let _search: Object = {
        queryParams: queryParams,
        urlParams: ['productOrder', 'gestionOrange']
      };

      return vm.httpPost(vm.urlProductOrder, _search, componentName)
        .then(
        (successData) => {
          return successData;
        },
        (errorData) => {
          return errorData;
        })
        .catch(function(error) {
          return error;
        });
    }
	
  // Se añade el parametro segment para contratar los servicios con este método en PAE
	changeStatetProduct(msisdn: string, productId: string, action: string, imei: string = '', componentName: string = 'generic_bonus'): ng.IPromise<any> {
      let vm = this;
      let queryParams = {};
      if (imei !== '') {
        queryParams = {
          imei: imei,
          msisdn: msisdn,
          action: action,
          productId: productId,
        };
      } else {
        queryParams = {
          msisdn: msisdn,
          action: action,
          productId: productId,
        };
      }
      // No necesita brand porque esta llamada es solo parte de Orange
      let _search: Object = {
        queryParams: queryParams,
        urlParams: [vm.genericConstant.brand, 'setPromotions']
      };

      return vm.httpPost(vm.urlProductOrder, _search, componentName)
        .then(
        (successData) => {
          return successData;
        },
        (errorData) => {
          return errorData;
        })
        .catch(function (error) {
          return error;
        });
    }

    setPromotions(body: Models.ProductOrder, componentName: string) {
      let vm = this;

      let _search: Object = {
        queryParams: body,
        urlParams: [vm.genericConstant.brand, 'setPromotions']
      };

      return vm.httpPost(vm.urlProductOrder, _search, componentName)
        .then(function(success) {
          return success.data;
        })
        .catch(function(error) {
          return error.data;
        })
      ;
    }

    moreMegasAmena(msisdnMegas: string, componentName: string) {
      let vm = this;
      let _search: Object = {
        queryParams: {
          msisdn: msisdnMegas
        },
        urlParams: [vm.genericConstant.brand, 'setBonus']
      };

      return vm.httpPost(vm.urlProductOrder, _search, componentName)
        .then(
        (successData) => {
          return successData;
        },
        (errorData) => {
          return errorData;
        })
        .catch(function(error) {
          return error;
        });
    }

    getSummary(msisdn: string, customerId: string, tmCodeDestino: string, tmCodeOrigen: string, tipoLinea: string, componentName: string, segment?: string): ng.IPromise<any> {
      let vm = this;
      let BRAND = vm.genericConstant.brand;
      let METHOD = 'getSummary';
	  let request;
	  if(segment) {
		request = {
			msisdn: msisdn,
			customerId: customerId,
			tmCodeDestino: tmCodeDestino,
			tmCodeOrigen: tmCodeOrigen,
			tipoLinea: tipoLinea,
			segment: segment
		  }
	  } else {
		 request = {
			msisdn: msisdn,
			customerId: customerId,
			tmCodeDestino: tmCodeDestino,
			tmCodeOrigen: tmCodeOrigen,
			tipoLinea: tipoLinea
		  }
	  }
     
      let _search: Object = {
        queryParams: request,
        urlParams: [BRAND, METHOD]
      };

      return vm.httpCacheGett(vm.urlProductOrder, _search, componentName)
        .then((response) => {
          let _resp = response.data;
          if (_resp.error) {
            throw _resp.error;
          }
          return _resp.productOrder;
        })
        .catch(function(error) {
          return error.data;
        });
    }

    changeRate(requestBody: OrangeFeSARQ.Models.changeRate_postRequest, componentName: string): ng.IPromise<any> {
      let vm = this;
      let BRAND = vm.genericConstant.brand;
      let METHOD = 'changeRate';

      // let request = {
      //     "msisdn": "635004700",
      //     "customerId": "19409257",
      //     "flagBlackBerry": true,
      //     "contractId": "23990166",
      //     "segment": null,
      //     "spCodesAsociated": ["968", "969"],
      //     "productsIdQuery": [{
      //         "idProduct": "2083",
      //         "action": "A"
      //     }]
      // }

      let _search: Object = {
        body: requestBody,
        urlParams: [BRAND, METHOD]
      };

      return vm.httpPost(vm.urlProductOrder, _search, componentName)
        .then((response) => {
          let _resp = response.data;
          if (_resp.error) {
            throw _resp.error;
          }
          return _resp.productOrder;
        })
        .catch(function(error) {
          return error.data;
        });
    }

    setOrangetv(requestBody: OrangeFeSARQ.Models.setOrangetv_postRequest, componentName: string): ng.IPromise<any> {
      let vm = this;
      let BRAND = vm.genericConstant.brand;
      let METHOD = 'productOrder';
      let SERVICE = 'OrangeTV';
      let ONLYACTIVE = vm.genericConstant.onlyActive;
      // let request = {
      //   "publicKey": "656004150",
      //   "action": "ALTA /BAJA",
      //   "idPromo": "3535",
      //   "services": "",
      //   "segment": ""
      // }
      let qParams = {
        onlyActive: ONLYACTIVE
      }
      let _search: Object = {
        urlParams: [BRAND, METHOD, SERVICE],
        queryParams: qParams,
        body: requestBody
      }
      return vm.httpPostFull(vm.urlProductOrder, _search, componentName)
        .then((response) => {
          let _resp = response.data;
          if (_resp.error) {
            throw _resp.error;
          }
          return _resp.productOrder;
        })
        .catch(function(error) {
          return error.data;
        });
    }

    getProductBonusIncompatibility(msisdn: string, productsIdQuery: string[], componentName: string): ng.IPromise<any> {
      let vm = this;
      let BRAND = vm.genericConstant.brand;
      let METHOD = 'productBonusIncompatibility';
      let qParams = {
        msisdn,
        productsIdQuery
      }
      let _search: Object = {
        urlParams: [BRAND, METHOD],
        queryParams: qParams
      }
      return vm.httpPost(vm.urlProductOrder, _search, componentName)
        .then((response) => {
          let _resp = response.data;
          if (_resp.error) {
            throw _resp.error;
          }
          return _resp.productOrder;
        })
        .catch(function(error) {
          return error.data;
        });
    }

    /**
     * @ngdoc method
     * @name OrangeFeSARQ.Services:ProductOrderSrv#postLeaveAmena
     * @methodOf OrangeFeSARQ.Services.ProductOrderSrv
     * @param {string} msisdn - Número del telefono del cliente
     * @param {string} document - documento de identidad del cliente
     * @param {string} action - Baja de Amena o cambio a Orange
     * @param {string} idProduct - id de producto 
     * @param {string} componentN
     * @description
     * Si la notificación es pegasus, modifica 
     */
    postLeaveAmena(msisdn: string, document: string, action: string, idProduct: string, componentName: string): ng.IPromise<any> {
      let vm = this;
      let BRAND = vm.genericConstant.brand;
      let METHOD = 'leaveAmena';

      let aux = {
        'leave': 'bajaAmena',
        'change': 'pasarseOrange'
      };

      let _search: Object = {
        urlParams: [BRAND, METHOD],
        queryParams: null,
        body: {
          'idProduct': idProduct,
          'action': aux[action],
          'msisdn': msisdn,
          'numDoc': document
        }
      };
      return vm.httpPostFull(vm.urlProductOrder, _search, componentName)
        .then((response) => {
          let _resp = response.data;
          if (_resp.error) {
            throw _resp.error;
          }
          return _resp.productOrder;
        })
        .catch(function (error) {
          return error.data;
        });
    }
    getChangeFee(msisdn: string, componentName: string, id : string) {
      let vm = this;
      let BRAND = vm.genericConstant.brand;
      let METHOD = 'getChangeFee';
      let _search: Object = {
        urlParams: [BRAND, METHOD],
        queryParams: {
          'msisdn': msisdn,
          'idType': id
        }
      };
      return vm.httpCacheGett(vm.urlProductOrder, _search, componentName)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    }
  }
}
