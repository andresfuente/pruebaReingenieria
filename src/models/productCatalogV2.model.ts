module OrangeFeSARQ.Models {

    export interface ProductOfferingV2QueryParams {
        segment?: 'Residencial' | 'Empresas';
        commercialAction?: 'renove' | 'migracion' | 'portabilidad' | 'alta';
        productType?: 'sva' | 'rate' | 'promo';
        category?: 'Convergenet' | 'Convergente_NAC' | 'Fijo' | 'Movil' | 'Mundo' | 'Holiday';
        contractType?: 'POSPAGO' | 'PREPAGO';
        channel?: string;
        idOfertaComercialList?: Array<string>;
        idTecnologiaList?: Array<string>;
        idSvaList?: Array<string>;
        idPromoList?: Array<string>
        pack?: string;
        type?: 'movil' | 'movilfijo';
        currentDate?: string;
    }
    
    export interface ProductSpecificationV2QueryParams {
        segment?: 'Residencial' | 'Empresas';
        commercialAction?: 'renove' | 'migracion' | 'portabilidad' | 'alta';
        productType?: 'sva' | 'rate' | 'promo';
        category?: 'Convergente' | 'Convergente_NAC' | 'Fijo' | 'Movil' | 'Mundo' | 'Holiday';
        contractType?: 'POSPAGO' | 'PREPAGO';
        channel?: string;
        idOfertaComercialList?: Array<string>;
        idTecnologiaList?: Array<string>;
        idSvaList?: Array<string>;
        idPromoList?: Array<string>
        pack?: string;
        type?: 'movil' | 'movilfijo';
        currentDate?: string;
    }
}