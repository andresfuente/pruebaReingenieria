module account.Tests.Service {

    describe('accountSrv', () => {
        let accountSrv;
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

                    accountSrv = new OrangeFeSARQ.Services.AccountSrv($injector);
                    accountSrv.genericConstant.brand = 'orange';
                });
        });
        it('accountSrv Service should be defined', function () {
            expect(accountSrv).toBeDefined();
        });

        it('accountSrv Servicec getData', function () {
            // accountSrv.getData('idType','idNumber', 'msisdn', 'componentName')
        });

        it('accountSrv Servicec putMail', function () {
            accountSrv.putMail(null, 'componentName')
        });

        it('accountSrv Servicec passChange', function () {
            accountSrv.passChange(null, 'componentName');
        });

        it('accountSrv Servicec checkMail', function () {
            // accountSrv.checkMail(null, 'componentName');
        });

        it('accountSrv Servicec redirectEmail', function () {
            accountSrv.redirectEmail(null, 'componentName');
        });

        it('accountSrv Servicec getRedirectedAccount', function () {
            // accountSrv.getRedirectedAccount('userLogin', 'userDomain', 'componentName');
        });
    });

}
