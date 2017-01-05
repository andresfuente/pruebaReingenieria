/**
 * Created by jcardonv on 03/01/2017.
 *
module OrangeFeSARQ.Models {
    'use strict';

    export class AppliedProductUsageCharge {
        public startDate: Date;
        public endDate: Date;
        public productUsageType: number;
        public calledNumber: string;
        public originatingCallingNumber: string;
        public destinationCode: string;
        public destinationLabel: string;
        public descriptionLabel: string;
        public offerTariffType: string;
        public unitCode: string;
        public unitLabel: string;
        public unitNumber: number;
        public taxIncludedAmount: number;
        public taxRate: number;
        public usageRatingTag: string;
        public isBilled: boolean;

        constructor() {
        }
    }

    export class CustomerBill {
        public id: string;
        public category: string;
        public date: string;
        public nextBillDate: string;
        public amountDue: number;
        public dueDate: string;
        public remainingAmount: number;
        public netOfTaxAmount: number;
        public taxIncludedTotAmount: number;
        public currencyCode: string;
        public lifecycleStatus: string;
        public invoiceState: string;
        public invoiceDomainSpecLabel: string;
        public billMedia: string;

        constructor() {
        }

    }

    export class Interaction {
        public id: string;
        public name: string;
        public description: string;
        public reason: string;
        public reasonDetail: string;
        public direction: string;
        public status: string;
        public startDate: Date;
        public endDate: Date;
        public subjectLabel: string;
        public subjectDescription: string;
        public contactMediumType: string;
        public resultType: string;
        public resultID: string;

        constructor() {
        }

    }

    export class ProductOrder {
        public id: string;
        public version: string;
        public externalID: string;
        public description: string;
        public creationDate: Date;
        public depositDate: Date;
        public isConfigurationChecked: boolean;
        public configurationCheckedDate: string;
        public modificationDate: Date;
        public status: string;
    }

    export class CustomerProblem {
        public id: string;
        public description: string;
        public priority: string;
        public dateTroubleDetection: Date;
        public dateCreation: Date;
        public dateRepairEstimated: Date;

        constructor() {
        }

    }

    export class ContactMedium {
        public id: string;
        public type: string;

        constructor() {
        }

    }

    export class Individual {
        public nationality: string;
        public gender: string;
        public birthDate: string;
        public placeOfBirth: string;
        public countryOfBirth: string;
        public maritalStatus: string;
        public salutation: string;
        public firstName: string;
        public lastName: string;
        public birthName: string;
        public formattedName: string;

        constructor() {
        }

    }

    export class Organization {
        public isLegalEntity: boolean;
        public type: string;
        public isHeadOffice: boolean;
        public activityCode: string;
        public legalShapeCode: string;
        public legalStatusCode: string;
        public tradingName: string;
        public brand: string;

        constructor() {
        }

    }

    export class CommitmentDurationChosen {
        public startDateTime: Date;
        public endDateTime: Date;

        constructor() {
        }

    }

    export class ProdPriceCharge {
        public installedTariffID: string;
        public value: number;
        public startDate: string;
        public endDate: string;

        constructor() {
        }

    }

    export class ProductCharacteristic {
        public name: string;
        public value: string;
        public modificationDate: string;
        public isInstalledPublicKey: boolean;

        constructor() {
        }

    }

    export class Product {
        public id: string;
        public status: string;
        public productCode: string;
        public productLabel: string;
        public productType: string;
        public commitmentDurationChosen: OrangeFeSARQ.Models.CommitmentDurationChosen;
        public commitmentStartDate: string;
        public commitmentEndDate: string;
        public isCustomerVisible: boolean;
        public isBundle: boolean;
        public prodPriceCharge: OrangeFeSARQ.Models.ProdPriceCharge[];
        public productCharacteristic: OrangeFeSARQ.Models.ProductCharacteristic[];

        constructor() {
        }

    }

    export class CustomerView {
        public id: string;
        public status: string;
        public rank: number;
        public currentBalance: number;
        public previousBalance: number;
        public riskLevel: string;
        public appliedProductUsageCharge: OrangeFeSARQ.Models.AppliedProductUsageCharge[];
        public customerBill: OrangeFeSARQ.Models.CustomerBill[];
        public interaction: OrangeFeSARQ.Models.Interaction[];
        public productOrder: OrangeFeSARQ.Models.ProductOrder[];
        public customerProblem: OrangeFeSARQ.Models.CustomerProblem[];
        public contactMedium: OrangeFeSARQ.Models.ContactMedium[];
        public individual: OrangeFeSARQ.Models.Individual;
        public organization: OrangeFeSARQ.Models.Organization;
        public product: OrangeFeSARQ.Models.Product[];

        constructor() {
        }

    }

}


*/