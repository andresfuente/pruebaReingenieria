module ratesComparatorMRenove.Models {

    export class Rate {
        name: string;
        siebelId: string;
        description: string;
        ratePrice: number;
        ratePriceTaxIncluded: number;
        ratePriceTaxIncludedPromotional: number;
        ratePricePromotional: number;
        paymentsNumber: number;
        typeService: string;
        isModificable: boolean;
        terminals: Array<ratesComparator.Models.Terminal>;
        line: string;

        groupName: string;

        nacPrice: number;
        nacPriceTaxIncluded: number;
        nacPricePromotional: number;
        nacPriceTaxIncludedPromotional: number;
        // ospTecnology: string para flag TV

        bucket: Object;

        /**
         * @ngdoc method
         * @name ratesComparator.Models:Rate#constructor
         * @methodOf ratesComparator.Models:Rate
         * @param {Object} rate Tarifa de la que obtener la informacion para crear la tarifa segun el modelo
         * @description
         * Crea una tarifa para utilizar el comparador.
         * - siebelId {string} ID siebel
         * - name {string} nombre
         * - ratePrice {number} precio sin impuestos
         * - ratePriceTaxIncluded {number} precio con impuestos
         * - description {string} descripcion
         * - terminals {Array<ratesComparator.Models.Terminal>} array de terminales para el cruce
         */
    }

    export class Item {
        selected: boolean;
        terminal: ratesComparator.Models.Terminal;
        uniquePaid: boolean;
    }

    export class RateState {
        rate: ratesComparator.Models.Rate;
        actual: Item;
    }

    export class RateModificable {
        line: string;
        noModificable: boolean;
    }

}    