module OrangeFeSARQ.Services {
    'use strict';

    export class AlertsStore {
        private _alertsData: any = {};

        constructor() {
        }

        getUserId(): string {
            let vm = this;
            return vm._alertsData.userId;
        }
        getCloseEnabled(): boolean {
            let vm = this;
            return (vm._alertsData && vm._alertsData.closeEnabled);
        }

        getNoMassive(): any {
            let vm = this;
            return (vm._alertsData && vm._alertsData.noMassive) ? vm._alertsData.noMassive : [] ;
        }

        getMassive(): any {
            let vm = this;
            return (vm._alertsData && vm._alertsData.massive) ? vm._alertsData.massive : [] ;
        }

        setUserId(userId: string) {
            let vm = this;
            vm._alertsData.userId = userId;
        }

        setCloseEnabled(closeEnabled: boolean) {
            let vm = this;
            vm._alertsData.closeEnabled = closeEnabled;
        }

        setNoMassive(noMassive: any) {
            let vm = this;
            vm._alertsData.noMassive = noMassive;
        }

        setMassive(massive: any) {
            let vm = this;
            vm._alertsData.massive = massive;
        }
    }
}