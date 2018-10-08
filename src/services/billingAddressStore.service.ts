module OrangeFeSARQ.Services {

    export class BillingAddressStoreSrv {
        private _store;
        private _principalMSISDN;
        private _currentPhoneLine: string;

        private LAND_PHONE_TYPE = 'Contrato Fijo';
        private MOBILE_PHONE_TYPE = 'POSPAGO';

        private LAND_PHONE_NAME = 'Número fijo Asociado';
        private MOBILE_PHONE_NAME = 'MSISDN';

        private currentBillingAddress

        createStore(customerView: any) {
            if (customerView) {
                this._store = customerView.product
                // Buscamos los fijos y móbiles pospago
                .filter(product => (
                    product.ospProductType === this.LAND_PHONE_TYPE || product.ospProductType === this.MOBILE_PHONE_TYPE
                ))
                // Creamos el store
                .reduce((store, product) => {
                    // Buscamos al objeto que contiene msisdn
                    const characteristic = product.productCharacteristic.find(characteristic => (
                        characteristic.name === this.LAND_PHONE_NAME || characteristic.name === this.MOBILE_PHONE_NAME
                    ));
                    // Buscamos el billingAccount de la línea
                    const billingAccount = customerView.billingAccount.find(account => (
                        account.id === product.billingAccount.id
                    ))
                    
                    const msisdn = characteristic && characteristic.value;
                    const billingAddress = billingAccount && billingAccount.billingAddress;
                    // Si todo va bien, construimos el store
                    if (msisdn && billingAddress) {
                        store[msisdn] = billingAddress[0]   // Cogemos la primera porque no se ha visto más direcciones
                    }
                    return store;
                }, {});
            } else {
                // Si no encontramos un customerView, no tenemos store.
                this._store = {};
            }
        }

        loadFromSessionStorage() {
            const principalMsisdn: any = JSON.parse(localStorage.getItem('principalMsisdn'));
            const customerView: any = JSON.parse(sessionStorage.getItem('cv'));
            
            if(principalMsisdn && principalMsisdn.msisdn) {
                this._principalMSISDN = principalMsisdn.msisdn;
            }
            this.createStore(customerView);
        }

        getCurrentPhoneLine(): string {
            let currentPhoneLine = '';
            const commercialData: any = JSON.parse(sessionStorage.getItem('commercialData'));

            if(commercialData) {
                const currentCommercialAct: any = commercialData.find(commercialAct => commercialAct.ospIsSelected);
                currentPhoneLine = currentCommercialAct && currentCommercialAct.serviceNumber;
            }
            return currentPhoneLine;
        }
        
        getBillingAddressByLine(line: string): any {
            if(!this._store) {
                this.loadFromSessionStorage();
            }
            return this._store[line]
        }

        getCurrentBillingAddress(): any {
            if(!this._currentPhoneLine) {
                this._currentPhoneLine = this.getCurrentPhoneLine();
            }
            return this._currentPhoneLine ? this._store[this._currentPhoneLine] : this.principalBillingAddress;
        }

        get principalBillingAddress(): any {
            if(!this._principalMSISDN || !this._store) {
                this.loadFromSessionStorage();
            }
            return this._store[this._principalMSISDN];
        }

        get store(): any {
            if(!this._store) {
                this.loadFromSessionStorage();
            }
            return this._store;
        }

    }
}
