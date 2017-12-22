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

  export interface setDonateMegas_postRequest {
    action: string;
    id: string;

  }
  export interface showDonateMegas_postRequest {
    id: string;
  }
  export interface getProductBonusIncompatibility {
    msisdn : string,
    productsIdQuery : string[];
  }
  export class SetPromotions {
    msisdn: string;
    productId: string;
    action: string;
    imei: string;
    segment: string;
    lineCategory: string;
    docNumber: string;
    codMorgane: string;
    ProductCharacteristic: Array<Models.ProductCharacteristicSetProm>;
  }

  export class ProductCharacteristicSetProm {
    name: string;
    value: string;
  }
}
