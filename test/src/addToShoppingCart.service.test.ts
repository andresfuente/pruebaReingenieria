module addToShoppingCart.Test.Services {
    describe('addToShoppingCart', () => {
        let service: OrangeFeSARQ.Services.AddToShoppingCartSrv;

        beforeEach(() => {
            includeDeps();
       
                       
        });

        beforeEach(angular.mock.inject((_addToShoppingCartSrv_) => {
            service = _addToShoppingCartSrv_;
        }));

        beforeEach(() => {
            jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';
            
        });
        afterEach(() => jasmine.getJSONFixtures().clearCache());

        describe('injections', () => {
            it('should inject correctly', () => {
                expect(service).toBeDefined();
 
            });
        });

         /**
		 * @ngdoc test pack
		 * @author Aarón Isabel Díaz (aisabeld)
		 * @methodOf addToShoppingCart.Services:addToShoppingCartSrv
		 * @description
		 * Conjunto de test para el servicio addToShoppingCartSrv
		 */
        // describe('Service to addToShoppingCartSrv ', () => {
            

        //     describe('- SOHORateInShoppingCart()', () => {
        //         it('commercialData && commercialData.length', function () {
        //             service.SOHORateInShoppingCart();
        //             expect(service.SOHORateInShoppingCart).toBeEmpty;
        //         });
                
        //     });


        // });
    });
}

