module OrangeFeSARQ.Constant {
    'use strict';

    angular.module('servicesCommons', [])
        .service('accountSrv', OrangeFeSARQ.Services.AccountSrv)
        .service('activationAndConfigurationSrv', OrangeFeSARQ.Services.ActivationAndConfigurationSrv)
        .service('adslStatusSrv', OrangeFeSARQ.Services.AdslStatusService)
        .service('adslStatusStore', OrangeFeSARQ.Services.AdslStatusStore)
        .service('amortizationSrv', OrangeFeSARQ.Services.AmortizationSrv)
        .service('cookieStoreSrv', OrangeFeSARQ.Services.CookieStoreService)
        .service('bucketBalanceSrv', OrangeFeSARQ.Services.BucketBalanceSrv)
        .service('changeRateFixedSrv', OrangeFeSARQ.Services.ChangeRateFixedOWCSSrv)
        .service('contactFormSrv', OrangeFeSARQ.Services.ContactFormSrv)
        .service('contractsSrv', OrangeFeSARQ.Services.ContractsSrv)
        .service('customerManagementSrv', OrangeFeSARQ.Services.CustomerManagementSrv)
        .service('detailRateSrv', OrangeFeSARQ.Services.DetailRateSrv)
        .service('getDataClientSrv', OrangeFeSARQ.Services.GetdataClientSrv)
        .service('getHeaderFooterSrv', OrangeFeSARQ.Services.GetHeaderFooter)
        .service('getImagesSrv', OrangeFeSARQ.Services.getImagesSrv)
        .service('getMenuItemsModule', OrangeFeSARQ.Services.GetMenuItemsService)
        .service('hootSrv', OrangeFeSARQ.Services.HootSrv)
        .service('productCatalogSrv', OrangeFeSARQ.Services.ProductCatalogService)
        .service('productCatalogStore', OrangeFeSARQ.Services.ProductCatalogStore)
        .service('productContractedTranslateSrv', OrangeFeSARQ.Service.ProductContractedTranslateSrv)
        .service('productInventorySrv', OrangeFeSARQ.Services.ProductInventoryService)
        .service('productOrderSrv', OrangeFeSARQ.Services.ProductOrderSrv)
        .service('tokenSrv', OrangeFeSARQ.Services.TokenSrv)
        .service('userManagementSrv', OrangeFeSARQ.Services.UserManagementSrv)
        .service('userSrv', OrangeFeSARQ.Services.UserSrv)
        .service('utils', OrangeFeSARQ.Services.Utils)
        .service('vapListSrv', OrangeFeSARQ.Services.VapListSrv)
        .service('voiceMailPopUpSrv', OrangeFeSARQ.Services.VoiceMailPopUpSrv)
        .service('owcsServices', OrangeFeSARQ.Services.OwcsServices)
        .service('changeOfferSrv', OrangeFeSARQ.Services.ChangeOfferSrv)
        .service('linesUsageSrv', OrangeFeSARQ.Services.LinesUsageSrv)
        .service('alertsStore', OrangeFeSARQ.Services.AlertsStore)
		.service('getConfigurationSrv', OrangeFeSARQ.Services.GetConfigurationSrv)

        .run((productCatalogSrv: OrangeFeSARQ.Services.ProductCatalogService, productCatalogStore: OrangeFeSARQ.Services.ProductCatalogStore, $injector) => {
            let genericConstant = $injector.get("genericConstant");
        if (navigator.userAgent.indexOf('PhantomJS') < 1 && !genericConstant.public ) {

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
                    (response) => {
                        // Guardo datos en ParentController
                        if (OrangeFeSARQ.Controllers.ParentController.shared === undefined) {
                            OrangeFeSARQ.Controllers.ParentController.shared = {};
                        }
                        OrangeFeSARQ.Controllers.ParentController.shared.staticImagesOwcs = response.data.data;
                    }
                );
            }
        })
        .run((getDataClientSrv: OrangeFeSARQ.Services.GetdataClientSrv) => {
            if (navigator.userAgent.indexOf('PhantomJS') < 1) {
                getDataClientSrv.getData().then(
                    (response) => {
                        // - console.log('data en servicesmodule', response);
                    }
                );
            }
        })
        .run((getHeaderFooterSrv: OrangeFeSARQ.Services.GetHeaderFooter, $injector, getConfigurationSrv: OrangeFeSARQ.Services.GetConfigurationSrv) => {
			let genericConstant = $injector.get("genericConstant");
			//si no es mobile first || es spa pública
            if (navigator.userAgent.indexOf('PhantomJS') < 1  && (genericConstant.site !== 'eCareResidencial' || genericConstant.public === true)) {
                getHeaderFooterSrv.getData().then(
                    (response) => {
                        // Guardo datos en ParentController
                        if (OrangeFeSARQ.Controllers.ParentController.shared === undefined) {
                            OrangeFeSARQ.Controllers.ParentController.shared = {};
                        }
                        OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore = response.data.data;
                        OrangeFeSARQ.Controllers.ParentController.shared.breadCrumbsStore = response.data.breadCrumbs;

                    }
                );
				//si es mobile first y no es spa publica
            }else if(navigator.userAgent.indexOf('PhantomJS') < 1  && (genericConstant.site === 'eCareResidencial' && genericConstant.public === false)){
				getConfigurationSrv.getData().then(
                    (response) => {
                        // Guardo datos en ParentController
                        if (OrangeFeSARQ.Controllers.ParentController.shared === undefined) {
                            OrangeFeSARQ.Controllers.ParentController.shared = {};
                        }
                        OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore = response.data.data;
                        //OrangeFeSARQ.Controllers.ParentController.shared.breadCrumbsStore = response.data.breadCrumbs;

                    }
                );
			}
        });

        /*if (OrangeFeSARQ.Controllers.ParentController.shared
            && OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore) {
            menuStore.menu = {
                pospaid: OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.pospaidMenu,
                prepaid: OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.prepaidMenu,
                fixed: OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.fixedMenu

            };
            fillCurrent();
        } else {
            $rootScope.$watch(
                () => OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore,
                (newValue, oldValue) => {
                    if (OrangeFeSARQ.Controllers.ParentController.shared
                        && OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore) {
                        menuStore.menu = {
                            pospaid: OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.pospaidMenu,
                            prepaid: OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.prepaidMenu,
                            fixed: OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.fixedMenu
                        };
                        fillCurrent();
                    }
                });
        }

        let prepaid: boolean;
        let pospaid: boolean;
        let fixed: boolean;

        $rootScope.$watch(
            () => msisdnStore.msisdn,
            (newValue, oldValue) => {
                fillCurrent();
            });
    }*/
}
