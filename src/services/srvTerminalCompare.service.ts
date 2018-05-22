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
            vm.$scope = $injector.get('$rootScope');
        }

        // DEVICE

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
         * @name OFC.Services:SrvTerminalCompare#selectDevice
         * @param device terminal
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Determina si el terminal se debe añadir o eliminar del multiselección
         * @return {boolean} Retorna verdadero si se ha insertado el terminal en multiselección,
         * retorna falso en caso que el terminal se haya eliminado 
         */
        selectDevice(device): boolean {
            let vm = this;
            let deviceForSession = vm.selectDeviceProperties(device);

            // Si el terminal seleccinado ya esta en multiselección, se remueve.            
            if (vm.isInDeviceContainer(deviceForSession)) {
                vm.deleteTerminal(deviceForSession);
                return false;
            } else { // Si el terminal no existe en multiselección 
                // Si ya existen 3 terminales seleccinados
                if (vm.deviceContainerVolume() === 3) {
                    vm.$scope.$broadcast('cantSelectTerminal');
                } else if (vm.deviceContainerVolume() <= 2) {
                    // Si existen menos de 2 terminales seleccinados
                    vm.insertInDeviceContainer(deviceForSession);
                    return true;
                }
            }
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#selectDeviceProperties
         * @param objTerminal terminal
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Selecciona las propiedades del terminal para el session storage
         */
        selectDeviceProperties(device): any {
            let vm = this;
            // Se crean las caracteristicas necesarias del terminal, para el session storage
            device.terminalId = (vm.deviceContainer.length + 1);
            device.brand = device.litTitle;
            device.description = device.litSubTitle;
            device.isModified = false;
            device.action = 'New';

            // Buscamos Esim en dispositivo
            if (device.icon) {
                for (let i = 0; i < device.icon.length; i++) {
                    if (device.icon[i].description === 'eSIM') {
                        device.eSim = true;
                        break;
                    }
                }
            }

            // Se seleccionan las propiedades para session
            let deviceForSession = _.pick(device, ['terminalId', 'siebelId', 'name',
                'description', 'litSubTitle', 'brand', 'priceType', 'insuranceSiebelId', 'srcImage',
                'insuranceSelected', 'stock', 'isModified', 'itemPrice', 'id', 'IMEI', 'taxRate', 'taxRateName', 'tipoPago', 'eSim', 'cpDescription', 'cpSiebel', 'cpDuration']);
            if (device.renewRates !== undefined && device.renewRates) {
                deviceForSession = _.pick(device, ['terminalId', 'siebelId', 'name',
                    'description', 'litSubTitle', 'brand', 'priceType', 'insuranceSiebelId', 'srcImage',
                    'insuranceSelected', 'stock', 'isModified', 'itemPrice', 'id', 'IMEI', 'renewRates', 'eSim', 'cpDescription', 'cpSiebel', 'cpDuration']);
            }

            return deviceForSession;
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#replaceDevice
         * @param device terminal
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description 
         * Reemplaza un terminal por otro
         */
        replaceDevice(device) {
            let vm = this;
            let deviceForSession = vm.selectDeviceProperties(device);
            // Indice del array del terminal a modificar
            let index: number = _.findIndex(vm.deviceContainer, function (currentDevice) {
                return currentDevice.isModified === true;
            });
            // Se reemplaza el terminal en el multiselección
            vm.deviceContainer[index] = deviceForSession;
            vm.putDevicesInSessionStorage();
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
            let vm = this;
            this.deviceContainer.push(device);
            vm.putDevicesInSessionStorage();
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#deleteTerminal
         * @param objTerminal terminal
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Remueve un terminal del contenedor de terminales
         */
        deleteTerminal(device) {
            let vm = this;
            _.remove(vm.deviceContainer, function (currentDevice) {
                return currentDevice.siebelId === device.siebelId;
            });
            vm.resetDevicesId();
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
         * @name OFC.Services:SrvTerminalCompare#emptyDeviceContainer
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Vacía contenedor de terminales
         */
        emptyDeviceContainer() {
            let vm = this;
            this.deviceContainer = [];
            vm.putDevicesInSessionStorage();
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#resetDevicesId
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Resetea los terminalId del contenedor de terminales
         */
        resetDevicesId() {
            let vm = this;
            vm.deviceContainer.forEach((device, index) => {
                vm.deviceContainer[index].terminalId = index + 1;
            });
            vm.putDevicesInSessionStorage();
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#changeVariant
         * @param {Object} variant variante del terminal
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Establece la variante de terminal seleccionada
         */
        changeVariant(variant) {
            let vm = this;
            let deviceForSession = vm.selectDeviceProperties(variant);
            vm.deviceContainer.forEach((currentDevice, index) => {
                if (currentDevice.name === deviceForSession.name &&
                    currentDevice.siebelId !== deviceForSession.siebelId) {
                    vm.deviceContainer[index] = deviceForSession;
                }
            });
            vm.putDevicesInSessionStorage();
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
                if (currentDevice.siebelId === device.siebelId) {
                    vm.deviceContainer[index].insuranceSelected = isChecked;
                }
            });
            vm.putDevicesInSessionStorage();
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
            let insuranceSelected = _.result(_.find(vm.deviceContainer, function (currentDevice) {
                return currentDevice.siebelId === device.siebelId;
            }), 'insuranceSelected');
            if (insuranceSelected) {
                return insuranceSelected;
            } else {
                return false;
            }
        }

        // RATES

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#selectRate
         * @param rate tarifa
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Determina si la tarifa se debe añadir o eliminar del multiselección
         * @return {boolean} Retorna verdadero si se ha insertado la tarifa en multiselección,
         * retorna falso en caso que la tarifa se haya eliminado 
         */
        selectRate(rate): boolean {
            let vm = this;
            let rateForSession = vm.selectRateProperties(rate);

            // Si la tarifa seleccinado ya esta en multiselección, se remueve.            
            if (vm.isInRateContainer(rateForSession)) {
                vm.deleteRate(rateForSession);
                return false;
            } else { // Si la tarifa no existe en multiselección 
                // Si ya existen 3 tarifas seleccinadas
                if (vm.rateContainerVolume() === 3) {
                    vm.$scope.$broadcast('cantSelectRate');
                } else if (vm.rateContainerVolume() <= 2) {
                    // Si existen menos de 2 tarifas seleccinadas
                    vm.insertInRateContainer(rateForSession);
                    return true;
                }
            }
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#selectRateProperties
         * @param rate tarifa
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Selecciona las propiedades de la tarifa para el session storage
         */
        selectRateProperties(rate) {
            let vm = this;
            // Se crean las caracteristicas necesarias de la tarifa, para el session storage
            
            rate.rateId = (vm.rateContainer.length + 1);
            rate.name = rate.rateSubName;
            rate.siebelId = rate.siebelId;
            rate.taxFreePrice = rate.ratePrice;
            rate.taxIncludedPrice = rate.ratePriceTaxIncluded;
            rate.description = rate.rateDescription;
            // Se seleccionan las propiedades para session

            let rateForSession = _.pick(rate, ['rateId', 'otherSvaInfoList', 'siebelId',
                'name', 'description', 'taxFreePrice', 'taxIncludedPrice', 'family', 'groupName',
                'typeService', 'svaInfoList', 'allSVAChildrenList', 'pack',
                'taxRate', 'taxRateName',
                'ratePriceTaxIncludedPromotional', 'ratePricePromotional', 'ospTecnology', 'type' , 'associatedLine']);

            return rateForSession;
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#generateSelectedSVAList
         * @param rate tarifa
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Genera las lista de SVA's seleccionado para cada tarifa en multiselección
         */
        generateSelectedSVAList() {
            let vm = this;
            let svaList = [];
            vm.rateContainer.forEach(currentRate => {
                // Se todos los arrays de SVA's 
                svaList = currentRate.svaInfoList.concat(currentRate.otherSvaInfoList).concat(currentRate.allSVAChildrenList);
                // Se remueven los sva que no estan chequeados
                _.remove(svaList, function (currentSVA) {
                    return !currentSVA.isSelected;
                });
                // Se asigna el array de SVA's seleccionados a la tarifa
                currentRate.selectedSvaList = svaList;
            });
        }

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
         * @name OFC.Services:SrvTerminalCompare#setRateContainer
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Establece el contenedor de tarifas
         */
        setRateContainer(rates) {
            let vm = this;
            vm.rateContainer = rates;
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
            let vm = this;

            vm.rateContainer.push(rate);
            vm.putRatesInSessionStorage();
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#deleteRateByLine
         * @param {ratesParent.Models.Rate} rate tarifa
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Remueve una tarifa del contenedor de tarifas teniendo en cuenta la línea
         */
        deleteRateByLine(rate, line) {
            let vm = this;
            _.remove(vm.rateContainer, function (currentRate) {
                return currentRate.siebelId === rate.siebelId && currentRate.line === rate.line;
            });
            vm.resetRatesId();
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
            vm.resetRatesId();
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
         * @name OFC.Services:SrvTerminalCompare#isConvergentRateContainer
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Comprueba si existe una tarifa convergente dentro del contenedor de 
         * tarifas 
         */
        isConvergentRateContainer() {
            let vm = this;
            return _.some(vm.rateContainer, function (currentRate) {
                return (currentRate.groupName === 'Convergente' && currentRate.typeService === 'movil_fijo');
            });
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#emptyRateContainer
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Vacía contenedor de tarifas
         */
        emptyRateContainer() {
            let vm = this;
            this.rateContainer = [];
            vm.putRatesInSessionStorage();
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#resetRatesId
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Resetea los rateId del contenedor de tarifas
         */
        resetRatesId() {
            let vm = this;
            vm.rateContainer.forEach((rate, index) => {
                vm.rateContainer[index].rateId = index + 1;
            });
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#selectSVA
         * @methodOf OFC.Services:SrvTerminalCompare
         * @param {ratesParent.Models.Rate} rate tarifa
         * @description
         * Reemplaza la lista de SVA's
         */
        selectSVA(rate) {
            let vm = this;
            vm.rateContainer.forEach(currentRate => {
                if (currentRate.siebelId === rate.siebelId) {
                    currentRate.svaInfoList = rate.svaInfoList;
                }
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
            if (commercialData !== null) {
                for (let i in commercialData) {
                    if (commercialData.length > 0 && commercialData[i].ospIsSelected) {
                        commercialData[i].terminals = vm.deviceContainer;
                        sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
                    }
                }
            }
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
            if (commercialData !== null) {
                for (let i in commercialData) {
                    if (commercialData.length > 0 && commercialData[i].ospIsSelected) {
                        commercialData[i].rates = vm.rateContainer;
                        sessionStorage.setItem('commercialData', JSON.stringify(commercialData));
                    }
                }
            }
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
            if (commercialData !== null) {
                for (let i in commercialData) {
                    if (commercialData.length > 0 && commercialData[i].ospIsSelected) {
                        if (commercialData[i].terminals !== null) {
                            vm.deviceContainer = commercialData[i].terminals;
                        }
                        if (commercialData[i].rates && commercialData[i].rates.length > 0) {
                            vm.rateContainer = commercialData[i].rates;
                        }
                    }
                }
                vm.resetDevicesId();
            }
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#setPayType
         * @methodOf OFC.Services:SrvTerminalCompare
         * @param idSiebel ID de Siebel
         * @param {string} payType tipo de pago
         * @description
         * Establece el tipo de pago para un terminal
         */
        setPayType(idSiebel, payType) {
            let vm = this;
            vm.deviceContainer.forEach(terminal => {
                if (terminal.siebelId === idSiebel) {
                    terminal.tipoPago = payType;
                }
            });
            vm.putDevicesInSessionStorage();
        }

        /**
         * @ngdoc method
         * @name OFC.Services:SrvTerminalCompare#getRate
         * @param {string} rateSiebelId
         * @methodOf OFC.Services:SrvTerminalCompare
         * @description
         * Se retorna la tarifa de multiselección
         */
        getRate(rateSiebelId: string) {
            let vm = this;
            let rate;
            vm.getcommercialData();
            vm.rateContainer.forEach(currentRate => {
                if (currentRate.siebelId === rateSiebelId) {
                    rate = currentRate;
                }
            });
            return rate;
        }

    }
    // Registration
    angular.module('srvTerminalCompareModule', [])
        .service('srvTerminalCompare', SrvTerminalCompare);

}
