module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OFC.Services:SrvTerminalCompare
     * @description
     * Servicio del comparador de terminales
     */
    export class SrvTerminalCompare extends OrangeFeSARQ.Services.ParentService {

        static $inject = ['$injector'];
        public $scope;
        public $q;
        public deviceContainer = [];
        public rateContainer = [];

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#constructor
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf OFC.Services:SrvTerminalCompare
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
         * @name OFC.Services:SrvTerminalCompare#setInjections
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Inyecta las dependencias
         */
        setInjections($injector) {
            let vm = this;
        }

        //DEVICE

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#deviceContainerVolume
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Retorna la cantidad de elementos en el contenedor de terminales
         */
        deviceContainerVolume(): number {
            let vm = this;
            return vm.deviceContainer.length;
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#insertInDeviceContainer
         * @param objTerminal terminal
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Inserta un terminal en el contenedor de terminales
         */
        insertInDeviceContainer(device) {
            this.deviceContainer.push(device);
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#deleteTerminal
         * @param objTerminal terminal
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Remueve un terminal del contenedor de terminales
         */
        deleteTerminal (device) {
            let vm = this;
            _.remove(vm.deviceContainer, function (currentDevice) {
                return currentDevice.siebelId === device.siebelId;
              });
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#getDeviceContainer
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Retorna el contenedor de terminales
         */
        getDeviceContainer() {
            let vm = this;
            return vm.deviceContainer;
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#isInDeviceContainer
         * @param nameItem nombre del terminal
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Comprueba si un terminal se encuentra dentro del contenedor de
         * terminales
         */
        isInDeviceContainer(device) {
            let vm = this;
            return _.some(vm.deviceContainer, function (currentDevice) {
                return currentDevice.siebelId === device.siebelId;
            });
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#setInsuranceCheck
         * @param {boolean} isChecked estado del check del seguro del terminal
         * @param device terminal
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Establece si el terminal tiene el seguro marcado
         */
        setInsuranceCheck(isChecked: boolean, device) {
            let vm = this;
            vm.deviceContainer.forEach((currentDevice, index) => {
                if(currentDevice.siebelId === device.siebelId) {
                    vm.deviceContainer[index].insuranceSelected = isChecked;
                }
            });
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#isInsuranceChecked
         * @param device terminal
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Comprueba si un terminal tiene el seguro marcado
         */
        isInsuranceChecked(device) {
            let vm = this;
            let insuranceSelected = _.result(_.find(vm.deviceContainer, function(currentDevice) {
                    return currentDevice.siebelId === device.siebelId;
                }), 'insuranceSelected');
            if(insuranceSelected) {
                return insuranceSelected;
            } else {
                return false;
            }
        }

        // RATES

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#getRateContainer
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Retorna el contenedor de tarifas
         */
        getRateContainer() {
            let vm = this;
            return vm.rateContainer;
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#rateContainerVolume
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Retorna la cantidad de elementos en el contenedor de tarifas
         */
        rateContainerVolume(): number {
            let vm = this;
            return vm.rateContainer.length;
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#insertInRateContainer
         * @param {ratesParent.Models.Rate} rate tarifa
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Inserta una tarifa en el contenedor de tarifas
         */
        insertInRateContainer(rate) {
            this.rateContainer.push(rate);
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#deleteRate
         * @param {ratesParent.Models.Rate} rate tarifa
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Remueve una tarifa del contenedor de tarifas
         */
        deleteRate(rate) {
            let vm = this;
            _.remove(vm.rateContainer, function (currentRate) {
                return currentRate.siebelId === rate.siebelId;
              });
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#isInRateContainer
         * @param {ratesParent.Models.Rate} rate tarifa
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Comprueba si una tarifa se encuentra dentro del contenedor de
         * tarifas
         */
        isInRateContainer(rate) {
            let vm = this;
            return _.some(vm.rateContainer, function (currentRate) {
                return currentRate.siebelId === rate.siebelId;
            });
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#isInRateContainer
         * @param {ratesParent.Models.Rate} rate tarifa
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Coloca los terminales seleccionados en el session storage
         */
        putDevicesInSessionStorage() {
            let vm = this;
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            commercialData[0].terminals = vm.deviceContainer;
            sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#isInRateContainer
         * @param {ratesParent.Models.Rate} rate tarifa
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Coloca las tarifas seleccionadas en el session storage
         */
        putRatesInSessionStorage() {
            let vm = this;
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            commercialData[0].rates = vm.rateContainer;
            sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#getcommercialData
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Obtiene el Commercial Data
         */
        getcommercialData() {
            let vm = this;
            let commercialData = [];
            // Se inicializan los contenedores
            vm.rateContainer = [];
            vm.deviceContainer = [];
            // Se obtiene el commercialData del session storage
            commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            // Se insertan en el comparador los terminales acto comercial
            commercialData[0].terminals.forEach(device => {
                vm.insertInDeviceContainer(device);
            });
            // Se insertan en el comparador las tarifas acto comercial
            commercialData[0].rates.forEach(rate => {
                vm.insertInRateContainer(rate);
            });
        }

    }
    // Registration
    angular.module('srvTerminalCompareModule', [])
        .service('srvTerminalCompare', SrvTerminalCompare);

}