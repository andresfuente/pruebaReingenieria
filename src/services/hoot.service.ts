module OrangeFeSARQ.Services {
    'use strict';

    export class HootSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private url: string;
        public genericConstant;


        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:HootSrv#constructor
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf OrangeFeSARQ.Services:HootSrv
         * @description
         * Inicializa el servicio
         */
        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }


        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:HootSrv#setInjections
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf OrangeFeSARQ.Services:HootSrv
         * @description
         * Incluye las dependencias necesarias
         */
        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }


        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:HootSrv#getActualRate
         * @param {string} msisdn Número del cliente.
         * @param {string} contractType Tipo de contrato asociado.
         * @param {string} compName Nombre del componente que usa el método.
         * @param {boolean} refresh Limpieza de cache.
         * @methodOf OrangeFeSARQ.Services:HootSrv
         * @description
         * Busca la tarifa actual
         */
        getActualRate(msisdn: string, contractType: string, compName: string, refresh: boolean = false) {
            let vm = this;
            let apiUrl: string = vm.genericConstant.hoot;
            let brand: string = vm.genericConstant.brand;
            let method = 'rate';

            let request: OrangeFeSARQ.Models.hoot_getActualRate_request = <OrangeFeSARQ.Models.hoot_getActualRate_request>{};
            if (contractType === "AMENA") {
                request.contractType = "POSPAGO";
            } else {
                request.contractType = contractType;
            }
            let _search: Object = {
                queryParams: request,
                urlParams: [brand, method, msisdn]
            };

            return vm.httpCacheGett(apiUrl, _search, compName, refresh)
                .then(
                (successData) => {
                    if (successData.data && successData.data.ratePlan) {
                        return successData.data.ratePlan;
                    }
                    throw successData.data.error;
                },
                (errorData) => {
                    return errorData.data;
                }
                );
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:HootSrv#getMainLine
         * @param {string} brand Amena  |  Orange
         * @param {string} indPublicKey Clave Pública
         * @param {string} site sitio
         * @param {string} compName Nombre del componente que usa el método
         * @param {boolean} refresh Limpieza de cache.
         * @methodOf OrangeFeSARQ.Services:HootSrv
         * @description
         * Busca la línea principal
         */
        getMainLine(brand: string, indPublicKey: string, site: string, compName: string, refresh: boolean = false) {
            let vm = this;
            let METHOD: string = 'principal';
            let apiUrl: string = vm.genericConstant.hoot;

            let _search: Object = {
                queryParams: {
                    individualPublicId: indPublicKey,
                    site: site,
                    onlyActive: true
                },
                urlParams: [brand, METHOD]
            };

            return vm.httpCacheGett(apiUrl, _search, compName, refresh)
                .then((succesData) => {
                    if (succesData && succesData.error) {
                        throw succesData.data;
                    }
                    return succesData.data;
                })
                .catch((errorData) => {
                    return errorData.data;
                });
        }


        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:HootSrv#getMdgClient
         * @param {string} idType Residencial | TelephoneNumber | business
         * @param {string} docNumber Dni, telefono o fijo del cliente
         * @param {string} compName Nombre del componente que usa el método
         * @methodOf OrangeFeSARQ.Services:HootSrv
         * @description
         * Recupera los datos del cliente
         */
        getMdgClient(idType: string, docNumber: string, componentName: string) {
            let vm = this;

            let _search = {
                urlParams: [
                    vm.genericConstant.brand,   
                    'mdg',                      
                    idType,                     
                    docNumber                   
                ]
            };

            return vm.httpCacheGett(vm.genericConstant.hoot, _search, componentName)
                .then(
                (response) => {
                    return response.data;
                }
                )
                .catch(
                (error) => {
                    throw error.data;
                }
                );
        }

    }
    angular.module('hootModule', [])
        .service('hootSrv', OrangeFeSARQ.Services.HootSrv);
}
