module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.CommercialCampaignsSrv
     * @description
     * Servicio que realiza la llamada a la API CommercialCampaigns
     */
    export class CommercialCampaignsSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public commercialCampaignsAPIUrl: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;

            vm.commercialCampaignsAPIUrl = vm.genericConstant.commercialCampaigns;
        }

        /**
         * @ngdoc method
         * @name OFC.Services.CommercialCampaignsSrv#getComercialCampaings85205()
         * @methodOf OFC.Services.CommercialCampaignsSrv
         * @param {string} individualPublicId Identificador de linea.
         * @param {string} comp Componente.
         * @description Obtiene los datos de las campañas comerciales de un cliente
         * @returns {object} Devuelve una promesa con el response.
         */
        getComercialCampaings85205(individualPublicId, locationName, comp: string) {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    'individualPublicId': individualPublicId,
                    'locationName': locationName
                },
                urlParams: [vm.genericConstant.brand, 'getComercialCampaings85205']
            };
            return vm.httpCacheGett(vm.commercialCampaignsAPIUrl, _search, comp , true)
                .then((response) => {
                    return response.data;
                    }, (err) => {
                        throw err;
                    }
                );
        }
    }
    
// Registration
angular.module('commercialCampaignsSrv', [])
.service('commercialCampaignsSrv', OrangeFeSARQ.Services.CommercialCampaignsSrv);
}
