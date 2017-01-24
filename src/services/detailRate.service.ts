module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name detailRate.DetailRateSrv
     * @description
     * Servicio que realiza la llamada al microwebservice para obtener la indetailRateacion
     * de los listados de llamada/sms/data de una linea
     */


    export class DetailRateSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public detailRateDataServiceUrl: string;


        constructor(public $injector) {
            super($injector);
            let vm = this;

            vm.detailRateDataServiceUrl = vm.genericConstant.hoot;

        }


        /**
         * @ngdoc method
         * @name #getDetailedUsageMsisdn(compomentName:string, msisdn:string, site:string, marca:string)
         * @methodOf locator.UserSrv
         * @param {string} compomentName Tipo de contrato.
         * @param {string} msisdn Identificador de linea.
         * @param {string} site Fecha de inicio del ciclo.
         * @param {string} marca Fecha de fin del ciclo.
         * @returns {object} Devuelve una promesa con el response
         */
        getPrincipalLineSrv(msisdn, site, marca, compomentName = 'detail-rate-comp'): any {
            let vm = this;
            let _search: Object = {
                urlParams: [marca, 'principal'] ,
                queryParams: {'publicKey': msisdn, 'site': site}
            };

            return vm.httpCacheGett(vm.detailRateDataServiceUrl, _search, compomentName)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    return error;
                });
        }

    }
}

