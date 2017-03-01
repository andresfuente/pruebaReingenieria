module OrangeFeSARQ.Services {
    'use strict';

    export class AdslStatusService extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public adslStatusAPIUrl: string;

        //Injector vars
        public genericConstant: any;
        public OSP: string = 'OSP';

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
            vm.initComp();
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get("genericConstant");
            vm.adslStatusAPIUrl = "/mock/API/adslStatus.json";
        }

        initComp() {
            let vm = this;
            vm.adslStatusAPIUrl = vm.genericConstant.fixedServices;
        }

        getAdslStatus(idType: string, idNumber: string, fixedNumber: string): any {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    idType: idType,
                    idNumber: idNumber,
                    fixedNumber: fixedNumber
                },
                urlParams: ['adslStatus']
            };
            return vm.httpCacheGett(vm.adslStatusAPIUrl, _search)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    return error.error;
                });
        }
    }

}
