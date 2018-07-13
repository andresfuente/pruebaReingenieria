module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name ratesComparator.Services:RatesComparatorSrv
     * @author Isabel Matas
     * @description
     * Servicio del componente comparador de tarifas y terminales
     */
    export class TerminalsComparatorSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        // Inject vars

        /**
         * @ngdoc method
         * @name ratesComparator.Services:RatesComparatorSrv#constructor
         * @methodOf ratesComparator.Services:RatesComparatorSrv
         * @param {Object} $injector
         * @description
         * Incluye las dependencias necesarias e inicializa el servicio
         */
        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        /** @ngdoc method
         * @name ratesComparator.Services:RatesComparatorSrvsetInjections
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf ratesComparator.Services:RatesComparatorSrv
         * @description
         * Incluye las dependencias necesarias
         */
        setInjections($injector) {
            let srv = this;
        }

        /** @ngdoc method
         * @name terminalsComparator.Services:TerminalsComparatorSrv#getTerminalData
         * @methodOf terminalsComparator.Services:TerminalsComparatorSrv
         * @param {Object} terminal Terminal
         * @param {string} commercialAction Tipo de acto comercial [portabilidad/alta/migracion/renove]
         * @param {string} channel Canal al que hacer la consulta
         * @description
         * Consulta al deviceCatalog la información del terminal que se pasa como parámetro
         */
        getTerminalData(
            terminal,
            commercialAction: string,
            channel: string
        ) {
            let vm = this;

            let params = {
                modelId: terminal,
                commercialAction: commercialAction.toLowerCase(),
                channel: channel
            };

            let headers = new HashMap<string, string>();

            return vm.httpCacheGeth(vm.genericConstant.getTerminalDetails, { queryParams: params }, headers
            ).then((response) => {
                if (response.data.length > 0) {
                    return response.data[0].deviceSpecification;
                } else {
                    return response.data.deviceSpecification;
                }
            }).catch((error) => {
                throw error;
            });
        }
    }
}