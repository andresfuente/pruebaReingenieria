module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.RateDeviceSelectionPopupSrv 
     * @description
     * #rest
     * Servicio para mostrar el popup de direcciones de cliente
     */
    export class DeviceRateSelectionPopupSrv {
        static $inject = ['$injector'];
        public genericConstant;
        public deviceRateSelectionPopupVars: deviceRateSelectionPopup.Models.IDeviceRateSelectionPopupVarsModel;

        constructor(public $injector) {
            let vm = this;
            vm.setInjections($injector);
            vm.deviceRateSelectionPopupVars = <deviceRateSelectionPopup.Models.IDeviceRateSelectionPopupVarsModel>{};
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        /**
         * @ngdoc method
         * @name #showPopup
         * @methodOf OrangeFeSARQ.Services.RateDeviceSelectionPopupSrv
         */
        showDeviceRateSelectionPopup(tarifas): void {
            let vm = this;
            vm.deviceRateSelectionPopupVars = <deviceRateSelectionPopup.Models.IDeviceRateSelectionPopupVarsModel> {
                size: '',
                visible: true,
                closeEnabled: true,
                device: tarifas
            };
        }

        /**
         * @ngdoc method
         * @name #hidePopup
         * @methodOf OrangeFeSARQ.Services.RateDeviceSelectionPopupSrv
         */
        hideDeviceRateSelectionPopup(): void {
            let vm = this;
            vm.deviceRateSelectionPopupVars = <deviceRateSelectionPopup.Models.IDeviceRateSelectionPopupVarsModel>{
                size: '',
                visible: false,
                closeEnabled: true
            };
        }

        //////////////////////////////////////// SET ////////////////////////////////////////


        /**
         * @ngdoc method
         * @name #setSize
         * @methodOf OrangeFeSARQ.Services.RateDeviceSelectionPopupSrv
         * @param {string} Cadena para titulo del popup
         * @description
         * Establece tamaño para el popup
         */
        setbuttonOneText(value: string) {
            let vm = this;
            if (vm.deviceRateSelectionPopupVars) {
                vm.deviceRateSelectionPopupVars.size = value;
            }
        }

        /**
         * @ngdoc method
         * @name #setVisible
         * @methodOf OrangeFeSARQ.Services.RateDeviceSelectionPopupSrv
         * @param {string} Cadena para titulo del popup
         * @description
         * Establece si se visualizara el popup
         */
        setVisible(value: boolean) {
            let vm = this;
            if (vm.deviceRateSelectionPopupVars) {
                vm.deviceRateSelectionPopupVars.visible = value;
            }
        }

        /**
         * @ngdoc method
         * @name #setCloseEnabled
         * @methodOf OrangeFeSARQ.Services.RateDeviceSelectionPopupSrv
         * @param {string} Booleano para controlar el estado del botón (habilitado o deshabilitado)
         * @description
         * Establece si el botón de cerrar estará habilitado o deshabilitado.
         */
        setCloseEnabled(value: boolean) {
            let vm = this;
            if (vm.deviceRateSelectionPopupVars) {
                vm.deviceRateSelectionPopupVars.closeEnabled = value;
            }
        }

        //////////////////////////////////////// GET ////////////////////////////////////////

        /**
         * @ngdoc method
         * @name #getSize
         * @methodOf OrangeFeSARQ.Services.RateDeviceSelectionPopupSrv
         * @returns {string} Devuelve el tamaño del popup
         */
        getSize(): string {
            let vm = this;
            return vm.deviceRateSelectionPopupVars ? vm.deviceRateSelectionPopupVars.size : '';
        }

        /**
         * @ngdoc method
         * @name #getVisible
         * @methodOf OrangeFeSARQ.Services.RateDeviceSelectionPopupSrv
         * @returns {string} Devuelve si se visualiza el popup
         */
        getVisible(): boolean {
            let vm = this;
            return vm.deviceRateSelectionPopupVars ? vm.deviceRateSelectionPopupVars.visible : undefined;
        }

        /**
         * @ngdoc method
         * @name #getCloseEnabled
         * @methodOf OrangeFeSARQ.Services.RateDeviceSelectionPopupSrv
         * @returns {string} Devuelve si se habilita el botón cerrar.
         */
        getCloseEnabled(): boolean {
            let vm = this;
            return vm.deviceRateSelectionPopupVars ? vm.deviceRateSelectionPopupVars.closeEnabled : undefined;
        }
    }
}
