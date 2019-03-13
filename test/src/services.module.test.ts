module servicesCommons.Tests.Controllers {

    describe('Controller to servicesCommons ', () => {

        let utils;
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
                });
        });
        it('utils Controller should be defined', function () {
            let a = { a: 1, b: 2 };
            expect(utils).toBeDefined();
        }); 
        describe('Check escapeHtml',()=>{
            it('empty', function (){
                utils.escapeHtml();
            });
            it('data', function (){
                utils.escapeHtml('hola&');
            })
        })
        describe('Check unescapeHtml',()=>{
            it('empty', function (){
                utils.unescapeHtml();
            });
            it('data', function (){
                utils.unescapeHtml('holaamp;');
            })
        })
    });

}
