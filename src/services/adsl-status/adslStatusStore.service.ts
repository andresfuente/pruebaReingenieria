module OrangeFeSARQ.Services {
    'use strict';
    export class AdslStatusStore {
        constructor(public $injector) {
            let vm = this;

            vm.setInjections($injector);
        }
        private adslStatusSrv: any;
        private $q: ng.IQService;
        private _callingStatus: boolean = false;
        static $inject = ['$injector'];

        private _internetUser: any;
        private _state: any;
        private _stateDesc: any;
        private _phone: any;
        private _encapsulated: any;
        private _multiplexion: any;
        private _vpi: any;
        private _vci: any;
        private _userName: any;
        private _adslPassword: any;
        private _dhcp: any;
        private _ipFija: any;
        private _smtpServer: any;
        private _popServer: any;
        private _email: any;
        private _emailPassword: any;
        private _realm: any;
        private _organization: any;
        private _personalPage: any;
        private _ftpUser: any;
        private _ftpAcces: any;

        setInjections($injector) {
            let vm = this;
            vm.adslStatusSrv = $injector.get('adslStatusSrv');
            vm.$q = vm.$injector.get('$q');
        }

        isBusy(): any {
            return this._callingStatus;
        }

        get internetUser(): any {
            return this._internetUser;
        }
        get state(): any {
            return this._state;
        }
        get stateDesc(): any {
            return this._stateDesc;
        }
        get phone(): any {
            return this._phone;
        }
        get encapsulated(): any {
            return this._encapsulated;
        }
        get multiplexion(): any {
            return this._multiplexion;
        }
        get vpi(): any {
            return this._vpi;
        }
        get vci(): any {
            return this._vci;
        }
        get userName(): any {
            return this._userName;
        }
        get adslPassword(): any {
            return this._adslPassword;
        }
        get dhcp(): any {
            return this._dhcp;
        }
        get ipFija(): any {
            return this._ipFija;
        }
        get smtpServer(): any {
            return this._smtpServer;
        }
        get popServer(): any {
            return this._popServer;
        }
        get email(): any {
            return this._email;
        }
        get emailPassword(): any {
            return this._emailPassword;
        }
        get realm(): any {
            return this._realm;
        }
        get organization(): any {
            return this._organization;
        }
        get personalPage(): any {
            return this._personalPage;
        }
        get ftpUser(): any {
            return this._ftpUser;
        }
        get ftpAcces(): any {
            return this._ftpAcces;
        }

        freeStore(): any {
            this._callingStatus = false;
        }

        set internetUser(value: any) {
            this._internetUser = value;
        }
        set state(value: any) {
            this._state = value;
        }
        set stateDesc(value: any) {
            this._stateDesc = value;
        }
        set phone(value: any) {
            this._phone = value;
        }
        set encapsulated(value: any) {
            this._encapsulated = value;
        }
        set multiplexion(value: any) {
            this._multiplexion = value;
        }
        set vpi(value: any) {
            this._vpi = value;
        }
        set vci(value: any) {
            this._vci = value;
        }
        set userName(value: any) {
            this._userName = value;
        }
        set adslPassword(value: any) {
            this._adslPassword = value;
        }
        set dhcp(value: any) {
            this._dhcp = value;
        }
        set ipFija(value: any) {
            this._ipFija = value;
        }
        set smtpServer(value: any) {
            this._smtpServer = value;
        }
        set popServer(value: any) {
            this._popServer = value;
        }
        set email(value: any) {
            this._email = value;
        }
        set emailPassword(value: any) {
            this._emailPassword = value;
        }
        set realm(value: any) {
            this._realm = value;
        }
        set organization(value: any) {
            this._organization = value;
        }
        set personalPage(value: any) {
            this._personalPage = value;
        }
        set ftpUser(value: any) {
            this._ftpUser = value;
        }
        set ftpAcces(value: any) {
            this._ftpAcces = value;
        }

        getAdslStatus(idType: string, idNumber: string, fixedNumber: string): any {
            let vm = this;
            if (!this._callingStatus) {
                this._callingStatus = true;
                if (idType && idNumber && fixedNumber) {
                    if (vm.userName === null || vm.userName === undefined) {
                        return vm.adslStatusSrv.getAdslStatus(idType, idNumber, fixedNumber)
                            .then(function (response) {
                                vm.internetUser = response.adslStatus.internetUser;
                                vm.state = response.adslStatus.state;
                                vm.stateDesc = response.adslStatus.stateDesc;
                                vm.phone = response.adslStatus.phone;
                                vm.encapsulated = response.adslStatus.encapsulated;
                                vm.multiplexion = response.adslStatus.multiplexion;
                                vm.vpi = response.adslStatus.vpi;
                                vm.vci = response.adslStatus.vci;
                                vm.userName = response.adslStatus.userName;
                                vm.adslPassword = response.adslStatus.adslPassword;
                                vm.dhcp = response.adslStatus.dhcp;
                                vm.ipFija = response.adslStatus.ipFija;
                                vm.smtpServer = response.adslStatus.smtpServer;
                                vm.popServer = response.adslStatus.popServer;
                                vm.email = response.adslStatus.email;
                                vm.emailPassword = response.adslStatus.emailPassword;
                                vm.realm = response.adslStatus.realm;
                                vm.organization = response.adslStatus.organization;
                                vm.personalPage = response.adslStatus.personalPage;
                                vm.ftpUser = response.adslStatus.ftpUser;
                                vm.ftpAcces = response.adslStatus.ftpAcces;
                                let obj = vm.objStatus();
                                vm.freeStore();
                                return obj;
                            })
                            .catch(function (error) {
                                vm.internetUser = null;
                                vm.state = null;
                                vm.stateDesc = null;
                                vm.phone = null;
                                vm.encapsulated = null;
                                vm.multiplexion = null;
                                vm.vpi = null;
                                vm.vci = null;
                                vm.userName = null;
                                vm.adslPassword = null;
                                vm.dhcp = null;
                                vm.ipFija = null;
                                vm.smtpServer = null;
                                vm.popServer = null;
                                vm.email = null;
                                vm.emailPassword = null;
                                vm.realm = null;
                                vm.organization = null;
                                vm.personalPage = null;
                                vm.ftpUser = null;
                                vm.ftpAcces = null;
                                let obj = vm.objStatus();
                                vm.freeStore();
                                // - this._callingStatus = false;
                                return obj;
                            });
                    } else {
                        let obj = vm.objStatus();
                        vm.freeStore();
                        // - this._callingStatus = false;
                        return vm.$q.resolve(obj);
                    }
                }
                vm.freeStore();
                // - this._callingStatus = false;
                return vm.$q.reject(null);
            } else {
                return vm.$q.reject(null);
            }
        }

        objStatus() {
            let vm = this;
            let obj = {
                internetUser: vm.internetUser,
                state: vm.state,
                stateDesc: vm.stateDesc,
                phone: vm.phone,
                encapsulated: vm.encapsulated,
                multiplexion: vm.multiplexion,
                vpi: vm.vpi,
                vci: vm.vci,
                userName: vm.userName,
                adslPassword: vm.adslPassword,
                dhcp: vm.dhcp,
                ipFija: vm.ipFija,
                smtpServer: vm.smtpServer,
                popServer: vm.popServer,
                email: vm.email,
                emailPassword: vm.emailPassword,
                realm: vm.realm,
                organization: vm.organization,
                personalPage: vm.personalPage,
                ftpUser: vm.ftpUser,
                ftpAcces: vm.ftpAcces,
            };
            return obj;
        }
    }
}
