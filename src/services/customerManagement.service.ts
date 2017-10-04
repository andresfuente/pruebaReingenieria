module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.CustomerManagementSrv
     * @description
     * Servicio que realiza la llamada a la API CustomerManagement.
     */
    export class CustomerManagementSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        // Injection vars
        public genericConstant;
        public informationCenterSrv;

        private url: string;

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:CustomerManagementSrv#constructor
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf OrangeFeSARQ.Services:CustomerManagementSrv
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
         * @name OrangeFeSARQ.Services:CustomerManagementSrv#setInjections
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf OrangeFeSARQ.Services:CustomerManagementSrv
         * @description
         * Incluye las dependencias necesarias
         */
        setInjections($injector) {
            let vm = this;

            vm.url = vm.genericConstant.customerManagement;
            vm.informationCenterSrv = $injector.get('InformationCenterSrv');
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:CustomerManagementSrv#postMobileInformation
         * @methodOf OrangeFeSARQ.Services:CustomerManagementSrv
         * @param {object} body cuerpo de la informacion del post.
         * @param {string} id Identificador.
         * @param {string} brand Orange o Amena.
         * @param {string} comp Nombre del componente que llama al servicio.
         * @param {boolean} showMessage (opcional) Mostrar o no los mensajes de información.
         * @description 
         * @returns {object} Devuelve una promesa con el response
         */
        postMobileInformation(body, id, brand, comp, showMessage = true, messageOk = 'La actualización de los datos no es inmediata. Sus datos se verán reflejados en su siguiente inicio de sesión.') {
            let vm = this;

            let _search: Object = {
                queryParams: body,
                urlParams: [brand, 'customer', '?id=' + id]
            };
            return vm.httpPut(vm.url, _search, comp)
                .then(function (response) {
                    if (showMessage) {
                        vm.informationCenterSrv.addInformationMessage(1, 'Datos actualizados', messageOk);
                    }
                    return response.data;

                })
                .catch(function (error) {
                    if (showMessage) {
                        vm.informationCenterSrv.addInformationMessage(2, error.data.error.title, error.data.error.desc);
                    }
                    return error;
                });
        };

        getDonateMegas(id, componentName: string): ng.IPromise<any> {
            let vm = this;

            let BRAND = vm.genericConstant.brand;
            let METHOD = 'donorMegas';
            let qParams = {
                customer: id
            };

            let _search: Object = {
                urlParams: [BRAND, METHOD],
                queryParams: qParams
            };

            return vm.httpPost(vm.url, _search, componentName)
                .then(function (response) {
                    if (response.data) {
                        return response.data;
                    }
                    throw response.data.error;
                })
                .catch(function (error) {
                    return error.data;
                });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:CustomerManagementSrv#checkBlacklist
         * @param {Object} body documento del cliente y tipo de comprobación. BA -> BlacklistAsnef
         * @param {string} comp nombre del componente
         * @methodOf OrangeFeSARQ.Services:CustomerManagementSrv
         * @description
         * Devuelve si el cliente es blacklist o asnef
         * @returns {Object} Devuelve una promesa con el response
         */
        checkBlacklist(body, comp: string) {
            let vm = this;

            let _search: Object = {
                queryParams: {
                    typeRequest: 1,
                    numberRequiredLines: 1,
                    blackList: true
                },
                urlParams: ['customer'],
                body: body
            };

            return vm.httpPostFull(vm.genericConstant.customerManagement, _search, comp)
                .then(function (response) {
                    if (response.data.error && response.data.error !== null) {
                        throw response.data.error;
                    }
                    return response.data;
                })
                .catch(function (error) {
                    return error.data;
                });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:CustomerManagementSrv#postPrescoring
         * @param {number} typeRequest tipo de Acto comercial
         * @param {string} numberRequiredLines numero de lineas solicitadas
         * @param {Object} body datos a consultar
         * @param {string} comp nombre del componente
         * @methodOf OrangeFeSARQ.Services:CustomerManagementSrv
         * @description
         * Devuelve el riesgo de prescoring del cliente
         * @returns {Object} Devuelve una promesa con el response
         */
        postPrescoring(typeRequest, numberRequiredLines, body, comp: string) {
            let vm = this;

            let _search: Object = {
                queryParams: {
                    typeRequest: typeRequest,
                    numberRequiredLines: numberRequiredLines,
                    blackList: false
                },
                urlParams: ['customer'],
                body: body
            };

            return vm.httpPostFull(vm.genericConstant.customerManagement, _search, comp)
                .then(function (response) {
                    if (response.data.error && response.data.error !== null) {
                        throw response.data.error;
                    }
                    return response.data;
                })
                .catch(function (error) {
                    return error.data;
                });
        }
    }
}
