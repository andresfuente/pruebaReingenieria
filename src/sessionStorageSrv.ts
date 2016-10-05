module OrangeFeSARQ.Services {
    'use strict';

    /* tslint:disable no-any */

    export interface ISessionStorageManager {
        getEntry(key : string) : any;
        setEntry(key : string, value : any) : any;
        removeEntry(key : string) : void;
    }

    export class SessionStorageManager implements ISessionStorageManager {
        constructor() { }

        /**
            Recover a property from sessionStorage
        */
        getEntry(key : string) : any {
            return sessionStorage.getItem(key);
        }

        /**
            Save the object in the property key in sessionStorage
        */
        setEntry(key : string, object : any) : any {
            try {
                sessionStorage.setItem(key, object);
                return { result: true, message: 'success' };
            } catch (e) {
                return { result: false, message: e.message };
            }
        }

        /**
            Removes a property key in sessionStorage
        */
        removeEntry(key : string) : void {
            sessionStorage.removeItem(key);
        }
    }

    angular.module('sessionStorageManager', [])
        .service('sessionStorageSrv', SessionStorageManager);
}
