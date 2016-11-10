module OrangeFeSARQ.Services {
    'use strict';

    export class getImagesSrv {
        static $inject = ['$injector'];
        private url: string;
        private genericConstant;
        private httpCacheOrange;

        constructor(public $injector) {
           let vm = this;

            vm.setInjections($injector);
        }


        setInjections($injector){
            let vm  =this;
            vm.genericConstant = $injector.get("genericConstant");
            vm.httpCacheOrange = $injector.get("httpCacheOrange");
        }

        getData(){
            let vm = this;
            let _search:Object = {
                queryParams: {

                },
                urlParams: []

            };

            return vm.httpCacheOrange.gett(vm.genericConstant.getImagesOwcs)
            .then(
                    (successData)=> {
                        return successData;
                    },
                    (errorData)=> {
                        return errorData;
                    }
                );
        }
    }
}
