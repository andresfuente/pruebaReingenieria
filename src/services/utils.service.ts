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
                searchUrl = 'publicKey';
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
                    if (array[i].name.replace(" ", "") === name.replace(" ", "")) {
                        return array[i][value];
                    }
                }
                return null;
            }
        }

        findByInArray(array, value, campo = 'name') {
            for (let i = 0; i < array.length; i++) {
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
                return '/';
            } else if (oData && oData.includes('http')) {
                return oData;
            } else {
                return '/' + oData;
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
            let format = /^[A-Za-z0-9._]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
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
                    // Si estoy buscando el id
					//verifico si el producto es relativo a una línea prepago, pospago o fijo
					if(products[i].ospProductType.match(/^(POSPAGO|PREPAGO|Número teléfono fijo VoIP)$/)) {
						let sizePC = products[i].productCharacteristic.length;
						if (products[i].productCharacteristic && sizePC > 0) {                        
							
								let productCh = products[i].productCharacteristic;
								let sizeCh = productCh.length;
								// Recorro el product caracteristic de este producto
								let it = 0;
								while (it < sizeCh && !found) {
									if (productCh[it].name && productCh[it].name === 'MSISDN' && productCh[it].value === msisdn) {
										found = true;
										return products[i].ospProductType;
									}
									++it;
								}
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
			let result:string;
		    if(OrangeFeSARQ.Controllers.ParentController.shared.properties){
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
            let notValidPass: any = ["123456","87654321","1234567","7654321","000000","111111","222222","333333","444444","555555","666666","777777",
            "888888","999999","0000000","2222222","3333333","4444444","5555555","6666666","7777777","8888888","9999999","12345678","654321",
            "00000000","22222222","33333333","44444444","55555555","66666666","77777777","88888888","99999999","8765432","23456789","3456789",
            "98765432","9876543","987654","000000","222222","333333","444444","555555","666666","777777","888888","999999", "876543"];
            if (pass) {
                for(let i = 0; i <= notValidPass.length; i++){
                    if(pass === notValidPass[i]){
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
                switch (type) {
                    case 'mobile':
                        pattern = /^[67]{8}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;

                    case 'fixed':
                        pattern = /^[89]{8}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;

                    case 'telephone':
                        pattern = /^[6-9]\d{8}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;

                    case 'cp':
                        pattern = /^[0-9]{4}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;

                    case 'mail':
                        pattern = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9\.]+/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;

                    case 'ccc':
                        pattern = /^[0-9]\d{3}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;

                    case 'iban':
                        pattern1 = /^\d{4}\s\d{4}\s\d{2}\s\d{10}$/;
                        pattern2 = /^[0-9]{20}$/;
                        if (pattern1.test(value) || pattern2.test(value)) {
                            status = true;
                        }
                        break;

                    case 'text40':
                        pattern = /^[a-zñA-ZÑ0-9\s]{5,40}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;

                    case 'text20':
                        pattern = /^[a-zA-Z\s]{5,20}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;

                    case 'num2':
                        pattern = /^[0-9]{0,2}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;

                    case 'alfNum':
                        pattern = /^[a-zA-Z0-9]{0,5}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;
                    case 'nif':
                        pattern = /^[0-9]{8}[a-zA-Z]$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;
                    case 'nie':
                        pattern = /^[xyzXYZ][0-9]{7}[a-zA-Z]$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;
                    case 'passport':
                        status = true;
                        
                        break;
                    case 'cif':
                        // pattern = /^[abcdefghjnpqrsuvvwABCDEFGHJNPQRSUVVW][0-9]{8}$/;
                        pattern = /^[abehABEH][0-9]{8}$/;
                        pattern1 = /^[kpqsKPQS][0-9]{7}[a-jA-J]$/;
                        pattern2 = /^[cdfgjlmnruvwCDFGJLMNRUVW][0-9]{7}[0-9a-jA-J]$/;
                        if (pattern.test(value) || pattern1.test(value) || pattern2.test(value)) {
                            status = true;
                        }
                        break;
                    case 'TNC':
                        if (vm.validateForm('telephone', value) || vm.validateForm('nif', value) || vm.validateForm('cif', value)) {
                            status = true;
                        }
                        break;
                    case 'TNNCP':
                        if (vm.validateForm('telephone', value) || vm.validateForm('nif', value) || vm.validateForm('cif', value)
                                || vm.validateForm('nie', value)|| vm.validateForm('passport', value)) {
                            status = true;
                        }
                        break;
                    case 'NNCP':
                        if (vm.validateForm('nif', value) || vm.validateForm('cif', value)
                                || vm.validateForm('nie', value)|| vm.validateForm('passport', value)) {
                            status = true;
                        }
                        break;
                    case 'NC':
                        if (vm.validateForm('nif', value) || vm.validateForm('cif', value)) {
                            status = true;
                        }
                        break;
                    case 'pass':
                        pattern = /^.{6,8}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;
                    case 'num4':
                        pattern = /^[0-9]\d{2,5}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;
                    case 'num68':
                        pattern = /^[0-9]{6,8}$/;
                        if (pattern.test(value)) {
                            status = true;
                        }
                        break;

                    default:
                        break;
                }
            } else {
                status = false;
            }

            return status;
        };
		
		
		
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
        inbenta(){
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
                    let productMorganeCodeArray: any = _.filter(products[i].productCharacteristic, {name: 'Código Morgane'});
                    // Comprobamos que el producto tiene codigo morgane
                    if (!_.isEmpty(productMorganeCodeArray)) {
                        let productMsisdnArray: any = _.filter(products[i].productCharacteristic, {name: 'Número fijo Asociado'});
                        // Comprobamos que el msisdn del producto coincida con el msisdn que se pide
                        if (!_.isEmpty(productMsisdnArray) && productMsisdnArray[0].value === msisdn) {
                            return productMorganeCodeArray[0].value;
                        }
                    }
                }
            }

            return null;
        }

        getPrincipalLine(productCatalogStore: any, customerViewStore: any) {
            
            let vm = this;
            let lines = [];
            let PC = productCatalogStore._specification;

            // Sacamos las líneas móviles
            let mobileLines = _.filter(customerViewStore.product, (product: any) => {
               return (product.ospProductType === 'PREPAGO' || product.ospProductType === 'POSPAGO')
            });

            for(let i in mobileLines){
                if(mobileLines.length){

                    //Sacamos datos necesarios del customerView: rango, numero línea y fecha de activación

                    let rate = _.find(mobileLines[i].productCharacteristic, (characteristic: any) => {
                        return characteristic.name === 'Código Tarifa';
                    });
                    let MSISDN = _.find(mobileLines[i].productCharacteristic, (characteristic: any) => {
                        return characteristic.name === 'MSISDN';
                    });
                    let startDate = mobileLines[i].startDate;
                    
                    //Buscamos en el productCatalog el resto de datos alineando las APIs con el "tmcode" (código de las tarifas)

                    let isPack = false;

                    let ratePC = _.find(PC, (characteristic: any) =>{ 
                        return (characteristic.id === rate.value);
                    });

                    if(ratePC.ospTypeService === "CONVERGENTE"){
                        isPack = true;
                    };
                    
                    let ranges = _.find(ratePC.productSpecCharacteristic, (spec: any) => {
                        return spec.name === 'VALORNEGOCIO';
                    });

                    let info = {
                        id2: (i+1),
                        msisdn: MSISDN.value,
                        id: 0,                        
                        rateName: ratePC.name,
                        rateGroupName: ratePC.ospGroupName,
                        range: ranges.productSpecCharacteristicValue[0].value,
                        startDate: startDate,
                        tmCode: rate.value,                        
                        isPack: isPack
                        
                    };

                    lines.push(info);
                }
            }
            
            //Por ultimo órdenamos nuestro array con éste órden de prioridad: rango > antigüedad > orden en el CV(id)
            
            let orderLines = _(lines).chain().sortBy('id2').reverse().sortBy('startDate').reverse().sortBy('range').sortBy('isPack').reverse().value();

            //Eliminamos id2, isPack. Iniciar id segun orden de principal.
            let orderLines2 = [];

            for(let i = 0; i < lines.length; i++){
                
                let info = {
                    id: (i+1),
                    msisdn: lines[i].msisdn,                                            
                    rateName: lines[i].rateName,
                    rateGroupName: lines[i].rateGroupName,
                    range: lines[i].range,
                    startDate: lines[i].startDate,
                    tmCode: lines[i].tmCode,
                    isPack: lines[i].isPack
                    
                };
                orderLines2.push(info);
                
                
            }; 
            return orderLines2;
        }
    }

    angular.module('utils', [])
        .service('utils', Utils);
}
