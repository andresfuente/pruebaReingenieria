module OrangeFeSARQ.Models {
    'use strict';
    export interface EligibilityResponse {
        representation: EligibilityResponseRepresentation;
        error: any;
    }    
    export interface EligibilityResponseRepresentation {
        publicKey: string;
        brand: string;
        appID: string;
        requestDate: Date;
        createDate: Date;
        elegibilityResult: string;
    }

}
