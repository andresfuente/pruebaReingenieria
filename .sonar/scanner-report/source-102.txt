/**
 * Created by jcardonv on 03/01/2017.
 */
module newAccount.Models {
    'use strict';

    /**
     * Modelo que contiene la informacion necesaria para una nueva cuenta de correo
     */
    export class NewMailRequest {

        docNumber: string;
        docType: string;
        fixedNumber: string;
        accountLogin: string;
        passwordAccount: string;
        accountDomain: string;

        constructor(docNumber: string = null, docType: string = null, fixedNumber: string = null, accountLogin: string = null, passwordAccount: string = null, accountDomain: string = null) {
            this.docNumber = docNumber;
            this.docType = docType;
            this.fixedNumber = fixedNumber;
            this.accountLogin = accountLogin;
            this.passwordAccount = passwordAccount;
            this.accountDomain = accountDomain;
        }
    }
}
