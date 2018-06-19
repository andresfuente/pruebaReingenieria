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
        private storeProvince: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
            vm.setStoreProvince();
        }

        setInjections($injector) {
            let vm = this;

            vm.commercialCampaignsAPIUrl = vm.genericConstant.commercialCampaigns;
        }
        /**
         * @ngdoc method
         * @name ratesParent.Services:RatesParentSrv#getStoreProvince
         * @methodOf ratesParent.Services:MosaicFileSrv
         * @description
         * Establece el nombre de la provincia de la tienda  
         */
        setStoreProvince() {
            let vm = this;
            let shopInfo = JSON.parse(sessionStorage.getItem('shopInfo'));
            if (shopInfo && shopInfo.province && shopInfo.province !== '') {
                vm.storeProvince = shopInfo.province;
            } else {
                vm.storeProvince = 'MADRID';
            }
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
        getComercialCampaings85205(individualPublicId, comp: string) {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    'individualPublicId': individualPublicId
                },
                urlParams: [vm.genericConstant.brand, 'getComercialCampaings85205']
            };

            // CABECERA HASHMAP
            let _headers = new HashMap<string, string>();
            _headers.set('locationName', _.deburr(vm.storeProvince.toUpperCase()));

            return vm.httpCacheGeth(vm.commercialCampaignsAPIUrl, _search, _headers, comp, true)
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
