module OrangeFeSARQ.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services.VoiceMailPopUpSrv
     * @description
     * #rest
     * 
     */
    export class VoiceMailPopUpSrv {
        static $inject = ['$injector'];
        public genericConstant;
        public popupVars = {};
        public isVisible: boolean;
        public voiceMailActive = {};
        public ifBusy: string;
        public ifNoResponse: string;
        public ifPowerOff: string;
        public directDeflection: string;
        public numberDeflection: string;

        constructor(public $injector) {
            let vm = this;
        }
    }
}