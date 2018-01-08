module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name agreement.AgreementSrv
     * @description
     * Servicio Agreement-ms para las marcas de consentimiento.
     */
    export class AgreementSrv extends OrangeFeSARQ.Services.ParentService {

        public apiUrl: string;

        static $inject = ['$injector'];
        constructor(public $injector) {
            super($injector);
            let vm = this;
        }

        getAgreement(brand: string, documentType: string, document: string, segment: string, compomentName?, startrownum?, pagesize? ): any {
            let vm = this;
            let apiUrl = vm.genericConstant.agreementMs;

            let _search: Object = {
                urlParams: [vm.genericConstant.brand, 'agreementConsent', documentType, document],
                queryParams: {segment}
            };

            return vm.httpCacheGett(apiUrl, _search)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error.data;
                });
        }

        setAgreement(data: Object, comp: string){
            let vm = this;

            let _search: Object = {
                queryParams: data,
                urlParams: [vm.genericConstant.brand, 'modifyConsent']
            };
            let apiUrl = vm.genericConstant.agreementMs;

            return vm.httpPut(apiUrl, _search, comp)
            .then(
                (response) => {
                    return response.data;
                },
                (error) => {
                    return error.data;
                }
            );
        }
    }
}
