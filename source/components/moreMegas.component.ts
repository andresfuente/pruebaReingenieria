module moreMegas.Components {
    'use strict';

    /**
    */
    export class MoreMegasComp implements ng.IComponentOptions {

        public bindings: { [binding: string]: string };
        public controller: string | Function;
        public controllerAs: string ;
        public templateUrl: string | Function;

        constructor() {
            this.bindings = {};
            this.controller = moreMegas.Controllers.MoreMegasCtrl;
            this.controllerAs ='moreMegasCtrl';
            this.templateUrl = 'tpls/commons/components/more-megas/templates/more-megas.html';
        }
    }

}
