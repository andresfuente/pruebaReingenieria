module activationAndConfiguration.Tests.Service {

    describe('activationAndConfigurationSrv', () => {
        let activationAndConfigurationSrv;
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

                    activationAndConfigurationSrv = new OrangeFeSARQ.Services.ActivationAndConfigurationSrv($injector);
                    activationAndConfigurationSrv.genericConstant.brand = 'orange';
                });
        });
        it('activationAndConfigurationSrv Service should be defined', function () {
            expect(activationAndConfigurationSrv).toBeDefined();
        });

        it('activationAndConfigurationSrv Servicec getData', function () {
            // activationAndConfigurationSrv.getData('idType','idNumber', 'msisdn', 'componentName')
        });

        it('activationAndConfigurationSrv Servicec changeStateService', function () {
            activationAndConfigurationSrv.changeStateService(null, 'componentName')
        });

        it('activationAndConfigurationSrv Servicec changeStateService2', function () {
            activationAndConfigurationSrv.changeStateService2(null, 'componentName');
        });
    });

}
