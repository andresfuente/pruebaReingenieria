declare module OrangeFeSARQ.Models {

    export interface ProductsIdQuery {
        idProduct: string;
        action: string;
    }

    export interface changeRate_postRequest {
        msisdn: string;
        customerId: string;
        contractId: string;
        flagBlackBerry: boolean;
        spCodesAsociated: string[];
        productsIdQuery: ProductsIdQuery[];
    }

}
