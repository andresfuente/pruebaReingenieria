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

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogStore#getProduct
         * @methodOf OrangeFeSARQ.Services:ProductCatalogStore
         * @param {string} value: valor del campo a buscar
         * @param {string} key: clave donde se buscará el valor
         * @description
         * Obtiene los datos de product Offering y del product Specification en base a tmvalue
         */
        getProduct(value: string, key: string = 'id'): any {
            let vm = this;
            let product: any;
            if (value) {
                product = {};
                product.specification = vm.getCatalogSpecificationByTmcode(value, key);
                product.offering = vm.getCatalogOfferingByTmcode(value, key);
            }
            return product;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogStore#getCatalogSpecificationByTmcode
         * @methodOf OrangeFeSARQ.Services:ProductCatalogStore
         * @param {string} value: valor del campo a buscar
         * @param {string} key: clave donde se buscará el valor
         * @description
         * Recoge los datos del product catalog buscado por el campo seleccioando
         */
        getCatalogSpecificationByTmcode(value: string, key: string = 'id'): any {
            let vm = this;
            let catalog: any = vm.specification;
            let productID: number;
            if (value && catalog) {
                let length: number = catalog.length || 0;
                for (let i = 0; i < length; i++) {
                    let element: any = catalog[i];
                    if (element && value === element[key]) {
                        return element;
                    }
                }
            }
            return null;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogStore#getCatalogOfferingByTmcode
         * @methodOf OrangeFeSARQ.Services:ProductCatalogStore
         * @param {string} value: valor del campo a buscar
         * @param {string} key: clave donde se buscará el valor
         * @description
         * Recoge los datos del product Offering buscado por el campo seleccioando
         */
        getCatalogOfferingByTmcode(value: string, key: string = 'id'): Array<any> {
            let vm = this;
            let catalog = vm.offering;
            let offer: any;
            offer = {};
            // - let listOffer = [];
            if (value && catalog) {
                let length = catalog.length || 0;
                for (let i = 0; i < length; i++) {
                    let element = catalog[i];
                    let specification = element.productSpecification;
                    if (specification && value === specification[key]) {
                        return element;
                        /*offer.productSpecification = element.productSpecification;
                        offer.productOfferingPrice = element.productOfferingPrice;
                        listOffer.push(offer);*/
                    }
                }
            }
            return null;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogStore#getProduct
         * @methodOf OrangeFeSARQ.Services:ProductCatalogStore
         * @description
         * Cruza los productos del prodructOffering que se hayen en el productSpecification
         */
        extractContratablesProducts(pOf, pSp) {
            let contractingProducts = [];
			if(pOf){				
				for (let i = 0; i < pOf.length; i++) {
					let _pO = pOf[i];
					for (let j = 0; j < pSp.length; j++) {
						let _pS = pSp[j];
						if (_pS.id && _pO.productSpecification.id === _pS.id) {
							_pO.productSpecification = _pS;
							contractingProducts.push(_pO);
						}
					}
				}
			}
            return contractingProducts;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogStore#getProduct
         * @methodOf OrangeFeSARQ.Services:ProductCatalogStore
         * @description
         * Busca un producto de en el productInventory code es
         */
        isContractacted(ospExternalCode, pIn) {
            let isContractacted = false;
			if(pIn &&  pIn.product){				
				for (let i = 0; i < pIn.product.length; i++) {
					let _pI = pIn.product[i];
					if (_pI.ospIdCRM === ospExternalCode) {
						isContractacted = true;
					}
				}
            }
            return isContractacted;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:ProductCatalogStore#getShowablesProductsByComponentName
         * @methodOf OrangeFeSARQ.Services:ProductCatalogStore
         * @description
         *
         */
        getShowablesProductsByComponentName(compName: string, pOf, pSp) {
            let vm = this;
            let contractables = vm.extractContratablesProducts(pOf, pSp);
            let result: Array<any> = new Array<any>();
            // Ahora vamos a filtar para saber si en x com se debe mostrar
            for (let i = 0; i < contractables.length; i++) {
                let e = contractables[i];
                for (let j = 0; j < e.productSpecification.bundledProductSpecification.length; j++) {
                    let com = e.productSpecification.bundledProductSpecification[j];
                    if (com.id == compName) {
                        result.push(e);
                    }
                }
            }
            return result;
        }

        getShowablesAndContractablesProductsByComponentName(compName: string, pOf, pSp, pIn) {
            let vm = this;
            let result: Array<any> = new Array<any>();
            let showables: Array<any> = vm.getShowablesProductsByComponentName(compName, pOf, pSp);

            if (showables.length > 0) {
                for (let i = 0; i < showables.length; i++) {
                    let p = showables[i];
                    if (!vm.isContractacted(p.productSpecification.ospExternalCode, pIn)) {
                        result.push(p);
                    }
                }
            }
            return result;
        }

        getShowablesAndContractedProductsByComponentName(compName: string, pOf, pSp, pIn) {
            let vm = this;
            let result: Array<any> = new Array<any>();
            let showables: Array<any> = vm.getShowablesProductsByComponentName(compName, pOf, pSp);

            if (showables.length > 0) {
                for (let i = 0; i < showables.length; i++) {
                    let p = showables[i];
                    if (vm.isContractacted(p.productSpecification.ospExternalCode, pIn)) {
                        result.push(p);
                    }
                }
            }
            return result;
        }
    }
}
