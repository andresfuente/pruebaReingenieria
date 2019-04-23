module servicesCommons.Tests.Controllers {

    describe('Controller to servicesCommons ', () => {

        let utils;
        let token;
        let terminalsComparator;
        let rateInfoPopup;
        let shoppingCart;
        let ratesParent;
        let dataEntry;
        let mockserver;
        let $injector;

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

                    utils = new OrangeFeSARQ.Services.Utils($injector);
                    token = new OrangeFeSARQ.Services.TokenSrv($injector); 
                    terminalsComparator  = new OrangeFeSARQ.Services.TerminalsComparatorSrv($injector);
                    shoppingCart =  new OrangeFeSARQ.Services.ShoppingCartSrv($injector);
                    dataEntry = new OrangeFeSARQ.Services.DataEntrySrv($injector); 
                    rateInfoPopup = new OrangeFeSARQ.Services.RateDeviceSelectionPopupSrv($injector);
                });
        });
        it('utils Controller should be defined', function () {
            expect(utils).toBeDefined();
        });
        it('token Controller should be defined', function () {
            expect(token).toBeDefined();
        }); 
        it('terminalsComparator Controller should be defined', function () {
            expect(terminalsComparator).toBeDefined();
        });
        it('shoppingCart Controller should be defined', function () {
            expect(shoppingCart).toBeDefined();
        });
        it('dataEntry Controller should be defined', function () {
            expect(dataEntry).toBeDefined();
        });
        it('rateInfoPopup Controller should be defined', function () {
            expect(rateInfoPopup).toBeDefined();
        });
    });
}
