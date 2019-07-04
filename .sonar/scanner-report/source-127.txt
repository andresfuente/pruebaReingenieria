module documentValidatorFCU.Models {

    export class PostResponse {
        encrypt: string;
        error: Array<Error>;
    }

    export class Error {
        code: number;
        message: string;
        description: string;
        infoURL: string;
        details: Array<ErrorDetail>;
    }

    export class ErrorDetail {
        code: number;
        message: string;
        description: string;
        infoURL: string;
    }
 }    