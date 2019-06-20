module OrangeFeSARQ.Services {
    'use strict';

    export class ContactFormSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public genericConstant;

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ContactFormSrv
         * @methodOf OrangeFeSARQ.Services:ContactFormSrv
         * @param {Object} $injector componente que necesita el parent injector
         * @description
         * Incluye las dependencias necesarias
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */

        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.genericConstant = vm.$injector.get('genericConstant');
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ContactFormSrv#getAddress
         * @methodOf OrangeFeSARQ.Services:ContactFormSrv
         * @param {string} comp contactForm
         * @description
         * Recoge los datos de la API Address
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        getAddress(comp: string): ng.IPromise<any> {
            let vm = this;
            let _search: Object = {
                queryParams: {},
                urlParams: ['data']
            };
            return vm.httpCacheGett(vm.genericConstant.address, _search, comp)
                .then(
                    (response) => {
                        return response.data;
                    },
                    (err) => {
                        return err;
                    }
                );
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ContactFormSrv#updateForm
         * @methodOf OrangeFeSARQ.Services:ContactFormSrv
         * @param {string} data Informacion a actualizar
         * @param {string} comp contactForm
         * @description
         * Modifica los datos personales de un cliente.
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        updateForm(data: Object, id: string, comp: string): ng.IPromise<any> {
            let vm = this;
            let _search: Object = {
                queryParams: {id: id},
                urlParams: [vm.genericConstant.brand, 'customer'],
                body: data
            };
            return vm.httpPut(vm.genericConstant.customerManagement, _search, comp)
                .then(
                    (response) => {
                        return response.data;
                    },
                    (err) => {
                        return err;
                    }
                );
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ContactFormSrv#checkAddress
         * @methodOf OrangeFeSARQ.Services:ContactFormSrv
         * @param {string} comp contactForm
         * @description
         * Comprueba que la dirección modificada es correcta
         * @return {ng.IPromise<any>} ng.IPromise<any>
         */
        checkAddress(request, comp: string): ng.IPromise<any> {
            let vm = this;
            let _search: Object = {
                queryParams: request,
                urlParams: ['check']
            };
            return vm.httpPost(vm.genericConstant.address, _search, comp)
                .then(
                    (response) => {
                        return response;
                    },
                    (err) => {
                        return err;
                    }
                );
        }
    }
}
