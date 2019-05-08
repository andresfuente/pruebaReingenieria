/**
 * Created by jgaralon on 15/02/2018.
 */
module redirectAccount.Models {
    'use strict';

    /**
     * Modelo que contiene la informacion necesaria para permitir redireccionar y cancelar la redirección de una cuenta de correo
     */
    export class RedirectAccountRequest {
       public login
       public domain
       public email
       public operation
       public idType;
       public idNumber;
       public fixedNumber; 

        constructor(login: string = null, domain: string = null, email: string = null, operation: string = null, idType: string = null, idNumber: string = null, fixedNumber: string = null) {
            this.login = login;
            this.domain = domain;
            this.email = email;
            this.operation = operation;
            this.idType = idType;
            this.fixedNumber = fixedNumber;
            this.idNumber = idNumber;
        }
    }
}