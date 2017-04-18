module OrangeFeSARQ.Services {
    'use strict';

    export class CustomerManagementSrv extends OrangeFeSARQ.Services.ParentService  {
        static $inject = ['$injector']
        private url: string;
        public genericConstant;
        public enterpriseDataSrv: any;
        public informationCenter;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.url = vm.genericConstant.customerManagement;
            vm.informationCenter = $injector.get('InformationCenterSrv');
        }

/**
 * @ngdoc method
 * @name #postMobileInformation(body:string, id:string, brand:string, comp:string)
 * @methodOf locator.UserSrv
 * @param {object} body cuerpo de la informacion del post.
 * @param {string} id Identificador.
 * @param {string} brand Orange o Amena.
 * @param {string} comp Nombre del componente que llama al servicio.
 * @returns {object} Devuelve una promesa con el response
 */

         postMobileInformation(body, id, brand, comp) {
            let vm = this;

            let _search: Object = {
                queryParams: body,
                urlParams: [brand, 'customer', '?id=' + id]
            };

            return vm.httpPut(vm.url, _search, comp)
                .then(function(response) {
                    vm.informationCenter.addInformationMessage(1, 'Datos actualizados', '');
                    return response.data;
                })
                .catch(function(error) {
                    vm.informationCenter.addInformationMessage(2, error.data.error.title, error.data.error.desc);
                    return error;
                });
        };

    }
}
