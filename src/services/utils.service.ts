module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:Utils
     * @description
     * Clase que contine diversas funciones/utilidades
     */
    export class Utils {

        static $inject = ['$injector'];

        constructor(private $injector) {
        }

        escapeHtml(source: string) {
            let entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };
            return String(source).replace(/[&<>"'\/]/g, s => entityMap[s]);
        }

        unescapeHtml(source: string) {
            let entityMap = {
                "amp;": "",
                "&amp;": "&",
                "&lt;": "<",
                "lt;": "<",
                "&gt;": ">",
                "gt;": ">",
                '&quot;': '"',
                '&#39;': "'",
                '&#x2F;': "/"
            };

            return String(source)
                .replace("&amp;", "")
                .replace("amp;", "")
                .replace("lt;", "<")
                .replace("&lt;", "<")
                .replace("gt;", ">")
                .replace("&gt;", ">")
                ;
        }

        extractJs(source: string): string[] {
            let js = /<script\b[^>]*src="(.*?)"><\/script>/gm;
            let scriptsInc = [];
            let m: string[];

            do {
                m = js.exec(source);
                if (m) {
                    scriptsInc.push(m[1]);
                }
            } while (m);

            return scriptsInc;
        }

        formatMBRound(value: any) {
            if (value) {
                value = parseInt(value);
                if (value >= 1024) {
                    value = value / 1024;
                    value = Math.floor(value * 100) / 100;
                }
            }
            return value;
        }

        formatMBTrunc(value: any) {
            if (value) {
                value = parseInt(value);
                if (value >= 1024) {
                    value = value / 1024;
                    value = Math.floor(value * 100) / 100;
                }
            }
            return value;
        }

        extractProperties(obj) {
            let properties = "";
            for (let prop in obj) {
                if (typeof obj[prop] != 'function') {
                    properties += prop + obj[prop];
                }
            }
            return properties;
        }

        fillcustomerViewStore(value, inputDocument) {
            let vm = this;
            let userService;
            let customerViewStore;
            let searchUrl;
            userService = vm.$injector.get('userSrv');

            inputDocument = inputDocument.trim().toUpperCase();
            if (inputDocument == "MSISDN") {
                searchUrl = "publicKey";
            } else if (inputDocument === 'NIF' && vm.isNifNie(value)) {
                searchUrl = "individualPublicId";
            } else if (inputDocument === 'CIF' && vm.isCif(value)) {
                searchUrl = "individualPublicId";
            } else if (inputDocument === 'PASSPORT' || inputDocument === 'RESIDENCE') {
                searchUrl = "residential";
            }

            return userService.getUser(searchUrl, value)
                .then(
                (response) => {
                    return response;
                }
                )
                .catch(function(error) {
                    return error;
                });
        }

        isNie(document: string): boolean {

            if (document.indexOf('X') == 0 || document.indexOf('Y') == 0 || document.indexOf('T') == 0) {
                return (/^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i.test(document))
            }
            return false;
        }

        isNifNie(document: string): boolean {
            let numero: number;
            let letr: string;
            let letra: string;
            let expresion_regular_dni: any;

            expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

            if (document.indexOf('X') == 0 || document.indexOf('Y') == 0 || document.indexOf('T') == 0) {
                return (/^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i.test(document))
            }

            if (expresion_regular_dni.test(document) == true) {
                numero = parseInt(document.substr(0, document.length - 1));
                letr = document.substr(document.length - 1, 1);
                numero = numero % 23;
                letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
                letra = letra.substring(numero, numero + 1);
                if (letra != letr.toUpperCase()) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

        isNif(document: string): boolean {
            let nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
            let str = document.toString().toUpperCase();

            if (nifRexp.test(str))
                return true
            else
                return false
        }


        isCif(cif: string): boolean {
            cif = cif.toUpperCase();
            let cifRegEx1 = /^[ABEH][0-9]{8}$/i;
            let cifRegEx2 = /^[KPQS][0-9]{7}[A-J]$/i;
            let cifRegEx3 = /^[CDFGJLMNRUVW][0-9]{7}[0-9A-J]$/i;
            if (cifRegEx1.test(cif) || cifRegEx2.test(cif) || cifRegEx3.test(cif)) {
                let control = cif.charAt(cif.length - 1);
                let suma_A = 0;
                let suma_B = 0;
                for (let i = 1; i < 8; i++) {
                    if (i % 2 == 0) suma_A += parseInt(cif.charAt(i));
                    else {
                        let t = (parseInt(cif.charAt(i)) * 2) + "";
                        let p = 0;
                        for (let j = 0; j < t.length; j++) {
                            p += parseInt(t.charAt(j));
                        }
                        suma_B += p;
                    }
                }
                let suma_C = (suma_A + suma_B) + "";
                let suma_D = (10 - parseInt(suma_C.charAt(suma_C.length - 1))) % 10;
                let letras = "JABCDEFGHI";
                if (control >= "0" && control <= "9") return (parseInt(control) == suma_D);
                else return (control == letras.charAt(suma_D));
            }
            else return false;
        }

        getPrepagoLines(products: any): any {
            // for (let i in products) {
            //     if (products[i].productCharacteristic) {
            //         for (let j in products[i].productCharacteristic) {
            //             if (products[i].productCharacteristic[j].name === "MSISDN") {
            //                 if (products[i].productCharacteristic[j].value === msisdn) {
            //                     return products[i].ospProductType;
            //                 }
            //             }
            //         }
            //     }
            // }
        }

        /**
         * @ngdoc method
         * @name #getVap
         * @methodOf contract.ContractSrv
         * @returns {object} Devuelve una promesa con el response
         * Devuelve todas las líneas que sean de pospago
         */
        getPospagoLines(products: any): any {
        }

        /**
         * @ngdoc method
         * @name #getVap
         * @methodOf contract.ContractSrv
         * @returns {String} Devuelve el nombre de la tarifa (Postpago, prepago...)
         * Devuelve todas el tipo de contrato que tiene la línea
         */
        getContract(products: any, msisdn: string): string {
            for (let i in products) {
                if (products[i].productCharacteristic) {
                    for (let j in products[i].productCharacteristic) {
                        if (products[i].productCharacteristic[j].name === "MSISDN") {
                            if (products[i].productCharacteristic[j].value === msisdn) {
                                return products[i].ospProductType;
                            }
                        }
                    }
                }
            }
        }

        findByName(name, array, value = 'value') {
            if (array && array.length >= 1){
                for (let i: number = 0; i < array.length; i++) {
                    if (array[i].name.replace(" ", "") === name.replace(" ", "")) {
                        return array[i][value];
                    }
                }
            return null;
          }
        }

        findByInArray(array, value, campo = 'name') {
            for (let i: number = 0; i < array.length; i++) {
                if (array[i][campo].replace(" ", "") === value.replace(" ", "")) {
                    return array[i];
                }
            }
            return null;
        }

        doDigest(): void {
            if (navigator.userAgent.indexOf('PhantomJS') < 1) {
                if (!angular.element(document.body) && !angular.element(document.body).scope().$$phase) {
                    angular.element(document.body).scope().$apply();
                }
            }
        }

        getIsMsisdn(msisdn: string): boolean {
            if (msisdn.length === 9 && (msisdn.charAt(0) === '6' || msisdn.charAt(0) === '7')) {
                return true;
            }
            return false;
        }

        console(type, mesage, param) {
            if (window.location.href.indexOf('https') < 0) {
                console[type]('LOG de desarrollo: ' + new Date() + ' ' + mesage, param ? param : null);
            }
        }


        trim(val: string) {
            let removeSpaces = /\s*/g;
            return val.replace(removeSpaces, '');
        }

        typeHref(oData: any) {
            let vm = this;
            if (!oData) {
                return '#/';
            } else if (oData && oData.includes('http')) {
                return oData;
            } else {
                return '#/' + oData;
            }
        }

        /**
         * Return true if paramether phone begin with +34 || 8 || 9
         */
        isFixedLine(phone: number) {
            if (phone) {
                let phoneStr: string = phone.toString();
                let regFixed = /^((\+?34)?(8|9))\d+$/;
                // let regMobile = /^((6|7)|\+?34(6|7))/;
                if (phoneStr.match(regFixed)) {
                    return true;
                }
                return false;
            }
        }

        /**
         * Return true if paramether phone begin with +34 || 6 || 7
         */
        isMobileLine(phone: number) {
            if (phone) {
                let phoneStr: string = phone.toString();
                //let regFixed = /^((\+?34)?(8|9))\d+$/;
                let regMobile = /^((6|7)|\+?34(6|7))/;
                if (phoneStr.match(regMobile)) {
                    return true;
                }
                return false;
            }
        }

        /**
         * Comprueba si la URL contiene una IMG
         */
        isImage(src) {
            let vm = this;
            let $q = vm.$injector.get('$q');
            let deferred = $q.defer();
            let image = new Image();

            image.onerror = function() {
                deferred.resolve(false);
            };
            image.onload = function() {
                deferred.resolve(true);
            };

            image.src = src;

            return deferred.promise;
        }

        /**
         * Comprueba si un email tiene el formato correcto
         */
        checkFormatEmail(email: string): boolean {
            let vm = this;
            //let format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
            let format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (email.match(format)) {
                return true;
            }
            return false;

        }

        /**
         * devuelve el tipo producto de una linea, pasandole como parametro un array(productos del customer view y el msisdn)
         */
        getProductType(products: any, msisdn: string) {
            let vm = this;
            if (products && products.length > 0) {
                let sizeProducts = products.length;
                let found = false;
                let i = 0;
                while (i < sizeProducts && !found) {
                    //si estoy buscando el id
                    let sizePC = products[i].productCharacteristic.length;
                    if (products[i].productCharacteristic && sizePC > 0) {
                        let productCh = products[i].productCharacteristic;
                        let sizeCh = productCh.length;
                        //recorro el product caracteristic de este producto
                        let it = 0;
                        while (it < sizeCh && !found) {
                            if (productCh[it].name && productCh[it].name === 'MSISDN' && productCh[it].value === msisdn) {
                                found = true;
                                return products[i].ospProductType;
                            }
                            ++it;
                        }
                    }
                    ++i;
                }
            }
            return null;
        }

        fillOwcsStores(layoutMetaData: any) {
            let vm = this;
            OrangeFeSARQ.Controllers.ParentController.shared.owcsStores = {};
            vm.setDataInStore(layoutMetaData.topSection);
            vm.setDataInStore(layoutMetaData.centralSection);
            vm.setDataInStore(layoutMetaData.leftSection);
            vm.setDataInStore(layoutMetaData.rightSection);
            vm.setDataInStore(layoutMetaData.bottomSection);
            vm.setDataInStore(layoutMetaData.footerSection);
            vm.setDataInStore(layoutMetaData.headerSection);
        }

        setDataInStore(section): void {
            let vm = this;
            for (let i: number = 0; i < section.length; i++) {

                OrangeFeSARQ.Controllers.ParentController.shared.owcsStores[_.camelCase(section[i].compId) + 'OWCSStore'] = { section: section[i] };

                if (section[i].listModuleButton) {
                    vm.setDataInStore(section[i].listModuleButton);
                }

                if (section[i].listModule) {
                    vm.setDataInStore(section[i].listModule);
                }
            }
        }

        isset(val: any): boolean {
            let vm = this;
            return val !== null && val !== 'undefined' && val !== undefined && val;
        }

        objectHaveAnyProperty(obj: any): boolean {
            let j: number = 0;
            for (let key of Object.keys(obj)) {
                if (obj.hasOwnProperty(key)) {
                    j++;
                }
            }
            return j !== 0;
        }

        isNumeric(number: string): boolean {
            let vm = this;
            let letras = 'abcdefghyjklmnñopqrstuvwxyz';
            for (let i = 0; i < number.length; i++) {
                if (letras.indexOf(number.charAt(i), 0) !== -1) {
                    return false;
                }
            }
            return true;
        }

        /**
         * @ngdoc service
         * @name OrangeFeSARQ.Services:Utils
         * @param {Object} miComponentCompOwcsStote Store que va a contener la información del store
         * @methodOf OrangeFeSARQ.Services.Utils
         * @description
         * Devuelde los datos del Store en un formato más legible para usar en el html
         */
        getOWCS(miComponentCompOwcsStote: OrangeFeSARQ.Models.ComponentOwcs): OrangeFeSARQ.Models.OwcsHtml {
            let vm = this;
            // Validamos que los datos del  store están llenos.
            let owcsStore: OrangeFeSARQ.Models.OwcsHtml = <OrangeFeSARQ.Models.OwcsHtml>{};
            if (miComponentCompOwcsStote && miComponentCompOwcsStote.section) {
                owcsStore.emptyMessage = miComponentCompOwcsStote.section.emptyMessage;
                owcsStore.accordion = miComponentCompOwcsStote.section.accordion;
                owcsStore.title = miComponentCompOwcsStote.section.title;
                let section = miComponentCompOwcsStote.section;
                owcsStore.labels = vm.getListValues(section.listLabel);
                owcsStore.links = vm.getListValues(section.listDeepLink);
                owcsStore.modules = vm.getListValues(section.listModule);
                owcsStore.images = vm.getListValues(section.listImage);
                owcsStore.options = vm.getListValues(section.listOption);
                owcsStore.pages = vm.getListValues(section.listPages);
                owcsStore.tables = vm.getListValues(section.listTable);
                owcsStore.moreInfos = vm.getListValues(section.listMoreInfo);
                owcsStore.richTexts = vm.getListValues(section.richText, 'html');
                // Si necesitas otro array añadelo en utils
            }
            return owcsStore;
        }

        getListValues(arr: Array<any>, value: string = 'value'): any {
            let vm = this;
            let result = {};
            for (let i: number = 0; i < arr.length; i++) {
                if (arr[i].name) {
                    let code = _.camelCase(arr[i].name);
                    result[code] = arr[i][value];
                }
            }
            return result;
        }
		
		
		/**
         * @ngdoc service
         * @name OrangeFeSARQ.Services:Utils
         * @param {customerViewStore} 
		 * @param {menuItems} 
         * @methodOf OrangeFeSARQ.Services.Utils
         * @description
         * Parsea las urls del item menun que se le pasa como parámetro, sustituyendo el patrón ##nif##, por el documento del usuario logueado
         */
		parseUrlMenu(customerViewStore, menu): any{
			if(customerViewStore && customerViewStore.loginData && customerViewStore.loginData.document && customerViewStore.loginData.document !== null) {
				let document = customerViewStore.loginData.document;
				let menuString = JSON.stringify(menu);
				menuString = menuString.replace(/##nif##/g, document)
				return JSON.parse(menuString);
			}
			return menu;
		}

    }
    angular.module('utils', [])
        .service('utils', Utils);
}
