module billingAccountStoreSrv.Tests.Service {

    describe('billingAccountStoreSrv', () => {
        let billingAccountStoreSrv;
        let mockserver;
        let $injector;
        let mockLoginData, mockListOptions;

        beforeEach(() => {
            angular.mock.module('ngCookies');
            angular.mock.module('orange-arq-common');
            angular.mock.module('genericConstant');
            angular.mock.module('httpCache');
            angular.mock.module('servicesCommons');
            angular.mock.module('getMenuItemsModule');
        });

        beforeEach(() => {
            inject(
                function (_$injector_) {
                    /* load data from mockjson */
                    $injector = _$injector_;
                    jasmine.getJSONFixtures().clearCache();
                    jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';
                    mockserver = getJSONFixture('mock-api-data.json');
                    mockLoginData = getJSONFixture('mock-logindata.json');
                    mockListOptions = getJSONFixture('mock-list-options.json');
                    sessionStorage.setItem('loginData', JSON.stringify(mockLoginData.logindata1));

                    billingAccountStoreSrv = new OrangeFeSARQ.Services.BillingAccountStoreSrv();
                });
        });
        it('billingAccountStoreSrv Service should be defined', function () {
            expect(billingAccountStoreSrv).toBeDefined();
        });

        it('billingAccountStoreSrv Servicec createStore', function () {
            let customerView = mockserver.api_customerView
            billingAccountStoreSrv.createStore(customerView)
        });

        it('billingAccountStoreSrv Servicec cleanStore', function () {
            billingAccountStoreSrv.cleanStore();
        });

        it('billingAccountStoreSrv Servicec loadFromSessionStorage', function () {
            billingAccountStoreSrv.loadFromSessionStorage();
        });

        it('billingAccountStoreSrv Servicec getCurrentPhoneLine', function () {
            billingAccountStoreSrv.getCurrentPhoneLine();
        });

        it('billingAccountStoreSrv Servicec getBillingAddressByLine', function () {
            billingAccountStoreSrv.getBillingAddressByLine();
        });

        it('billingAccountStoreSrv Servicec getCurrentBillingAddress', function () {
            billingAccountStoreSrv.getCurrentBillingAddress();
        });

        it('billingAccountStoreSrv Servicec getBillingAccountByLine', function () {
            billingAccountStoreSrv.getBillingAccountByLine();
        });

        it('billingAccountStoreSrv Servicec getCurrentBillingAccount', function () {
            billingAccountStoreSrv.getCurrentBillingAccount();
        });
    });

}
