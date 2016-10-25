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

        getCatalogSpecificationByTmcode(tmcode): any {
            let vm = this;
            let catalog: any = vm.specification;
            let productID: number;
            let product: Array<any> = [];
            if (tmcode && catalog) {
                let length: number = catalog.length || 0;
                for (let i = 0; i < length; i++) {
                    let product: any = catalog[i];
                    if (product && tmcode === product.id) {
                        return product
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
            let listOffer = [];
            if (tmcode && catalog) {
                let length = catalog.length || 0;
                for (let i = 0; i < length; i++) {
                    let product = catalog[i];
                    let specification = product.productSpecification;
                    if (specification && tmcode === specification.id) {
                        offer.productSpecification = product.productSpecification;
                        offer.productOfferingPrice = product.productOfferingPrice;
                        listOffer.push(offer);
                    }
                }
            }
            return listOffer;
        }
    }
}
