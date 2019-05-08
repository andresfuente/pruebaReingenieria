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

        getChecks(): Array<boolean> {
            let vm = this;
            return (vm._alertsData && vm._alertsData.checks) ? vm._alertsData.checks : [] ;
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
            vm.setChecks(new Array<boolean>(noMassive.length));
            vm._alertsData.noMassive = noMassive;
        }

        setMassive(massive: any) {
            let vm = this;
            vm._alertsData.massive = massive;
        }

        setChecks(checks: Array<boolean>) {
            let vm = this;
            vm._alertsData.checks = checks;
        }
    }
}
