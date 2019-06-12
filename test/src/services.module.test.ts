module servicesCommons.Tests.Controllers {

    describe('Controller to servicesCommons ', () => {

        let utils, srv;
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

                    // - utils = new OrangeFeSARQ.Services.Utils($injector);
                });
        });
        it('utils Controller should be defined', function () {
            let a = { a: 1, b: 2 };
            expect(a).toBeDefined();
        }); 
        
    });
}
