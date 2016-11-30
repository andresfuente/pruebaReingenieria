module OrangeFeSARQ.Services{
    'use strict';

    export class InviteAndSaveSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public searchUrl: string;
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

        getInviteState(document_: string, componentName:string='InviteStateComp'): any {
            let vm = this;
            let _search: any;           
			
            _search = {
                queryParams: {
                },
                urlParams: ['invitations', document_]

            };
			
            return vm.httpCacheGett(vm.genericConstant.inviteAndSave, _search, componentName)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }



    }
}
