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

        public commercialData;

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
         * Obtiene el valor de commercialData del session storage y lo asigna a la variable 
         * commercialData del servicio (CommercialDataSrv)
         */
        setCommercialData() {
            let vm = this;
            vm.commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
        }

        /**
         * @ngdoc method
         * @name OFC.Services:CommercialDataSrv#getSelectedCommercialAct
         * @methodOf OFC.Services:CommercialDataSrv
         * @description 
         * Establece el valor del commercialData en el session storage
         */
        setCommercialDataInSessionStorage() {
            let vm = this;
            sessionStorage.setItem('commercialData', JSON.stringify(vm.commercialData));
        }

        /**
         * @ngdoc method
         * @name OFC.Services:CommercialDataSrv#getSelectedCommercialAct
         * @methodOf OFC.Services:CommercialDataSrv
         * @description Obtiene el indice del array del acto comercial activo
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


        /**
         * @ngdoc method
         * @name OFC.Services:CommercialDataSrv#setSelectedRatePack
         * @methodOf OFC.Services:CommercialDataSrv
         * @param {string} pack pack de la tarifa
         * @description
         * Establece el valor del pack de la tarifa seleccionada en el carrito
         */
        setSelectedRatePack(commercialActId: number, pack: string) {
            let vm = this;
            vm.setCommercialData();
            vm.commercialData.forEach( commercialAct => {
                if(commercialAct.id === commercialActId) {
                    commercialAct.selectedRatePack = pack;
                }
            });
            vm.setCommercialDataInSessionStorage();
        }

    }
    // Registration
    angular.module('CommercialDataSrvModule', [])
        .service('commercialDataSrv', CommercialDataSrv);
}
