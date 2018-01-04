declare module OrangeFeSARQ.Models {
    
    /**
     * A person or organization that buys or has bought or otherwise obtained Products, Resources and/or Services
     * from the enterprise or receives free offers for Products, Resources, and&#x2F;or Services.  This is modeled as a
     * Party playing the role of Customer. Customers do not have to be end-users. For example, a Customer can also be
     * another Service Provider (i.e., one who resells the enterprise´s Products, Services and&#x2F;or Resources), or a
     * Service Providers that leases the enterprise´s Products, Services and&#x2F;or Resources.
     */
    export class Customer {
        /**
         * A unique identifier of the Customer.
         */
        public id: string;
        /**
         *
         */
        public password: string;
        /**
         *
         */
        public product: Array<Product>;
        /**
         * Indicate the number of points accumulated by the customer.
         */
        public ospTotalPoints: number;
        /**
         * Identifies the master of the customer data, such as a movil or fijo.
         */
        public ospIDsource: string;
        /**
         * The current condition of a customer, such as active, inactive, prospective.
         */
        public status: string;
        /**
         * Field indicating whether the customer is a data donor.
         */
        public ospDataDonor: string;
        /**
         * Indicates if the customer is supported by the CIMA architure.
         */
        public ospCIMAarchitectureCustomer: string;
        /**
         * The type of a customer in the mobile backend.
         */
        public ospMobileCustomerSegment: string;
        /**
         * The type of a customer in the fixed backend.
         */
        public ospFixeCustomerSegment: string;
        /**
         * The subtype of a customer in the mobile backend.
         */
        public ospMobileCustomerSubSegment: string;
        /**
         * Value segment in the mobile backend, for example RES 4, PYME 2...
         */
        public ospMobileValueSegment: string;
        /**
         * Value segment in the fixed backend, for example RES 4, PYME 2...
         */
        public ospFixeValueSegment: string;
        /**
         * Convergent type such as BIEQUIPADO, MOVIL, FIJO
         */
        public ospConvergentType: string;
        /**
         * Indicate if customer have an unpaid bill
         */
        public ospCustomerUnpaidBill: boolean;
        /**
         * Indicate if customer if the consumer has made fraudulent actions
         */
        public ospCustomerFraude: boolean;
        /**
         * Point programme for customers who have more than five lines, that is, Pymes and Big Accounts
         */
        public ospPointProgrammeType: string;
        /**
         *
         */
        public billingAccount: Array<BillingAccount>;
        /**
         *
         */
        public customerBill: Array<CustomerBill>;
        /**
         *
         */
        public telephoneNumber: Array<TelephoneNumber>;
        /**
         *
         */
        public emailContact: Array<EmailContact>;
        /**
         *
         */
        public postalContact: Array<PostalContact>;
        /**
         *
         */
        public individual: Individual;
        /**
         *
         */
        public organization: Organization;
    }
    /**
     *
     */
    export class Response {
        /**
         *
         */
        public customer: Customer;
        /**
         *
         */
        public error: Error;
    }
    /**
     * A CustomerBill or an Invoice is an electronic or paper document, that gathers and formats charges to be charged
     * together to a BillingAccount for a billing cycle.
     */
    export class CustomerBill {
        /**
         * Unique identifier for the customer bill
         */
        public id: string;
        /**
         *
         */
        public billingAccount: BillingAccountRef;
        /**
         * Normal, duplicate invoice, interim invoice, last invoice, credit note, trial invoice
         */
        public category: string;
        /**
         * Amount due for this customer bill expressed in the given currency
         */
        public amountDue: string;
        /**
         * Customer bill domain: Fix, Mobile, Broadband, Multiplay
         */
        public invoiceDomainSpecLabel: string;
        /**
         * Customer bill media type
         */
        public billMedia: string;
    }
    /**
     * A group of people identified by shared interests or purpose. Because of the complex nature of many businesses,
     * both organisations and organisation unit are represented by the same business entity in the model. An
     * Organisation is a type of Party. An organisation can be atomic or composite. A composite organisation is a
     * container of organisations. Any kind of organisational tree can be described.
     */
    export class Organization {
        /**
         * Unique identifier for an organization
         */
        public id: string;
        /**
         * CIF
         */
        public ospIDtype: string;
        /**
         * Values: fijo, movil
         */
        public ospIDsource: string;
        /**
         * If true, the organisation is a legal entity known by national referential.
         */
        public isLegalEntity: boolean;
        /**
         * Precise the status of a legal entity like Legally established, registration in progress, Receivership
         */
        public legalStatusCode: string;
        /**
         * The name that the organisation (unit) trades under
         */
        public tradingName: string;
    }
    /**
     * A Person represents a single human being. A Person is a type of Party. As a Party, a person could play a role of
     * a customer, an employee or any other person that the organisation needs to store information about.
     */
    export class Individual {
        /**
         * Unique identifier of an individual
         */
        public id: string;
        /**
         * NIF, número de pasaporte, número de tarjeta de identidad
         */
        public ospIDtype: string;
        /**
         * Values: fijo, movil
         */
        public ospIDsource: string;
        /**
         * Birthdate of the customer
         */
        public birthDate: string;
        /**
         * First name of the person also known as given name
         */
        public firstName: string;
        /**
         * Usual name of the person
         */
        public lastName: string;
        /**
         * Contains, in one string, a fully formatted name with all of its pieces in their proper place. This includes all of the necessary punctuation. This de-normalized form of the name cannot be easily parsed.
         */
        public formattedName: string;
    }
    /**
     *  A phone number follows the recommendations of the E164 internationa public telecommunications numbering plan
     *  (see phone numbering). The French numbering plan is based on a 10-digit format which unambiguously refers to
     *  customer terminal equipment or service, through a number such as EZABPQMCDU. Short, 4-digit numbers like 33BPQ
     *  are rare resources. The geographical numbers for which &quot;Z&quot; is 1,2,3,4, or 5 are assigned by the
     *  telecom operator in an elementary numbering area (ARCEP ENA concept). ARCEP assigns a set of phone numbers to
     *  the telecommunication operators. A customer resource id is a special case of IS logical resource.
     */
    export class TelephoneNumber {
        /**
         * Unique identifier of the telephone
         */
        public id: string;
        /**
         * Identifies the master of the customer data, such as a movil or fijo.
         */
        public ospIDsource: string;
        /**
         * There is two types if the customer is a mobile customer: phone number and mobile phone
         */
        public type: string;
        /**
         * Telephonenumber and the number of lines mobiles hired by customer
         */
        public number: string;
    }
    /**
     * The PostalContact is a type of ContactMedium. It is linked to an AbstractGeograpicalAddress through a
     * contactAddressRole that specifies whether this contact address is to be used as a billing address, a Phone
     * Directory address etc... (In version of Orange SID prior to S9F1, this entity was called Address; as we reviewed
     * and evolved the model, this is referred to now as a Contact      Address.)
     */
    export class PostalContact {
        /**
         * Identifier of the address
         */
        public id: string;
        /**
         * Identifies the master of the customer data, such as a movil or fijo.
         */
        public ospIDsource: string;
        /**
         * If is a mobile customer: 1)postal address 2)billing address. If is a fixe customer: 1)postal address 2)billing address 3)installed product address
         */
        public type: string;
        /**
         * The name of the city
         */
        public city: string;
        /**
         * The name of the country
         */
        public country: string;
        /**
         * The post code of the postal address
         */
        public postCode: string;
        /**
         * The name of the state
         */
        public stateOrProvince: string;
        /**
         * The type of the street
         */
        public streetType: string;
        /**
         * The name of the street
         */
        public streetName: string;
        /**
         * The number of the street
         */
        public streetNr: string;
        /**
         * The number of the staircase
         */
        public staircaseNumber: string;
        /**
         * The number of the floor
         */
        public floorNumber: string;
        /**
         * The number of the apartament
         */
        public apartmentNumber: string;
    }
    /**
     * An EmailContact is a type of ContactMedium.
     */
    export class EmailContact {
        /**
         * Unique identifier for the email
         */
        public id: string;
        /**
         * Identifies the master of the customer data, such as a movil or fijo.
         */
        public ospIDsource: string;
        /**
         * If the customer is a mobile customer: 1)email 2)validated email. If the customer is a fixe customer: 1)email
         */
        public type: string;
        /**
         * Defines the email of the emailContact
         */
        public eMailAddress: string;
    }
    /**
     * The value(s) of a configured function of an InstalledProduct.
     */
    export class ProductCharacteristic {
        /**
         * Identifies the name of the product, it depends on the product name and the product type
         */
        public name: string;
        /**
         * Determinate the value of the product, it depends on the product name and the product type
         */
        public value: string;
        /**
         *
         */
        public isInstalledPublicKey: boolean;
        /**
         *
         */
        public publicKey: Array<PublicKey>;
    }
    /**
     * Represents an instance of a product offering subscribed to by a party, such as a customer, the place where the
     * product is in use, as well as configuration characteristics, such as assigned telephone numbers and internet
     * addresses.  The Product ABE also tracks the services and&#x2F;or resources through which the product is realized.
     */
    export class Product {
        /**
         * Unique identifier of the product
         */
        public id: string;
        /**
         * Defines the type of the product, it depends on the product name and the product type
         */
        public ospProductType: string;
        /**
         * Identifies the name of the product, it depends on the product name and the product type
         */
        public name: string;
        /**
         * Description of the product
         */
        public description: string;
        /**
         * Created, Pending_active, Aborted, Cancelled, Active, Pending_terminate, Terminated, Suspended
         */
        public status: string;
        /**
         * Defines whether visible, default value: Yes
         */
        public isCustomerVisible: boolean;
        /**
         * Identifies if a package, Yes for Product name=Contrato Móvil or Contrato Fijo. No for the others
         */
        public isBundle: boolean;
        /**
         * An instant of time, starting at the product
         */
        public startDate: string;
        /**
         * An instant of time, ending at the product
         */
        public terminationDate: string;
        /**
         * period of time of a vap product
         */
        public ospDuration: number;
        /**
         *
         */
        public place: Array<PostalContact>;
        /**
         *
         */
        public productCharacteristic: Array<ProductCharacteristic>;
        /**
         *
         */
        public productRelationship: Array<ProductRelationship>;
        /**
         *
         */
        public billingAccount: BillingAccountRef;
        /**
         *
         */
        public agreement: Array<Agreement>;
        /**
         *
         */
        public productOffering: ProductOffering;
    }
    /**
     *
     */
    export class ProductOffering {
        /**
         *
         */
        public productOfferingPrice: Array<ProductOfferingPrice>;
    }
    /**
     *
     */
    export class ProductOfferingPrice {
        /**
         * name of the productOfferingPrice
         */
        public name: string;
        /**
         *
         */
        public validFor: TimePeriod;
        /**
         *
         */
        public price: Array<Price>;
        /**
         * months pending to pay
         */
        public ospMesesPendientesPago: number;
    }
    /**
     *
     */
    export class Price {
        /**
         * All taxes included amount (expressed in the given currency)
         */
        public taxIncludedAmount: string;
        /**
         * A string used as a code for specifying the currency associated to the given amounts.(EUR for Euro).
         */
        public currencyCode: string;
    }
    /**
     * A base &#x2F; value business entity used to represent a period of time between two timepoints.
     */
    export class TimePeriod {
        /**
         * An instant of time, starting at the TimePeriod
         */
        public startDateTime: string;
        /**
         * An instant of time, ending at the TimePeriod.
         */
        public endDateTime: string;
    }
    /**
     *
     */
    export class BillingAccount {
        /**
         * Unique identifier of the billingAccount
         */
        public id: string;
        /**
         *
         */
        public billingAddress: Array<PostalContact>;
        /**
         * If the customer is Orange mobile: BSCS v6. If the customer Orange fixe: Kenan FX 2.0. If both: Kenan FX 2.5
         */
        public ospIDsource: string;
        /**
         * Indicates if a fixe and a billing account are tied by a single invoice for a convergent offer
         */
        public ospRelatedBillingAccountForSingleInvoice: string;
        /**
         * Field indicating whether the customer is a data donor.
         */
        public ospDataDonor: string;
        /**
         * Field indicating whether the customer has multiline discount for profiling.
         */
        public ospMultilineDiscount: string;
        /**
         * PRGCode
         */
        public ratingType: string;
        /**
         * Defines the name of the billinAccount
         */
        public name: string;
        /**
         * Identifies the status of the billingAccount
         */
        public status: string;
        /**
         * Indicate if account have an unpaid bill
         */
        public ospAccountUnpaidBill: boolean;
        /**
         *
         */
        public customerBillingCycleSpecification: CustomerBillingCycleSpecification;
        /**
         *
         */
        public customerBillFormat: CustomerBillFormat;
        /**
         *
         */
        public customerBillPresentationMedia: CustomerBillPresentationMedia;
        /**
         *
         */
        public currency: Currency;
        /**
         *
         */
        public billingAccountBalance: Array<BillingAccountBalance>;
        /**
         *
         */
        public authorizedName: string;
        /**
         *
         */
        public authorizedDocument: string;
    }
    /**
     *
     */
    export class CustomerBillingCycleSpecification {
        /**
         * Identifies the name of customerBillingCycleSpecification, it depends on the product name.
         */
        public name: string;
    }
    /**
     *
     */
    export class CustomerBillFormat {
        /**
         * Identifies the name of customerBillFormat
         */
        public name: string;
    }
    /**
     *
     */
    export class CustomerBillPresentationMedia {
        /**
         * Identifies the name of customerBillPresentationMedia
         */
        public name: string;
    }
    /**
     *
     */
    export class Currency {
        /**
         * Default value EUR
         */
        public currencyCode: string;
    }
    /**
     *
     */
    export class BillingAccountBalance {
        /**
         * Defines the type of the BillingAccountBalance
         */
        public type: string;
        /**
         * Amount
         */
        public amount: string;
    }
    /**
     *
     */
    export class BillingAccountRef {
        /**
         * Defines the id of the BillingAccount
         */
        public id: string;
    }
    /**
     *
     */
    export class ProductRelationship {
        /**
         * Identifies the type of the productRelationShip, it depends on the product name.
         */
        public type: string;
        /**
         *
         */
        public product: ProductRef;
    }
    /**
     *
     */
    export class Agreement {
        /**
         * Unique identifier of Agreement
         */
        public id: string;
        /**
         * defines if is in an agreement or not
         */
        public ospCdp: string;
        /**
         * Identifies penalty in Euros in case of break the agreement
         */
        public ospPenaltyRelatedToAgreementPeriod: string;
        /**
         * Description of agreement
         */
        public description: string;
        /**
         * type of the mobile agreement
         */
        public ospModalidad: string;
        /**
         * defines the period of the agreement in days
         */
        public ospDuration: number;
        /**
         * Type of agreement, it depends on the product name.
         */
        public type: string;
        /**
         *
         */
        public agreementPeriod: TimePeriod;
    }
    /**
     *
     */
    export class PublicKey {
        /**
         * Unique identifier of publicKey
         */
        public id: string;
        /**
         * Determinate the name of publicKey
         */
        public name: string;
    }
    /**
     *
     */
    export class ProductRef {
        /**
         * Unique identifier of ProductRef
         */
        public id: string;
    }
    /**
     *
     */
    export class Error {
        /**
         * An integer coding the error type. This is given to caller so he can translate them if required.
         */
        public code: number;
        /**
         * A short localized string that describes the error.
         */
        public message: string;
        /**
         * (optional) A long localized error description if needed. It can contain precise information about which parameter is missing, or what are the identifier acceptable values.
         */
        public description: string;
        /**
         * (optional) A URL to online documentation that provides more information about the error.
         */
        public infoURL: string;
        /**
         *
         */
        public details: Array<ErrorDetail>;
    }
    /**
     *
     */
    export class ErrorDetail {
        /**
         * An integer coding the error type. This is given to caller so he can translate them if required.
         */
        public code: number;
        /**
         * A short localized string that describes the error.
         */
        public message: string;
        /**
         * (optional) A long localized error description if needed. It can contain precise information about which parameter is missing, or what are the identifier acceptable values.
         */
        public description: string;
        /**
         * (optional) A URL to online documentation that provides more information about the error.
         */
        public infoURL: string;
    }

}
