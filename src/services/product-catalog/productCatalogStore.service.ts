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
            return this._listRates;
        }
        set specification(value: any) {
            this._specification = value;
        }
        set offering(value: any) {
            this._offering = value;
        }
        set listRates(value: any) {
            this._listRates = value;
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
    
		extractContratablesProducts(pOf,pSp){

			let contractingProducts = [];
			for (let  i = 0; i < pOf.productOffering.length;i++ ){
				let  _pO = pOf.productOffering[i];

				for (let  j = 0; j < pSp.productSpecification.length; j++ ){
					let  _pS = pSp.productSpecification[j];
					if(_pO.id === _pS.id){
						contractingProducts.push(_pO.id);
					}
				}    
			}   
			return contractingProducts;
		}
		
		isContractacted(product, pIn){
			var isContractacted = false;
			for (var i = 0; i < pIn.product.length;i++ ){
				var _pI = pIn.product[i];
				if(_pI.id === product){
					isContractacted = true;
				}
			}
			return isContractacted;
		}
	}
}
