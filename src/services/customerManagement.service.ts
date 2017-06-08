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
 * @name #postMobileInformation(body:string, id:string, brand:string, comp:string, showMessage?: boolean)
 * @methodOf locator.UserSrv
 * @param {object} body cuerpo de la informacion del post.
 * @param {string} id Identificador.
 * @param {string} brand Orange o Amena.
 * @param {string} comp Nombre del componente que llama al servicio.
 * @param {boolean} showMessage (opcional) Mostrar o no los mensajes de información.
 * @returns {object} Devuelve una promesa con el response
 */

         postMobileInformation(body, id, brand, comp, showMessage = true, messageOk = 'La actualización de los datos no es inmediata. Sus datos se verán reflejados en su siguiente inicio de sesión.') {
            let vm = this;

            let _search: Object = {
                queryParams: body,
                urlParams: [brand, 'customer', '?id=' + id]
            };
            return vm.httpPut(vm.url, _search, comp)
                .then(function(response) {
                    if (showMessage)
                        vm.informationCenter.addInformationMessage(1,'Datos actualizados', messageOk);
                    return response.data;
					
                })
                .catch(function(error) {
                    if (showMessage)
                        vm.informationCenter.addInformationMessage(2, error.data.error.title, error.data.error.desc);
                    return error;
                });
        };

    }
}
