module OrangeFeSARQ.Services {
    'use strict';

    export class BackOfficeSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private url: string;
        public genericConstant;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        contractOrangeTv(msisdn: string, documentType: string, document: string, origin: string, compName: string) {
            let vm = this;
            let apiUrl: string = vm.genericConstant.backOffice;
            let brand: string = vm.genericConstant.brand;

            let request = {
                "origen": "CONTRATA_ORANGE_TV",
                "tipoEnvio": "FTP",
                "application": "",
                "backOffice": [
                    {
                        "name": "msisdn",
                        "value": msisdn
                    },
                    {
                        "name": "documentType",
                        "value": documentType
                    },
                    {
                        "name": "document",
                        "value": document
                    },
                    {
                        "name": "morganeOrigin",
                        "value": origin
                    },
                    {
                        "name": "compName",
                        "value": compName
                    },
                ]
            }


            let _search: Object = {
                body: request,
                queryParams: {},
                urlParams: []
            };

            return vm.httpPostFull(apiUrl, _search, compName)
                .then((successData) => {
                    if (successData.data && successData.data) {
                        return successData.data;
                    }
                    throw successData.data.error;
                })
                .catch((errorData) => {
                    throw errorData.data;
                });
        }
    }
}
