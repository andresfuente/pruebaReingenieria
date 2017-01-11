
module newAccount.Models {
    'use strict';

    /**
     * Modelo que contiene la informacion necesaria para una nueva cuenta de correo
     **/
    export class PassChangeEmailRequest {

         docNumber: string;
         docType: string;
         fixedNumber: string;
         accountLogin: string;
		 oldPassword: string;
		 newPassword: string;
         accountDomain: string;


        constructor(docNumber: string = null, docType: string = null, fixedNumber: string = null, accountLogin: string = null, oldPassword: string = null, newPassword: string = null, accountDomain: string = null) {
            this.docNumber = docNumber;
            this.docType = docType;
            this.fixedNumber = fixedNumber;
            this.accountLogin = accountLogin;
            this.oldPassword = oldPassword;
			this.newPassword = newPassword;
            this.accountDomain = accountDomain;
        }
    }

}
