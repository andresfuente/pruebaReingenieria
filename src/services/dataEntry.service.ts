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

        /**
         * @ngdoc method
         * @name OFC.Services.DataEntry
         * @description
         * Comprueba si la cuenta bancaria corresponde a un dummy
         */
        isValidAccount() {
            let vm = this;

            let clientData = JSON.parse(sessionStorage.getItem('clientData'));

            let info = {
                bic: '',
                domiciliation: '',
                accountHolder: '',
                iban: ''
            };

            if (clientData && clientData.billingInfo) {
                if (clientData.billingInfo.bankName) {
                    switch (clientData.billingInfo.bankName) {
                        case 'La Caixa':
                            info = {
                                bic: '2100',
                                domiciliation: '0000',
                                accountHolder: '66',
                                iban: '1234567890'
                            };
                            break;
                        case 'Santander':
                            info = {
                                bic: '0049',
                                domiciliation: '0000',
                                accountHolder: '06',
                                iban: '1234567890'
                            };
                            break;
                        case 'BBVA':
                            info = {
                                bic: '0182',
                                domiciliation: '0000',
                                accountHolder: '96',
                                iban: '1234567890'
                            };
                            break;
                        case 'Bankia':
                            info = {
                                bic: '2038',
                                domiciliation: '0000',
                                accountHolder: '76',
                                iban: '1234567890'
                            };
                            break;
                        case 'Otros':
                            info = {
                                bic: '2013',
                                domiciliation: '0000',
                                accountHolder: '16',
                                iban: '1234567890'
                            };
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
                _.each(mapeosDE.clientData, function (value) {
                    // Almaceno los valores en variables para no perderlos cuando cambie de ámbito
                    let dCC = value.datoCc;
                    let dDE = value.datoDe;
                    let cont = value.sessionOrigin;
                    let contene = value.contenedor;
                    let defaultData = value.default;

                    let valueDep;
                    let lastObj;
                    let flagDep = false;
                    let flagEquiv = false;

                    if (value.dependencias) { // Recorro el array de dependencias dentro del archivo de mapeos
                        // Recorro las dependencias
                        for (let i = 0; i <= value.dependencias.length; i++) {
                            // Cuando es la primera iteracion coge el valor del sessionOrigin para sacarlo del session
                            if (sessionClientData[cont] === null ||
                                sessionClientData[cont] === undefined) { // Si el valor esta vacio se rellena del mismo modo en <CONTENIDO>
                                valueDep = '';
                            } else {
                                if (i === 0) {
                                    // Recojo en la primera iteracion el primer nivel de profundidad
                                    valueDep = sessionClientData[cont];
                                    lastObj = valueDep;
                                } else {
                                    // Cuando deja de ser la primera iteración recojo los siguientes valores en los siguientes niveles
                                    if (lastObj[value.dependencias[i - 1]]) {
                                        valueDep = lastObj[value.dependencias[i - 1]];
                                        lastObj = valueDep;
                                    } else {
                                        valueDep = '';
                                    }
                                }
                                // if (dDE  === 'dprov') {
                                //     valueDep = valueDep.stateOrProvince.toUpperCase();
                                // }
                                if (dDE === 'dtitulApoCargo' && valueDep.value) {
                                    if (valueDep.value === 'Ama de Casa') {
                                        valueDep.value = 'AMA_DE_CASA';
                                    } else if (valueDep.value === 'Otros') {
                                        valueDep.value = 'OTROS';
                                    } else {
                                        valueDep.value = '';
                                    }
                                }
                            }
                        }

                        if ((dDE === 'dsucursal' || dDE === 'ddc' || dDE === 'dcuenta') && !vm.isValidAccount()) {
                            vm.insertarCampo(dCC, dDE, '', contene, responseObj);
                        } else if (dDE === 'dentidad' && !vm.isValidAccount() && vm.isOtherBank()) {
                            vm.insertarCampo(dCC, dDE, '', contene, responseObj);
                        } else {
                            vm.insertarCampo(dCC, dDE, valueDep ? valueDep : defaultData, contene, responseObj);
                        }
                    }

                    if (valueDep !== undefined) {
                        flagDep = true;
                    }
                    // Recorro el array de equivalencias dentro del archivo de mapeos
                    _.each(value.equivalencias, function (value) {
                        // Si existe valueDep creo un objeto que matcheo posteriormente con session
                        if (value.origen === sessionClientData[cont]) {
                            vm.insertarCampo(dCC, dDE, value.value ? value.value : defaultData, contene, responseObj);
                        }
                        flagEquiv = true;
                    });

                    // Si no hay ni dependencias ni equivalencias creo un objeto con el dato extraido directamente de session
                    if (flagDep === false && flagEquiv === false) {
                        vm.insertarCampo(dCC, dDE, sessionClientData[cont] ? sessionClientData[cont] : defaultData, contene, responseObj);
                    }
                });
            }


            // LOGIN DATA
            if (sessionLoginData) {
                _.each(mapeosDE.loginData, function (value) {
                    let dCC = value.datoCc;
                    let dDE = value.datoDe;
                    let cont = value.sessionOrigin;
                    let contene = value.contenedor;
                    let defaultData = value.contenedor;
                    let valueDep;
                    let lastObj;
                    let flagDep = false;
                    let flagEquiv = false;

                    // Recorro el array de dependencias dentro del archivo de mapeos
                    if (value.dependencias) {
                        // Recorro las dependencias
                        for (let i = 0; i <= value.dependencias.length; i++) {
                            // Cuando es la primera iteracion coge el valor del sessionOrigin para sacarlo del session
                            if (sessionLoginData[cont] === null) { // Si el valor esta vacio se rellena del mismo modo en <CONTENIDO>
                                valueDep = '';
                            } else {
                                if (i === 0) {
                                    // Recojo en la primera iteracion el primer nivel de profundidad
                                    valueDep = sessionLoginData[cont];
                                    lastObj = valueDep;
                                } else {
                                    // Cuando deja de ser la primera iteración recojo los siguientes valores en los siguientes niveles
                                    if (lastObj[value.dependencias[i - 1]]) {
                                        valueDep = lastObj[value.dependencias[i - 1]];
                                        lastObj = valueDep;
                                    } else {
                                        valueDep = '';
                                    }
                                }
                            }
                        }
                        // Añadimos el objeto al array
                        vm.insertarCampo(dCC, dDE, valueDep ? valueDep : defaultData, contene, responseObj);
                    }

                    if (valueDep !== undefined) {
                        flagDep = true;
                    }

                    // Recorro el array de equivalencias dentro del archivo de mapeos
                    _.each(value.equivalencias, function (value) {
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


            // PRESCORING DATA
            if (sessionPrescoring) {
                _.each(mapeosDE.prescoring, function (value) {
                    let dCC = value.datoCc;
                    let dDE = value.datoDe;
                    let cont = value.sessionOrigin;
                    let contene = value.contenedor;
                    let defaultData = value.default;
                    let valueDep;
                    let lastObj;
                    let flagDep = false;
                    let flagEquiv = false;

                    // Recorro el array de dependencias dentro del archivo de mapeos
                    if (value.dependencias) {
                        // Recorro las dependencias
                        for (let i = 0; i <= value.dependencias.length; i++) {
                            // Cuando es la primera iteracion coge el valor del sessionOrigin para sacarlo del session
                            if (sessionPrescoring[cont] === null) { // Si el valor esta vacio se rellena del mismo modo en <CONTENIDO>
                                valueDep = '';
                            } else {
                                if (i === 0) {
                                    // Recojo en la primera iteracion el primer nivel de profundidad
                                    valueDep = sessionPrescoring[cont];
                                    lastObj = valueDep;
                                } else {
                                    // Cuando deja de ser la primera iteración recojo los siguientes valores en los siguientes niveles
                                    if (lastObj[value.dependencias[i - 1]]) {
                                        valueDep = lastObj[value.dependencias[i - 1]];
                                        lastObj = valueDep;
                                    } else {
                                        valueDep = '';
                                    }
                                }
                            }
                        }
                        if (dDE === 'dTipoConDonanT') {
                            if (sessionPrescoring[cont][0].ospCartItemType.toUpperCase() !== 'PORTABILIDAD') {
                                vm.insertarCampo(dCC, dDE, 'TODOS', contene, responseObj);
                            } else {
                                vm.insertarCampo(dCC, dDE, valueDep ? valueDep : defaultData, contene, responseObj);
                            }

                        } else if (dDE === 'dtp_cont_don') {
                            if (sessionPrescoring[cont][0].ospCartItemType.toUpperCase() !== 'PORTABILIDAD') {
                                vm.insertarCampo(dCC, dDE, '', contene, responseObj);
                            }
                        } else {
                            // Añadimos el objeto al array
                            vm.insertarCampo(dCC, dDE, valueDep ? valueDep : defaultData, contene, responseObj);
                        }
                    }

                    if (valueDep !== undefined) {
                        flagDep = true;
                    }

                    // Recorro el array de equivalencias dentro del archivo de mapeos
                    _.each(value.equivalencias, function (value) {
                        // Si existe valueDep creo un objeto que matcheo posteriormente con session
                        if (dDE === 'dtp_cont_don' && sessionPrescoring[cont][0].ospCartItemType.toUpperCase() === 'PORTABILIDAD'
                            && value.origen === sessionPrescoring[cont][0].originType) {
                            vm.insertarCampo(dCC, dDE, value.value ? value.value : defaultData, contene, responseObj);
                        } else if (value.origen === sessionPrescoring[cont]) {
                            vm.insertarCampo(dCC, dDE, value.value ? value.value : defaultData, contene, responseObj);
                        }
                        flagEquiv = true;
                    });
                    // Si no hay ni dependencias ni equivalencias creo un objeto con el dato extraido directamente de session
                    if (flagDep === false && flagEquiv === false) {
                        vm.insertarCampo(dCC, dDE, sessionPrescoring[cont] ? sessionPrescoring[cont] : defaultData, contene, responseObj);
                    }
                });
            }


            // Recorro el archivo de mapeos (la parte de datos shoppingCart) para aplicar la lógica correspondiente
            // SHOPPINGCART DATA
            if (sessionShoppingCart) {
                _.each(mapeosDE.shoppingCart, function (value) {
                    // Almaceno los valores en variables para no perderlos cuando cambie de ámbito
                    let dCC = value.datoCc;
                    let dDE = value.datoDe;
                    let cont = value.sessionOrigin;
                    let contene = value.contenedor;
                    let defaultData = value.default;
                    let valueDep;
                    let lastObj;
                    let typePrice;
                    let loginRol = JSON.parse(sessionStorage.getItem('loginData')).rol;
                    let flagDep = false;
                    let flagEquiv = false;

                    // Recorro el array de dependencias dentro del archivo de mapeos
                    if (value.dependencias) {
                        // Recorro las dependencias
                        for (let i = 0; i < value.dependencias.length; i++) {
                            // Cuando es la primera iteracion coge el valor del sessionOrigin para sacarlo del session
                            if (i === 0) {
                                // Recojo en la primera iteracion el primer nivel de profundidad
                                valueDep = sessionShoppingCart[cont];
                                lastObj = valueDep;
                            } else {
                                // Cuando deja de ser la primera iteración recojo los siguientes valores en los siguientes niveles
                                valueDep = lastObj[value.dependencias[i - 1]];
                                lastObj = valueDep;
                            }
                        }
                        // Añadimos el objeto al array
                        vm.insertarCampo(dCC, dDE, valueDep ? valueDep : defaultData, contene, responseObj);
                    }

                    if (valueDep !== undefined) {
                        flagDep = true;
                    }
                    // Recorro el array de equivalencias dentro del archivo de mapeos
                    _.each(value.equivalencias, (value) => {
                        // Si existe valueDep creo un objeto que matcheo posteriormente con session
                        if (value.origen === sessionShoppingCart[cont]) {
                            vm.insertarCampo(dCC, dDE, value.value ? value.value : defaultData, contene, responseObj);
                        }
                        flagEquiv = true;
                    });
                    // Si no hay ni dependencias ni equivalencias creo un objeto con el dato extraido directamente de session
                    if (flagDep === false && flagEquiv === false) {
                        let primaryTerminalTypePrice = '';
                        let secundaryTerminalTypePrice = '';
                        let agrupation = '';
                        let numOferta = 1;
                        let selectedOptions: any = _.filter(sessionShoppingCart.cartItem, { 'ospSelected': true });
                        let terminals;
                        let auxPrimary = 'SC';
                        let auxSecundary = 'SecSC';

                        // Comprobamos que hay cartItem con la propiedad ospSelected a true, y cuántos hay
                        if (selectedOptions && selectedOptions.length > 0 && cont !== 'nLineas') {
                            for (let i = 0; i < selectedOptions.length; i++) {

                                let multisim: any = _.find(selectedOptions[i].cartItem, (data: any) => {
                                    if (data.product && data.product.name && data.product.name.toUpperCase() === 'MULTISIM'
                                    && data.action && data.action.toUpperCase() === 'NEW') {
                                        return data;
                                    }
                                });

                                let terminals: any = _.filter(selectedOptions[i].cartItem, (data: any) => {
                                    return _.find(data.product.productRelationship, { 'type': 'terminal' });
                                });
                                let primaryTerminal: any = _.find(terminals, (terminal: any) => {
                                    let terminalType = _.find(terminal.product.characteristic, (char: any) => {
                                        return char.name === 'CIMATerminalType';
                                    });
                                    if (terminalType) {
                                        return terminalType.value === 'Primary';
                                    }
                                });
                                let secundaryTerminal: any = _.find(terminals, (terminal: any) => {
                                    let terminalType = _.find(terminal.product.characteristic, (char: any) => {
                                        return char.name === 'CIMATerminalType';
                                    });
                                    if (terminalType) {
                                        return terminalType.value === 'Secundary';
                                    }
                                });
                                let insurances: any = _.filter(selectedOptions[i].cartItem, (data: any) => {
                                    return _.find(data.product.productRelationship, { 'type': 'seguro' });
                                });
                                let insurancePrimaryTerminal: any = _.find(insurances, (insurance: any) => {
                                    let terminalType = _.find(insurance.product.characteristic, (char: any) => {
                                        return char.name === 'CIMATerminalType';
                                    });
                                    if (terminalType) {
                                        return terminalType.value === 'Primary';
                                    }
                                });
                                let insuranceSecundaryTerminal: any = _.find(insurances, (insurance: any) => {
                                    let terminalType = _.find(insurance.product.characteristic, (char: any) => {
                                        return char.name === 'CIMATerminalType';
                                    });
                                    if (terminalType) {
                                        return terminalType.value === 'Secundary';
                                    }
                                });
                                let rate: any = _.find(selectedOptions[i].cartItem, (data: any) => {
                                    return _.find(data.product.productRelationship, { 'type': 'tarifa' });
                                });

                                if (rate) {
                                    let comData = JSON.parse(sessionStorage.getItem('commercialData'));
                                    let rateComData;
                                    // Se busca la tarifa en los actos comerciales para obtener sus datos
                                    if (comData) {
                                        let index = Math.floor(selectedOptions[i].id) - 1;
                                        rateComData = _.find(comData[index].rates, (rateData: any) => {
                                            return rateData.siebelId === rate.id;
                                        });
                                        // Agrupacion tarifa
                                        let segment = sessionClientData.ospCustomerSegment;
                                        let type = rateComData.type;
                                        let siebelId = rateComData.siebelId;
                                        if (type === 'Convergente' && segment === 'residencial') {
                                            agrupation = 'Love';
                                        } else if (type === 'Convergente' && segment === 'empresas') {
                                            agrupation = 'Love Negocio';
                                        } else if (type === 'Movil' && segment === 'residencial') {
                                            agrupation = 'Go';
                                        } else if (type === 'Movil' && segment === 'empresas') {
                                            agrupation = 'Go Negocio';
                                        } else if (siebelId === '1-OKX2HG') {
                                            agrupation = 'Ardilla';
                                        } else if (type === 'Fijo' && siebelId === '1-15VD39') {
                                            agrupation = 'Mi Fijo';
                                        } else if (type === 'Fijo' &&
                                            (siebelId === '1-15PLF2' || siebelId === '1-1C3JRF')) {
                                            agrupation = 'Mi Fijo Pro';
                                        } else if (type === 'Fijo' && segment === 'residencial') {
                                            agrupation = 'IEW';
                                        } else if (type === 'Fijo' && sessionClientData.ospCustomerSegment === 'empresas') {
                                            agrupation = 'IEW Pro';
                                        } else if (type === 'Mundo') {
                                            agrupation = 'Mundo';
                                        }
                                    }
                                }
                                // Tipo precio 
                                if (cont === 'typePrice') {
                                    // Terminal primario
                                    if (primaryTerminal) {
                                        if (rate && (rate.id === '1-15VD39' || rate.id === '1-1C3JRF' || rate.id === '1-15PLF2')) {
                                            primaryTerminalTypePrice = 'subvencionado';
                                        } else {
                                            _.find(primaryTerminal, (data: any) => {
                                                primaryTerminalTypePrice = data.priceType;
                                            });
                                            if (primaryTerminalTypePrice === 'aplazado') {
                                                typePrice = 'pago aplazado';
                                            } else {
                                                primaryTerminalTypePrice = 'pago unico';
                                            }
                                        }
                                    } else {
                                        primaryTerminalTypePrice = 'solo sim';
                                    }
                                    vm.insertarCampo(dCC + ' ' + 'primario oferta' + numOferta,
                                        dDE + auxPrimary + numOferta, primaryTerminalTypePrice,
                                        contene,
                                        responseObj);
                                    // Terminal secundario
                                    /* if (secundaryTerminal) {
                                        if (rate && (rate.id === '1-15VD39' || rate.id === '1-1C3JRF' || rate.id === '1-15PLF2')) {
                                            secundaryTerminalTypePrice = 'subvencionado';
                                        } else {
                                            _.find(secundaryTerminal, (data: any) => {
                                                secundaryTerminalTypePrice = data.priceType;
                                            });
                                            if (secundaryTerminalTypePrice === 'aplazado') {
                                                typePrice = 'pago aplazado';
                                            } else {
                                                secundaryTerminalTypePrice = 'pago unico';
                                            }
                                        }
                                    } else {
                                        secundaryTerminalTypePrice = 'solo sim';
                                    } */
                                    /* vm.insertarCampo(dCC + ' ' + 'secundario' + ' ' + 'oferta' + numOferta,
                                        dDE + auxSecundary + numOferta, secundayTerminalTypePrice,
                                        contene,
                                        responseObj); */
                                } else if (cont === 'seguro') {
                                    // Terminal primario
                                    if (insurancePrimaryTerminal) {
                                        vm.insertarCampo(dCC + ' ' + 'primario oferta' + numOferta,
                                            dDE + numOferta, 'seguro móvil',
                                            contene, responseObj);
                                    }
                                    // Terminal secundario
                                    /* if(insuranceSecundaryTerminal) {
                                        vm.insertarCampo(dCC + ' ' + 'secundario oferta' + numOferta,
                                            dDE + numOferta, 'seguro móvil',
                                            contene,
                                            responseObj);
                                    } */
                                } else if (cont === 'agrupacion') {
                                    if (rate) {
                                        vm.insertarCampo(dCC + numOferta, dDE + numOferta,
                                            agrupation, contene, responseObj);
                                    }
                                } else if (cont === 'nombreTarifa') {
                                    if (rate) {
                                        vm.insertarCampo(dCC + numOferta, dDE + numOferta,
                                            rate.product.name, contene, responseObj);
                                    }
                                } else if (cont === 'seleccion') {
                                    if (rate) {
                                        vm.insertarCampo(dCC + numOferta, dDE + numOferta,
                                            '', contene, responseObj);
                                    }
                                } else if (cont === 'multisim') {
                                    if (multisim) {
                                        vm.insertarCampo(dCC, dDE, 'si', contene, responseObj);
                                    }
                                } else {
                                    if (primaryTerminal) {
                                        vm.insertarCampo(dCC + ' ' + 'primario oferta' + numOferta,
                                            dDE + auxPrimary + numOferta, primaryTerminal.product[cont],
                                            contene,
                                            responseObj);
                                    }
                                }

                                numOferta++;
                            }
                        }
                        // Número de líneas nacionales
                        if (loginRol === 'PDV' && cont === 'nLineas') {
                            vm.insertarCampo(dCC,
                                dDE, selectedOptions.length,
                                contene,
                                responseObj);

                        }
                    }

                });
            }


            return responseObj;
        }
    }
    angular.module('dataEntrySrv', [])
        .service('dataEntrySrv', OrangeFeSARQ.Services.DataEntrySrv);
}
