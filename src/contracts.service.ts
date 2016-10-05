module OrangeFeSARQ.Services {
    'use strict';

     /**
     * @ngdoc service
     * @name contract.ContractSrv
     * @description
     * #rest
     * Servicio que busca los tipos de contrato
     */

    export interface IContractsSrv {
        getPrepagoLines(products: any): any;
        getPospagoLines(products: any): any;
        getContract(products: any, msisdn: any): any; 
    }

    export class ContractsSrv implements IContractsSrv {

        constructor() { }
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

    // Registration
    angular.module('contracts', [])
        .service('contractsSrv', ContractsSrv);

}
