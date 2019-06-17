module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:s8salesOrder
     * @author Jaime Alain
     * @description
     * Servicio para comprobar las ordenes en vuelo
     */
    export class callServiceSFIDSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        constructor(public $injector) {
            super($injector);
        }

        /**
         * @ngdoc service
         * @name OrangeFeSARQ.Services:getSFID
         * @author Jaime Alain
         * @description
         * Servicio para recoger los SFID por filtro en OWCS
         */
        getSFID(filter, comp) {
            let vm = this;

            let _search: Object = {
                queryParams: {},
                urlParams: [filter]
            };

            let url = vm.genericConstant.dataController + '/getFilterSfid';

            return vm.httpCacheGett(url, _search, comp)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    throw error;
                });
        }
    }
}