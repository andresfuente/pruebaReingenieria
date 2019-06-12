module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name directionPopup.Services.DirectionPopupSrv
     * @description
     * #rest
     * Servicio para mostrar el popup de direcciones de cliente
     */
    export class DirectionPopupSrv {
        static $inject = ['$injector'];
        public genericConstant;
        public directionPopupVars;

        constructor(public $injector) {
            let vm = this;
            vm.setInjections($injector);
            vm.directionPopupVars = {};
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        /**
         * @ngdoc method
         * @name #showPopup
         * @methodOf directionPopup.Services.DirectionPopupSrv
         */
        showDirectionPopup(title: string, directions): void {
            let vm = this;
            vm.directionPopupVars = {
                title: title,
                closeText: 'Cerrar',
                size: '',
                visible: true,
                closeEnabled: true,
            };
            // Direcciones de Clientes
            vm.directionPopupVars.directions = new Array();
            vm.directionPopupVars.directions = directions;
            // Dirección seleccionada por defecto
            vm.directionPopupVars.selectDirection = directions[0];
        }

        /**
         * @ngdoc method
         * @name #hidePopup
         * @methodOf directionPopup.Services.DirectionPopupSrv
         */
        hideDirectionPopup(): void {
            let vm = this;
            vm.directionPopupVars = {
                title: '',
                closeText: '',
                size: '',
                visible: false
            };
        }

        //////////////////////////////////////// SET ////////////////////////////////////////

        /**
         * @ngdoc method
         * @name #setTitle
         * @methodOf directionPopup.Services.DirectionPopupSrv
         * @param {string} Cadena para titulo del popup
         * @description
         * Establece titulo para el popup
         */
        setTitle(value: string): void {
            let vm = this;
            if (vm.directionPopupVars) {
                vm.directionPopupVars.title = value;
            }
        }

        /**
         * @ngdoc method
         * @name #setCloseText
         * @methodOf directionPopup.Services.DirectionPopupSrv
         * @param {string} Cadena para titulo del popup
         * @description
         * Establece Texto del botón para el popup
         */
        setCloseText(value: string) {
            let vm = this;
            if (vm.directionPopupVars) {
                vm.directionPopupVars.closeText = value;
            }
        }

        /**
         * @ngdoc method
         * @name #setSize
         * @methodOf directionPopup.Services.DirectionPopupSrv
         * @param {string} Cadena para titulo del popup
         * @description
         * Establece tamaño para el popup
         */
        setSize(value: string) {
            let vm = this;
            if (vm.directionPopupVars) {
                vm.directionPopupVars.size = value;
            }
        }

        /**
         * @ngdoc method
         * @name #setVisible
         * @methodOf directionPopup.Services.DirectionPopupSrv
         * @param {string} Cadena para titulo del popup
         * @description
         * Establece si se visualizara el popup
         */
        setVisible(value: boolean) {
            let vm = this;
            if (vm.directionPopupVars) {
                vm.directionPopupVars.visible = value;
            }
        }

        /**
         * @ngdoc method
         * @name #setCloseEnabled
         * @methodOf directionPopup.Services.DirectionPopupSrv
         * @param {string} Booleano para controlar el estado del botón (habilitado o deshabilitado)
         * @description
         * Establece si el botón de cerrar estará habilitado o deshabilitado.
         */
        setCloseEnabled(value: boolean) {
            let vm = this;
            if (vm.directionPopupVars) {
                vm.directionPopupVars.closeEnabled = value;
            }
        }

        //////////////////////////////////////// GET ////////////////////////////////////////
        /**
         * @ngdoc method
         * @name #getTitle
         * @methodOf directionPopup.Services.DirectionPopupSrv
         * @returns {string} Devuelve el titulo del popup
         */
        getTitle(): string {
            let vm = this;
            return vm.directionPopupVars ? vm.directionPopupVars.title : '';
        }

        /**
         * @ngdoc method
         * @name #getCloseText
         * @methodOf directionPopup.Services.DirectionPopupSrv
         * @returns {string} Devuelve el texto del botón del popup
         */
        getCloseText(): string {
            let vm = this;
            return vm.directionPopupVars ? vm.directionPopupVars.closeText : '';
        }

        /**
         * @ngdoc method
         * @name #getSize
         * @methodOf directionPopup.Services.DirectionPopupSrv
         * @returns {string} Devuelve el tamaño del popup
         */
        getSize(): string {
            let vm = this;
            return vm.directionPopupVars ? vm.directionPopupVars.size : '';
        }

        /**
         * @ngdoc method
         * @name #getVisible
         * @methodOf directionPopup.Services.DirectionPopupSrv
         * @returns {string} Devuelve si se visualiza el popup
         */
        getVisible(): boolean {
            let vm = this;
            return vm.directionPopupVars ? vm.directionPopupVars.visible : undefined;
        }

        /**
         * @ngdoc method
         * @name #getCloseEnabled
         * @methodOf directionPopup.Services.DirectionPopupSrv
         * @returns {string} Devuelve si se habilita el botón cerrar.
         */
        getCloseEnabled(): boolean {
            let vm = this;
            return vm.directionPopupVars ? vm.directionPopupVars.closeEnabled : undefined;
        }
    }
    angular.module('directionPopupSrv', [])
        .service('directionPopupSrv', OrangeFeSARQ.Services.DirectionPopupSrv);
}
