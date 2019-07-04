module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services
     * @author Jaime Jimenez
     * @description
     * Servicio de la API DeviceCatalog.
     */
    export class DeviceCatalogSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        constructor($injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
        }

        /**
         * @ngdoc service
         * @name OFC.Services.DeviceCatalogSrv#getPriceDevices
         * @methodOf OFC.Services.DeviceCatalogSrv
         * @param {Object} params queryParams
         * @description
         * Metodo para obtener la información de los terminales especificados
         * @returns {object} Devuelve una promesa con el response.
         */
        getPriceDevices(params) {
            let vm = this;

            let headers = {}
            let _search: Object = {
                queryParams: params,
                urlParams: [
                    'deviceCatalogView'
                ]
            };

            return vm.httpCacheGett(vm.genericConstant.deviceCatalog, _search, 'prescoring')
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
    }

    angular.module('deviceCatalogSrv', [])
        .service('deviceCatalogSrv', OrangeFeSARQ.Services.DeviceCatalogSrv);
}
