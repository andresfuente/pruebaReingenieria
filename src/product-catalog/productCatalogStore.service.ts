module OrangeFeSARQ.Services {
    'use strict';
    export class ProductCatalogStore {
        constructor() {
        }
        private _specification: any;
        private _offering: any;
        private _listRates: any;

        get specification(): any {
            return this._specification;
        }
        get offering(): any {
            return this._offering;
        }
        get listRates(): any {
            return this._offering;
        }
        set specification(value: any) {
            this._specification = value;
        }
        set offering(value: any) {
            this._offering = value;
        }
        set listRates(value: any) {
            this._offering = value;
        }

        getProduct(tmcode): any {
            let vm = this;
            let product: any;
            if (tmcode) {
                product = {};
                product.specification = vm.getCatalogSpecificationByTmcode(tmcode);
                product.offering = vm.getCatalogOfferingByTmcode(tmcode);
            }
            return product;
        }

        getCatalogSpecificationByTmcode(tmcode): any {
            let vm = this;
            let catalog: any = vm.specification;
            let productID: number;
            if (tmcode && catalog) {
                let length: number = catalog.length || 0;
                for (let i = 0; i < length; i++) {
                    let element: any = catalog[i];
                    if (element && tmcode === element.id) {
                        return element
                    }
                }
            }
            return null
        }

        getCatalogOfferingByTmcode(tmcode): Array<any> {
            let vm = this;
            let catalog = vm.offering;
            let offer: any;
            offer = {};
            // let listOffer = [];
            if (tmcode && catalog) {
                let length = catalog.length || 0;
                for (let i = 0; i < length; i++) {
                    let element = catalog[i];
                    let specification = element.productSpecification;
                    if (specification && tmcode === specification.id) {
                        return element;
                        // offer.productSpecification = element.productSpecification;
                        // offer.productOfferingPrice = element.productOfferingPrice;
                        // listOffer.push(offer);
                    }
                }
            }
            return null;
        }
    }
}
