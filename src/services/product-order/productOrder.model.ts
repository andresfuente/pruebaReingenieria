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

		export interface setOrangetv_postRequest {
    publicKey: string;
    action: string;
    idPromo: string;
    services: string;
    segment: string;
  }
}