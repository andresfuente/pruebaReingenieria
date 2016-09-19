module moreMegas.Controllers {
    'use strict';

    /**
     */

    /**
     */
    export class MoreMegasCtrl extends OrangeFeSARQ.Controllers.ParentController {
        static $inject = ['$injector'];
        private options:any;
        private switchs:any;

        //Inyections vars
        public currentRateCompOWCSStore;

        constructor($injector) {
            super($injector);
            let vm = this;

            vm.setInjections($injector);

            vm.initComp();
        }

        setInjections($injector){
            let vm = this;
            vm.currentRateCompOWCSStore = $injector.get('currentRateCompOWCSStore');
        }

        initComp(){
            let vm = this;
            vm.options = [];
            vm.switchs = vm.currentRateCompOWCSStore.section.listModuleSwitch;
            for (var i in vm.switchs) {
                if (vm.switchs[i].compId === 'more_megas_comp') {
                    vm.options.push(vm.switchs[i]);
                }
            }
        }
    }

}
