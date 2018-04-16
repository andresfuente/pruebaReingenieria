module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name DocumentValidatorSrv.DocumentValidatorSrv
     * @description
     *
     */
    export class DocumentValidatorSrv extends OrangeFeSARQ.Services.ParentService {
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

        public documentValidation(brand: string, lineNumber: string, documentType: string, documentId: string): ng.IPromise<documentValidator.Models.PostResponse> {
            let vm = this;
            let url = vm.apiBaseURL + '/' + brand + '/validator/' + lineNumber + '/' + documentType + '/' + documentId;

            return vm.httpCacheGett(url, null, '', true)
                .then((response) => {
                    return response.data;
                });
        }

    }
    angular.module('documentValidatorModule', [])
        .service('documentValidatorSrv', OrangeFeSARQ.Services.DocumentValidatorSrv);

}
