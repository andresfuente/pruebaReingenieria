declare module  OrangeFeSARQ.Models {

    export interface productCatalog_getRates_request {
        contractType: string;
		tmCodeOrigen: string;
        segment?: string;
        spCode? : string;
        rateType? : string;
    }

    export interface ProductCatalogSpecificationQueryParams  {
        queryType?: string;
        usages?: string;
    }
}
