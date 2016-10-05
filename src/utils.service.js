var OrangeFeSARQ;
(function (OrangeFeSARQ) {
    var Services;
    (function (Services) {
        'use strict';
        var Utils = (function () {
            function Utils($injector) {
                this.$injector = $injector;
            }
            Utils.prototype.escapeHtml = function (source) {
                var entityMap = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': '&quot;',
                    "'": '&#39;',
                    "/": '&#x2F;'
                };
                return String(source).replace(/[&<>"'\/]/g, function (s) { return entityMap[s]; });
            };
            Utils.prototype.unescapeHtml = function (source) {
                var entityMap = {
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
                    .replace("&gt;", ">");
            };
            Utils.prototype.extractJs = function (source) {
                var js = /<script\b[^>]*src="(.*?)"><\/script>/gm;
                var scriptsInc = [];
                var m;
                do {
                    m = js.exec(source);
                    if (m) {
                        scriptsInc.push(m[1]);
                    }
                } while (m);
                return scriptsInc;
            };
            Utils.prototype.formatMBRound = function (value) {
                if (value) {
                    value = parseInt(value);
                    if (value >= 1024) {
                        value = value / 1024;
                        value = Math.floor(value * 100) / 100;
                    }
                }
                return value;
            };
            Utils.prototype.formatMBTrunc = function (value) {
                if (value) {
                    value = parseInt(value);
                    if (value >= 1024) {
                        value = value / 1024;
                        value = Math.floor(value * 100) / 100;
                    }
                }
                return value;
            };
            Utils.prototype.extractProperties = function (obj) {
                var properties = "";
                for (var prop in obj) {
                    if (typeof obj[prop] != 'function') {
                        properties += prop + obj[prop];
                    }
                }
                return properties;
            };
            Utils.prototype.fillcustomerViewStore = function (value, inputDocument) {
                var vm = this;
                var userService;
                var customerViewStore;
                var searchUrl;
                userService = vm.$injector.get('userSrv');
                inputDocument = inputDocument.trim().toUpperCase();
                if (inputDocument == "MSISDN") {
                    searchUrl = "publicKey";
                }
                else if (inputDocument === 'NIF' && vm.isNifNie(value)) {
                    searchUrl = "individualPublicId";
                }
                else if (inputDocument === 'CIF' && vm.isCif(value)) {
                    searchUrl = "individualPublicId";
                }
                else if (inputDocument === 'PASSPORT' || inputDocument === 'RESIDENCE') {
                    searchUrl = "individualPublicId";
                }
                return userService.getUser(searchUrl, value)
                    .then(function (response) {
                    return response;
                })
                    .catch(function (error) {
                    return error;
                });
            };
            Utils.prototype.isNifNie = function (document) {
                var numero;
                var letr;
                var letra;
                var expresion_regular_dni;
                expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
                if (document.indexOf('X') == 0 || document.indexOf('Y') == 0 || document.indexOf('T') == 0) {
                    return (/^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i.test(document));
                }
                if (expresion_regular_dni.test(document) == true) {
                    numero = parseInt(document.substr(0, document.length - 1));
                    letr = document.substr(document.length - 1, 1);
                    numero = numero % 23;
                    letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
                    letra = letra.substring(numero, numero + 1);
                    if (letra != letr.toUpperCase()) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            };
            Utils.prototype.isCif = function (cif) {
                cif = cif.toUpperCase();
                var cifRegEx1 = /^[ABEH][0-9]{8}$/i;
                var cifRegEx2 = /^[KPQS][0-9]{7}[A-J]$/i;
                var cifRegEx3 = /^[CDFGJLMNRUVW][0-9]{7}[0-9A-J]$/i;
                if (cifRegEx1.test(cif) || cifRegEx2.test(cif) || cifRegEx3.test(cif)) {
                    var control = cif.charAt(cif.length - 1);
                    var suma_A = 0;
                    var suma_B = 0;
                    for (var i = 1; i < 8; i++) {
                        if (i % 2 == 0)
                            suma_A += parseInt(cif.charAt(i));
                        else {
                            var t = (parseInt(cif.charAt(i)) * 2) + "";
                            var p = 0;
                            for (var j = 0; j < t.length; j++) {
                                p += parseInt(t.charAt(j));
                            }
                            suma_B += p;
                        }
                    }
                    var suma_C = (suma_A + suma_B) + "";
                    var suma_D = (10 - parseInt(suma_C.charAt(suma_C.length - 1))) % 10;
                    var letras = "JABCDEFGHI";
                    if (control >= "0" && control <= "9")
                        return (parseInt(control) == suma_D);
                    else
                        return (control == letras.charAt(suma_D));
                }
                else
                    return false;
            };
            Utils.prototype.getPrepagoLines = function (products) {
            };
            Utils.prototype.getPospagoLines = function (products) {
            };
            Utils.prototype.getContract = function (products, msisdn) {
                for (var i in products) {
                    if (products[i].productCharacteristic) {
                        for (var j in products[i].productCharacteristic) {
                            if (products[i].productCharacteristic[j].name === "MSISDN") {
                                if (products[i].productCharacteristic[j].value === msisdn) {
                                    return products[i].ospProductType;
                                }
                            }
                        }
                    }
                }
            };
            Utils.prototype.findByName = function (name, array) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].name.replace(" ", "") === name.replace(" ", "")) {
                        return array[i].value;
                    }
                }
                return null;
            };
            Utils.prototype.doDigest = function () {
                if (navigator.userAgent.indexOf('PhantomJS') < 1) {
                    if (!angular.element(document.body).scope().$$phase) {
                        angular.element(document.body).scope().$apply();
                    }
                }
            };
            Utils.$inject = ['$injector'];
            return Utils;
        }());
        Services.Utils = Utils;
        angular.module('utils', [])
            .service('utils', Utils);
    })(Services = OrangeFeSARQ.Services || (OrangeFeSARQ.Services = {}));
})(OrangeFeSARQ || (OrangeFeSARQ = {}));
//# sourceMappingURL=utils.service.js.map