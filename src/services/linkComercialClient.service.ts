module linkComercialClient.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name linkComercialClient.linkComercialClientSrv
     * @description
     * #rest
     * Servicio que recoge los subperfiles de OWCS
     */
    export class LinkComercialClientSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public genericConstant;
        private renove: boolean;
        private commercialCampaigns: any;
        public subperfil;//do not delete

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        setRenove(renove: boolean) {
            let vm = this;

            vm.renove = renove;
        }

        setCommercialCampaigns(commercialCampaigns: any) {
            let vm = this;

            vm.commercialCampaigns = commercialCampaigns;
        }

        isRenove() {
            let vm = this;

            return vm.renove;
        }

        getCommercialCampaigns() {
            let vm = this;

            return vm.commercialCampaigns;
        }

        getProfile() {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: []

            };
            return vm.httpCacheGett(vm.genericConstant.getProfilesSrvOwcs, _search)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    throw error.data;
                });
        }
    }
}
