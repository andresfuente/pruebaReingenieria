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
}