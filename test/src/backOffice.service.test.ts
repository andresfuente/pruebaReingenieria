module backOffice.Tests.Service {

    describe('backOfficeSrv', () => {
        let backOfficeSrv;
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

                    backOfficeSrv = new OrangeFeSARQ.Services.BackOfficeSrv($injector);
                    backOfficeSrv.genericConstant.brand = 'orange';
                });
        });
        it('backOfficeSrv Service should be defined', function () {
            expect(backOfficeSrv).toBeDefined();
        });

        it('backOfficeSrv Servicec contractOrangeTv', function () {
            backOfficeSrv.contractOrangeTv('msisdn', 'documentType', 'origin', 'componentName')
        });

        it('backOfficeSrv Servicec contractOrangeTV', function () {
            backOfficeSrv.contractOrangeTV('body', 'componentName');
        });
    });

}
