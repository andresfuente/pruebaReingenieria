module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name prescoring.BankAccountSrv
     * @description
     * Servicio que realiza la llamada a la API BankAccount.
     */
    export class BankAccountSrv  extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        constructor($injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
        }

        setInjections($injector){
            let vm = this;

        }

        getBankAccount(userId: string, marca: string, componentName: string): any {
            let vm = this;

            let _search: Object = {
                urlParams: ['NIF', userId, 'Marca', marca]
            };

            return vm.httpCacheGett(vm.genericConstant.bankAccount, _search, componentName)
                .then(
                    function(response) {
                        return response.data;
                    }
                )
                .catch(
                    function(error) {
                        throw error;
                    }
                );
        }
    }

    angular.module('bankAccountSrv', [])
        .service('bankAccountSrv', OrangeFeSARQ.Services.BankAccountSrv);
}
