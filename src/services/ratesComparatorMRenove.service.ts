module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:RatesComparatorMRenoveSrv
     * @author Ana Haro
     * @description
     * Servicio del componente contenedor del catalogo tarifas
     */
    export class RatesComparatorMRenoveSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public ratesMejorRenove: any = [];

        public rateChanged: any;

        public renoveChange: any;

        public lineSelected: any;

        public changeRateState: Array<ratesComparatorMRenove.Models.RateModificable>;

        public pressChangeRate: boolean;

        public campaing: any = {};

        public owcsCommercialCampaings: any = {};

        public campaingsNames: Array<string> = [];

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.changeRateState = new Array<ratesComparatorMRenove.Models.RateModificable>();
        }

    }
    angular.module('RatesComparatorMRenoveSrv', [])
    .service('ratesComparatorMRenoveSrv', OrangeFeSARQ.Services.RatesComparatorMRenoveSrv);
}
