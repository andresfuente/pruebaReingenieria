module OrangeFeSARQ.Services {
    "use strict";
  
          /**
           * @ngdoc service
           * @name OrangeFeSARQ.Services.orangeBankSalesSrv
           * @description
           * Servicio para lanzar el lead a Orange bank
           */
          export class orangeBankSalesSrv extends OrangeFeSARQ.Services.ParentService {
              static $inject = ["$injector"];
  
              // Injection vars
              public informationCenter: OrangeFeSARQ.Services.InformationCenterSrv;
  
              constructor(public $injector) {
              super($injector);
              let vm = this;
  
              vm.setInjections($injector);
              }
  
              setInjections($injector) {
              let vm = this;
  
              vm.informationCenter = $injector.get("InformationCenterSrv");
              }
  
              /**
               * @ngdoc method
               * @name OrangeFeSARQ.Services.orangeBankSalesSrv#sendLead
               * @methodOf OrangeFeSARQ.Services.orangeBankSalesSrv
               * @param {string} msisdn msisdn del cliente
               * @param {string} userName nombre del cliente
               * @param {string} idProduct id del producto solicitado
               * Manda el lead especifico de de Orange Bank
               */
              sendLead(msisdn, userName, idProduct, compName) {
              let vm = this;
  
              // let _headers = vm.getHeader();
  
              let body = {
                  name: "OrangeBankLead",
                  channel: {
                    name: "Point of sale"
                  },
                  productOffering: {
                    "id": idProduct,
                  },
                  relatedParty: [{
                    name: userName,
                    role: "Cliente"
                  }],
                  relatedPublicKey: {
                    id: msisdn,
                    name: "MSISDN"
                  }
              };
  
              let _search = {
                  body: body,
                  urlParams: ["salesLead"],
                  queryParams: {}
              };
              //.httpPost(vm.genericConstant.salesManagement, _search,compName)
              //.httpPost(vm.genericConstant.salesManagement, _search,compName,null, null, _headers)
  
              return vm
                  .httpPost(vm.genericConstant.salesManagement, _search,compName)
                  .then(function(response) {
                    return response.data;
                  })
                  .catch(function(error) {
                    return error;
                  });
              }
  
  
              
              /**
               * @ngdoc method
               * @name OrangeFeSARQ.Services.orangeBankSalesSrv#getHeader
               * @methodOf OrangeFeSARQ.Services.orangeBankSalesSrv
               * Recogemos los datos necesarios en el header
               */
              getHeader(): HashMap<string, string> {
              let shopInfo = JSON.parse(sessionStorage.getItem("shopInfo"));
              let loginData = JSON.parse(sessionStorage.getItem("loginData"));
  
              let _headers = new HashMap<string, string>();
  
              if (loginData && loginData.site) {
                  _headers.set("z-app", loginData.site);
              }
              if (loginData && loginData.user) {
                _headers.set("z-login", loginData.user);
              }
              if (shopInfo && shopInfo.parentSfid) {
                _headers.set("z-sfid", shopInfo.parentSfid);
              }
  
              return _headers;
              }
    }
  }
  