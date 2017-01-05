/**
 * Created by jcardonv on 03/01/2017.
 **/
module newAccount.Models {
    'use strict';

    /**
     * Modelo que contiene la informacion necesaria para una nueva cuenta de correo
     **/
    export class NewMailRequest {

        private _docNumber: string;
        private _docType: string;
        private _fixedNumber: string;
        private _accountLogin: string;
        private _passwordAccount: string;
        private _accountDomain: string;


        constructor(docNumber: string = null, docType: string = null, fixedNumber: string = null, accountLogin: string = null, passwordAccount: string = null, accountDomain: string = null) {
            this._docNumber = docNumber;
            this._docType = docType;
            this._fixedNumber = fixedNumber;
            this._accountLogin = accountLogin;
            this._passwordAccount = passwordAccount;
            this._accountDomain = accountDomain;
        }


        get docNumber(): string {
            return this._docNumber;
        }

        set docNumber(value: string) {
            this._docNumber = value;
        }

        get docType(): string {
            return this._docType;
        }

        set docType(value: string) {
            this._docType = value;
        }

        get fixedNumber(): string {
            return this._fixedNumber;
        }

        set fixedNumber(value: string) {
            this._fixedNumber = value;
        }

        get accountLogin(): string {
            return this._accountLogin;
        }

        set accountLogin(value: string) {
            this._accountLogin = value;
        }

        get passwordAccount(): string {
            return this._passwordAccount;
        }

        set passwordAccount(value: string) {
            this._passwordAccount = value;
        }

        get accountDomain(): string {
            return this._accountDomain;
        }

        set accountDomain(value: string) {
            this._accountDomain = value;
        }
    }

}
