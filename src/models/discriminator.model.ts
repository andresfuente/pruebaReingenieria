module discriminator.Models {
    
    export class OspAddressExternalId {
        public refId: string;
        public externalId: string;

        constructor() {
            let vm = this;
        }
    }    

    export class ServiceQualificationPlace {
        public id: string;
        public href: string;
        public streetNr: string;
        public streetNrSuffix: string;
        public streetNrLast: string;
        public streetNrLastSuffix: string;
        public streetName: string;
        public streetType: string;
        public streetSuffix: string;
        public postcode: string;
        public stateOrProvince: string;
        public locality: string;
        public city: string;
        public country: string;
        public ospAddressExternalId: Array<discriminator.Models.OspAddressExternalId>;
        public staircaseNumber: string;
        public floorNumber: string;
        public apartmentNumber: string;
        public ospINECityCode: string;
        public ospSingularEntity: string;
        public ospAccuracy: string;

        constructor() {
            let vm = this;
            vm.id = '';
            vm.href = '';
            vm.streetNr = '';
            vm.streetNrSuffix = '';
            vm.streetNrLast = '';
            vm.streetNrLastSuffix = '';
            vm.streetName = '';
            vm.streetType = '';
            vm.streetNrSuffix = '';
            vm.postcode = '';
            vm.locality = '';
            vm.city = '';
            vm.stateOrProvince = '';
            vm.country = '';
            vm.ospAddressExternalId = new Array<discriminator.Models.OspAddressExternalId>();
            vm.staircaseNumber = '';
            vm.floorNumber = '';
            vm.apartmentNumber = '';
            vm.ospINECityCode = '';
            vm.ospSingularEntity = '';
            vm.ospAccuracy = '';
        }

    }
    

    export class ProductOfferingQualificationRequest {
        public id: string;
        public href: string;
        public interactionDate: string;
        public description: string;
        public interactionDateComplete: string;
        public interactionStatus: string;
        public place: discriminator.Models.ServiceQualificationPlace;
        public physicalResource: Object;
        public orderFeasibilityCheckRequestItems: Array<Object>;
        public relatedParty: Array<Object>;

        constructor() {
            let vm = this;
            vm.id = '';
            vm.href = '';
            vm.interactionDate = '';
            vm.description = '';
            vm.interactionDateComplete = '';
            vm.interactionStatus = '';
            vm.place = new discriminator.Models.ServiceQualificationPlace();
            vm.physicalResource = new Object;
            vm.orderFeasibilityCheckRequestItems = [];
            vm.relatedParty = [];
        }

    }
    
    /// LLAMADA STEP 2 - Product Offering Qualification /// 
    export class Step2CheckRequest {
        public productOfferingQualificationRequest: discriminator.Models.ProductOfferingQualificationRequest;
        public respuesta;
        public datosConsulta;

        constructor() {
            let vm = this;
            vm.productOfferingQualificationRequest = new discriminator.Models.ProductOfferingQualificationRequest;
            vm.datosConsulta = null;
            vm.respuesta = {
                codigoMiga: null,
                origenFibra: 'NO',
                preguntarIncompatilidades: null,
                resultado: null,
                acceso: [
                    {
                        coberturaPorDireccion: 'N/A',
                        servicioSuministrador: null,
                        tipoAcceso: 'FTTH'
                    }
                ]
            };
        }
    }
    
}
