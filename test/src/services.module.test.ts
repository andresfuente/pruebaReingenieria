module servicesCommons.Tests.Controllers {

    describe('Controller to servicesCommons ', () => {

        let token;
        let terminalsComparator;
        let rateInfoPopup;
        let shoppingCart;
        let ratesParent;
        let dataEntry;
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


        /**
		 * @ngdoc test pack
		 * @author David López Corbelle (dlopecor)
		 * @methodOf getRolProfile.Services:getRolProfileSrv
		 * @description
		 * Conjunto de test para el servicio getRolProfileSrv
		 */
        describe('Service to getRolProfileSrv ', () => {

            beforeEach(() => {
                srv = $injector.get('getRolProfileSrv');
                srv.loginData = JSON.parse(JSON.stringify(mockLoginData.logindata1));
                // srv.rolesPDV = ['PDV','PDV_ADMIN','PDV_DESPL','PDV_NONMA','TPH','ECI'];
                // srv.rolesTLV = ['TLV_DESPL','TLV_ADMIN','TLW','INBOUND','OUTBOUND'];
                // srv.rolesFFCC = ['FFCC','FFCC_BO'];
            });

            describe('- Check setRol()', () => {
                it('Roles FFCC', function () {
                    srv.setRol(mockListOptions);
                    expect(srv.rolesFFCC).toEqual(['FFCC','FFCC_BO']);
                });
                it('Roles TLV', function () {
                    srv.setRol(mockListOptions);
                    expect(srv.rolesTLV).toEqual(['TLW','TLV_ADMIN','TLV_DESPL','INBOUND','OUTBOUND']);
                });
                it('Roles PDV', function () {
                    srv.setRol(mockListOptions);
                    expect(srv.rolesPDV).toEqual(['PDV','PDV_ADMIN','PDV_DESPL','PDV_NONMA','TPH','ECI']);
                });
            });

            describe('- Check getRol()', () => {

                beforeEach(() => {
                    srv.rolesFFCC = ['FFCC','FFCC_BO'];
                });
                it('Rol FFCC', function () {
                    srv.loginData.rol = 'FFCC';
                    srv.getRol();
                    expect(srv.defaultSegment).toEqual('Autonomo');
                });
                it('Rol PDV/TLV', function () {
                    srv.loginData.rol = 'PDV';
                    srv.getRol();
                    expect(srv.defaultSegment).toEqual('Residencial');
                });
            });

            describe('- Check isRolPDV()', () => {

                beforeEach(() => {
                    srv.rolesPDV = ['PDV','PDV_ADMIN','PDV_DESPL','PDV_NONMA','TPH','ECI'];
                });

                it('rol : PDV', () => {
                    srv.loginData.rol = 'PDV';
                    expect(srv.isRolPDV()).toBeTruthy();
                });

                it('rol : TLW', () => {
                    srv.loginData.rol = 'TLW';
                    expect(srv.isRolPDV()).toBeFalsy();
                });
            });

            describe('- Check isRolFFCC()', () => {

                beforeEach(() => {
                    srv.rolesFFCC = ['FFCC','FFCC_BO'];
                });

                it('rol : FFCC', () => {
                    srv.loginData.rol = 'FFCC';
                    expect(srv.isRolFFCC()).toBeTruthy();
                });

                it('rol : PDV', () => {
                    srv.loginData.rol = 'PDV';
                    expect(srv.isRolFFCC()).toBeFalsy();
                });
            });

            describe('- Check isRolTLV()', () => {

                beforeEach(() => {
                    srv.rolesTLV = ['TLV_DESPL','TLV_ADMIN','TLW','INBOUND','OUTBOUND'];
                });

                it('rol : TLV', () => {
                    srv.loginData.rol = 'TLW';
                    expect(srv.isRolTLV()).toBeTruthy();
                });

                it('rol : PDV', () => {
                    srv.loginData.rol = 'PDV';
                    expect(srv.isRolTLV()).toBeFalsy();
                });
            });


        });
    });
}
