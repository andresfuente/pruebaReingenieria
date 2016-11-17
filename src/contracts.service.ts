module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name contract.ContractSrv
     * @description
     * #rest
     * Servicio que busca los tipos de contrato
     */
    export class ContractsSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public genericConstant;

        constructor($injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        /**
         * @ngdoc method
         * @name #getVap
         * @methodOf contract.ContractSrv
         * @returns {object} Devuelve una promesa con el response
         * Devuelve todas las líneas que sean de prepago
         */
        getPrepagoLines = (products: any): any => {
            // Call to the specified endpoint
        }
        /**
         * @ngdoc method
         * @name #getVap
         * @methodOf contract.ContractSrv
         * @returns {object} Devuelve una promesa con el response
         * Devuelve todas las líneas que sean de pospago
         */
        getPospagoLines = (products: any): any => {
        }


        /**
         * @ngdoc method
         * @name #getVap
         * @methodOf contract.ContractSrv
         * @returns {String} Devuelve el nombre de la tarifa (Postpago, prepago...)
         * Devuelve todas el tipo de contrato que tiene la línea
         */
        getContract = (products: any, msisdn: string): string => {
            for (let i in products) {
                if (products[i].productCharacteristic) {
                    for (let j in products[i].productCharacteristic) {
                        if (products[i].productCharacteristic[j].name === "MSISDN") {
                            if (products[i].productCharacteristic[j].value === msisdn) {
                                return products[i].ospProductType;
                            }
                        }
                    }
                }
            }
        }

    }
}
