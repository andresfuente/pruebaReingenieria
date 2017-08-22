module OrangeFeSARQ.Services {
    'use strict';

    export class CookieStoreService extends OrangeFeSARQ.Controllers.ParentController {

        static $inject = ['$injector'];
        private $scope;
        private $cookies;
        public msisdn: string;
        private productInventorySrv: OrangeFeSARQ.Services.ProductInventoryService;
        private productCatalogStore: OrangeFeSARQ.Services.ProductCatalogStore;
        private mainCookie: string; // Texto plano con duplas "parámetro = valor" (x=y) por cada atributo solicitado y separando dichos atributos con un pipe (|). 
        private COOKIEFIXED: string = '_nfc_';
        private COOKIEMOBILE: string = '_nmc_';

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
            vm.initComp();
            vm.setListener();
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers.CookieStoreService#setInjections
         * @methodOf parentFillStore.Controllers:ParentFillStoreCtrl
         * @param {any} $injector: inyector para recoger dependencias
         * @description
         * Inyecta las dependencias 
         */
        setInjections($injector) {
            let vm = this;
            vm.$cookies = $injector.get('$cookies');
            vm.productCatalogStore = $injector.get('productCatalogStore');
            vm.productInventorySrv = $injector.get('productInventorySrv');
            vm.$scope = $injector.get('$rootScope');

        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers.CookieStoreService#setListener
         * @methodOf parentFillStore.Controllers:ParentFillStoreCtrl
         * @description
         * Mantiene a la escucha el msisdn
         */
        setListener() {
            let vm = this;
            vm.$scope.$watch(
                () => vm.msisdnStore.msisdn,
                (newValue, oldValue) => {
                    if (newValue !== oldValue) {
                        vm.initComp();
                    }
                }
            );
        }

        /**
		 * @ngdoc method
		 * @name OrangeFeSARQ.Controllers.CookieStoreService#initComp
		 * @methodOf parentFillStore.Controllers:ParentFillStoreCtrl
		 * @description
		 * Inicializa la lógica del componente 
		 */
        initComp() {
            let vm = this;
            if (vm.msisdnStore.msisdn) {
                vm.msisdn = vm.msisdnStore.msisdn;
            } else {
                if (vm.customerViewStore.loginData && vm.customerViewStore.loginData.userType === 'MSISDN') {
                    vm.msisdn = vm.customerViewStore.loginData.user;
                }
            }
            // vm.msisdn = vm.msisdnStore.msisdn ? vm.msisdnStore.msisdn : vm.customerViewStore.loginData.user;
            if (vm.msisdn) {
                vm.setParamsInventory();
            }
        }



        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers.CookieStoreService#setParamsInventory
         * @methodOf parentFillStore.Controllers:ParentFillStoreCtrl
         * @description
         * setea los parametros que se recogen de productInventory
         */
        setParamsInventory() {
            let vm = this;
            vm.productInventorySrv.getServicesContracted(vm.msisdn, vm.compName)
                .then((response) => { vm.isServiceActivatedResponse(true, response) })
                .catch((error) => { vm.isServiceActivatedResponse(false, error) });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers.CookieStoreService#isServiceActivatedResponse
         * @methodOf parentFillStore.Controllers:ParentFillStoreCtrl
         * @description
         * setea los parametros que se recogen de productInventory
         */
        isServiceActivatedResponse(type: boolean, response: any) {
            let vm = this;
            let cookieObj;
            cookieObj = {};
            cookieObj.tv = 0;
            cookieObj.oc = 0;
            cookieObj.pt = 0;
            cookieObj.cp = 0;
            cookieObj.c = 0;
            cookieObj.p = 0;
            cookieObj.t = 0;
            cookieObj.a = 0;
            if (type && response && response.length) {
                let servicesList = response;
                let ORANGETV = 'orange tv'; // Servicio de orange tv
                let TRANQUILIDAD = "oc1b"; // Activado servicio de tranquilidad
                for (let i = 0; i < servicesList.length; i++) {
                    let service = servicesList[i];
                    let serviceName: string;
                    // La respuesta varia para fijo y movil 
                    if (vm.utils.isFixedLine(vm.msisdn)) {
                        serviceName = service.description;
                    } else {
                        for (var k = 0; k < service.productSpecification.length && !serviceName; k++) {
                            var productSpec = service.productSpecification[k];
                            if (productSpec.id) {
                                serviceName = productSpec.id;
                            }
                        }
                    }

                    // TV
                    let regex = new RegExp(ORANGETV, 'gi'); // g para que sea global, i - para que no sea sensible a mayusculas/minusculas
                    if (!cookieObj.tv) { cookieObj.tv = regex.test(serviceName) ? 1 : 0; }
                    // Tranquilidad 
                    regex = new RegExp(TRANQUILIDAD, 'gi'); // g para que sea global, i - para que no sea sensible a mayusculas/minusculas
                    if (!cookieObj.oc) { cookieObj.oc = regex.test(serviceName) ? 1 : 0; }
                }
            }
            vm.setParams(cookieObj);
        }


        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers.CookieStoreService#initComp
         * @methodOf parentFillStore.Controllers:ParentFillStoreCtrl
         * @param {any} cookieObj: Objeto con los valores de la cookie
         * @description
         * Setea el resto de parametros
         */
        setParams(cookieObj) {
            let vm = this;
            let cv = vm.customerViewStore.info;
            for (var i = 0, find; i < cv.product.length && !find; i++) {
                var product = cv.product[i];
                if (product.ospProductType.match(/^(POSPAGO|PREPAGO|Acceso fijo & Internet)$/gi)) {
                    let type = vm.utils.isFixedLine(vm.msisdn) ? 'Número fijo Asociado' : 'MSISDN';
                    let charasteristic = vm.utils.findByName(type, product.productCharacteristic);
                    if (charasteristic && vm.msisdn === charasteristic) {
                        cookieObj.c = vm.setParamC();
                        cookieObj.p = vm.setParamP(product.ospProductType);
                        cookieObj.t = vm.setParamT(product);
                        if (_.isArray(product.agreement) && !_.isEmpty(product.agreement)) {
                            cookieObj.cp = vm.setParamCP(product.agreement);
                        }
                        find = true;
                    }
                }
            }
            cookieObj.a = vm.setParamA();
            cookieObj.pt = vm.setParamPT();
            vm.cookieToString(cookieObj);
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers.CookieStoreService#setParamC
         * @methodOf parentFillStore.Controllers:ParentFillStoreCtrl
         * @description
         * Setea edl parametro del tipo de usuario
         */
        setParamC() {
            let vm = this;
            let cv = vm.customerViewStore.info;
            // { 1: residencial, 2: empresas, 3: autonomos }
            let properties = { residencial: 1, empresas: 2, autonomos: 3 }
            let search = cv.ospMobileCustomerSegment || '';
            let result;
            if (search === 'EMPRESA') {
                return cv.ospMobileCustomerSubSegment.match(/^AUTONOMO/g) ? 3 : 2;
            }
            return 1;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers.CookieStoreService#setParamP
         * @methodOf parentFillStore.Controllers:ParentFillStoreCtrl
         * @description
         * Setea edl parametro del tipo de PAGO
         */
        setParamP(type: string): number {
            let vm = this;
            let result: number = 0;
            if (vm.utils.isFixedLine(vm.msisdn)) {
                return 3;
            } else if (type === 'POSPAGO') {
                return 1
            } else {
                return 2
            }
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers.CookieStoreService#setParamT
         * @methodOf parentFillStore.Controllers:ParentFillStoreCtrl
         * @description
         * Setea edl parametro del nombre de tarifa
         */
        setParamT(value): string {
            let vm = this;
            let fixed = vm.utils.isFixedLine(vm.msisdn);
            let search = fixed ? 'Código Morgane' : 'Código Tarifa';
            let code = vm.utils.findByName(search, value.productCharacteristic);

            let specSearch = fixed ? 'ospMorganeCode' : 'id';
            let spec = vm.productCatalogStore.getCatalogSpecificationByTmcode(code, specSearch);
            if (spec) {
                return `${code}, ${spec.ospTitulo}`;
            }
            return code ? code : 'noName';
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Controllers.CookieStoreService#setParamCP
         * @methodOf parentFillStore.Controllers:ParentFillStoreCtrl
         * @description
         * Setea edl parametro del nombre de tarifa
         */
        setParamCP(list: any[]): number {
            let vm = this;
            if (list && list.length) {

                let lowerCP = new Date('12-31-2100');
                let date = new Date(new Date().setMonth(new Date().getMonth() + 3)); // Fecha de hoy + 3 meses
                for (var i = 0; i < list.length; i++) {
                    var agreement = list[i];
                    if (agreement.agreementPeriod && agreement.agreementPeriod.endDateTime) {
                        let cp = new Date(agreement.agreementPeriod.endDateTime);
                        if (cp < lowerCP) {
                            lowerCP = cp;
                        }
                    }
                }
                return lowerCP >= date ? 0 : 1;
            }
            return 0;
        }




        // TODO Autorizado PAE
        setParamA(): number {
            let vm = this;
            let cv = vm.customerViewStore.info;
            // SI solo vale para PAE, invertir la condicion
            if (vm.genericConstant.site === 'eCareEmpresas') {
                // si se ha logado con TELEFONO, no es autorizado, con documento si
                if (vm.customerViewStore.loginData && vm.customerViewStore.loginData.userType === 'MSISDN') {
                    return 0;
                }
                return 1;
            }
            if (cv && cv.ospMobileCustomerSegment === 'EMPRESA') {
                return 1;
            }
            return 0;
        }

        // TODO Puntos
        setParamPT(): any {
            let vm = this;
            if (vm.genericConstant.site === 'eCareEmpresas') {
                // TODO recoger puntos
            }
            return 0; // No Aplica 

        }

        cookieToString(cookie) {
            let vm = this;
            let mainCookie: string = '';
            for (var key in cookie) {
                if (cookie.hasOwnProperty(key)) {
                    mainCookie = mainCookie ? mainCookie.concat('|') : mainCookie;
                    mainCookie = mainCookie.concat(`${key}=${cookie[key]}`)
                }
            }
            vm.mainCookie = decodeURIComponent(mainCookie);
            vm.saveCookie();
        }

        saveCookie() {
            let vm = this;
            let cookieKey: string;
            if (vm.utils.isFixedLine(vm.msisdn)) {
                cookieKey = vm.COOKIEFIXED;
            } else {
                cookieKey = vm.COOKIEMOBILE;
            }
            //vm.$cookies.put(cookieKey, vm.mainCookie);
            document.cookie = `${cookieKey}=${vm.mainCookie};domain=.orange.es`;
        }

    }



}
