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
        private cacheOfRequests : HashMap<string, string>; 
        private linesUsageSrv;
        public isChanging = false; 

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
            vm.setStoreProvince();
            vm.buildingCache();             
        }

        private buildingCache() {
            let vm = this;
            vm.cacheOfRequests = new HashMap<string, string>();
        }

        setInjections($injector) {
            let vm = this;
            vm.linesUsageSrv = $injector.get('linesUsageSrv');
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
        getComercialCampaings85205(individualPublicId, comp: string, tipoAccionDL?) {
            let vm = this;

            let queryParams;

            if (tipoAccionDL) {
                queryParams = {
                    individualPublicId : individualPublicId,
                    tipoAccionDL : tipoAccionDL
                }
            } else {
                queryParams = {
                    individualPublicId : individualPublicId
                }
            }

            let _search: Object = {
                queryParams: queryParams,
                urlParams: [vm.genericConstant.brand, 'getComercialCampaings85205']
            };

            return vm.getComercialCampaings85205Response(_search,comp); 
        }


        getComercialCampaings85205FDC(individualPublicId, comp: string, parameters:any) {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    'individualPublicId': individualPublicId,
                    'motivoCamp' : parameters.motivoCampana,
                    'tipologia1' : parameters.tipologia1,
                    'tipologia2': parameters.tipologia2,
                    'tipologia3': parameters.tipologia3
                },
                urlParams: [vm.genericConstant.brand, 'getComercialCampaings85205']
            };

            return vm.getComercialCampaings85205Response(_search,comp); 
        }

        getComercialCampaings85205Response(_search, comp ){
            let vm = this;
            let _headers = new HashMap<string, string>();
            _headers.set('locationName', _.deburr(vm.storeProvince.toUpperCase()));
            return vm.httpCacheGeth(vm.commercialCampaignsAPIUrl, _search, _headers, comp, true)
                .then((response) => {
                        vm.isChanging = false;
                        return response.data;
                    }, (err) => {
                        vm.isChanging = false;
                        throw err;
                    }
                );
        }
        /**
         * spa: ficha de clientet
         * guarda cualificacion de campanas 
         * 
         */
        blokBestRenove(){
            let vm = this;    
            return vm.cacheOfRequests.count() >= 0 && vm.getCache() ===  undefined; 
        }

        getCache(){
            let vm = this;    
            return  vm.cacheOfRequests.get(vm.getStringCache()); 
        }

        setCache(response : any){
            let vm = this;
            vm.cacheOfRequests.set(vm.getStringCache(), response); 

        }

        private getStringCache(){
            let vm = this;
            let credentialInformation = JSON.parse(sessionStorage.getItem('credentialInformation'));
            return credentialInformation.rol + '-' + vm.linesUsageSrv.subperfil +'-' + credentialInformation.document; 
        }

    }

    // Registration
    angular.module('commercialCampaignsSrv', [])
        .service('commercialCampaignsSrv', OrangeFeSARQ.Services.CommercialCampaignsSrv);
}
