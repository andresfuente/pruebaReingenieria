module reservePopup.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name reservePopup.Services.ReservePopupSrv
     * @description
     * #rest
     * Servicio para mostrar el popup de reserva de terminales
     */
    export class ReservePopupSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        // Injection vars
        public reservePopupSrvVars: reservePopupSrv.Models.IReservePopupVarsModel;
        public refreshShoppingCart: boolean;
        public informationCenter: OrangeFeSARQ.Services.InformationCenterSrv;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
            vm.reservePopupSrvVars = <reservePopupSrv.Models.IReservePopupVarsModel>{};
        }

        setInjections($injector) {
            let vm = this;

            vm.informationCenter = $injector.get('InformationCenterSrv');
        }

        /**
         * @ngdoc method
         * @name reservePopup.Services.ReservePopupSrv#showReservePopup
         * @methodOf reservePopup.Services.ReservePopupSrv
         * @param {string} sfid sfid de la tienda
         * @param {string} dni documento del cliente
         * @param {string} tipoDocumento tipo de documento del cliente
         * @param {Array} reservas terminales disponibles
         * Reserva el terminal especificado
         */
        reserve(sfid, dni, tipoDocumento, reservas) {
            let vm = this;

            let body = {
                idSystemExt: '10',
                idChannel: 'MICROSERVICIOS',
                sfid: sfid,
                quantity: '1',
                reserva: []
            };
            let position = 0;
            for (let i in reservas) {
                if (reservas.length > 0 && reservas[i].aleatorio === 'true'
                 && reservas[i].reservado === '') {
                    body.reserva[position] = {
                        typeDoc: tipoDocumento,
                        numDoc: dni,
                        material: reservas[i].id,
                        quantity: '1'
                    };
                    position++;
                }else if(reservas.length > 0 && reservas[i].aleatorio === 'false'
                && reservas[i].reservado === '') {
                    body.reserva[position] = {
                        typeDoc: tipoDocumento,
                        numDoc: dni,
                        material: reservas[i].id,
                        quantity: '1',
                        serialnumber: reservas[i].serialnumber
                    };
                    position++;
                }
            }
            let _search = {
                body: body,
                urlParams: ['goodsReservation'],
                queryParams : {}
            };

            return vm.httpPostFull(vm.genericConstant.stockData, _search, 'reservePopupComp')
                .then(
                (response) => {
                    return response.data.respuesta;
                },
                (error) => {
                    vm.hideReservePopup();
                    vm.informationCenter.addInformationMessage(2, 'Error', 'No se ha podido realizar la reserva');
                    throw error.data;
                });
        }

        /**
         * @ngdoc method
         * @name reservePopup.Services.ReservePopupSrv#showReservePopup
         * @methodOf reservePopup.Services.ReservePopupSrv
         * @param {Array} terminals terminales a mostrar
         * Muestra el popup de reserva
         */
        showReservePopup(terminals): void {
            let vm = this;

            vm.refreshShoppingCart = false;
            vm.reservePopupSrvVars = <reservePopupSrv.Models.IReservePopupVarsModel>{
                size: '',
                visible: true,
                closeEnabled: true,
                terminals: terminals
            };
        }

        /**
         * @ngdoc method
         * @name reservePopup.Services.ReservePopupSrv#showReservePopup
         * @methodOf reservePopup.Services.ReservePopupSrv
         * @param {Array} terminals terminales a mostrar
         * Muestra el popup de reserva para contratacion
         */
        showReservePopupContratacion(terminals): void {
            let vm = this;

            vm.refreshShoppingCart = false;
            vm.reservePopupSrvVars = <reservePopupSrv.Models.IReservePopupVarsModel>{
                size: '',
                visible: true,
                closeEnabled: true,
                terminals: terminals,
                isContratacion: true
            };
            
        }

        /**
         * @ngdoc method
         * @name reservePopup.Services.ReservePopupSrv#hideReservePopup
         * @methodOf reservePopup.Services.ReservePopupSrv
         * @param {Array} terminals terminales a mostrar
         * Oculta el popup de reserva
         */
        hideReservePopup(): void {
            let vm = this;

            vm.reservePopupSrvVars = <reservePopupSrv.Models.IReservePopupVarsModel>{
                size: '',
                visible: false,
                closeEnabled: true
            };
        }

        //////////////////////////////////////// SET ////////////////////////////////////////

        /**
         * @ngdoc method
         * @name reservePopup.Services.ReservePopupSrv#setbuttonOneText
         * @methodOf reservePopup.Services.ReservePopupSrv
         * @param {string} value tamaño
         * Establece tamaño para el popup
         */
        setbuttonOneText(value: string) {
            let vm = this;
            if (vm.reservePopupSrvVars) {
                vm.reservePopupSrvVars.size = value;
            }
        }

        /**
         * @ngdoc method
         * @name reservePopup.Services.ReservePopupSrv#setVisible
         * @methodOf reservePopup.Services.ReservePopupSrv
         * @param {string} value muestra u oculta el ppoup
         * @description
         * Establece si se visualizara el popup
         */
        setVisible(value: boolean) {
            let vm = this;
            if (vm.reservePopupSrvVars) {
                vm.reservePopupSrvVars.visible = value;
            }
        }

        /**
         * @ngdoc method
         * @name reservePopup.Services.ReservePopupSrv#setCloseEnabled
         * @methodOf reservePopup.Services.ReservePopupSrv
         * @param {boolean} value para controlar el estado del botón (habilitado o deshabilitado)
         * @description
         * Establece si el botón de cerrar estará habilitado o deshabilitado.
         */
        setCloseEnabled(value: boolean) {
            let vm = this;
            if (vm.reservePopupSrvVars) {
                vm.reservePopupSrvVars.closeEnabled = value;
            }
        }

        //////////////////////////////////////// GET ////////////////////////////////////////

        /**
         * @ngdoc method
         * @name reservePopup.Services.ReservePopupSrv#getSize
         * @methodOf reservePopup.Services.ReservePopupSrv
         * @returns {string} Devuelve el tamaño del popup
         */
        getSize(): string {
            let vm = this;
            return vm.reservePopupSrvVars ? vm.reservePopupSrvVars.size : '';
        }

        /**
         * @ngdoc method
         * @name reservePopup.Services.ReservePopupSrv#getVisible
         * @methodOf reservePopup.Services.ReservePopupSrv
         * @returns {boolean} Devuelve si se visualiza el popup
         */
        getVisible(): boolean {
            let vm = this;
            return vm.reservePopupSrvVars ? vm.reservePopupSrvVars.visible : undefined;
        }

        /**
         * @ngdoc method
         * @name reservePopup.Services.ReservePopupSrv#getCloseEnabled
         * @methodOf reservePopup.Services.ReservePopupSrv
         * @returns {boolean} Devuelve si se habilita el botón cerrar.
         */
        getCloseEnabled(): boolean {
            let vm = this;
            return vm.reservePopupSrvVars ? vm.reservePopupSrvVars.closeEnabled : undefined;
        }
    }
}
