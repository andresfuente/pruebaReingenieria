module OrangeFeSARQ.Services {
    'use strict';

    export class GetMenuItemsService extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private getMenuItemsUrl: any;
        public genericConstant;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
        }

        getMenuItems(): ng.IPromise<any> {
            let vm = this;
            let _search: any;

            let request = {};
            vm.getMenuItemsUrl = 'menu.json';

            _search = {
                queryParams: request,
                urlParams: []
            };

            return vm.httpCacheGett(vm.getMenuItemsUrl, _search)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    throw error;
                });
        }
    }

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:menuStore
     * @module menuStore
     * @description
     * Store del misdn
     */
    export class MenuStore {
        private _menu: Array<any>;
        private _current: any;
        private _tab: string;

        constructor() {
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:menuStore#msidn
         * @methodOf OrangeFeSARQ.Services:menuStore
         * @description
         * getter del menu
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.menuStore.menu()
         * ```
         * @return {any} menu
         */
        get menu(): any {
            return this._menu;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:menuStore#msidn
         * @param {any} misdn misdn a guardar.
         * @methodOf OrangeFeSARQ.Services:menuStore
         * @description
         * setter del menu
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.menuStore.menu('value')
         * ```
         * @return {void} void
         */
        set menu(value: any) {
            this._menu = value;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:currentStore#msidn
         * @methodOf OrangeFeSARQ.Services:currentStore
         * @description
         * getter del current
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.currentStore.current()
         * ```
         * @return {any} current
         */
        get current(): any {
            return this._current;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:currentStore#msidn
         * @param {any} misdn misdn a guardar.
         * @methodOf OrangeFeSARQ.Services:currentStore
         * @description
         * setter del current
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.currentStore.current('value')
         * ```
         * @return {void} void
         */
        set current(value: any) {
            this._current = value;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:currentStore#tab
         * @methodOf OrangeFeSARQ.Services:currentStore
         * @description
         * getter del tab
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.currentStore.current()
         * ```
         * @return {any} current
         */
        get tab(): any {
            return this._tab;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:currentStore#tab
         * @param {any} misdn misdn a guardar.
         * @methodOf OrangeFeSARQ.Services:currentStore
         * @description
         * setter del tab
         * @example
         * Se hace uso del servicio con herencia de ParentController
         * ```js
         *  vm.currentStore.current('value')
         * ```
         * @return {void} void
         */
        set tab(value: any) {
            this._tab = value;
        }
    }

    // Registration
    angular.module('getMenuItemsModule', [])
        .service('getMenuItems', OrangeFeSARQ.Services.GetMenuItemsService)
        .service('menuStore', OrangeFeSARQ.Services.MenuStore);
}
