module OrangeFeSARQ.Constant {
    'use strict';

    angular.module('servicesCommons', [])
        .service('accountSrv', OrangeFeSARQ.Services.AccountSrv)
        .service('activationAndConfigurationSrv', OrangeFeSARQ.Services.ActivationAndConfigurationSrv)
        .service('adslStatusSrv', OrangeFeSARQ.Services.AdslStatusService)
        .service('adslStatusStore', OrangeFeSARQ.Services.AdslStatusStore)
        .service('addToShoppingCartSrv', OrangeFeSARQ.Services.AddToShoppingCartSrv)
        .service('alertsStore', OrangeFeSARQ.Services.AlertsStore)
        .service('amortizationSrv', OrangeFeSARQ.Services.AmortizationSrv)
        .service('billingAccountStoreSrv', OrangeFeSARQ.Services.BillingAccountStoreSrv)
        .service('billReviewSrv', OrangeFeSARQ.Services.BillReviewSrv)
        .service('bucketBalanceSrv', OrangeFeSARQ.Services.BucketBalanceSrv)
        .service('casesSrv', OrangeFeSARQ.Services.CasesSrv)
        .service('casesStore', OrangeFeSARQ.Services.CasesStore)
        .service('cookieStoreSrv', OrangeFeSARQ.Services.CookieStoreService)
        .service('changeOfferSrv', OrangeFeSARQ.Services.ChangeOfferSrv)
        .service('changeRateFixedSrv', OrangeFeSARQ.Services.ChangeRateFixedOWCSSrv)
        .service('clientJazztelSrv', OrangeFeSARQ.Services.ClientJazztelSrv)
        .service('contactFormSrv', OrangeFeSARQ.Services.ContactFormSrv)
        .service('contractsSrv', OrangeFeSARQ.Services.ContractsSrv)
        .service('commercialDataSrv', OrangeFeSARQ.Services.CommercialDataSrv)
        .service('communicationsSrv', OrangeFeSARQ.Services.CommunicationsSrv)
        .service('creditLimitSrv', OrangeFeSARQ.Services.CreditLimitSrv)
        .service('customerManagementSrv', OrangeFeSARQ.Services.CustomerManagementSrv)
        .service('dataEntrySrv', OrangeFeSARQ.Services.DataEntrySrv)
        .service('detailRateSrv', OrangeFeSARQ.Services.DetailRateSrv)
        .service('deviceRateSelectionPopupSrv' , OrangeFeSARQ.Services.DeviceRateSelectionPopupSrv)
        .service('getConfigurationSrv', OrangeFeSARQ.Services.GetConfigurationSrv)
        .service('getDataClientSrv', OrangeFeSARQ.Services.GetdataClientSrv)
        .service('getDataPermanencySrv', OrangeFeSARQ.Services.GetDataPermanencySrv)
        .service('getHeaderFooterSrv', OrangeFeSARQ.Services.GetHeaderFooter)
        .service('getImagesSrv', OrangeFeSARQ.Services.getImagesSrv)
        .service('getMenuItemsModule', OrangeFeSARQ.Services.GetMenuItemsService)
        .service('getOperatorsSrv', OrangeFeSARQ.Services.GetOperatorsSrv)
        .service('hootSrv', OrangeFeSARQ.Services.HootSrv)
        .service('interactionSrv', OrangeFeSARQ.Services.InteractionSrv)
        .service('linesUsageSrv', OrangeFeSARQ.Services.LinesUsageSrv)
        .service('nationalitiesSrv', OrangeFeSARQ.Services.NationalitiesService)
        .service('productCatalogSrv', OrangeFeSARQ.Services.ProductCatalogService)
        .service('productCatalogStore', OrangeFeSARQ.Services.ProductCatalogStore)
        .service('productContractedTranslateSrv', OrangeFeSARQ.Service.ProductContractedTranslateSrv)
        .service('productInventorySrv', OrangeFeSARQ.Services.ProductInventoryService)
        .service('productOrderSrv', OrangeFeSARQ.Services.ProductOrderSrv)
        .service('ratesComparatorMRenoveSrv', OrangeFeSARQ.Services.RatesComparatorMRenoveSrv)
        .service('sendToken',OrangeFeSARQ.Services.SendTokenSrv)
        .service('srvTerminalCompare', OrangeFeSARQ.Services.SrvTerminalCompare)
        .service('srvFile', OrangeFeSARQ.Services.SrvFile)
        .service('rateDeviceSelectionPopupSrv', OrangeFeSARQ.Services.RateDeviceSelectionPopupSrv)
        .service('terminalsComparatorSrv', OrangeFeSARQ.Services.TerminalsComparatorSrv)
        .service('tokenSrv', OrangeFeSARQ.Services.TokenSrv)
        .service('userManagementSrv', OrangeFeSARQ.Services.UserManagementSrv)
        .service('userSrv', OrangeFeSARQ.Services.UserSrv)
        .service('utils', OrangeFeSARQ.Services.Utils)
        .service('vapListSrv', OrangeFeSARQ.Services.VapListSrv)
        .service('voiceMailPopUpSrv', OrangeFeSARQ.Services.VoiceMailPopUpSrv)
        .service('owcsServices', OrangeFeSARQ.Services.OwcsServices)
        .service('backOffice', OrangeFeSARQ.Services.BackOfficeSrv)
        .service('bscsToSiebelSrv', OrangeFeSARQ.Services.BscsToSiebelSrv)
        .service('shoppingCartSrv', OrangeFeSARQ.Services.ShoppingCartSrv)
        .service('RatesParentSrv', OrangeFeSARQ.Services.RatesParentSrv)
        .service('rateInfoPopupSrv', rateInfoPopup.Services.RateInfoPopupSrv)
        .service('productCatalogV2Srv', OrangeFeSARQ.Services.ProductCatalogV2Srv)
        .service('ratesComparatorSrv', OrangeFeSARQ.Services.RatesComparatorSrv)
        .service('reservePopupSrv', reservePopup.Services.ReservePopupSrv)
        .service('automaticChangesSrv', OrangeFeSARQ.Services.AutomaticChangesSrv)
        .service('deviceCatalogSrv', OrangeFeSARQ.Services.DeviceCatalogSrv)
        .service('bankAccountSrv', OrangeFeSARQ.Services.BankAccountSrv)
        .service('MosaicFileSrv', OrangeFeSARQ.Services.MosaicFileSrv)
        .service('capturaDocumentacionPopupSrv', capturaDocumentacionPopup.Services.CapturaDocumentacionPopupSrv)
        .service('documentValidatorFCUSrv', OrangeFeSARQ.Services.DocumentValidatorFCUSrv)
        .service('configSrv', OrangeFeSARQ.Services.ConfigSrv)
        .service('discriminatorSrv', OrangeFeSARQ.Services.DiscriminatorSrv)
        .service('orangeTvSrv', OrangeFeSARQ.Services.OrangeTvSrv)
        .service('deleteRatesPopupSrv', OrangeFeSARQ.Services.DeleteRatesPopupSrv)
        .service('directionPopupSrv', OrangeFeSARQ.Services.DirectionPopupSrv)
        .service('capturaDocumentacionPopupSrv', capturaDocumentacionPopup.Services.CapturaDocumentacionPopupSrv)
        .service('linkComercialClientSrv', linkComercialClient.Services.LinkComercialClientSrv)
        .service('localStorageManager', OrangeFeSARQ.Services.LocalStorageManager)
        .service('customerViewStore', OrangeFeSARQ.Services.CustomerViewStore)
        .service('commercialCampaignsSrv', OrangeFeSARQ.Services.CommercialCampaignsSrv)
        /* .service('agreementSrv', OFC.Services.AgreementSrv) */
        .service('userDeviceSrv', OrangeFeSARQ.Services.UserDeviceSrv)
        .service('getRolProfileSrv', OrangeFeSARQ.Services.getRolProfileSrv)
        .service('orangeBankSalesSrv', OrangeFeSARQ.Services.getRolProfileSrv);

        
}
