module servicesCommons.Tests.Controllers {

    describe('Controller to servicesCommons ', () => {

        let utils;
        let mockserver;
        let $injector;


        beforeEach(() => {
            angular.mock.module('genericConstant');
            angular.mock.module('httpCache');
            angular.mock.module('servicesCommons');
        });

        beforeEach(() => {
            inject(
                function(_$injector_) {
                    /* load data from mockjson */
                    $injector = _$injector_;
                    jasmine.getJSONFixtures().clearCache();
                    jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';
                    mockserver = getJSONFixture('mock-api-data.json');

                    utils = new OrangeFeSARQ.Services.Utils($injector);
                });
        });

        it('utils Controller should be defined', function() {
            expect(utils).toBeDefined();
        });
    });
}