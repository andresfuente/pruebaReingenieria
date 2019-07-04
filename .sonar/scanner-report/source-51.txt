module OrangeFeSARQ.Services {
    'use strict';

    export class getImagesSrv extends OrangeFeSARQ.Services.ParentService {
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

        getData() {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: []

            };

            return vm.httpCacheGett(vm.genericConstant.getImagesOwcs, _search)
                .then(
                    (successData) => {
                        let str: string = JSON.stringify(successData);
                        successData = JSON.parse(str.replace(/"\/sites/g, '"sites'));
                        return successData;
                    },
                    (errorData) => {
                        return errorData;
                    }
                );
        }
    }
    angular.module('getImagesSrvModule', [])
        .service('getImagesSrv', OrangeFeSARQ.Services.getImagesSrv);
}
