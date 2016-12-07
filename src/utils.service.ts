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
                searchUrl = "individualPublicId";
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
            for (let i: number = 0; i < array.length; i++) {
                if (array[i].name.replace(" ", "") === name.replace(" ", "")) {
                    return array[i][value];
                }
            }
            return null;
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
                if (!angular.element(document.body).scope().$$phase) {
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
		
		checkFormatEmail(email: string){
			let vm = this;
			let format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
			if (email.match(format)) {
				return true;
			}
			return false;
			
		}

    }
    angular.module('utils', [])
        .service('utils', Utils);
}
