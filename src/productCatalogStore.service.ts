module FdC.Services {
    'use strict';

    export class ProductCatalogStore {
        constructor() {
        }

        private _info: any;

        get info(): any {
            return this._info;
        }

        set info(value: any) {
            this._info = value;
        }
    }

    angular.module('productCatalogStore', [])
        .service('productCatalogStore', CustomerViewStore);

}
