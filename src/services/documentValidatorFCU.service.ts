module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name DocumentValidatorFCUSrv.DocumentValidatorSrv
     * @description
     *
     */
    export class DocumentValidatorFCUSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public apiBaseURL: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.initService();
        }

        initService() {
            let vm = this;
            vm.apiBaseURL = vm.genericConstant.documentValidator;
        }

        public documentValidation(brand: string, lineNumber: string, documentType: string, documentId: string): ng.IPromise<documentValidatorFCU.Models.PostResponse> {
            let vm = this;
            let url = vm.apiBaseURL + '/' + brand + '/validator/' + lineNumber + '/' + documentType + '/' + documentId;

            return vm.httpCacheGett(url, null, '', true)
                .then((response) => {
                    return response.data;
                });
        }

    }
    angular.module('documentValidatorFCUModule', [])
        .service('documentValidatorFCUSrv', OrangeFeSARQ.Services.DocumentValidatorFCUSrv);

}
