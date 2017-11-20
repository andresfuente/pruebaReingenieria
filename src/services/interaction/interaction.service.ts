module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.InteractionSrv
     * @description
     * Servicio que realiza las consultas de las incidencias
     */
    export class InteractionSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private interactionAPIurl: string;
        private genericConstact: any;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
            vm.initSrv();
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.InteractionSrv#setInjections
         * @methodOf OrangeFeSARQ.Services.InteractionSrv
         * @param {any} $injector inyector para recoger dependencias
         * @description
         * Inyecta las dependencias 
         */
        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.InteractionSrv#initSrv
         * @methodOf OrangeFeSARQ.Services.InteractionSrv
         * @description
         * Inicializa los valores del servicio 
         */
        initSrv() {
            let vm = this;

            vm.interactionAPIurl = vm.genericConstant.interaction;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.InteractionSrv#getInteractionEcare
         * @methodOf OrangeFeSARQ.Services.InteractionSrv
         * @param {string} category mobile | fixed
         * @param {string} numDocument documento sobre el que realizar la busqueda
         * @param {string} componentName nombre del componente que hace la llamada
         * @param {boolean} refresh bandera para obligar la solicitud http
         * @description
         * Realiza una consulta para recuperar los datos de las incidencias, con campos
         * designados para la APP y Ecare
         */
        getInteractionEcare(category: string, numDocument: string,
            componentName: string = 'interactionSrv',  refresh: boolean = false): any {
            let vm = this;

            let _search: Object = {
                queryParams: null,
                urlParams: [category, numDocument]
            };

            vm.httpCacheGett(vm.interactionAPIurl, _search, componentName, refresh)
                .then( (response) => {
                    if(response && response.data) {
                        return response.data;
                    }
                    throw response.error;
                })
                .catch ( (error) => {
                    return error.error;
                });
        }
    }
}
