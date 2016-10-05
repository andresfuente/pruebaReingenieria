module OrangeFeSARQ.Services {
    'use strict';

    /* tslint:disable no-any */

    export interface IOrangeOwcs {
        getLayoutMetada(key:string, exp:number):any;
    }

    export class OrangeOwcs implements IOrangeOwcs {
        static $inject = ['httpCacheOrange', 'genericConstant', 'owcsIdsConstant', '$injector'];

        public keys:any;

        constructor(private httpCacheOrange, private genericConstant, private owcsIdsConstant, private $injector) {
            let vm = this;
            vm.keys = vm.owcsIdsConstant.owcs;
        }

        setDataInStore(section):void {
            let vm = this;
            for (let i:number = 0; i < section.length; i++) {
                if (vm.keys[section[i].compId] !== null && vm.keys[section[i].compId] !== undefined) {
                    let storeService = vm.$injector.get(vm.keys[section[i].compId].store);
                    if (storeService !== null) {
                        storeService.section = section[i];
                    }
                }
            }
        }

        setDataHeader(section):void {
            let vm = this;
            let storeService = vm.$injector.get(vm.keys['header_comp'].store);
            if(vm.keys['locator']){
              let locator = vm.$injector.get(vm.keys['locator'].store);
              locator.section = section[0]; // To Do buscarlo
            }
            storeService.section = [];
            if (storeService !== null) {
                storeService.section = section;
                for(let i in storeService.section){
                    if(storeService.section[i].listModule){
                        vm.setDataInStore(storeService.section[i].listModule);
                    }
                }
            }
        }

        setDataFooter(section):void {
            let vm = this;
            let storeService = vm.$injector.get(vm.keys['footer_comp'].store);
            for (let i:number = 0; i < section.length; i++) {
                storeService.section = [];
                if (storeService !== null) {
                    storeService.section = section[i];
                }
            }
        }

        /**
         Recover a property from sessionStorage
         */
        getLayoutMetada(key:string, exp:number = null):any {
            let vm = this;
            return vm.httpCacheOrange.gett(vm.genericConstant.owcsUrl, {urlParams: [vm.genericConstant.site, key]}, 5 * 60 * 1000, false)
                .then(
                    (metaInfoResponse) => {
                        if (metaInfoResponse.data) {
                            let layoutMetaData = metaInfoResponse.data;

                            vm.setDataHeader(layoutMetaData.headerSection);

                            vm.setDataInStore(layoutMetaData.topSection);

                            vm.setDataInStore(layoutMetaData.centralSection);

                            vm.setDataInStore(layoutMetaData.leftSection);

                            vm.setDataInStore(layoutMetaData.rightSection);

                            vm.setDataInStore(layoutMetaData.bottomSection);

                            vm.setDataFooter(layoutMetaData.footerSection);


                            return layoutMetaData;
                        }
                    },
                    (error) => {
                        console.error('[Error-fallback] ' + JSON.stringify(error));
                    }
                ).catch(
                    (error) => {
                        console.error('[Error] MetaInfo error: ' + JSON.stringify(error));
                    });
        }

    }

    angular.module('orangeOwcs', [])
        .service('orangeOwcs', OrangeOwcs);
}
