declare module OrangeFeSARQ.Models {

    export interface RelatedPublicKey {
        id: string;
        name: string;
        description: string;
    }

    export interface ServiceSpecification {
        id: string;
        href: string;
    }

    export interface ServiceCharacteristic {
        name: string;
        value: string;
    }

    export interface IServicesCharacteristics {
        name: string;
        value: string;
    }

    export interface ServiceRef {
        id: string;
        href: string;
    }

    export interface ServiceRelationship {
        type: string;
        serviceRef: ServiceRef;
    }

    export interface RelatedParty {
        id: string;
        ospIdType: string;
        role: string;
        href: string;
    }

    export interface SupportingService {
        id: string;
        href: string;
    }

    export interface SupportingResource {
        id: string;
        href: string;
    }

    export interface Service {
        id: string;
        href: string;
        name: string;
        description: string;
        type: string;
        version: string;
        state: string;
        startDate: string;
        relatedPublicKey: RelatedPublicKey;
        serviceSpecification: ServiceSpecification;
        serviceCharacteristic: ServiceCharacteristic[];
        serviceRelationship: ServiceRelationship[];
        relatedParty: RelatedParty[];
        supportingService: SupportingService[];
        supportingResource: SupportingResource[];
    }

    export interface Detail {
        code: number;
        message: string;
        description: string;
        infoURL: string;
    }

    export interface Error {
        code: number;
        message: string;
        description: string;
        infoURL: string;
        details: Detail[];
    }

    export interface ActivationAndConfigurationModel {
        services: Service[];
        error: Error;
    }

    export interface IMultipleServices {
        id: string;
        href: string;
        name: string;
        description: string;
        type: string;
        version: string;
        state: string;
        startDate: string;
        relatedPublicKey: RelatedPublicKey;
        serviceSpecification: ServiceSpecification;
        servicesCharacteristics: IServicesCharacteristics[][];
        serviceRelationship: ServiceRelationship[];
        relatedParty: RelatedParty[];
        supportingService: SupportingService[];
        supportingResource: SupportingResource[];
    }

}

