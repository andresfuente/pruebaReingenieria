module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.BscsToSiebelSrv
     * @description
     * Servicio que realiza la llamada a la API BSCStoSIEBEL.
     */
    export class BscsToSiebelSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.BscsToSiebelSrv#convertSiebelFromBSCSCangaroo
         * @methodOf OrangeFeSARQ.Services.BscsToSiebelSrv
         * @param {string} id id BSCS del producto.
         * @param {boolean} isTmCode indica si el id es tmCode o externalCode.
         * @param {string} morganCode descriptor para convergentes.
         * @param {string} technology diferencia tecnologías.
         * @param {string} compomentName componente.
         * @description
         * Obtiene el id Siebel a partir del id BSCS de un producto convergente
         * * No pueden ir tmCode y externalCode informados a la vez
         * @returns {object} Devuelve una promesa con el response.
         */
        convertSiebelFromBSCSCangaroo(
            id: string,
            isTmCode: boolean,
            morganCode: string,
            technology: string,
            compomentName: string): any {
            let vm = this;

            let _search: any = {
                queryParams: {
                    morganCode: morganCode,
                    technology: technology
                },
                urlParams: ['convertSiebelFromBSCSCangaroo']
            };

            if (isTmCode) {
                _search.queryParams.tmCode = id;
            } else {
                _search.queryParams.externalCode = id;
            }

            return vm.httpCacheGett(vm.genericConstant.bscsToSiebel, _search, compomentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    throw error;
                }
                );
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.BscsToSiebelSrv#getBSCSFromSiebelCangaroo
         * @methodOf OrangeFeSARQ.Services.BscsToSiebelSrv
         * @param {string} siebelCode id Siebel del producto.
         * @param {string} compomentName nombre del componente.
         * @description
         * Obtiene el BSCS a partir del id Siebel
         * @returns {object} Devuelve una promesa con el response.
         */
        getBSCSFromSiebelCangaroo(siebelCode: string, compomentName: string): any {
            let vm = this;

            let _search: Object = {
                queryParams: {},
                urlParams: ['getBSCSFromSiebelCangaroo', siebelCode]
            };

            return vm.httpCacheGett(vm.genericConstant.bscsToSiebel, _search, compomentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    throw error;
                }
                );
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.BscsToSiebelSrv#getSiebelFromBSCS
         * @methodOf OrangeFeSARQ.Services.BscsToSiebelSrv
         * @param {string} id id Siebel del producto.
         * @param {string} compomentName nombre del componente.
         * @description
         * Obtiene el id Siebel a partir del id BSCS
         * @returns {object} Devuelve una promesa con el response.
         */
        getSiebelFromBSCS(id: string, compomentName: string): any {
            let vm = this;

            let _search: Object = {
                queryParams: {
                    shortDescriptor: id
                },
                urlParams: ['getSiebelFromBSCS']
            };

            return vm.httpCacheGett(vm.genericConstant.bscsToSiebel, _search, compomentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    throw error;
                }
                );
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.BscsToSiebelSrv#getBSCSFromSiebel
         * @methodOf OrangeFeSARQ.Services.BscsToSiebelSrv
         * @param {string} id id BSCS del producto.
         * @param {string} compomentName nombre del componente.
         * @description
         * Obtiene el id Siebel a partir del id BSCS
         * @returns {object} Devuelve una promesa con el response.
         */
        getBSCSFromSiebel(id: string, compomentName: string): any {
            let vm = this;

            let _search: Object = {
                queryParams: {},
                urlParams: ['getBSCSFromSiebel', id]
            };

            return vm.httpCacheGett(vm.genericConstant.bscsToSiebel, _search, compomentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    throw error;
                }
                );
        }
    }

    angular.module('bscsToSiebelSrv', [])
        .service('bscsToSiebelSrv', OrangeFeSARQ.Services.BscsToSiebelSrv);
}
