module OrangeFeSARQ.Constant {
    'use strict';

    angular.module('genericConstant', [])
        .constant('genericConstant', {

            //aPIS

            customerView: 'api/daf2/APICustomerViewOSP/1',//orange/customerView/get?
            linesUsage: 'api/daf2/APILinesUsage/1', ///orange/linesUsage/get?
            bucketBalance: 'api/daf2/APIBucketBalance/1', //orange/usageReport/get?
            productCatalog: 'api/usageReport',
            changeOffer: 'api/daf2/APIChangeOffer/1/changeOffer',
            activityRegister: 'api/daf2/APIActivityRegister/1/activityRegister?',
            detailedUsage: 'api/daf2/APIDetailedUsage/1',//prepaid-pospaid/645475200?
            // expeditUsage: 'api/daf2/APIExpeditUsageOSP/1', // expeditUsage/
            expeditUsage: 'api/daf2/APIExpeditUsageOSP/1',
            amortizationApi: 'mock/API/amortization.json',
            orangetvDisableDevicesApi: 'mock/API/orangedisable.json',
            bucketBalanceLineAPIUrl: 'mock/API/productBucketLine.json',
            bucketBalanceBonusAPIUrl: 'mock/API/productBucketBonus.json',
            productInventory: 'api/daf2/APIProductInventory/1',
            orangetvMultisimApi: 'mock/API/multisimmanagements.json',


            // translate:{
            //   es:
            // },

            msisdnText: 'MSISDN',
            fixedTelephoneText: 'Número teléfono fijo VoIP',
            postpaidType: 'POSPAGO',
            prepaidType: 'PREPAGO',
            fixedtelephonyType: 'Telefonía Fija',


            topSection: "topSection",
            centralSection: "centralSection",
            leftSection: "leftSection",
            rightSection: "rightSection",
            bottomSection: "bottomSection",

            site: 'eCareResidencial',
            //site: 'owcs',

            ///navigation
            lineListNavigateWhenClickInLine: 'dashboardLine',
            currentConsuptionNavigateWhenClickInCircle: 'callsList',
            //     toggleSwitchValues: {
            //         disabled: {
            //             checked: false,
            //             classValueContent: 'o-portal--slider-container-off o-portal--slider-container-on',
            //             classSpinnerContent: 'o-portal--spinner-container hide'
            //         },
            //         enabled: {
            //             checked: true,
            //             classValueContent: 'o-portal--slider-container-off o-portal--slider-container-on',
            //             classSpinnerContent: 'o-portal--spinner-container hide'
            //         },
            //         loading: {
            //             checked: true,
            //             classValueContent: 'o-portal--slider-container-off',
            //             classSpinnerContent: 'o-portal--spinner-container'
            //         },
            //         locked: {
            //             checked: true,
            //             classValueContent: 'o-portal--slider-container-off o-portal--slider-container-off-locked',
            //             classSpinnerContent: 'o-portal--spinner-container hide'
            //         },
            //         unlocked: {
            //             checked: false,
            //             classValueContent: 'o-portal--slider-container-off o-portal--slider-container-off-locked',
            //             classSpinnerContent: 'o-portal--spinner-container hide'
            //         }
            //     }
            //OWCS
            owcsUrl: 'api/daf2/GCFichaCliente/1',
            // owcsUrl: 'http://masterapi.com',
            owcsDashboardClient: '2462356265146',
            owcsDashboardLine: '2462356265590',
            owcsCallsList: '2462356265647',
            owcsRepayment: '2462356268268',
            owcsPersonalDataView: '2462356275306',
            owcsBalanceTransfer: '2462356307379',
            owcsOrangeTvManagement: '2462356309126',
            owcsMailAccounts: '2462356326835',
            owcsUnlimitedSmsManagement: '2462356334158',
            owcsUnlockdedSim: '2462356356066',


            owcsActivateSimView: '2462356402590',



owcsPaymentRefillsManagement: '2462356393615', 

//##GENERATE COMPS 
});
}