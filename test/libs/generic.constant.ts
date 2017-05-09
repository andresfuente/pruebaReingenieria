module OrangeFeSARQ.Constant {
  'use strict';

  angular.module('genericConstant', [])
    .constant('genericConstant', {

      // -este fichero aunque no esté en arquitectura es un fichero core, ya que hay
      // -muchos componentes y servicios core que hacen referencia a él
      // -todos los sitios tienen que tener las siguientes constantes definidas:
      // -site
      // -owcsUrl
      // -getImagesOwcs
      // -getRatesOwcs
      // -CatalogMessageUrl

      site: 'eCareResidencial', // Portal
      brand: 'orange', // Organización

      // APIS
      productOrder: 'api/productOrdering/v1',
      activationAndConfiguration: 'api/activationAndConfiguration/v1',
      customerView: 'api/customerView/v1',
      linesUsage: 'api/linesUsage/v1',
      bucketBalance: 'api/bucketBalance/v1',
      productCatalog: 'api/productCatalog/v1',
      changeOffer: 'api/changeOffer/v1/changeOffer',
      activityRegister: 'api/activityRegister/v1/activityRegister',
      detailedUsage: 'api/detailedUsage/v1',
      expeditUsage: 'api/expeditUsage/v1',
      productInventory: 'api/productInventory/v1',
      vapDataUrl: 'api/amortization/v1',
      sendEmail: 'api/sendEmail/v1',
      inviteAndSave: 'api/invitaYAhorra/v1',
      fixInvoice: 'api/fixedInvoices/v1',
      fixedServices: 'api/fixedServices/v1',
      bankAccount: 'api/bankAccount/v1/bankaccount',
      notificationsMF: 'api/notificationsMF/v1',
      agreement: 'api/agreementManagement/v1/agreement',
      hoot: '/api/hoot/v1',
      pagofacil: 'https://pagos.int.si.orange.es/web/app/accesoDirecto',
      token: 'api/token/v1',
      address: 'api/address/v1/address',
      customerManagement: 'api/customerManagement/v1',
      loyalty: 'api/loyalty/v1',

      // Xnet Url
      xnetUrl: 'vpt2/additionalProductsProAction.do?',
      xnetLineInformation: 'api/xnetLineInformation/v1',

      // /navigation
      lineListNavigateWhenClickInLine: 'dashboardLine',
      dashboardMobileLine: 'dashboardLine',
      dashboardFixedLine: 'dashboardFixedLine',
      defaultRouteWhenNoClient: 'noClient',
      currentConsuptionNavigateWhenClickInCircle: 'callsList',

      // MOCKS
      amortizationApi: 'mock/API/amortization.json',
      orangetvDisableDevicesApi: 'mock/API/orangedisable.json',
      bucketBalanceLineAPIUrl: 'mock/API/productBucketLine.json',
      bucketBalanceBonusAPIUrl: 'mock/API/productBucketBonus.json',
      orangetvMultisimApi: 'mock/API/multisimmanagements.json',

      // LITERALES
      msisdnText: 'MSISDN',
      fixedTelephoneText: 'Número teléfono fijo VoIP',
      postpaidType: 'POSPAGO',
      prepaidType: 'PREPAGO',
      fixedtelephonyType: 'Telefonía Fija',

      // Constante onlyActive, que controla que se muestren las líneas activas y suspendidas
      onlyActive: true,

      // PSP
      pspRepaymentAPI: 'api/psp/v1',

      // OWCS
      owcsUrl: 'api/GCFichaCliente/v1',
      owcsUrlByName: 'api/RouterController/v1',
      owcsProductMoreInfo: 'api/ProductMoreInfo/v1',

      // Llamadas al principio de la app
      getImagesOwcs: 'api/imageController/v1/FichaCliente/getImages',
      getRatesOwcs: 'api/ResourcesController/1/eCareResidencial/getRates',
      getDataClient: '/api/dataUser/v1/',
      CatalogMessageUrl: 'api/ResourcesController/1/eCareResidencial/getAllResources',
      getHeader: '/api/ResourcesController/1', //
      // IBM URLs
      urlOAM: 'https://applogin.int.si.orange.es/oam/server/logout?end_url=https://ecareempresas.int.si.orange.es/',
      invoiceHistogram: 'api/interactiveInvoice/v1/histogram',
      serverUrl: 'https://ecareresidencial.int.si.orange.es',
      userManagement: 'api/userManagement/v1',

      // Layouts ids
      owcsDashboardClient: '2462356265146',
      owcsDashboardLine: '2462356265590',
      owcsDashboardBill: '2462363649547',
      owcsCallsList: '2462356265647',
      owcsRepayment: '2462356268268',
      owcsPersonalDataView: '2462356275306',
      owcsPermanencyDetailsView: '2462362750276',
      owcsBalanceTransfer: '2462356307379',
      owcsOrangeTvMobile: '2462356309126',
      owcsOrangeTvFixed: '2462362770908',
      owcsMailAccounts: '2462356326835',
      owcsUnlimitedSmsManagement: '2462356334158',
      owcsDigitalInvoice: '2462356827468',
      owcsInteractiveInvoiceView: '2462364452318',
      owcsUnlockdedSim: '2462356356066',
      owcsActivateSimView: '2462356402590',
      owcsPaymentRefillsManagement: '2462356393615',
      owcsPaymentResultView: '2462356471525',
      owcsInviteAndSaveView: '2462357078234',
      owcsDashboardFixedLine: '2462357082667',
      owcsDashboardXnet: '2462357327807',
      owcsDashboardTest: '2462356257503',
      owcsListBillFixedView: '2462359554155',
      owcsBalanceTransferLogView: '2462359985331',
      owcsChangePasswordView: '2462359552278',
      owcsChangeRateView: '2462360148553',
      owcsLandingContractView: '2462360950315',
      owcsCustomerCalm: '2462361032314',
      owcsHelpSectionView: '2462361118922',
      owcsSearchStoreView: '2462361034948',
      owcsExtrasOrangeView: '2462361119373',
      owcsSerOrangeView: '2462361482845',
      owcsTestCampaign: '2462360933882',
      owcsSendInvoiceByEmail: '2462361544208',
      owcsCampaignPill: '2462362161156',
      owcsCampaignModal: '2462362161070',
      owcsCampaigFly: '2462362160918',
      owcsCampaignBanner: '2462362159366',
      owcsTestDosComp: '2462362115841',
      owcsAdslDataView: '2462362759949',
      owcsNotificacionesView: '2462362741774',
      owcsEstrenamovilView: '2462362741794',
      owcsServiceSupportView: '2462362736956',
      owcsInviteFriendsView: '2462362816581',
      owcsBonusBono_internet800mb: '2462363192843',
      owcsBonusBono_altaentrenosotros: '2462363192217',
      owcsBonusBono_altamundo: '2462363200220',
      owcsBonusBono_altainternacional: '2462363200219',
      owcsBonusBono_altagoeurope: '2462363207529',
      owcsMyBalance: '2462364511771',
      owcsQuietView: '2462363829662',
      owcsUnlockPhoneView: '2462363691548',
      owcsHelpOrange: '2462363786516',
      owcsMobileInsurance: '2462363785766',
      owcsHistogram: '2462363709496',
      owcsDiscoverYourPrize: '2462364769272',
      owcsPrizesLogView: '2462364537794',
      owcsFrequentQuestionsView: '2462367160773',
      owcsNotFound: '0000'


      // ##GENERATE COMPS
    });
}
