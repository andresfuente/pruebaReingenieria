module rateInfoPopup.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name rateDeviceSelectionPopup.Services.RateDeviceSelectionPopupSrv
     * @description
     * #rest
     * Servicio para mostrar el popup de direcciones de cliente
     */
    export class RateInfoPopupSrv {
        static $inject = ['$injector'];
        public genericConstant;
        public rateInfoPopupVars: rateInfoPopup.Models.IRateInfoPopupVarsModel;

        constructor(public $injector) {
            let vm = this;
            vm.setInjections($injector);
            vm.rateInfoPopupVars = <rateInfoPopup.Models.IRateInfoPopupVarsModel>{};
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        /**
         * @ngdoc method
         * @name #showPopup
         * @methodOf rateDeviceSelectionPopup.Services.RateDeviceSelectionPopupSrv
         */
        showRateInfoPopup(tarifa): void {
            let vm = this;
            vm.rateInfoPopupVars = <rateInfoPopup.Models.IRateInfoPopupVarsModel> {
                size: '',
                visible: true,
                closeEnabled: true,
                tarifa: tarifa
            };
        }

        /**
         * @ngdoc method
         * @name #hidePopup
         * @methodOf rateDeviceSelectionPopup.Services.RateDeviceSelectionPopupSrv
         */
        hideRateInfoPopup(): void {
            let vm = this;
            vm.rateInfoPopupVars = <rateInfoPopup.Models.IRateInfoPopupVarsModel>{
                size: '',
                visible: false,
                closeEnabled: true
            };
        }

        //////////////////////////////////////// SET ////////////////////////////////////////


        /**
         * @ngdoc method
         * @name #setSize
         * @methodOf rateDeviceSelectionPopup.Services.RateDeviceSelectionPopupSrv
         * @param {string} Cadena para titulo del popup
         * @description
         * Establece tamaño para el popup
         */
        setbuttonOneText(value: string) {
            let vm = this;
            if (vm.rateInfoPopupVars) {
                vm.rateInfoPopupVars.size = value;
            }
        }

        /**
         * @ngdoc method
         * @name #setVisible
         * @methodOf rateDeviceSelectionPopup.Services.RateDeviceSelectionPopupSrv
         * @param {string} Cadena para titulo del popup
         * @description
         * Establece si se visualizara el popup
         */
        setVisible(value: boolean) {
            let vm = this;
            if (vm.rateInfoPopupVars) {
                vm.rateInfoPopupVars.visible = value;
            }
        }

        /**
         * @ngdoc method
         * @name #setCloseEnabled
         * @methodOf rateDeviceSelectionPopup.Services.RateDeviceSelectionPopupSrv
         * @param {string} Booleano para controlar el estado del botón (habilitado o deshabilitado)
         * @description
         * Establece si el botón de cerrar estará habilitado o deshabilitado.
         */
        setCloseEnabled(value: boolean) {
            let vm = this;
            if (vm.rateInfoPopupVars) {
                vm.rateInfoPopupVars.closeEnabled = value;
            }
        }

        //////////////////////////////////////// GET ////////////////////////////////////////

        /**
         * @ngdoc method
         * @name #getSize
         * @methodOf rateDeviceSelectionPopup.Services.RateDeviceSelectionPopupSrv
         * @returns {string} Devuelve el tamaño del popup
         */
        getSize(): string {
            let vm = this;
            return vm.rateInfoPopupVars ? vm.rateInfoPopupVars.size : '';
        }

        /**
         * @ngdoc method
         * @name #getVisible
         * @methodOf rateDeviceSelectionPopup.Services.RateDeviceSelectionPopupSrv
         * @returns {string} Devuelve si se visualiza el popup
         */
        getVisible(): boolean {
            let vm = this;
            return vm.rateInfoPopupVars ? vm.rateInfoPopupVars.visible : undefined;
        }

        /**
         * @ngdoc method
         * @name #getCloseEnabled
         * @methodOf rateDeviceSelectionPopup.Services.RateDeviceSelectionPopupSrv
         * @returns {string} Devuelve si se habilita el botón cerrar.
         */
        getCloseEnabled(): boolean {
            let vm = this;
            return vm.rateInfoPopupVars ? vm.rateInfoPopupVars.closeEnabled : undefined;
        }
    }
}
