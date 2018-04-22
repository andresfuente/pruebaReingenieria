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
         * @ngdoc service
         * @name @name OFC.Services.DataEntry
         *  @description
         * Método para mapear la información a partir del archivo de mapeos y el sessionStorage
         */

        getData(mapeosDE, sessionClientData: any, sessionLoginData: any, sessionPrescoring: any, sessionShoppingCart: any) {
            let vm = this;
            let responseObj = [];
            // Recorro el archivo de mapeos (la parte de datos de cliente) para aplicar la lógica correspondiente
            // CLIENTDATA
            _.each(mapeosDE.clientData, function (value) {
                // Almaceno los valores en variables para no perderlos cuando cambie de ámbito
                let dCC = value.datoCc;
                let dDE = value.datoDe;
                let cont = value.sessionOrigin;
                let contene = value.contenedor;
                let valueDep;
                let lastObj;
                let flagDep = false;
                let flagEquiv = false;
                // Recorro el array de dependencias dentro del archivo de mapeos
                if (value.dependencias) {
                    // Recorro las dependencias
                    for (let i = 0; i <= value.dependencias.length; i++) {
                        // Cuando es la primera iteracion coge el valor del sessionOrigin para sacarlo del session
                        if(sessionClientData[cont] === null ||
                            sessionClientData[cont] === undefined) { // Si el valor esta vacio se rellena del mismo modo en <CONTENIDO>
                            valueDep = '';
                        } else {
                            if (i === 0) {
                                // Recojo en la primera iteracion el primer nivel de profundidad
                                valueDep = sessionClientData[cont];
                                lastObj = valueDep;
                            } else {
                                // Cuando deja de ser la primera iteración recojo los siguientes valores en los siguientes niveles
                                if(lastObj[value.dependencias[i - 1]]) {
                                    valueDep = lastObj[value.dependencias[i - 1]];
                                    lastObj = valueDep;
                                } else {
                                    valueDep = '';
                                }
                            }
                            // if (dDE  === 'dprov') {
                            //     valueDep = valueDep.stateOrProvince.toUpperCase();
                            // }
                        }
                    }
                    // Añadimos el objeto al array
                    vm.insertarCampo(dCC, dDE, valueDep, contene, responseObj);
                }

                if (valueDep !== undefined) {
                    flagDep = true;
                }
                // Recorro el array de equivalencias dentro del archivo de mapeos
                _.each(value.equivalencias, function (value) {
                    // Si existe valueDep creo un objeto que matcheo posteriormente con session
                    if (value.origen === sessionClientData[cont]) {
                        vm.insertarCampo(dCC, dDE, value.value, contene, responseObj);
                    }
                    flagEquiv = true;
                });
                // Si no hay ni dependencias ni equivalencias creo un objeto con el dato extraido directamente de session
                if (flagDep === false && flagEquiv === false) {
                    vm.insertarCampo(dCC, dDE, sessionClientData[cont], contene, responseObj);
                }

            });

            _.each(mapeosDE.loginData, function (value) {
                let dCC = value.datoCc;
                let dDE = value.datoDe;
                let cont = value.sessionOrigin;
                let contene = value.contenedor;
                let valueDep;
                let lastObj;
                let flagDep = false;
                let flagEquiv = false;

                // Recorro el array de dependencias dentro del archivo de mapeos
                if (value.dependencias) {
                    // Recorro las dependencias
                    for (let i = 0; i <= value.dependencias.length; i++) {
                        // Cuando es la primera iteracion coge el valor del sessionOrigin para sacarlo del session
                        if(sessionLoginData[cont] === null) { // Si el valor esta vacio se rellena del mismo modo en <CONTENIDO>
                            valueDep = '';
                        } else {
                            if (i === 0) {
                                // Recojo en la primera iteracion el primer nivel de profundidad
                                valueDep = sessionLoginData[cont];
                                lastObj = valueDep;
                            } else {
                                // Cuando deja de ser la primera iteración recojo los siguientes valores en los siguientes niveles
                                if(lastObj[value.dependencias[i - 1]]) {
                                    valueDep = lastObj[value.dependencias[i - 1]];
                                    lastObj = valueDep;
                                } else {
                                    valueDep = '';
                                }
                            }
                        }
                    }
                    // Añadimos el objeto al array
                    vm.insertarCampo(dCC, dDE, valueDep, contene, responseObj);
                }

                if (valueDep !== undefined) {
                    flagDep = true;
                }

                // Recorro el array de equivalencias dentro del archivo de mapeos
                _.each(value.equivalencias, function (value) {
                    // Si existe valueDep creo un objeto que matcheo posteriormente con session
                    if (value.origen === sessionLoginData[cont]) {
                        vm.insertarCampo(dCC, dDE, value.value, contene, responseObj);
                    }
                    flagEquiv = true;
                });
                // Si no hay ni dependencias ni equivalencias creo un objeto con el dato extraido directamente de session
                if (flagDep === false && flagEquiv === false) {
                    vm.insertarCampo(dCC, dDE, sessionLoginData[cont], contene, responseObj);
                }
            });

            _.each(mapeosDE.prescoring, function (value) {
                let dCC = value.datoCc;
                let dDE = value.datoDe;
                let cont = value.sessionOrigin;
                let contene = value.contenedor;
                let valueDep;
                let lastObj;
                let flagDep = false;
                let flagEquiv = false;

                // Recorro el array de dependencias dentro del archivo de mapeos
                if (value.dependencias) {
                    // Recorro las dependencias
                    for (let i = 0; i <= value.dependencias.length; i++) {
                        // Cuando es la primera iteracion coge el valor del sessionOrigin para sacarlo del session
                        if(sessionPrescoring[cont] === null) { // Si el valor esta vacio se rellena del mismo modo en <CONTENIDO>
                            valueDep = '';
                        } else {
                            if (i === 0) {
                                // Recojo en la primera iteracion el primer nivel de profundidad
                                valueDep = sessionPrescoring[cont];
                                lastObj = valueDep;
                            } else {
                                // Cuando deja de ser la primera iteración recojo los siguientes valores en los siguientes niveles
                                if(lastObj[value.dependencias[i - 1]]) {
                                    valueDep = lastObj[value.dependencias[i - 1]];
                                    lastObj = valueDep;
                                } else {
                                    valueDep = '';
                                }
                            }
                        }
                    }
                    // Añadimos el objeto al array
                    vm.insertarCampo(dCC, dDE, valueDep, contene, responseObj);
                }

                if (valueDep !== undefined) {
                    flagDep = true;
                }

                // Recorro el array de equivalencias dentro del archivo de mapeos
                _.each(value.equivalencias, function (value) {
                    // Si existe valueDep creo un objeto que matcheo posteriormente con session
                    if (value.origen === sessionPrescoring[cont]) {
                        vm.insertarCampo(dCC, dDE, value.value, contene, responseObj);
                    }
                    flagEquiv = true;
                });
                // Si no hay ni dependencias ni equivalencias creo un objeto con el dato extraido directamente de session
                if (flagDep === false && flagEquiv === false) {
                    vm.insertarCampo(dCC, dDE, sessionPrescoring[cont], contene, responseObj);
                }
            });

            // Recorro el archivo de mapeos (la parte de datos shoppingCart) para aplicar la lógica correspondiente
            // SHOPPINGCART
            _.each(mapeosDE.shoppingCart, function (value) {
                // Almaceno los valores en variables para no perderlos cuando cambie de ámbito
                let dCC = value.datoCc;
                let dDE = value.datoDe;
                let cont = value.sessionOrigin;
                let contene = value.contenedor;
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
                    vm.insertarCampo(dCC, dDE, valueDep, contene, responseObj);
                }

                if (valueDep !== undefined) {
                    flagDep = true;
                }
                // Recorro el array de equivalencias dentro del archivo de mapeos
                _.each(value.equivalencias, (value) => {
                    // Si existe valueDep creo un objeto que matcheo posteriormente con session
                    if (value.origen === sessionShoppingCart[cont]) {
                        vm.insertarCampo(dCC, dDE, value.value, contene, responseObj);
                    }
                    flagEquiv = true;
                });
                // Si no hay ni dependencias ni equivalencias creo un objeto con el dato extraido directamente de session
                if (flagDep === false && flagEquiv === false) {
                    let terminalType = 'primario';
                    let numOferta = 1;
                    let selectedOptions: any = _.filter(sessionShoppingCart.cartItem, { 'ospSelected': true });
                    let terminals;
                    let aux;

                    // Comprobamos que hay cartItem con la propiedad ospSelected a true, y cuántos hay
                    if (selectedOptions && selectedOptions.length > 0 && cont !== 'nLineas') {
                        for (let i = 0; i < selectedOptions.length; i++) {

                            let terminals: any = _.filter(selectedOptions[i].cartItem, (data: any) => {
                                return _.find(data.product.productRelationship, { 'type': 'terminal' });
                            });
                            let seguro: any = _.find(selectedOptions[i].cartItem, (data: any) => {
                                return _.find(data.product.productRelationship, { 'type': 'seguro' })
                            });

                            let tarifas: any = _.filter(selectedOptions[i].cartItem, (data: any) => {
                                return _.find(data.product.productRelationship, {'type': 'tarifa' })
                            });

                            if (terminals && terminals.length > 0) {
                                for (let j = 0; j < terminals.length; j++) {
                                    let type = _.find(terminals[j].product.characteristic, (data: any) => {
                                        return data.value === 'Primary';
                                    });
                                    if (!type) {
                                        terminalType = 'secundario';
                                        aux = 'SecSC';
                                    } else {
                                        terminalType = 'primario';
                                        aux = 'SC';
                                    }
                                    if (cont === 'typePrice') {
                                        _.find(terminals[j].itemPrice, (data: any) => {
                                            typePrice = data.priceType;
                                        });
                                        if (typePrice === 'aplazado') {
                                            typePrice = 'pago aplazado';
                                        } else {
                                            typePrice = 'pago unico';
                                        }
                                        vm.insertarCampo(dCC + ' ' + terminalType + ' ' + 'oferta' + numOferta,
                                            dDE + aux + numOferta, typePrice,
                                            contene,
                                            responseObj);
                                    } else if (cont === 'seguro') {
                                        if (seguro !== undefined && seguro.cartItemRelationship[0].id === terminals[j].id) {
                                            vm.insertarCampo(dCC + ' ' + terminalType + ' ' + 'oferta' + numOferta,
                                                dDE + numOferta, 'seguro móvil',
                                                contene,
                                                responseObj);
                                        }
                                    } else {
                                        vm.insertarCampo(dCC + ' ' + terminalType + ' ' + 'oferta' + numOferta,
                                            dDE + aux + numOferta, terminals[j].product[cont],
                                            contene,
                                            responseObj);
                                    }

                                }
                            } else {
                                typePrice = 'solo sim';
                            }

                            if (tarifas && tarifas.length > 0) {
                                for (let j = 0; j < tarifas.length; j++) {
                                    if (cont === 'dselAgrupacionTarifaVozSC1') {
                                        vm.insertarCampo(dCC, dDE, tarifas[j].product.name, contene, responseObj);
                                    }

                                    if (cont === 'dTarifaSC1') {
                                        vm.insertarCampo(dCC, dDE, tarifas[j].product.name, contene, responseObj);
                                    }

                                    if (cont === 'dselTarifaDatosSC1') {
                                        vm.insertarCampo(dCC, dDE, tarifas[j].product.name, contene, responseObj);
                                    }

                                    if (cont === 'dTipoPagoSC1') {
                                        let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
                                        if(commercialData && commercialData.length) {
                                            for(let comAct = 0; comAct < commercialData.length; comAct++) {
                                                for(let rate = 0; rate < commercialData[comAct].rates.length; rate ++) {
                                                    if(commercialData[comAct].rates[rate].siebelId === tarifas[j].id) {
                                                        if(commercialData[comAct].rates[rate].typeService === 'mifijo') {
                                                            typePrice = 'subvencionado';
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        vm.insertarCampo(dCC, dDE, typePrice, contene, responseObj);
                                    }

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

                    };
                }

            });

            return responseObj;
        }
    }
    angular.module('dataEntrySrv', [])
        .service('dataEntrySrv', OrangeFeSARQ.Services.DataEntrySrv);
}
