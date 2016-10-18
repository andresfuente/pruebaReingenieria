module OrangeFeSARQ.Services {
    'use strict';

    /* tslint:disable no-any */

    export interface IOrangeOwcs {
        getLayoutMetada(key:string, exp:number):any;
    }

    export class OrangeOwcs implements IOrangeOwcs {
        static $inject = ['httpCacheOrange', 'genericConstant', 'owcsIdsConstant', '$injector'];

        public keys:any;

        public errMessage:string;
        public errImage:string;



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
         Ssutituye los componentes no validos
         */
        changeComp(element) {
            let vm = this;
          element.compId = 'no_component_comp';
          element.labelAngular = "<no-component-comp></no-component-comp>";
          element.errMessage = vm.errMessage;
          element.errImage = vm.errImage;

          return element;
        }
        /**
         Ssutituye los componentes no validos
         */
        checkCompId(section) {
            let vm = this;

            for (let i: number = 0; i < section.length; i++) {
                //esto me dice que viene un compID
                if (vm.keys[section[i].compId] !== null ){
                    //aqui verifico que ese id este en las constantes
                    if(vm.keys[section[i].compId] !== undefined) {
                        let storeService = vm.$injector.get(vm.keys[section[i].compId].store);
                        if (storeService !== null) {
                            //correcto
                        }else{
                            //esta bien escrito pero el store no existe
                            vm.changeComp(section[i]);
                        }
                    }else{
                        //cuando el compiD viene mal
                        vm.changeComp(section[i])
                    }
                }else{
                    //aqui directamete compId no me viene
                    vm.changeComp(section[i])
                }
            }

            return section;
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

                            vm.errMessage = layoutMetaData.errorModule.desErrorModule;
                            vm.errImage = layoutMetaData.errorModule.imageErrorModule.imageFile_bloblink_;

                            layoutMetaData.topSection = vm.checkCompId(layoutMetaData.topSection);
                            layoutMetaData.centralSection = vm.checkCompId(layoutMetaData.centralSection);
                            layoutMetaData.leftSection = vm.checkCompId(layoutMetaData.leftSection);
                            layoutMetaData.rightSection = vm.checkCompId(layoutMetaData.rightSection);
                            layoutMetaData.bottomSection = vm.checkCompId(layoutMetaData.bottomSection);
                            layoutMetaData.footerSection = vm.checkCompId(layoutMetaData.footerSection);
                            layoutMetaData.headerSection = vm.checkCompId(layoutMetaData.headerSection);

                            vm.setDataInStore(layoutMetaData.topSection);
                            vm.setDataInStore(layoutMetaData.centralSection);
                            vm.setDataInStore(layoutMetaData.leftSection);
                            vm.setDataInStore(layoutMetaData.rightSection);
                            vm.setDataInStore(layoutMetaData.bottomSection);
                            vm.setDataFooter(layoutMetaData.footerSection);
                            vm.setDataHeader(layoutMetaData.headerSection);

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
