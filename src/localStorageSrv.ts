module OrangeFeSARQ.Services {
    'use strict';

    /* tslint:disable no-any */

    export interface ILocalStorageManager {
        getEntry(key : string) : any;
        setEntry(key : string, value : any) : any;
        removeEntry(key : string) : void;
    }

    export class LocalStorageManager implements ILocalStorageManager {
        constructor() { }

        /**
            Recover a property from localStorage
        */
        getEntry(key : string) : any {
            console.log("ENTRA EN GETENTRY Y LA KEY ES " , JSON.parse(localStorage.getItem(key)));
            return JSON.parse(localStorage.getItem(key));    
        }

        /**
            Save the object in the property key in localStorage
        */
        setEntry(key : string, object : any) : any {
            try {
                localStorage.setItem(key, JSON.stringify(object));
                return { result: true, message: 'success' };
            } catch (e) {
                return { result: false, message: e.message };
            }
        }

        /**
            Removes a property key in localStorage
        */
        removeEntry(key : string) : void {
            console.log("REMOVE ENTRY")
            localStorage.removeItem(key);
        }
    }

    angular.module('localStorageManager', [])
        .service('localStorageSrv', LocalStorageManager);
}
