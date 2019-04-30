module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OFC.Services.UserDeviceSrv
     * @description
     * Servicio que obtiene información de la API DeviceCatalog
     */
    export class UserDeviceSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public userDeviceAPIUrl: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;

            vm.userDeviceAPIUrl = vm.genericConstant.deviceCatalog;
        }

        /**
         * @ngdoc method
         * @name OFC.Services.UserDeviceSrv#getDeviceCatalogView()
         * @methodOf OFC.Services.UserDeviceSrv
         * @param {string} channel canal [pdv]
         * @param {string} isExistingCustomer [0 - cliente nuevo, 1 - cliente existente]
         * @param {string} commercialAction acto comercial [portabilidad, alta, ...]
         * @param {string} portabilityOrigin origen del acto comercial [prepago, pospago]
         * @param {object} deviceSpecification deviceSpecification
         * @param {string} comp Componente.
         * @description
         * Obtiene los datos del device catalog
         * @returns {object} Devuelve una promesa con el response.
         */
        getDeviceCatalogView(channel, isExistingCustomer, commercialAction, portabilityOrigin, deviceSpecification, comp: string) {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    'channel': channel,
                    'isExistingCustomer': isExistingCustomer,
                    'commercialAction': commercialAction,
                    'portabilityOrigin': portabilityOrigin,
                    'deviceSpecificationId': deviceSpecification
                },
                urlParams: ['deviceCatalogView']
            };

            return vm.httpCacheGett(vm.userDeviceAPIUrl, _search, comp)
                .then(
                    (response) => {
                        return response.data;
                    },
                    (err) => {
                        throw err;
                    }
                );
        }
    }

    angular.module('userDeviceSrv', [])
        .service('userDeviceSrv', UserDeviceSrv);
}
