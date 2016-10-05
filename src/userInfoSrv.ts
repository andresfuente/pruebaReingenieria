module OrangeFeSARQ.Services {
    'use strict';

    export interface IUserInfoSrv {
        changeCurrentLineSelected(newMsisdn: string): void;
        setUserRol(rol: string): void;
        getUserRol(): string;
    }

    export class UserInfoSrv implements IUserInfoSrv {
        private userRol: string;

        constructor() { }

        changeCurrentLineSelected = (newMsisdn: string): void => {
            // Call to the specified endpoint
        }

        setUserRol = (rol: string): void => {
            this.userRol = rol;
        }

        getUserRol = (): string => {
            return this.userRol;
        }
    }

    // Registration
    angular.module('userInfoManager', [])
        .service('userInfoSrv', UserInfoSrv);

}
