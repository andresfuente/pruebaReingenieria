module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.PrescoringSrv
     * @description
     * Servicio que realiza la llamada a la API Prescoring.
     */
    export class PrescoringSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        public genericConstant;
        public prescoringAPIUrl: string;

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:PrescoringSrv#constructor
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf prescoringSrv.Services:PrescoringSrv
         * @description
         * Incluye las dependencias necesarias e inicializa el componente
         */
        constructor($injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);
            vm.prescoringAPIUrl = vm.genericConstant.prescoring;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:PrescoringSrv#setInjections
         * @param {Object} $injector componente que necesita el parent injector.
         * @methodOf prescoringSrv.Services:PrescoringSrv
         * @description
         * Incluye las dependencias necesarias
         */
        setInjections($injector) {
            let vm = this;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:PrescoringSrv#getPaymentLack
         * @param {string} numdDoc documento del cliente
         * @param {string} type tipo de comprobación. BA -> BlacklistAsnef
         * @param {string} comp nombre del componente
         * @methodOf prescoringSrv.Services:PrescoringSrv
         * @description
         * Realiza la llamada a la API Prescoring para saber
         *  si el cliente es blacklist o asnef
         */
        getPaymentLack(numDoc, type, comp: string) {
            let vm = this;

            let _search: Object = {
                queryParams: {
                    'type': type
                },
                urlParams: ['paymentlack', numDoc]
            };

            return vm.httpCacheGett(vm.prescoringAPIUrl, _search, comp)
                .then(
                    (response) => {
                        return response.data;
                    },
                    (err) => {
                        throw err;
                    }
                );
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:PrescoringSrv#postPrescoring
         * @param {Object} body datos a consultar
         * @param {string} comp nombre del componente
         * @methodOf prescoringSrv.Services:PrescoringSrv
         * @description
         * Realiza la llamada a la API Prescoring para saber
         *  el riesgo de prescoring del cliente
         */
        postPrescoring(body, comp: string) {
            let vm = this;

            let _search: Object = {
                queryParams: body,
                urlParams: ['fullPrescoring']
            };

            return vm.httpPost(vm.prescoringAPIUrl, _search, comp)
                .then(
                    (response) => {
                        return response.data;
                    },
                    (err) => {
                        return err;
                    }
                );
        }
    }
}
