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
		.service('bucketBalanceSrv', OrangeFeSARQ.Services.BucketBalanceSrv)

        .run((productCatalogSrv: OrangeFeSARQ.Services.ProductCatalogService
            , productCatalogStore: OrangeFeSARQ.Services.ProductCatalogStore) => {
			if (navigator.userAgent.indexOf('PhantomJS') < 1) {
				productCatalogSrv.getProductSpecification()
					.then((response) => {
						productCatalogStore.specification = response;
					})
					.catch((error) => {

					});
				productCatalogSrv.getProductOffering()
					.then((response) => {
						productCatalogStore.offering = response;
					})
					.catch((error) => {

					});
			}
        })
}
