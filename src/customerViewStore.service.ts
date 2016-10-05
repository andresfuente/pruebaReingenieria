module FdC.Services {
    'use strict';

    export class CustomerViewStore {
        constructor() {
        }

        private _info:any;


        get info():any {
            return this._info;
        }

        set info(value:any) {
            this._info = value;
        }
    }


    angular.module('customerViewStore', [])
        .service('customerViewStore', CustomerViewStore);

}