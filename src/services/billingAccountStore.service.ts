module OrangeFeSARQ.Services {

    export class BillingAccountStoreSrv {
        private _store;
        private _principalMSISDN: string;
        private _currentPhoneLine: string;

        private LAND_PHONE_TYPE = 'Contrato Fijo';
        private MOBILE_PHONE_TYPE = 'POSPAGO';

        private LAND_PHONE_NAME = 'Número fijo Asociado';
        private MOBILE_PHONE_NAME = 'MSISDN';

        constructor() {
            this.cleanStore();
        }

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
                    const billingAddress = billingAccount && billingAccount.billingAddress; // Cogemos la primera porque no se ha visto más direcciones
                    // Si todo va bien, construimos el store
                    if (msisdn && billingAddress) {
                        store[msisdn] = {
                            id: billingAccount.id,
                            billingAddress: billingAddress[0]
                        }
                    }
                    return store;
                }, {});
            }
        }

        cleanStore() {
            this._store = {};
            this._principalMSISDN = '';
            this._currentPhoneLine = '';
        }

        loadFromSessionStorage() {
            const principalMsisdn: any = JSON.parse(localStorage.getItem('principalMsisdn'));
            const customerView: any = JSON.parse(sessionStorage.getItem('cv'));
            
            this.createStore(customerView);

            if(principalMsisdn && principalMsisdn.msisdn) {
                this._principalMSISDN = principalMsisdn.msisdn;
            } else {
                const phoneLines = Object.keys(this._store)
                if(phoneLines.length > 0) {
                    this._principalMSISDN = phoneLines[0];
                }
            }
        }

        getCurrentPhoneLine(): string {
            let currentPhoneLine = 'wololo';
            const commercialData: any = JSON.parse(sessionStorage.getItem('commercialData'));

            if(commercialData) {
                const currentCommercialAct: any = commercialData.find(commercialAct => commercialAct.ospIsSelected);
                currentPhoneLine = currentCommercialAct && currentCommercialAct.serviceNumber;
            }
            return currentPhoneLine;
        }

        // Returns BillingAddress //

        get principalBillingAddress(): any {
            return this.principalBillingAccount.billingAddress;
        }
        
        getBillingAddressByLine(line: string): any {
            return this.getBillingAccountByLine(line).billingAddress;
        }

        getCurrentBillingAddress(): any {
            return this.getCurrentBillingAccount().billingAddress
        }

        // Return BillingAccount //

        get principalBillingAccount(): any {
            if(!this._principalMSISDN || !this._store) {
                this.loadFromSessionStorage();
            }
            return this._store[this._principalMSISDN];
        }

        getBillingAccountByLine(line: string): any {
            if(!this._store) {
                this.loadFromSessionStorage();
            }
            return line ? this._store[line] : this.principalBillingAccount;
        }

        getCurrentBillingAccount(): any {
            if(!this._currentPhoneLine) {
                this._currentPhoneLine = this.getCurrentPhoneLine();
            }
            return this._currentPhoneLine ? this._store[this._currentPhoneLine] : this.principalBillingAccount;
        }

        get store(): any {
            if(!this._store) {
                this.loadFromSessionStorage();
            }
            return this._store;
        }

    }
}
