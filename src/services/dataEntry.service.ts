module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OFC.Services.DataEntrySrv
     * @description
     * Servicio que devuelve un objeto con los datos necesarios para Data Entry.
     */
    export class DataEntrySrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public storeLocatorURL: string;
        public primarioOferta = 'primario oferta';

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
        }

        /**
         * @ngdoc service
         * @name @name OFC.Services.DataEntry
         *  @description
         * Metodo para inserción de datos en el storage indicado por parametros
         * @param {String} datoCC Parametro en el que insertaremos el datoCc del campo deseado en DE
         * @param {String} datoDe Parametro en el que insertaremos el datoDe del campo para DE
         * @param {String} contenido Dato extraido del sessionStorage para DE
         * @param {String} contenedor Dato necesario para el DE
         * @param {Array} storage Array de objetos donde queremos añadir el objeto
         */

        insertarCampo(datoCC, datoDE, contenido, contenedor, storage: Array<Object>) {
            let vm = this;
            // Creamos el objeto con los parametros indicados
            let obj = {
                DATO_CC: datoCC,
                DATO_DE: datoDE,
                CONTENIDO: contenido,
                CONTENEDOR: contenedor
            };
            // Dentro del storage introducido por parametro inserto el obj
            storage.push(obj);
        }

        /**
         * @ngdoc method
         * @name OFC.Services.DataEntry
         * @description
         * Comprueba si la cuenta es de tipo 'OTROS'
         */
        isOtherBank() {
            let vm = this;

            let clientData = JSON.parse(sessionStorage.getItem('clientData'));

            let other = {
                bic: '2013',
                domiciliation: '0000',
                accountHolder: '16',
                iban: '1234567890'
            };

            if (clientData && clientData.billingInfo && clientData.billingInfo.bankName) {
                let accData = clientData.billingInfo;

                return (accData.bic === other.bic && accData.domiciliation === other.domiciliation
                    && accData.accountHolder === other.accountHolder && accData.iban === other.iban);
            } else {
                return false;
            }
        }
        getAccount(bic, domiciliation, accountHolder, iban): any{
            return {
                bic: bic,
                domiciliation: domiciliation,
                accountHolder: accountHolder,
                iban: iban
            };
        }

        /**
         * @ngdoc method
         * @name OFC.Services.DataEntry
         * @description
         * Comprueba si la cuenta bancaria corresponde a un dummy
         */
        isValidAccount() {
            let vm = this;

            let clientData = JSON.parse(sessionStorage.getItem('clientData'));

            let info = vm.getAccount('', '', '', '');

            if (clientData && clientData.billingInfo) {
                if (clientData.billingInfo.bankName) {
                    switch (clientData.billingInfo.bankName) {
                        case 'La Caixa':
                            info = vm.getAccount('2100', '0000', '66', '1234567890');
                            break;
                        case 'Santander':
                            info = vm.getAccount('0049', '0000', '06', '1234567890');
                            break;
                        case 'BBVA':
                            info = vm.getAccount('0182', '0000', '96', '1234567890');
                            break;
                        case 'Bankia':
                            info = vm.getAccount('2038', '0000', '76', '1234567890');
                            break;
                        case 'Otros':
                            info = vm.getAccount('2013', '0000', '16', '1234567890');
                            break;
                        default:
                            break;
                    }

                    if (clientData.billingInfo.bic === info.bic && clientData.billingInfo.domiciliation === info.domiciliation
                        && clientData.billingInfo.accountHolder === info.accountHolder && clientData.billingInfo.iban === info.iban) {
                        return false;
                    } else {
                        return true;
                    }
                } else { // No hay bankName, es una cuenta propia del cliente
                    return true;
                }
            } else {
                return false;
            }
        }


        /**
         * @ngdoc service
         * @name @name OFC.Services.DataEntry
         *  @description
         * Método para mapear la información a partir del archivo de mapeos y el sessionStorage
         */
        getData(mapeosDE, sessionClientData: any, sessionLoginData: any, sessionPrescoring: any, sessionShoppingCart: any) {
            let vm = this;
            let responseObj = [];
            // Recorro el archivo de mapeos (la parte de datos de cliente) para aplicar la lógica correspondiente
            // CLIENT DATA
            if (sessionClientData) {
                this.loopMapFilesClientLogicApply(mapeosDE, sessionClientData, vm, responseObj);
            }


            // LOGIN DATA
            if (sessionLoginData) {
                this.setLoginData(mapeosDE, sessionLoginData, vm, responseObj);
            }


            // PRESCORING DATA
            if (sessionPrescoring) {
                this.setPrescoringData(mapeosDE, sessionPrescoring, vm, responseObj);
            }


            // Recorro el archivo de mapeos (la parte de datos shoppingCart) para aplicar la lógica correspondiente
            // SHOPPINGCART DATA
            if (sessionShoppingCart) {
                this.setShoppingData(mapeosDE, sessionShoppingCart, vm, responseObj, sessionClientData);
            }

            return responseObj;
        }

        private setShoppingData(mapeosDE: any, sessionShoppingCart: any, vm: this, responseObj: any[], sessionClientData: any) {
            _.each(mapeosDE.shoppingCart, (valueSC) => {
                // Almaceno los valores en variables para no perderlos cuando cambie de ámbito
                let dCC = valueSC.datoCc;
                let dDE = valueSC.datoDe;
                let cont = valueSC.sessionOrigin;
                let contene = valueSC.contenedor;
                let defaultData = valueSC.default;
                let valueDep;
                let lastObj;
                let typePrice;
                let loginRol = JSON.parse(sessionStorage.getItem('loginData')).rol;
                let flagDep = false;
                let flagEquiv = false;
                // Recorro el array de dependencias dentro del archivo de mapeos
                ({ valueDep, lastObj } = this.loopValueSCDependecies(valueSC, valueDep, sessionShoppingCart, cont, lastObj, vm, dCC, dDE, defaultData, contene, responseObj));
                flagDep = this.checkFlagDep(valueDep, flagDep);
                // Recorro el array de equivalencias dentro del archivo de mapeos
                flagEquiv = this.loopEquivalFlagEquiv(valueSC, sessionShoppingCart, cont, vm, dCC, dDE, defaultData, contene, responseObj, flagEquiv);
                // Si no hay ni dependencias ni equivalencias creo un objeto con el dato extraido directamente de session
                if (flagDep === false && flagEquiv === false) {
                    let primaryTerminalTypePrice = '';
                    let secundaryTerminalTypePrice = '';
                    let agrupation = '';
                    let numOferta = 1;
                    let selectedOptions: any = _.filter(sessionShoppingCart.cartItem, { 'ospSelected': true });
                    let auxPrimary = 'SC';
                    let auxSecundary = 'SecSC';
                    // Comprobamos que hay cartItem con la propiedad ospSelected a true, y cuántos hay
                    ({ agrupation, primaryTerminalTypePrice, numOferta } = this.checkCartItemOspSelected(selectedOptions, cont, agrupation, sessionClientData, primaryTerminalTypePrice, vm, dCC, numOferta, dDE, auxPrimary, contene, responseObj, secundaryTerminalTypePrice, typePrice, auxSecundary));
                    // Número de líneas nacionales
                    if (loginRol === 'PDV' && cont === 'nLineas') {
                        vm.insertarCampo(dCC, dDE, selectedOptions.length, contene, responseObj);
                    }
                }
            });
        }

        private checkCartItemOspSelected(selectedOptions: any, cont: any, agrupation: string, sessionClientData: any, primaryTerminalTypePrice: string, vm: this, dCC: any, numOferta: number, dDE: any, auxPrimary: string, contene: any, responseObj: any[], secundaryTerminalTypePrice: string, typePrice: any, auxSecundary: string) {
            if (selectedOptions && selectedOptions.length > 0 && cont !== 'nLineas') {
                ({ agrupation, primaryTerminalTypePrice, numOferta } = this.loopSelectedOptions(selectedOptions, agrupation, sessionClientData, primaryTerminalTypePrice, cont, vm, dCC, numOferta, dDE, auxPrimary, contene, responseObj, secundaryTerminalTypePrice, typePrice, auxSecundary));
            }
            return { agrupation, primaryTerminalTypePrice, numOferta };
        }

        private loopSelectedOptions(selectedOptions: any, agrupation: string, sessionClientData: any, primaryTerminalTypePrice: string, cont: any, vm: this, dCC: any, numOferta: number, dDE: any, auxPrimary: string, contene: any, responseObj: any[], secundaryTerminalTypePrice: string, typePrice: any, auxSecundary: string) {
            for (let i = 0; i < selectedOptions.length; i++) {
                let multisim: any = this.getMultisim(selectedOptions, i);
                let terminals: any = this.getTerminals(selectedOptions, i);
                let primaryTerminal: any = this.getTerminalPrimary(terminals);
                let secundaryTerminal: any = this.getTerminalSecondary(terminals);
                let insurances: any = this.getInsurances(selectedOptions, i);
                let insurancePrimaryTerminal: any = this.getInsurancePrimaryTerminal(insurances);
                let insuranceSecundaryTerminal: any = this.getInsuranceSecundaryTerminal(insurances);
                let rate: any = this.getRate(selectedOptions, i);
                agrupation = this.getRateAgrupation(rate, selectedOptions, i, sessionClientData, agrupation);
                // Tipo precio 
                primaryTerminalTypePrice = this.insertarCamposByType(cont, primaryTerminalTypePrice, primaryTerminal, rate, vm, dCC, numOferta, dDE, auxPrimary, contene, responseObj, secundaryTerminalTypePrice, typePrice, secundaryTerminal, auxSecundary, insurancePrimaryTerminal, insuranceSecundaryTerminal, agrupation, multisim);
                numOferta++;
            }
            return { agrupation, primaryTerminalTypePrice, numOferta };
        }

        private getRate(selectedOptions: any, i: number): any {
            return _.find(selectedOptions[i].cartItem, (data: any) => {
                if (data.product && data.product.productRelationship) {
                    return _.find(data.product.productRelationship, { 'type': 'tarifa' });
                }
            });
        }

        private getInsuranceSecundaryTerminal(insurances: any): any {
            return _.find(insurances, (insurance: any) => {
                if (insurance.product && insurance.product.characteristic) {
                    let terminalType = _.find(insurance.product.characteristic, (char: any) => {
                        return char.name === 'CIMATerminalType';
                    });
                    if (terminalType) {
                        return terminalType.value === 'Secundary';
                    }
                }
            });
        }

        private getInsurancePrimaryTerminal(insurances: any): any {
            return _.find(insurances, (insurance: any) => {
                if (insurance.product && insurance.product.characteristic) {
                    let terminalType = _.find(insurance.product.characteristic, (char: any) => {
                        return char.name === 'CIMATerminalType';
                    });
                    if (terminalType) {
                        return terminalType.value === 'Primary';
                    }
                }
            });
        }

        private getInsurances(selectedOptions: any, i: number): any {
            return _.filter(selectedOptions[i].cartItem, (data: any) => {
                if (data.product && data.product.productRelationship && data.ospSelected && data.ospSelected === true) {
                    return _.find(data.product.productRelationship, { 'type': 'seguro' });
                }
            });
        }

        private getTerminalSecondary(terminals: any): any {
            return _.find(terminals, (terminal: any) => {
                if (terminal.product && terminal.product.characteristic) {
                    let terminalType = _.find(terminal.product.characteristic, (char: any) => {
                        return char.name === 'CIMATerminalType';
                    });
                    if (terminalType) {
                        return terminalType.value === 'Secundary';
                    }
                }
            });
        }

        private getTerminalPrimary(terminals: any): any {
            return _.find(terminals, (terminal: any) => {
                if (terminal.product && terminal.product.productRelationship) {
                    let terminalType = _.find(terminal.product.characteristic, (char: any) => {
                        return char.name === 'CIMATerminalType';
                    });
                    if (terminalType) {
                        return terminalType.value === 'Primary';
                    }
                }
            });
        }

        private getTerminals(selectedOptions: any, i: number): any {
            return _.filter(selectedOptions[i].cartItem, (data: any) => {
                if (data.product && data.product.productRelationship) {
                    return _.find(data.product.productRelationship, { 'type': 'terminal' });
                }
            });
        }

        private getMultisim(selectedOptions: any, i: number): any {
            return _.find(selectedOptions[i].cartItem, (data: any) => {
                if (data.product && data.product.name && data.product.name.toUpperCase() === 'MULTISIM'
                    && data.action && data.action.toUpperCase() === 'NEW') {
                    return data;
                }
            });
        }

        private loopEquivalFlagEquiv(valueSC: any, sessionShoppingCart: any, cont: any, vm: this, dCC: any, dDE: any, defaultData: any, contene: any, responseObj: any[], flagEquiv: boolean) {
            _.each(valueSC.equivalencias, (value) => {
                // Si existe valueDep creo un objeto que matcheo posteriormente con session
                if (value.origen === sessionShoppingCart[cont]) {
                    vm.insertarCampo(dCC, dDE, value.value ? value.value : defaultData, contene, responseObj);
                }
                flagEquiv = true;
            });
            return flagEquiv;
        }

        private checkFlagDep(valueDep: any, flagDep: boolean) {
            if (valueDep !== undefined) {
                flagDep = true;
            }
            return flagDep;
        }

        private insertarCamposByType(cont: any, primaryTerminalTypePrice: string, primaryTerminal: any, rate: any, vm: this, dCC: any, numOferta: number, dDE: any, auxPrimary: string, contene: any, responseObj: any[], secundaryTerminalTypePrice: string, typePrice: any, secundaryTerminal: any, auxSecundary: string, insurancePrimaryTerminal: any, insuranceSecundaryTerminal: any, agrupation: string, multisim: any) {
            if (cont === 'typePrice') {
                // Terminal primario
                primaryTerminalTypePrice = this.setPrimaryTerminalTypePrice(primaryTerminal, rate, primaryTerminalTypePrice);
                vm.insertarCampo(dCC + ' ' + this.primarioOferta + numOferta, dDE + auxPrimary + numOferta, primaryTerminalTypePrice, contene, responseObj);
                // Terminal secundario
                ({ secundaryTerminalTypePrice, typePrice } = this.setSecundaryTerminalTypePrice(secundaryTerminal, rate, secundaryTerminalTypePrice, typePrice));
                vm.insertarCampo(dCC + ' ' + 'secundario' + ' ' + 'oferta' + numOferta, dDE + auxSecundary + numOferta, secundaryTerminalTypePrice, contene, responseObj);
            }
            else if (cont === 'seguro') {
                // Terminal primario
                this.insertarCampoSeguro(insurancePrimaryTerminal, vm, dCC, numOferta, dDE, contene, responseObj, insuranceSecundaryTerminal);
            }
            else if (cont === 'agrupacion') {
                if (rate) {
                    vm.insertarCampo(dCC + numOferta, dDE + numOferta, agrupation, contene, responseObj);
                }
            }
            else if (cont === 'nombreTarifa') {
                if (rate) {
                    vm.insertarCampo(dCC + numOferta, dDE + numOferta, rate.product.name, contene, responseObj);
                }
            }
            else if (cont === 'seleccion') {
                if (rate) {
                    vm.insertarCampo(dCC + numOferta, dDE + numOferta, '', contene, responseObj);
                }
            }
            else if (cont === 'multisim') {
                this.insertarCampoMultisim(multisim, vm, dCC, dDE, contene, responseObj);
            }
            else if (cont === 'secundaryTerm' && secundaryTerminal !== undefined) {
                vm.insertarCampo(dCC + ' ' + 'Secundario', dDE + 'Sec' + numOferta, 'si', contene, responseObj);
            }
            else {
                if (primaryTerminal) {
                    vm.insertarCampo(dCC + ' ' + this.primarioOferta + numOferta, dDE + auxPrimary + numOferta, primaryTerminal.product[cont], contene, responseObj);
                }
                if (secundaryTerminal) {
                    vm.insertarCampo(dCC + ' ' + 'Secundario oferta' + numOferta, dDE + auxSecundary + numOferta, secundaryTerminal.product[cont], contene, responseObj);
                }
            }
            return primaryTerminalTypePrice;
        }

        private insertarCampoMultisim(multisim: any, vm: this, dCC: any, dDE: any, contene: any, responseObj: any[]) {
            if (multisim) {
                vm.insertarCampo(dCC, dDE, 'si', contene, responseObj);
            }
        }

        private insertarCampoSeguro(insurancePrimaryTerminal: any, vm: this, dCC: any, numOferta: number, dDE: any, contene: any, responseObj: any[], insuranceSecundaryTerminal: any) {
            if (insurancePrimaryTerminal) {
                vm.insertarCampo(dCC + ' ' + this.primarioOferta + numOferta, dDE + numOferta, 'seguro móvil', contene, responseObj);
            }
            // Terminal secundario
            if (insuranceSecundaryTerminal) {
                vm.insertarCampo(dCC + ' ' + 'secundario oferta' + numOferta, dDE + numOferta, 'seguro móvil', contene, responseObj);
            }
        }

        private setSecundaryTerminalTypePrice(secundaryTerminal: any, rate: any, secundaryTerminalTypePrice: string, typePrice: any) {
            if (secundaryTerminal) {
                if (rate && (rate.id === '1-15VD39' || rate.id === '1-1C3JRF' || rate.id === '1-15PLF2')) {
                    secundaryTerminalTypePrice = 'subvencionado';
                }
                else {
                    if (secundaryTerminal.itemPrice && secundaryTerminal.itemPrice !== null
                        && secundaryTerminal.itemPrice.length > 0) {
                        _.find(secundaryTerminal.itemPrice, (dataS: any) => {
                            secundaryTerminalTypePrice = dataS.priceType;
                        });
                        if (secundaryTerminalTypePrice === 'aplazado') {
                            typePrice = 'pago aplazado';
                        }
                        else {
                            secundaryTerminalTypePrice = 'pago unico';
                        }
                    }
                }
            }
            else {
                secundaryTerminalTypePrice = 'solo sim';
            }
            return { secundaryTerminalTypePrice, typePrice };
        }

        private setPrimaryTerminalTypePrice(primaryTerminal: any, rate: any, primaryTerminalTypePrice: string) {
            if (primaryTerminal) {
                if (rate && (rate.id === '1-15VD39' || rate.id === '1-1C3JRF' || rate.id === '1-15PLF2')) {
                    primaryTerminalTypePrice = 'subvencionado';
                }
                else {
                    let priceType = '';
                    if (primaryTerminal.itemPrice && primaryTerminal.itemPrice.length > 0
                        && primaryTerminal.itemPrice[0].priceType) {
                        priceType = primaryTerminal.itemPrice[0].priceType;
                    }
                    if (priceType === 'aplazado') {
                        primaryTerminalTypePrice = 'pago aplazado';
                    }
                    else if (priceType === 'unico') {
                        primaryTerminalTypePrice = 'pago unico';
                    }
                }
            }
            else {
                primaryTerminalTypePrice = 'solo sim';
            }
            return primaryTerminalTypePrice;
        }

        private getRateAgrupation(rate: any, selectedOptions: any, i: number, sessionClientData: any, agrupation: string) {
            if (rate) {
                let comData = JSON.parse(sessionStorage.getItem('commercialData'));
                let rateComData;
                // Se busca la tarifa en los actos comerciales para obtener sus datos
                if (comData) {
                    let index = Math.floor(selectedOptions[i].id);
                    let currentCommData: any = _.find(comData, { 'id': index });
                    rateComData = _.find(currentCommData.rates, (rateData: any) => {
                        return rateData.siebelId === rate.id;
                    });
                    // Agrupacion tarifa
                    let segment = sessionClientData.ospCustomerSegment
                        && sessionClientData.ospCustomerSegment !== ''
                        ? sessionClientData.ospCustomerSegment.toLowerCase() : 'residencial';
                    agrupation = this.getAgrupation(rateComData, segment, agrupation);
                }
            }
            return agrupation;
        }

        private getAgrupation(rateComData: any, segment: any, agrupation: string) {
            if (rateComData) {
                let type = rateComData.type;
                let siebelId = rateComData.siebelId;
                if ((type === 'Convergente' || type === 'Convergente_NAC') && segment === 'residencial') {
                    agrupation = 'Love';
                }
                else if ((type === 'Convergente' || type === 'Convergente_NAC') && segment === 'empresa') {
                    agrupation = 'Love Negocio';
                }
                else if (type === 'Movil' && segment === 'residencial') {
                    agrupation = 'Go';
                }
                else if (type === 'Movil' && segment === 'empresa') {
                    agrupation = 'Go Negocio';
                }
                else if (siebelId === '1-OKX2HG') {
                    agrupation = 'Ardilla';
                }
                else{
                    agrupation = this.refactorOptions(type, siebelId, agrupation, segment);
                }
            }
            return agrupation;
        }

        private refactorOptions(type: any, siebelId: any, agrupation: string, segment: any) {
            if (type === 'Fijo' && siebelId === '1-15VD39') {
                agrupation = 'Mi Fijo';
            }
            else if (type === 'Fijo' &&
                (siebelId === '1-15PLF2' || siebelId === '1-1C3JRF')) {
                agrupation = 'Mi Fijo Pro';
            }
            else if (type === 'Fijo' && segment === 'residencial') {
                agrupation = 'IEW';
            }
            else if (type === 'Fijo' && segment === 'empresa') {
                agrupation = 'IEW Pro';
            }
            else if (type === 'Mundo') {
                agrupation = 'Mundo';
            }
            return agrupation;
        }

        private loopValueSCDependecies(valueSC: any, valueDep: any, sessionShoppingCart: any, cont: any, lastObj: any, vm: this, dCC: any, dDE: any, defaultData: any, contene: any, responseObj: any[]) {
            if (valueSC.dependencias) {
                // Recorro las dependencias
                for (let i = 0; i < valueSC.dependencias.length; i++) {
                    // Cuando es la primera iteracion coge el valor del sessionOrigin para sacarlo del session
                    if (i === 0) {
                        // Recojo en la primera iteracion el primer nivel de profundidad
                        valueDep = sessionShoppingCart[cont];
                        lastObj = valueDep;
                    }
                    else {
                        // Cuando deja de ser la primera iteración recojo los siguientes valores en los siguientes niveles
                        valueDep = lastObj[valueSC.dependencias[i - 1]];
                        lastObj = valueDep;
                    }
                }
                // Añadimos el objeto al array
                vm.insertarCampo(dCC, dDE, valueDep ? valueDep : defaultData, contene, responseObj);
            }
            return { valueDep, lastObj };
        }

        private setPrescoringData(mapeosDE: any, sessionPrescoring: any, vm: this, responseObj: any[]) {
            _.each(mapeosDE.prescoring, (valuePre) => {
                let dCC = valuePre.datoCc;
                let dDE = valuePre.datoDe;
                let cont = valuePre.sessionOrigin;
                let contene = valuePre.contenedor;
                let defaultData = valuePre.default;
                let valueDep;
                let lastObj;
                let flagDep = false;
                let flagEquiv = false;
                // Recorro el array de dependencias dentro del archivo de mapeos
                if (valuePre.dependencias) {
                    // Recorro las dependencias
                    ({ valueDep, lastObj } = this.loopValuePreDependecies(valuePre, sessionPrescoring, cont, valueDep, lastObj));
                    this.insertarCamposValuePre(dDE, sessionPrescoring, cont, vm, dCC, contene, responseObj, valueDep, defaultData);
                }
                if (valueDep !== undefined) {
                    flagDep = true;
                }
                // Recorro el array de equivalencias dentro del archivo de mapeos
                _.each(valuePre.equivalencias, (value) => {
                    // Si existe valueDep creo un objeto que matcheo posteriormente con session
                    flagEquiv = this.getFlagEquiv(dDE, sessionPrescoring, cont, value, vm, dCC, defaultData, contene, responseObj, flagEquiv);
                });
                // Si no hay ni dependencias ni equivalencias creo un objeto con el dato extraido directamente de session
                if (flagDep === false && flagEquiv === false) {
                    vm.insertarCampo(dCC, dDE, sessionPrescoring[cont] ? sessionPrescoring[cont] : defaultData, contene, responseObj);
                }
            });
        }

        private getFlagEquiv(dDE: any, sessionPrescoring: any, cont: any, value: any, vm: this, dCC: any, defaultData: any, contene: any, responseObj: any[], flagEquiv: boolean) {
            if (dDE === 'dtp_cont_don' && sessionPrescoring[cont][0].ospCartItemType.toUpperCase() === 'PORTABILIDAD'
                && value.origen === sessionPrescoring[cont][0].originType) {
                vm.insertarCampo(dCC, dDE, value.value ? value.value : defaultData, contene, responseObj);
            }
            else if (value.origen === sessionPrescoring[cont]) {
                vm.insertarCampo(dCC, dDE, value.value ? value.value : defaultData, contene, responseObj);
            }
            flagEquiv = true;
            return flagEquiv;
        }

        private insertarCamposValuePre(dDE: any, sessionPrescoring: any, cont: any, vm: this, dCC: any, contene: any, responseObj: any[], valueDep: any, defaultData: any) {
            if (dDE === 'dTipoConDonanT') {
                if (sessionPrescoring[cont][0].ospCartItemType.toUpperCase() !== 'PORTABILIDAD') {
                    vm.insertarCampo(dCC, dDE, 'TODOS', contene, responseObj);
                }
                else {
                    vm.insertarCampo(dCC, dDE, valueDep ? valueDep : defaultData, contene, responseObj);
                }
            }
            else if (dDE === 'dtp_cont_don') {
                if (sessionPrescoring[cont][0].ospCartItemType.toUpperCase() !== 'PORTABILIDAD') {
                    vm.insertarCampo(dCC, dDE, '', contene, responseObj);
                }
            }
            else {
                // Añadimos el objeto al array
                vm.insertarCampo(dCC, dDE, valueDep ? valueDep : defaultData, contene, responseObj);
            }
        }

        private loopValuePreDependecies(valuePre: any, sessionPrescoring: any, cont: any, valueDep: any, lastObj: any) {
            for (let i = 0; i <= valuePre.dependencias.length; i++) {
                // Cuando es la primera iteracion coge el valor del sessionOrigin para sacarlo del session
                if (sessionPrescoring[cont] === null) { // Si el valor esta vacio se rellena del mismo modo en <CONTENIDO>
                    valueDep = '';
                }
                else {
                    if (i === 0) {
                        // Recojo en la primera iteracion el primer nivel de profundidad
                        valueDep = sessionPrescoring[cont];
                        lastObj = valueDep;
                    }
                    else {
                        // Cuando deja de ser la primera iteración recojo los siguientes valores en los siguientes niveles
                        if (lastObj[valuePre.dependencias[i - 1]]) {
                            valueDep = lastObj[valuePre.dependencias[i - 1]];
                            lastObj = valueDep;
                        }
                        else {
                            valueDep = '';
                        }
                    }
                }
            }
            return { valueDep, lastObj };
        }

        private setLoginData(mapeosDE: any, sessionLoginData: any, vm: this, responseObj: any[]) {
            _.each(mapeosDE.loginData, (valueLD) => {
                let dCC = valueLD.datoCc;
                let dDE = valueLD.datoDe;
                let cont = valueLD.sessionOrigin;
                let contene = valueLD.contenedor;
                let defaultData = valueLD.contenedor;
                let valueDep;
                let lastObj;
                let flagDep = false;
                let flagEquiv = false;
                // Recorro el array de dependencias dentro del archivo de mapeos
                ({ valueDep, lastObj } = this.loopValueLDDependecies(valueLD, sessionLoginData, cont, valueDep, lastObj, vm, dCC, dDE, defaultData, contene, responseObj));
                if (valueDep !== undefined) {
                    flagDep = true;
                }
                // Recorro el array de equivalencias dentro del archivo de mapeos
                _.each(valueLD.equivalencias, function (value) {
                    // Si existe valueDep creo un objeto que matcheo posteriormente con session
                    if (value.origen === sessionLoginData[cont]) {
                        vm.insertarCampo(dCC, dDE, value.value ? value.value : defaultData, contene, responseObj);
                    }
                    flagEquiv = true;
                });
                // Si no hay ni dependencias ni equivalencias creo un objeto con el dato extraido directamente de session
                if (flagDep === false && flagEquiv === false) {
                    vm.insertarCampo(dCC, dDE, sessionLoginData[cont] ? sessionLoginData[cont] : defaultData, contene, responseObj);
                }
            });
        }

        private loopValueLDDependecies(valueLD: any, sessionLoginData: any, cont: any, valueDep: any, lastObj: any, vm: this, dCC: any, dDE: any, defaultData: any, contene: any, responseObj: any[]) {
            if (valueLD.dependencias) {
                // Recorro las dependencias
                for (let i = 0; i <= valueLD.dependencias.length; i++) {
                    // Cuando es la primera iteracion coge el valor del sessionOrigin para sacarlo del session
                    if (sessionLoginData[cont] === null) { // Si el valor esta vacio se rellena del mismo modo en <CONTENIDO>
                        valueDep = '';
                    }
                    else {
                        if (i === 0) {
                            // Recojo en la primera iteracion el primer nivel de profundidad
                            valueDep = sessionLoginData[cont];
                            lastObj = valueDep;
                        }
                        else {
                            // Cuando deja de ser la primera iteración recojo los siguientes valores en los siguientes niveles
                            if (lastObj[valueLD.dependencias[i - 1]]) {
                                valueDep = lastObj[valueLD.dependencias[i - 1]];
                                lastObj = valueDep;
                            }
                            else {
                                valueDep = '';
                            }
                        }
                    }
                }
                // Añadimos el objeto al array
                vm.insertarCampo(dCC, dDE, valueDep ? valueDep : defaultData, contene, responseObj);
            }
            return { valueDep, lastObj };
        }

        private loopMapFilesClientLogicApply(mapeosDE: any, sessionClientData: any, vm: this, responseObj: any[]) {
            _.each(mapeosDE.clientData, (valueCD) => {
                // Almaceno los valores en variables para no perderlos cuando cambie de ámbito
                let dCC = valueCD.datoCc;
                let dDE = valueCD.datoDe;
                let cont = valueCD.sessionOrigin;
                let contene = valueCD.contenedor;
                let defaultData = valueCD.default;
                let valueDep;
                let lastObj;
                let flagDep = false;
                let flagEquiv = false;
                if (valueCD.dependencias) {
                    this.insertarCamposMapFiles(valueCD, valueDep, lastObj, sessionClientData, cont, dDE, vm, dCC, contene, responseObj, defaultData);
                }
                if (valueDep !== undefined) {
                    flagDep = true;
                }
                // Recorro el array de equivalencias dentro del archivo de mapeos
                _.each(valueCD.equivalencias, function (value) {
                    // Si existe valueDep creo un objeto que matcheo posteriormente con session
                    if (value.origen === sessionClientData[cont]) {
                        vm.insertarCampo(dCC, dDE, value.value ? value.value : defaultData, contene, responseObj);
                    }
                    flagEquiv = true;
                });
                // Si no hay ni dependencias ni equivalencias creo un objeto con el dato extraido directamente de session
                cont = this.generateSessionObject(flagDep, flagEquiv, dDE, sessionClientData, cont, vm, dCC, defaultData, contene, responseObj);
            });
        }

        private generateSessionObject(flagDep: boolean, flagEquiv: boolean, dDE: any, sessionClientData: any, cont: any, vm: this, dCC: any, defaultData: any, contene: any, responseObj: any[]) {
            if (flagDep === false && flagEquiv === false) {
                // Si es empresa o autonomo se recupera el formattedName  y no el firstName
                if (dDE === 'dname' && sessionClientData.ospCustomerSegment !== undefined
                    && (sessionClientData.ospCustomerSegment === 'empresa'
                        || sessionClientData.ospCustomerSegment === 'autonomo')) {
                    cont = 'formattedName';
                    vm.insertarCampo(dCC, dDE, sessionClientData[cont]
                        ? sessionClientData[cont] : defaultData, contene, responseObj);
                }
                else {
                    // Flujo normal
                    vm.insertarCampo(dCC, dDE, sessionClientData[cont]
                        ? sessionClientData[cont] : defaultData, contene, responseObj);
                }
            }
            return cont;
        }

        private insertarCamposMapFiles(valueCD: any, valueDep: any, lastObj: any, sessionClientData: any, cont: any, dDE: any, vm: this, dCC: any, contene: any, responseObj: any[], defaultData: any) {
            // Recorro el array de dependencias dentro del archivo de mapeos
            // Recorro las dependencias
            ({ valueDep, lastObj } = this.loopDependeciesGetValueDep(valueCD, sessionClientData, cont, valueDep, lastObj, dDE));

            if ((dDE === 'dsucursal' || dDE === 'ddc' || dDE === 'dcuenta') && !vm.isValidAccount()) {
                vm.insertarCampo(dCC, dDE, '', contene, responseObj);
            }
            else if (dDE === 'dentidad' && !vm.isValidAccount() && vm.isOtherBank()) {
                vm.insertarCampo(dCC, dDE, '', contene, responseObj);
            }
            else if (dDE === 'dpisoContacto') {
                let parseValue = valueDep ? parseInt(valueDep, 0).toFixed() : '';
                vm.insertarCampo(dCC, dDE, parseValue, contene, responseObj);
            }
            else if (dDE === 'dtratApo' && sessionClientData[cont] && sessionClientData[cont].treatmentAttonery) {
                vm.insertarCampo(dCC, dDE, sessionClientData[cont].treatmentAttonery, contene, responseObj);
            }
            else if (dDE === 'dtratpag' && sessionClientData[cont] && sessionClientData[cont].treatmentPayer) {
                vm.insertarCampo(dCC, dDE, sessionClientData[cont].treatmentPayer, contene, responseObj);
            }
            else if (dDE === 'dtratAuto' && sessionClientData[cont] && sessionClientData[cont].treatmentAuthorized) {
                vm.insertarCampo(dCC, dDE, sessionClientData[cont].treatmentAuthorized, contene, responseObj);
            }
            else {
                vm.insertarCampo(dCC, dDE, valueDep ? valueDep : defaultData, contene, responseObj);
            }

        }

        private loopDependeciesGetValueDep(valueCD: any, sessionClientData: any, cont: any, valueDep: any, lastObj: any, dDE: any) {
            for (let i = 0; i <= valueCD.dependencias.length; i++) {
                // Cuando es la primera iteracion coge el valor del sessionOrigin para sacarlo del session
                if (sessionClientData[cont] === null ||
                    sessionClientData[cont] === undefined) { // Si el valor esta vacio se rellena del mismo modo en <CONTENIDO>
                    valueDep = '';
                }
                else {
                    ({ valueDep, lastObj } = this.getValueDepNotFirstIteration(i, valueDep, sessionClientData, cont, lastObj, valueCD, dDE));
                }
            }
            return { valueDep, lastObj };
        }

        private getValueDepNotFirstIteration(i: number, valueDep: any, sessionClientData: any, cont: any, lastObj: any, valueCD: any, dDE: any) {
            if (i === 0) {
                // Recojo en la primera iteracion el primer nivel de profundidad
                valueDep = sessionClientData[cont];
                lastObj = valueDep;
            }
            else {
                // Cuando deja de ser la primera iteración recojo los siguientes valores en los siguientes niveles
                if (lastObj[valueCD.dependencias[i - 1]]) {
                    valueDep = lastObj[valueCD.dependencias[i - 1]];
                    lastObj = valueDep;
                }
                else {
                    valueDep = '';
                }
            }
            // if (dDE  === 'dprov') {
            //     valueDep = valueDep.stateOrProvince.toUpperCase();
            // }
            if (dDE === 'dtitulApoCargo' && valueDep.value) {
                if (valueDep.value === 'Ama de Casa') {
                    valueDep.value = 'AMA_DE_CASA';
                }
                else if (valueDep.value === 'Otros') {
                    valueDep.value = 'OTROS';
                }
                // ;
                // } else {
                //     valueDep.value = '';
                // }
            }
            return { valueDep, lastObj };
        }
    }
    angular.module('dataEntrySrv', [])
        .service('dataEntrySrv', OrangeFeSARQ.Services.DataEntrySrv);
}
