module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.PopUpSpinnerSrv
     * @description
     * #rest
     *
     */
    export class PopUpSpinnerSrv {
        static $inject = ['$injector'];
        public genericConstant;
        public isShowSpinner: boolean;

        constructor(public $injector) {
            let vm = this;
        }
    }
}
