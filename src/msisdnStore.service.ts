module FdC.Services {
    'use strict';

    export class MsisdnStore {
        private _msisdn: string;

        constructor() {
        }

        get msisdn(): string {
            return this._msisdn;
        }

        set msisdn(value: string) {
            this._msisdn = value;
        }
    }
    // Registration
    angular.module('msisdnStore', [])
        .service('msisdnStore', MsisdnStore);

  }
