module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name userManagement.UserManagement
     * @description
     * #rest
     * Servicio que actualiza la contraseña
     */
    export class UserManagementSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public genericConstant;

        public informationCenter: any;
        public url: string;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
            vm.url = vm.genericConstant.userManagement;
            vm.informationCenter = $injector.get('InformationCenterSrv');
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }


        setData(data, comp: string, messageCatalog) {
            let vm = this;
            let _search = {
                queryParams: data,
                urlParams: ['orange', 'managePassword']
            };
            return vm.httpPost(vm.url, _search, comp)
                .then(
                (successData) => {
                  let messageData = messageCatalog.getMessage('userManagement-userManagement-manage_password_post');
                  vm.informationCenter.addInformationMessage(1, messageData.title, messageData.desc);
                return false;
                },
                (errorData) => {
                  let messageData = messageCatalog.getMessage('userManagement-userManagement-102');
                  //vm.informationCenter.addInformationMessage(2, messageData.title, messageData.desc);
                    return messageData;
                }
              );
        }

    }
}
