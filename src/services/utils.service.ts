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
            if (inputDocument === 'MSISDN') {
                if (sessionStorage.getItem('EMASIVO')) {
                    value = sessionStorage.getItem('customerDocument');
                    searchUrl = 'individualPublicId';
                } else {
                    searchUrl = 'publicKey';
                }
            } else if (inputDocument === 'NIF' || inputDocument === 'NIE') {
                searchUrl = 'individualPublicId';
            } else if (inputDocument === 'CIF') {
                searchUrl = 'individualPublicId';
            } else if (inputDocument === 'DOCID') {
                searchUrl = 'individualPublicId';
            } else if (inputDocument === 'PASSPORT' || inputDocument === 'PPT' || inputDocument === 'RESIDENCE' || inputDocument === 'DOCID') {
                searchUrl = 'residential';
            }

            return userService.getUser(searchUrl, value)
                .then(
                    (response) => {
                        return response;
                    }
                )
                .catch(function (error) {
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

            if (nifRexp.test(str)) {
                return true;
            } else {
                return false;
            }
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
                    if (i % 2 == 0) {
                        suma_A += parseInt(cif.charAt(i));
                    } else {
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
                let letras = 'JABCDEFGHI';
                if (control >= '0' && control <= '9') {
                    return (parseInt(control) == suma_D);
                } else {
                    return (control == letras.charAt(suma_D));
                }
            } else {
                return false;
            }
        }

        getPrepagoLines(products: any): any {
            /* for (let i in products) {
                if (products[i].productCharacteristic) {
                    for (let j in products[i].productCharacteristic) {
                        if (products[i].productCharacteristic[j].name === "MSISDN") {
                            if (products[i].productCharacteristic[j].value === msisdn) {
                                return products[i].ospProductType;
                            }
                        }
                    }
                }
            }*/
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
                        if (products[i].productCharacteristic[j].name === 'MSISDN') {
                            if (products[i].productCharacteristic[j].value === msisdn) {
                                return products[i].ospProductType;
                            }
                        }
                    }
                }
            }
        }

        findByName(name, array, value = 'value') {
            if (array && array.length >= 1) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].name !== null) {
                        if (array[i].name.replace(" ", "") === name.replace(" ", "")) {
                            return array[i][value];
                        }
                    }
                }
                return null;
            }
        }

        findByInArray(array, value, campo = 'name') {
            for (let i = 0; i < array.length; i++) {
                if (array[i].name !== null) {
                    if (array[i][campo].replace(" ", "") === value.replace(" ", "")) {
                        return array[i];
                    }
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
                let regFixed = /^((\+?34)?(8|9))\d{8,10}$/;
                // - let regMobile = /^((6|7)|\+?34(6|7))/;
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
                // - let regFixed = /^((\+?34)?(8|9))\d+$/;
                let regMobile = /^((\+?34)?(6|7))\d{8,10}$/;
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

            image.onerror = function () {
                deferred.resolve(false);
            };
            image.onload = function () {
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
            let format = /^[A-Za-z0-9._-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
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
                let response;
                while (i < sizeProducts && !found) {
                    // Si estoy buscando el id
                    //verifico si el producto es relativo a una línea prepago, pospago o fijo
                    if (products[i].ospProductType.match(/^(POSPAGO|PREPAGO|Número teléfono fijo VoIP|AMENA)$/)) {
                        let sizePC = products[i].productCharacteristic.length;
                        if (products[i].productCharacteristic && sizePC > 0) {

                            ({ found, response } = this.recorrerProductCharacteristic(products, i, found, msisdn, response));
                        }
                    }
                    ++i;
                }
                if (found) {
                    return response;
                }
            }
            return null;
        }

        private recorrerProductCharacteristic(products: any, i: number, found: boolean, msisdn: string, response: any) {
            let productCh = products[i].productCharacteristic;
            let sizeCh = productCh.length;
            // Recorro el product caracteristic de este producto
            let it = 0;
            while (it < sizeCh && !found) {
                if (productCh[it].name && productCh[it].name === 'MSISDN' && productCh[it].value === msisdn) {
                    found = true;
                    response = products[i].ospProductType;
                }
                ++it;
            }
            return { found, response };
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
            for (let i = 0; i < section.length; i++) {
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
            let j = 0;
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
            if (arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].name) {
                        let code = _.camelCase(arr[i].name);
                        result[code] = arr[i][value];
                    }
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
         * Parsea las urls del item menun que se le pasa como parámetro,
         * sustituyendo el patrón ##nif##, por el documento del usuario logueado
         */
        parseUrlMenu(customerViewStore, menu): any {
            if (customerViewStore && customerViewStore.loginData && customerViewStore.loginData.document
                && customerViewStore.loginData.document !== null) {
                let document = _['toUpper'](customerViewStore.loginData.document);
                let menuString = JSON.stringify(menu);
                menuString = menuString.replace(/##nif##/g, document)
                return JSON.parse(menuString);
            }
            return menu;
        }

        /*COMIENZO DE VALIDACIÓN DEL CAMBIO DE CONTRASEÑA (VER fixedPasswordChange O changePassword)*/

        checkSecurityLevel(passwordMin: number, passwordMax: number, password: string, id) {
            let vm = this;
            let passLvl = 0;

            if (password && vm.testPassLength(password, passwordMin, passwordMax)
                && vm.testPassCharacters(password)) {
                if (password && password.length === passwordMin) {
                    passLvl = 1;
                } else if (password && vm.testPassLength(password, passwordMin, passwordMax)
                    && password.length > passwordMin) {
                    passLvl = 2;
                }

                if (vm.testPassContainMsisdn(password, id, passwordMin, passwordMax)
                    || vm.testPassRepeatNumber(password)
                    || vm.testPassSequentialNumbers(password, passwordMin, passwordMax)) {
                    passLvl = 0;
                }
            }

            return passLvl;
        };


        testPassCharacters(val: string) {
            let vm = this;
            let char = /[\sà-ùÀ-Ù\>\<\=\'\*\[\]\{\}]/
            if (val && val.match(char)) {
                return false;
            }
            return true;
        }
        /**
             * @ngdoc service
             * @name services.Controllers:Services#testPassLength
             * @param {string} val:valor a testear
             * @param {string} passwordMin:valor mínimo que deberá contener la contraseña
             * @param {string} passwordMax:valor máximo que deberá contener la contraseña
             * @return {boolean} Devuelve si la contraseña tiene del mínimo al maximo de caracteres
             * @methodOf OrangeFeSARQ.Services.Utils
             * @description
             * Devuelve si la contraseña tiene del mínimo al maximo de caracteres
        **/

        testPassLength(val: string, passwordMin: number, passwordMax: number): boolean {
            let vm = this;
            if (val && passwordMin && passwordMax && val.length >= passwordMin && val.length <= passwordMax) {
                return true;
            }
            return false;
        }
        /**
             * @ngdoc service
             * @name services.Controllers:Services#testPassContainMsisdn
             * @param {string} val:valor a testear
             * @param {string} msisdn: teléfono móvil
             * @param {string} minLength:valor mínimo que deberá contener la contraseña
             * @param {string} maxLength:valor máximo que deberá contener la contraseña
             * @return {boolean} Devuelve si en el contenido de la contraseña tiene trozos del msisdn
             * @methodOf OrangeFeSARQ.Services.Utils
             * @description
             * Testea si en el contenido de la contraseña que se ha introducido tiene trozos del msisdn
        **/

        testPassContainMsisdn(val: string, msisdn: number, minLength: number, maxLength: number) {
            let num: string = msisdn.toString();
            let pass: string = val;
            let minLen = minLength;
            let maxLen = maxLength;
            let SOMETEXT = '(\d)*';

            if (minLen && maxLen && pass) {
                for (let i = minLen; i < maxLen; i++) {
                    let substr: string = num.substring(0, i);
                    let pattern = new RegExp(SOMETEXT + substr + SOMETEXT);
                    if (pattern.test(pass)) {
                        return true;
                    }
                }

                for (let i = num.length - minLen; i > 0; i--) {
                    let substr: string = num.substring(i, num.length);
                    let pattern = new RegExp(SOMETEXT + substr + SOMETEXT);
                    if (pattern.test(pass)) {
                        return true;
                    }
                }
                return false;
            }

        }

        /**
             * @ngdoc service
             * @name services.Controllers:Services#getOWCSProperty
             * @param {string} val: clave para buscar en properties
             * @return {string} valor de la clave solicitada
             * @methodOf OrangeFeSARQ.Services.Utils
             * @description
             * Devuelve la propiedad de OWCS de la clave recibida
        **/
        getOWCSProperty(val: string): string {
            let vm = this;
            let result: string;
            if (OrangeFeSARQ.Controllers.ParentController.shared.properties) {
                result = OrangeFeSARQ.Controllers.ParentController.shared.properties[val];
            }
            return result;
        }

        /**
             * @ngdoc service
             * @name services.Controllers:Services#testPassRepeatNumber
             * @param {string} val:valor a testear
             * @return {boolean} Devuelve si en la contraseña se repiten números
             * @methodOf OrangeFeSARQ.Services.Utils
             * @description
             * Devuelve si en la contraseña se repiten números
        **/

        testPassRepeatNumber(val: string): boolean {
            let pattern = /([0-9a-zA-Z]*)(\w{1})(\2){5,}([0-9a-zA-Z]*)/;
            if (val) {
                if (pattern.test(val)) {
                    return true;
                }
            }
            return false;
        }

        /**
             * @ngdoc service
             * @name services.Controllers:Services#testPassSequentialNumbers
             * @param {string} val:valor a testear
             * @param {string} minLength:valor mínimo que deberá contener la contraseña
             * @param {string} maxLength:valor máximo que deberá contener la contraseña
             * @return {boolean} Devuelve si en la contraseña hay tramos de msisdn y secuencias de numeros de mayor a menor y de menor a mayor
             * @methodOf OrangeFeSARQ.Services.Utils
             * @description
             * Devuelve si en la contraseña hay tramos de msisdn y secuencias de numeros de mayor a menor y de menor a mayor
        **/

        testPassSequentialNumbers(val: string, minLength: number, maxLength: number) {
            const pass: string = val;
            let notValidPass: any = ["123456", "87654321", "1234567", "7654321", "000000", "111111", "222222", "333333", "444444", "555555", "666666", "777777",
                "888888", "999999", "0000000", "2222222", "3333333", "4444444", "5555555", "6666666", "7777777", "8888888", "9999999", "12345678", "654321",
                "00000000", "22222222", "33333333", "44444444", "55555555", "66666666", "77777777", "88888888", "99999999", "8765432", "23456789", "3456789",
                "98765432", "9876543", "987654", "000000", "222222", "333333", "444444", "555555", "666666", "777777", "888888", "999999", "876543"];
            if (pass) {
                for (let i = 0; i <= notValidPass.length; i++) {
                    if (pass === notValidPass[i]) {
                        return true;
                    }
                }
                return false;
            }
        }
        /*FIN DE VALIDACIÓN DEL CAMBIO DE CONTRASEÑA (VER fixedPasswordChange O changePassword)*/

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:UtilsPae
         * @methodOf OrangeFeSARQ.Services
         * @description
         * funcion de validacion para formularios
         */
        validateForm(type: string, value: string) {
            let pattern, pattern1, pattern2;
            let status: boolean = false;
            let vm = this;

            if (type) {
                status = this.getStatus(type, status, vm, value);
                ({ pattern, status } = this.getStatusPattern(type, pattern, status, value));
                if (!status) {
                    switch (type) {

                        case 'mail':
                            pattern = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9\.]{5,30}$/;
                            pattern2 = /^[\s\S]{0,40}$/;
                            status = this.checkStatus2PaternAnd(pattern, value, pattern2, status);
                            break;
                        case 'ccc':
                            pattern = /^[0-9]\d{3}$/;
                            status = this.checkStatus(pattern, value, status);
                            break;
                        case 'iban':
                            pattern1 = /^\d{4}\s\d{4}\s\d{2}\s\d{10}$/;
                            pattern2 = /^[0-9]{20}$/;
                            status = this.checkStatus2PaternOr(pattern1, value, pattern2, status);
                            break;
                        case 'text40':
                            pattern = /^[a-zñA-ZÑ0-9\s]{5,40}$/;
                            status = this.checkStatus(pattern, value, status);
                            break;
                        case 'text20':
                            pattern = /^[a-zA-Z\s]{5,20}$/;
                            status = this.checkStatus(pattern, value, status);
                            break;
                        case 'num2':
                            pattern = /^[0-9]{0,2}$/;
                            status = this.checkStatus(pattern, value, status);
                            break;
                        case 'num3':
                            pattern = /^[0-9]{0,3}$/;
                            status = this.checkStatus(pattern, value, status);
                            break;
                        case 'alfNum':
                            pattern = /^[a-zA-Z0-9]{0,5}$/;
                            status = this.checkStatus(pattern, value, status);
                            break;
                        case 'nif':
                            pattern = /^[0-9]{8}[a-zA-Z]$/;
                            status = this.checkStatus(pattern, value, status);
                            break;
                        case 'nie':
                            pattern = /^[xyzXYZ][0-9]{7}[a-zA-Z]$/;
                            status = this.checkStatus(pattern, value, status);
                            break;
                        case 'passport':
                            status = true;
                            break;
                        case 'cif':
                            // pattern = /^[abcdefghjnpqrsuvvwABCDEFGHJNPQRSUVVW][0-9]{8}$/;
                            pattern = /^[abehABEH]{1}[0-9]{8}$/;
                            pattern1 = /^[kpqsKPQS]{1}[0-9]{7}[a-jA-J]$/;
                            pattern2 = /^[cdfgjlmnruvwCDFGJLMNRUVW]{1}[0-9]{7}[0-9a-jA-J]$/;
                            status = this.checkStatus3PaternOr(pattern, value, pattern1, pattern2, status);
                            break;

                        case 'pass':
                            pattern = /^.{6,8}$/;
                            status = this.checkStatus(pattern, value, status);
                            break;
                        case 'num4':
                            pattern = /^[0-9]\d{2,5}$/;
                            status = this.checkStatus(pattern, value, status);
                            break;
                        case 'num68':
                            pattern = /^[0-9]{6,8}$/;
                            status = this.checkStatus(pattern, value, status);
                            break;
                        default:
                            break;
                    }
                }
            }
            return status;
        };



        private getStatusPattern(type: string, pattern: any, status: boolean, value: string) {
            if (type === 'mobile' || type == 'fixed' || type == 'telephone' || type == 'cp') {
                if (type === 'mobile') {
                    pattern = /^[67]{8}$/;
                    status = this.checkStatus(pattern, value, status);
                }
                else if (type == 'fixed') {
                    pattern = /^[89]{8}$/;
                    status = this.checkStatus(pattern, value, status);
                }
                else if (type == 'telephone') {
                    pattern = /^[6-9]\d{8}$/;
                    status = this.checkStatus(pattern, value, status);
                }
                else if (type == 'cp') {
                    pattern = /^[0-9]{5}$/;
                    status = this.checkStatus(pattern, value, status);
                }
            }
            return { pattern, status };
        }

        private getStatus(type: string, status: boolean, vm: this, value: string) {
            if (type === 'TNC' || type == 'TNNCP' || type == 'NNCP' || type == 'NC') {
                if (type === 'TNC') {
                    status = this.checkStatusTNC(vm, value, status);
                }
                else if (type == 'TNNCP') {
                    status = this.checkStatusTNNCP(vm, value, status);
                }
                else if (type == 'NNCP') {
                    status = this.checkStatusNNCP(vm, value, status);
                }
                else if (type == 'NC') {
                    status = this.checkStatusNC(vm, value, status);
                }
            }
            return status;
        }

        private checkStatusNC(vm: this, value: string, status: boolean) {
            if (vm.validateForm('nif', value) || vm.validateForm('cif', value)) {
                status = true;
            }
            return status;
        }

        private checkStatusNNCP(vm: this, value: string, status: boolean) {
            if (vm.validateForm('nif', value) || vm.validateForm('cif', value)
                || vm.validateForm('nie', value) || vm.validateForm('passport', value)) {
                status = true;
            }
            return status;
        }

        private checkStatusTNNCP(vm: this, value: string, status: boolean) {
            if (vm.validateForm('telephone', value) || vm.validateForm('nif', value) || vm.validateForm('cif', value)
                || vm.validateForm('nie', value) || vm.validateForm('passport', value)) {
                status = true;
            }
            return status;
        }

        private checkStatusTNC(vm: this, value: string, status: boolean) {
            if (vm.validateForm('telephone', value) || vm.validateForm('nif', value) || vm.validateForm('cif', value)) {
                status = true;
            }
            return status;
        }

        private checkStatus3PaternOr(pattern: any, value: string, pattern1: any, pattern2: any, status: boolean) {
            if (pattern.test(value) || pattern1.test(value) || pattern2.test(value)) {
                status = true;
            }
            return status;
        }

        private checkStatus2PaternOr(pattern1: any, value: string, pattern2: any, status: boolean) {
            if (pattern1.test(value) || pattern2.test(value)) {
                status = true;
            }
            return status;
        }

        private checkStatus2PaternAnd(pattern: any, value: string, pattern2: any, status: boolean) {
            if (pattern.test(value) && pattern2.test(value)) {
                status = true;
            }
            return status;
        }

        private checkStatus(pattern: any, value: string, status: boolean) {
            if (pattern.test(value)) {
                status = true;
            }
            return status;
        }

		/**
         * @ngdoc method
         * @name services.Controllers:Services#trusHtml
         * @param {string} html texto enriquecido que se quiere interpretar como html
         * @methodOf services.Controllers:Services
         * @description
         * Mete los estilos que vengan del rich text
         */
        trusHtml(html: string): string {
            let vm = this;
            let $sce = vm.$injector.get('$sce');
            return $sce.trustAsHtml(html);
        }

        //El link que necesite llamar al chat ha de tener la inbenta-trigger.
        inbenta() {
            let chatAmena: HTMLElement = document.getElementsByClassName("inbenta-trigger")[0] as HTMLElement;
            chatAmena.click();
        }

        /**
         * @ngdoc service
         * @name services.Controllers:Services#owcsParamFormat
         * @param {string} value :Cadena OWCS
         * @param {string} paramOwcs :Valor parametrizable recibido por OWCS
         * @param {string} param : Valor parametrizable a remplazar por el de OWCS
         * @return {string} Devuelve si en la contraseña hay tramos de msisdn y secuencias de numeros de mayor a menor y de menor a mayor
         * @methodOf OrangeFeSARQ.Services.Utils
         * @description
         * Remplaza un valor parametrizable de un texto.
         **/
        owcsParamFormat(value: string, paramOwcs: string, param: string): string {
            return value.replace(paramOwcs, param);
        }

        /**
         * @ngdoc service
         * @name services.Controllers:Services#owcsParamFormat
         * @param {string} msisdn Msisdn al que se le solicita el código morgane
         * @param {any} products Los productos del cliente al que pertenece el msisdn que son recogidos del customerView
         * @return {string} Devuelve el código Morgane
         * @methodOf OrangeFeSARQ.Services.Utils
         * @description
         * Devuelve el código morgane del msisdn solicitado
         */
        getMorganeCode(msisdn: string, products: any) {
            let vm = this;

            if (vm.isFixedLine(+msisdn)) { // Solo los fijos tienen codigo Morgane
                for (let i = 0, length = products.length; i < length; i++) {
                    let productMorganeCodeArray: any = _.filter(products[i].productCharacteristic, { name: 'Código Morgane' });
                    // Comprobamos que el producto tiene codigo morgane
                    if (!_.isEmpty(productMorganeCodeArray)) {
                        let productMsisdnArray: any = _.filter(products[i].productCharacteristic, { name: 'Número fijo Asociado' });
                        // Comprobamos que el msisdn del producto coincida con el msisdn que se pide
                        if (!_.isEmpty(productMsisdnArray) && productMsisdnArray[0].value === msisdn) {
                            return productMorganeCodeArray[0].value;
                        }
                    }
                }
            }

            return null;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:Utils#owcsParamFormat
         * @methodOf OrangeFeSARQ.Services.Utils
         * @param {any} productCatalogStore info del productCatalog
         * @param {any} customerViewStore info del cliente
         * @description
         * Devuelve las líneas de un cliente ordenadas según la principal
         */
        getPrincipalLine(productCatalogStore: any, customerViewStore: any) {
            let vm = this;

            let lines = [];
            /// let PC = productCatalogStore._specification;
            let PC = productCatalogStore.productSpecification;
            let ranges;

            // Sacamos las líneas móviles
            let mobileLines = _.filter(customerViewStore.product, (product: any) => {
                return (product.ospProductType === 'PREPAGO' || product.ospProductType === 'POSPAGO');
            });

            for (let i in mobileLines) {
                ranges = this.loopMobileLinesGetRanges(mobileLines, i, PC, ranges, lines);
            }

            // Por ultimo órdenamos nuestro array con éste órden de prioridad: rango > antigüedad > orden en el CV(id)
            let orderLines = _(lines).chain()
                .sortBy('id2').reverse()
                .sortBy('startDate').reverse()
                /* .sortBy('range') */
                .sortBy('isPack').reverse().value();

            // Eliminamos id2, isPack. Iniciar id segun orden de principal.
            /* let orderLines2 = [];

            for (let i = 0; i < lines.length; i++) {
                let info = {
                    id: (i + 1),
                    msisdn: lines[i].msisdn,
                    rateName: lines[i].rateName,
                    rateGroupName: lines[i].rateGroupName,
                    range: lines[i].range,
                    startDate: lines[i].startDate,
                    siebelCode: lines[i].siebelCode,
                    bundle: lines[i].bundle,
                    pack: lines[i].pack,
                    isPack: lines[i].isPack
                };
                orderLines2.push(info);
            }; */
            return lines;
        }

        private loopMobileLinesGetRanges(mobileLines: any[], i: string, PC: any, ranges: any, lines: any[]) {
            if (mobileLines.length) {
                // Sacamos datos necesarios del customerView: rango, numero línea y fecha de activación
                let rateSiebelCode = _.find(mobileLines[i].productCharacteristic, (characteristic: any) => {
                    return characteristic.name === 'Código Tarifa Siebel';
                });
                let bundleSiebelCode = _.find(mobileLines[i].productCharacteristic, (characteristic: any) => {
                    return characteristic.name === 'Product Bundle Siebel';
                });
                let MSISDN = _.find(mobileLines[i].productCharacteristic, (characteristic: any) => {
                    return characteristic.name === 'MSISDN';
                });
                let startDate = mobileLines[i].startDate; // activacion tarifa
                // Buscamos en el productCatalog el resto de datos alineando las APIs con el "tmcode" (código de las tarifas)
                let ratePC;
                let isPack;
                let bucket;
                ({ ratePC, isPack, bucket, ranges } = this.findInProductCatalog(bundleSiebelCode, PC, ranges));
                /* if (ratePC && ratePC.productSpecCharacteristic) {
                    ranges = _.find(ratePC.productSpecCharacteristic, (spec: any) => {
                        return spec.name === 'VALORNEGOCIO';
                    });
                } */
                let info = {
                    id2: (i + 1),
                    msisdn: MSISDN ? MSISDN.value : '',
                    id: 0,
                    rateName: ratePC ? ratePC.name : '',
                    rateGroupName: ratePC ? ratePC.ospGroupName : '',
                    range: ranges ? ranges : '',
                    startDate: startDate,
                    siebelCode: rateSiebelCode ? rateSiebelCode.value : '',
                    bundle: bundleSiebelCode ? bundleSiebelCode.value : '',
                    pack: ratePC ? ratePC.ospFraseComercial : '',
                    isPack: isPack,
                    bucket: bucket
                };
                /* if (info.isPack) {
                    let clientData = JSON.parse(sessionStorage.getItem('clientData'));
                    if (!clientData) {
                        clientData = {};
                    }
                    clientData.principalLine = {
                        number: info.msisdn,
                        siebelCode: info.siebelCode,
                        pack: info.pack,
                        bundle: info.bundle
                    };
                    sessionStorage.setItem('clientData', JSON.stringify(clientData));
                } */
                /* if(info.isPack === true) {
                    lines.push(info);
                } */
                lines.push(info);
            }
            return ranges;
        }

        private findInProductCatalog(bundleSiebelCode: any, PC: any, ranges: any) {
            let isPack = false;
            let ratePC;
            let bucket;
            if (bundleSiebelCode && bundleSiebelCode.value) {
                ratePC = _.find(PC, (characteristic: any) => {
                    return (characteristic.id === bundleSiebelCode.value);
                });
            }
            if (ratePC && ratePC.ospFraseComercial && ratePC.ospFraseComercial !== null) { // la linea ppal tiene que ser conv
                isPack = true;
            }
            if (ratePC && ratePC.productSpecCharacteristic && ratePC.productSpecCharacteristic.length > 0
                && ratePC.productSpecCharacteristic[0].productSpecCharacteristicValue && ratePC.productSpecCharacteristic[0].productSpecCharacteristicValue.length > 0) {
                ranges = ratePC.productSpecCharacteristic[0].productSpecCharacteristicValue[0].value;
            }
            if (ratePC && ratePC.ospGroupName && ratePC.ospGroupName.toUpperCase() === 'CONVERGENTE_NAC' && ratePC.productSpecCharacteristic) {
                bucket = _.find(ratePC.productSpecCharacteristic, { ospCategory: 'BUCKET' });
                bucket = bucket && bucket.ospId ? bucket.ospId : '';
            }
            return { ratePC, isPack, bucket, ranges };
        }

        /**
         * devuelve la imagen contribuido por OWCS. storeComp: store de webcenter del componente, name: imagen que buscamos
         */
        getImageOwcs(storeComp: any, name: string) {
            let vm = this;
            let image;
            if (!_.isEmpty(storeComp.section.listImage)) {
                image = _.find(storeComp.section.listImage, { 'name': name });
            }
            if (image && image.imageFile_bloblink_) {
                // - image.imageFile_bloblink_ = image ? image.imageFile_bloblink_ : null;
                return image.imageFile_bloblink_;
            } else {
                return null;
            }
        }

        /**
         * @ngdoc service
         * @name services.Controllers:Services#getCustomerCharacteristic
         * @param {string} characteristicArray características de un cliente en el customerView
         * @param {name} products name de una característica específica
         * @methodOf OrangeFeSARQ.Services.Utils
         * @description
         * Devuelve valor correspondiente al name cado del characteristic del customerView
         */
        getCustomerCharacteristic(characteristicArray: Array<{ name: string, value: string }>, name: string): string {
            let vm = this;

            let characteristic = '';
            let i = 0;
            while (_.isEmpty(characteristic) && !_.isEmpty(characteristicArray) && i < characteristicArray.length) {
                if (name === characteristicArray[i].name) {
                    characteristic = characteristicArray[i].value;
                }
                i++;
            }
            return characteristic;
        }

        getInfoCustomer(customerViewStore: any) {
            let _data = {
                docType: "",
                docNum: ""
            }
            if (customerViewStore && customerViewStore.info && customerViewStore.info.individual) {
                _data.docType = customerViewStore.info.individual.ospIDtype;
                _data.docNum = customerViewStore.info.individual.id
            } else {
                _data.docType = customerViewStore.info.organization.ospIDtype;
                _data.docNum = customerViewStore.info.organization.id
            }
            return _data;

        }

        // ************ Storage Methods ************

        // Método que elimina el storage formulario perteneciente a un msisdn
        removeRequestStorage(storeName: string, msisdn: string): void {
            let vm = this;

            let storeRequestArray = [];
            let storeRequestObject: any = {};
            let sessionStorageManager = vm.$injector.get('sessionStorageSrv');

            storeRequestArray = sessionStorageManager.getEntry(storeName) ?
                JSON.parse(sessionStorageManager.getEntry(storeName)) : [];
            storeRequestObject = _.find(storeRequestArray, { msisdn: msisdn }) ?
                _.find(storeRequestArray, { msisdn: msisdn }) : {};
            if (!_.isEmpty(storeRequestObject)) {
                _.remove(storeRequestArray, storeRequestObject);
            }
            sessionStorageManager.removeEntry(storeName);
            if (!_.isEmpty(storeRequestArray)) {
                sessionStorageManager.setEntry(storeName, JSON.stringify(storeRequestArray));
            }
        }

        // Método para obtener el valor de un campo de un formulario almacenado
        // - en el storage perteneciente a un msisdn a partir de un objeto {name: 'nombreDelCampo'}
        getRequestStorage(obj: OrangeFeSARQ.Models.IObjName, msisdn: string, storeName: string) {
            let vm = this;

            let storeRemedyArray = [];
            let storeRemedy = [];
            let filterObject: any = {};
            let storeRemedyObject: any = {};
            let sessionStorageManager = vm.$injector.get('sessionStorageSrv');

            storeRemedyArray = sessionStorageManager.getEntry(storeName) ?
                JSON.parse(sessionStorageManager.getEntry(storeName)) : [];
            storeRemedyObject = _.find(storeRemedyArray, { msisdn: msisdn }) ?
                _.find(storeRemedyArray, { msisdn: msisdn }) : {};
            if (!_.isEmpty(storeRemedyObject)) {
                storeRemedy = storeRemedyObject.request ? storeRemedyObject.request : [];
                filterObject = _.find(storeRemedy, obj) ? _.find(storeRemedy, obj) : {};
                if (filterObject.value) {
                    return filterObject.value;
                } else {
                    return '';
                }
            } else {
                return '';
            }
        }

        // Método que rellena los campos de nuestro formulario a partir de un objeto {name: 'nombreDelCampo'},
        // - la razón (valor del campo), msisdn y el nombre del Storage formulario alamcenado en el sessionStorage
        fillRequestStorage(obj: OrangeFeSARQ.Models.IObjName, reason: any, msisdn: string, storeName: string): void {
            let vm = this;

            let storeRemedyArray = [];
            let storeRemedy = [];
            let filterObject: any = {};
            let storeRemedyObject: any = {};
            let sessionStorageManager = vm.$injector.get('sessionStorageSrv');

            storeRemedyArray = sessionStorageManager.getEntry(storeName) ?
                JSON.parse(sessionStorageManager.getEntry(storeName)) : [];
            storeRemedyObject = _.find(storeRemedyArray, { msisdn: msisdn }) ?
                _.find(storeRemedyArray, { msisdn: msisdn }) : {};

            ({ storeRemedy, filterObject } = this.findFilterObject(storeRemedyObject, storeRemedy, storeRemedyArray, filterObject, obj));
            filterObject.name = obj.name;
            filterObject.value = reason;
            storeRemedy.push(filterObject);
            storeRemedyObject = { msisdn: msisdn, request: storeRemedy };
            storeRemedyArray.push(storeRemedyObject);
            sessionStorageManager.removeEntry(storeName);
            sessionStorageManager.setEntry(storeName, JSON.stringify(storeRemedyArray));
        }

        private findFilterObject(storeRemedyObject: any, storeRemedy: any[], storeRemedyArray: any[], filterObject: any, obj: Models.IObjName) {
            if (!_.isEmpty(storeRemedyObject)) {
                storeRemedy = storeRemedyObject.request ? storeRemedyObject.request : [];
                _.remove(storeRemedyArray, storeRemedyObject);
                if (!_.isEmpty(storeRemedy)) {
                    filterObject = _.find(storeRemedy, obj) ? _.find(storeRemedy, obj) : {};
                    if (!_.isEmpty(filterObject)) {
                        _.remove(storeRemedy, filterObject);
                        if (filterObject.name === 'reason2') {
                            _.remove(storeRemedy, { name: 'reason3' });
                        }
                        if (filterObject.name === 'reason1') {
                            _.remove(storeRemedy, { name: 'reason2' });
                            _.remove(storeRemedy, { name: 'reason3' });
                        }
                    }
                }
            }
            return { storeRemedy, filterObject };
        }

        // Método que elimina todos los storage almacenados en el sessionStorage (Para que podamos usarlo todos,
        // - se puede ir incrementando los storage a eliminar por parte de todos los proyectos SOE)
        removeAllStorages(): void {
            let vm = this;

            let sessionStorageManager = vm.$injector.get('sessionStorageSrv');
            sessionStorageManager.removeEntry('searchparam');
            sessionStorageManager.removeEntry('searchval');
            sessionStorageManager.removeEntry('errorurlsearch');
            sessionStorageManager.removeEntry('idActualVap');
            sessionStorageManager.removeEntry('credentialInformation');
            sessionStorageManager.removeEntry('unsubscribeClient');
            sessionStorageManager.removeEntry('principalMsisdn');
            sessionStorageManager.removeEntry('caseRequestStorage');
            sessionStorageManager.removeEntry('remedyRequestStorage');
            sessionStorageManager.removeEntry('personalDataStore');
        }

        // *********************************************************************** //

    }

    angular.module('utils', [])
        .service('utils', Utils);
}
