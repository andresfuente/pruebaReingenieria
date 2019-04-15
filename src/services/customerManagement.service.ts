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

        public scorignCodeErrorAcept = [
            "000031", "000030", "000010", "000000", "000021", "000020", "000011", "000001"
        ];
        public scorignCodeErrorPdt = [
            "100001", "100000", "170700", "070700", "070701", "170701", "199900", "199901",
            "150500", "152541", "151510", "151520", "151530", "151540", "152500", "152510",
            "152520", "152530", "152540", "000040", "150501", "151501", "151511", "151521",
            "151531", "151541", "152501", "152511", "152521", "152531", "151500"
        ];
        
        public scorignCodeErrorVerify = [
            "160620", "160621", "160631", "160630", "160690", "160660", "160650", "160610",
            "160611", "160680", "160681", "160640", "160641", "160670", "160600", "160601"
        ];
        public scorignCodeErrorReject = [
            "080791", "080801", "080811", "080821", "080831", "080841", "080851", "080861",
            "080871", "080881", "099911", "080850", "080840", "080830", "080820", "080810",
            "080800", "080790", "080880", "099910", "080860", "080870", "080890", "099900",
            "030400", "030401", "099901", "001331", "001290", "001291", "001350", "001351",
            "001370", "001371", "001150", "001151", "001271", "001320", "001260", "001340",
            "001341", "001100", "001101", "001110", "001111", "001120", "001121", "001200",
            "001210", "001211", "001220", "001221", "001230", "001231", "001240", "001241",
            "001250", "001261", "001270", "001300", "001301", "001310", "001311", "001130",
            "001140", "001131", "001141", "001360", "001361", "001160", "001280", "001251",
            "001321", "001201", "001330"
        ];
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
        postMobileInformation(
            body,
            id,
            brand,
            comp,
            showMessage = true,
            messageOk = 'La actualización de los datos no es inmediata. Sus datos se verán reflejados en su siguiente inicio de sesión.') {
            let vm = this;

            let _search: Object = {
                queryParams: body,
                urlParams: [brand, 'customer?id=' + id]
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
                    throw error.data;
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
                    throw error.data;
                });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:CustomerManagementSrv#postScoringRenove
         * @param {number} typeRequest tipo de Acto comercial
         * @param {Object} body datos a consultar
         * @param {string} comp nombre del componente
         * @methodOf OrangeFeSARQ.Services:CustomerManagementSrv
         * @description
         * Devuelve el riesgo de prescoring del cliente
         * @returns {Object} Devuelve una promesa con el response
         */
        postScoringRenove(typeRequest, body, comp: string) {
            let vm = this;

            let _search: Object = {
                queryParams: {
                    typeRequest: typeRequest
                },
                urlParams: ['customer'],
                body: body
            };

            return vm.httpPost(vm.genericConstant.customerManagement, _search, comp)
                .then(function (response) {
                    if (response.data.error && response.data.error !== null) {
                        throw response.data.error;
                    }
                    return response.data;
                })
                .catch(function (error) {
                    throw error.data;
                });
        }
        

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.CustomerManagementSrv#getOspCustomer
         * @methodOf OrangeFeSARQ.Services.CustomerManagementSrv
         * @param {string} id documento del cliente
         * @param {boolean} isExtended datos extendidos/reducidos
         * @param {string} componentName nombre del componente
         * @description
         * Devuelve la información personal guardada de un cliente
         * @returns {object} Devuelve una promesa con el response.
         */
        getOspCustomer(id: string, isExtended: boolean, componentName: string) {
            let vm = this;

            let _search: Object = {
                queryParams: {
                    isExtended: isExtended
                },
                urlParams: ['ospCustomer', id]
            };

            return vm.httpCacheGett(vm.genericConstant.customerManagement, _search, componentName)
                .then(
                    function (response) {
                        return response.data;
                    }
                )
                .catch(
                    function (error) {
                        throw error;
                    }
                );
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.CustomerManagementSrv#postOspCustomer
         * @methodOf OrangeFeSARQ.Services.CustomerManagementSrv
         * @param {string} body datos del cliente
         * @param {string} componentName nombre del componente
         * @description
         * Almacena la información personal guardada de un cliente
         * @returns {object} Devuelve una promesa con el response.
         */
        postOspCustomer(body, componentName) {
            let vm = this;

            let _search: Object = {
                queryParams: {},
                urlParams: ['ospCustomer'],
                body: body
            };

            return vm.httpPostFull(vm.genericConstant.customerManagement, _search, componentName)
                .then(
                    function (response) {
                        return response.data;
                    }
                )
                .catch(
                    function (error) {
                        throw error;
                    }
                );

        }
        clientSegment(componentName: string, publicKey?, publicId?): any {
            let vm = this;
            let _search;
            if (publicKey) {
                _search = {
                    queryParams: {
                        'brand': vm.genericConstant.brand,
                        'publicKey': publicKey,
                    },
                    urlParams: ['customer']
                };
            } else {
                if (publicId) {
                    _search = {
                        queryParams: {
                            'brand': vm.genericConstant.brand,
                            'publicId': publicId,
                        },
                        urlParams: ['customer']
                    };

                }
            }

            return vm.httpCacheGett(vm.genericConstant.customerManagement, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    throw error;
                });


        }
    }
}
