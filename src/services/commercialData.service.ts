module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OFC.Services:CommercialDataSrv
     * @description
     * Servicio para la manipulación del commercialData del session storage
     */
    export class CommercialDataSrv extends OrangeFeSARQ.Services.ParentService {

        static $inject = ['$injector'];
        public $scope;

        /**
         * @ngdoc method
         * @name OFC.Services:CommercialDataSrv#constructor
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf OFC.Services:CommercialDataSrv
         * @description
         * Incluye las dependencias necesarias
         */
        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        /**
         * @ngdoc method
         * @name OFC.Services:CommercialDataSrv#setInjections
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf OFC.Services:CommercialDataSrv
         * @description
         * Inyecta las dependencias
         */
        setInjections($injector) {
            let vm = this;
            vm.$scope = $injector.get('$rootScope');
        }

        /**
         * @ngdoc method
         * @name OFC.Services:CommercialDataSrv#getSelectedCommercialAct
         * @methodOf OFC.Services:CommercialDataSrv
         * @description
         * @return {number} Retorna el indice del commercialData que se esta modificando,
         * en caso contrario retorna -1
         */
        getSelectedCommercialAct(): number {
            let commercialData = [];
            commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            return _.findIndex(commercialData, function(currentCommercialAct){
                return currentCommercialAct.ospIsSelected  === true;
            });
        }

    }
    // Registration
    angular.module('CommercialDataSrvModule', [])
        .service('commercialDataSrv', CommercialDataSrv);
}
