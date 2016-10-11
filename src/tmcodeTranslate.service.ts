module OrangeFeSARQ.Services {
    'use strict';

    export class TmCodeTranslateSrv {
        static $inject = ['httpCacheOrange','$q', 'genericConstant'];
        public productCatalogAPIUrl:string;


        constructor(private httpCacheOrange, private $q ,private genericConstant) {
            let vm = this;
            vm.productCatalogAPIUrl = "/mock/API/productCatalog.json";

        }

        httpProductCatalog = function(tmcode): any {
          let vm = this;

          return vm.httpCacheOrange.gett(vm.productCatalogAPIUrl)
              .then(function(response) {
                  return response.data;
              })
              .catch(function(err) {
                 return err;
              });

        }


    }
    angular.module('tmcodeTranslateSrv', [])
        .service('TmCodeTranslateSrv', OrangeFeSARQ.Services.TmCodeTranslateSrv);
}
