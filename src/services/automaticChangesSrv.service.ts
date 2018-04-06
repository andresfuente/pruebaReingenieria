module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.AutomaticChangesSrv
     * @description
     * Servicio que obtiene información de la API DeviceCatalog
     */
    export class AutomaticChangesSrv extends OrangeFeSARQ.Services.ParentService {
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
         * @name OrangeFeSARQ.Services.UserDeviceSrv#getDeviceCatalogView()
         * @methodOf OFC.Services.UserDeviceSrv
         * @param {string} channel canal [pdv]
         * @description
         * Obtiene los datos del device catalog
         * @returns {object} Devuelve una promesa con el response.
         */
        getDeviceCatalogView(msisdn, customerId, RateCodeDestino, comp: string) {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    'msisdn': msisdn,
                    'customerId': customerId,
                    'RateCodeDestino': RateCodeDestino,
                },
                urlParams: ['getSummaryRateAutoChanges']
            };

            return vm.httpCacheGett( vm.genericConstant.productOrdering, _search, comp)
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

    angular.module('automaticChangesSrv', [])
        .service('automaticChangesSrv', AutomaticChangesSrv);
}
