module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name amortization.AmortizationSrv
     * @description
     * #rest
     * Servicio que busca un cliente en funcion de distintos parámetros
     */
    export class AmortizationSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public genericConstant;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        /**
         * @ngdoc method
         * @name #getVap
         * @methodOf amortization.AmortizationSrv
         * @returns {object} Devuelve una promesa con el response
         */
        getVap(msisdn: string, id: string, componentName:string="payPendingPaymentComp"): any {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: ['vapData', 'OSP', id, msisdn]

            };
            return vm.httpCacheGett(vm.genericConstant.amortizationApi, _search,componentName)
                .then(
                    (response)=> {
                        return response.data;
                    },
                    (error)=> {
                        return error.error;
                    });
        }

    }
}
