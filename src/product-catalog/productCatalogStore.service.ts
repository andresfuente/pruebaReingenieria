module OrangeFeSARQ.Services {
    'use strict';
    export class ProductCatalogStore {
        constructor() {
        }
        private _specification: any;
        private _offering: any;
        get specification(): any {
            return this._specification;
        }
        get offering(): any {
            return this._offering;
        }
        set specification(value: any) {
            this._specification = value;
        }
        set offering(value: any) {
            this._offering = value;
        }
    }
}
