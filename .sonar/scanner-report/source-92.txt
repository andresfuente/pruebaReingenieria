module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.BillReviewSrv
     * @description
     * Servicio que realiza la llamada al microwebservice para obtener la información
     * del rol BILLREVIEW
     */
    export class BillReviewSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        // Injection vars
        public genericConstant;

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:BillReviewSrv#contructor
         * @methodOf OrangeFeSARQ.Services:BillReviewSrv
         * @param {Object} $injector componente que necesita el parent injector
         * @description
         * Incluye las dependencias necesarias
         */
        constructor($injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:BillReviewSrv#setInjections
         * @methodOf OrangeFeSARQ.Services:BillReviewSrv
         * @param {Object} $injector componente que necesita el parent injector
         * @description
         * Incluye las dependencias necesarias
         */
        setInjections($injector) {
            let vm = this;

            vm.genericConstant = $injector.get('genericConstant');
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:BillReviewSrv#getDocumentCustCode
         * @methodOf OrangeFeSARQ.Services:BillReviewSrv
         * @param {string} custCodeId customer code
         * @param {string} componentName nombre del componente
         * @description
         * Comprueba si el customer code existe para un cliente
         * @return {ng.IPromise<any>} response -> nif+custCode / err -> error
         */
        getDocumentCustCode(custCodeId: string, componentName = 'billReviewComp' ) {
            let vm = this;

            let _search: Object = {
                queryParams: {
                    'custCode': custCodeId
                },
                urlParams: [vm.genericConstant.brand, 'billReview']
            };

            return vm.httpCacheGett(vm.genericConstant.billReview, _search, componentName)
                .then(
                    function(response) {
                        return response.data;
                    }
                )
                .catch(
                    function(error) {
                        return error.data;
                    }
                );
        }
    }
}
