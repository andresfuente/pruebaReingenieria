module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.CredentialInformation
     * @description
     * Servicio que realiza la llamada a la API credential
     */
    export class CredentialInformation extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        private credentialSrvUrl: string;
        private brand: string;
        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;

            vm.credentialSrvUrl = vm.genericConstant.getDataClient;
            vm.brand = vm.genericConstant.brand;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:CredentialInformation#setClientData
         * @methodOf OrangeFeSARQ.Services:CredentialInformation
         * @param {string} document Documento del cliente que se quiere buscar
         * @param {string} compName Nombre del componente desde donde se llama
         * @description
         * Hace la llamada a getUser para guardar en sessionStorage ciertos datos de la respuesta.
         */
        setClientData(document: string, compName: string): ng.IPromise<any> {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: [vm.brand, 'getUser'],

            };

            let _headers = new HashMap<string, string>();
            _headers.set('z-document', document);
            return vm.httpCacheGeth(vm.credentialSrvUrl, _search, _headers, compName, true)
                .then(
                (response) => {
                    let credentialInformation = {
                        utId: response.data.user.utId ? response.data.user.utId : '',
                        profile: response.data.user.profile ? response.data.user.profile : '',
                        subProfile: response.data.user.subProfile ? response.data.user.subProfile : ''
                    };
                    sessionStorage.setItem('credentialInformation', JSON.stringify(credentialInformation));
                });
        }
    }
    angular.module('credentialInformationSrv', [])
        .service('credentialInformationSrv', OrangeFeSARQ.Services.CredentialInformation);
}