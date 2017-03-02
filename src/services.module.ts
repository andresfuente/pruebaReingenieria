module OrangeFeSARQ.Constant {
    'use strict';
		// tag prueba
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
        .service('getImagesSrv', OrangeFeSARQ.Services.getImagesSrv)
        .service('getHeaderFooterSrv', OrangeFeSARQ.Services.GetHeaderFooter)
        .service('accountSrv', OrangeFeSARQ.Services.AccountSrv)
        .service('detailRateSrv', OrangeFeSARQ.Services.DetailRateSrv)
		.service('voiceMailPopUpSrv', OrangeFeSARQ.Services.VoiceMailPopUpSrv)
        .run((getHeaderFooterSrv: OrangeFeSARQ.Services.GetHeaderFooter) => {
            if (navigator.userAgent.indexOf('PhantomJS') < 1) {
                getHeaderFooterSrv.getData().then(
                    (response)=> {
                        // Guardo datos en ParentController
                        if(OrangeFeSARQ.Controllers.ParentController.shared === undefined){
                            OrangeFeSARQ.Controllers.ParentController.shared = {};
                        }
                        OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore= response.data.data;
                    }
                );
            }
        })
        .run((productCatalogSrv: OrangeFeSARQ.Services.ProductCatalogService, productCatalogStore: OrangeFeSARQ.Services.ProductCatalogStore) => {
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

        
                productCatalogSrv.getFamilyRates()
                    .then((response) => {
                        productCatalogStore.listRates = response;
                    })
                    .catch((error) => {

                    });
            }
        })
        .run((getImagesSrv: OrangeFeSARQ.Services.getImagesSrv) => {
            if (navigator.userAgent.indexOf('PhantomJS') < 1) {
                getImagesSrv.getData().then(
                    (response)=> {
                        console.log('data', response);
                        //guardo datos en ParentController
                        if(OrangeFeSARQ.Controllers.ParentController.shared === undefined){
                            OrangeFeSARQ.Controllers.ParentController.shared = {};
                        }
                        OrangeFeSARQ.Controllers.ParentController.shared.staticImagesOwcs= response.data.data;
                    }
                );
            }
        })
}
