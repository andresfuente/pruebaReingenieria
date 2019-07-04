module OrangeFeSARQ.Models {

    export interface ProductOfferingV2QueryParams {
        segment?: 'Residencial' | 'Empresas';
        commercialAction?: 'renove' | 'migracion' | 'portabilidad' | 'alta' | 'cambiotarifa';
        productType?: 'sva' | 'rate' | 'promo';
        category?: 'Convergenet' | 'Convergente_NAC' | 'Fijo' | 'Movil' | 'Mundo' | 'Holiday';
        contractType?: 'POSPAGO' | 'PREPAGO' | 'TV';
        channel?: string;
        idOfertaComercialList?: string;
        idTecnologiaList?: string;
        idSvaList?: string;
        idPromoList?: string;
        pack?: string;
        type?: 'movil' | 'movilfijo';
        currentDate?: string;
        bundleId?: string;
        mode?: 'complete' | 'light' | 'null';
        bucketId?: string; 
        idRateList?: string;
        isExistingCustomer?: boolean;
    }
    
    export interface ProductSpecificationV2QueryParams {
        isExistingCustomer?: boolean;
        idRateList?: string;
        bucketId?: string;
        mode?: 'complete' | 'light' | 'null';
        bundleId?: string;
        currentDate?: string;
        type?: 'movil' | 'movilfijo';
        pack?: string;
        idPromoList?: string;
        idSvaList?: string;
        idTecnologiaList?: string;
        idOfertaComercialList?: string;
        channel?: string;
        contractType?: 'POSPAGO' | 'PREPAGO' | 'TV';
        category?: 'Convergenet' | 'Convergente_NAC' | 'Fijo' | 'Movil' | 'Mundo' | 'Holiday';
        productType?: 'sva' | 'rate' | 'promo';
        commercialAction?: 'renove' | 'migracion' | 'portabilidad' | 'alta' | 'cambiotarifa';
        segment?: 'Residencial' | 'Empresas';
    }
}