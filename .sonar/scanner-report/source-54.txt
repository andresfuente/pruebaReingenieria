/**
 * Created by jgaralon on 03/07/2017.
 */
module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name amortization.AmortizationSrv
     * @description
     * #rest
     * Servicio que busca un cliente en funcion de distintos parámetros
     */
    export class ChangeRateFixedOWCSSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public genericConstant;
        public url: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        getRate(msisdn: string) {
            let vm = this;
            vm.url = vm.genericConstant.changeRateController;
            let _search = {
                //Http://10.113.46.151:8001/daf2/ChangeRateController/v1/eCareResidencial/ProductoCambioOfertaFijo
                queryParams: {realSalto: msisdn},
                urlParams: ['eCareResidencial', 'ProductoCambioOfertaFijo']
            };
            return vm.httpCacheGett(vm.url, _search)
                .then(function (response) {
                    if (response.data && response.data.productRateChange) {
                        return response.data;
                    } else {
                        throw response.error;
                    }
                })
                .catch(function (error) {
                    throw error.data;
                });
        }

        setData(dummy) {
            let vm = this;
            vm.url = vm.genericConstant.changeOffer;
            let _search = {
                queryParams: dummy
            };
            return vm.httpCacheOrange.post(vm.url, _search)
                .then(
                    (successData) => {
                        return successData;
                    },
                    (errorData) => {
                        return errorData;
                    }
                );
        }
    }
}
