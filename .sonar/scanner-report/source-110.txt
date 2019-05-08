
module newAccount.Models {
    'use strict';

    /**
     * Modelo que contiene la informacion necesaria para una cambio de contraseña
     */
    export class PassChangeResponse {

        private _result: string;
        private _error: OrangeFeSARQ.Models.ErrorResponse;

        constructor(result: string = null, error: OrangeFeSARQ.Models.ErrorResponse = null) {
            this._result = result;
            this._error = error;
        }

        get result(): string {
            return this._result;
        }

        set result(value: string) {
            this._result = value;
        }

        get error(): OrangeFeSARQ.Models.ErrorResponse {
            return this._error;
        }

        set error(value: OrangeFeSARQ.Models.ErrorResponse) {
            this._error = value;
        }
    }

}
