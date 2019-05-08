module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name deleteRatesPopup.Services.DeleteRatesPopupSrv
     * @description
     * #rest
     * Servicio para mostrar el popup de direcciones de cliente
     */
    export class DeleteRatesPopupSrv {
        static $inject = ['$injector'];
        public genericConstant;
        public deleteRatesPopupVars;

        constructor(public $injector) {
            let vm = this;
            vm.setInjections($injector);
            vm.deleteRatesPopupVars;
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        /**
         * @ngdoc method
         * @name #showPopup
         * @methodOf deleteRatesPopup.Services.DeleteRatesPopupSrv
         */
        showDeleteRatesPopup(typeOfDelete, act?, opt?, modify?): void {
            let vm = this;
            vm.deleteRatesPopupVars = {
                size: '',
                visible: true,
                closeEnabled: true,
                typeOfDelete: typeOfDelete,
                act : act,
                opt : opt,
                modify : modify
            };
        }

        /**
         * @ngdoc method
         * @name #hidePopup
         * @methodOf deleteRatesPopup.Services.DeleteRatesPopupSrv
         */
        hideDeleteRatesPopup(): void {
            let vm = this;
            vm.deleteRatesPopupVars = {
                size: '',
                visible: false,
                closeEnabled: true
            };
        }

        //////////////////////////////////////// SET ////////////////////////////////////////


        /**
         * @ngdoc method
         * @name #setSize
         * @methodOf deleteRatesPopup.Services.DeleteRatesPopupSrv
         * @param {string} Cadena para titulo del popup
         * @description
         * Establece tamaño para el popup
         */
        setbuttonOneText(value: string) {
            let vm = this;
            if (vm.deleteRatesPopupVars) {
                vm.deleteRatesPopupVars.size = value;
            }
        }

        /**
         * @ngdoc method
         * @name #setVisible
         * @methodOf deleteRatesPopup.Services.DeleteRatesPopupSrv
         * @param {string} Cadena para titulo del popup
         * @description
         * Establece si se visualizara el popup
         */
        setVisible(value: boolean) {
            let vm = this;
            if (vm.deleteRatesPopupVars) {
                vm.deleteRatesPopupVars.visible = value;
            }
        }

        /**
         * @ngdoc method
         * @name #setCloseEnabled
         * @methodOf deleteRatesPopup.Services.DeleteRatesPopupSrv
         * @param {string} Booleano para controlar el estado del botón (habilitado o deshabilitado)
         * @description
         * Establece si el botón de cerrar estará habilitado o deshabilitado.
         */
        setCloseEnabled(value: boolean) {
            let vm = this;
            if (vm.deleteRatesPopupVars) {
                vm.deleteRatesPopupVars.closeEnabled = value;
            }
        }

        //////////////////////////////////////// GET ////////////////////////////////////////

        /**
         * @ngdoc method
         * @name #getSize
         * @methodOf deleteRatesPopup.Services.DeleteRatesPopupSrv
         * @returns {string} Devuelve el tamaño del popup
         */
        getSize(): string {
            let vm = this;
            return vm.deleteRatesPopupVars ? vm.deleteRatesPopupVars.size : '';
        }

        /**
         * @ngdoc method
         * @name #getVisible
         * @methodOf deleteRatesPopup.Services.DeleteRatesPopupSrv
         * @returns {string} Devuelve si se visualiza el popup
         */
        getVisible(): boolean {
            let vm = this;
            return vm.deleteRatesPopupVars ? vm.deleteRatesPopupVars.visible : undefined;
        }

        /**
         * @ngdoc method
         * @name #getCloseEnabled
         * @methodOf deleteRatesPopup.Services.DeleteRatesPopupSrv
         * @returns {string} Devuelve si se habilita el botón cerrar.
         */
        getCloseEnabled(): boolean {
            let vm = this;
            return vm.deleteRatesPopupVars ? vm.deleteRatesPopupVars.closeEnabled : undefined;
        }
    }

    angular.module('deleteRatesPopupSrv', [])
    .service('deleteRatesPopupSrv', OrangeFeSARQ.Services.DeleteRatesPopupSrv);
}
