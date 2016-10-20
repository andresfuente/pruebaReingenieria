module OrangeFeSARQ.Constant {
    'use strict';

    angular.module('servicesCommons', [])
        .service('userSrv', OrangeFeSARQ.Services.UserSrv)
        .service('utils', OrangeFeSARQ.Services.Utils)
        .service('vapListSrv', OrangeFeSARQ.Services.VapListSrv)
        .service('amortizationSrv', OrangeFeSARQ.Services.AmortizationSrv)
        .service('contractsSrv', OrangeFeSARQ.Services.ContractsSrv)
        .service('tmcodeTranslateSrv', OrangeFeSARQ.Services.TmCodeTranslateSrv)
        .service('productCatalogSrv', OrangeFeSARQ.Services.ProductCatalogService)
        .service('productCatalogStore', OrangeFeSARQ.Services.ProductCatalogStore)

        .run((productCatalogSrv: OrangeFeSARQ.Services.ProductCatalogService
            , productCatalogStore: OrangeFeSARQ.Services.ProductCatalogStore) => {
            productCatalogSrv.getProductSpecification()
                .then((response) => {
                    productCatalogStore.specification = response;
                    console.debug("\n\n\n STORE | SPECIFICATION ", productCatalogStore.specification);
                })
                .catch((error) => {

                });
            productCatalogSrv.getProductOffering()
                .then((response) => {
                    productCatalogStore.offering = response;
                    console.debug("\n\n\n STORE | OFFERING ", productCatalogStore.offering);
                })
                .catch((error) => {

                });
        })



}
