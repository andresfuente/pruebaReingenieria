module capturaDocumentacionPopup.Services {
    'use strict';
    /**
     * @ngdoc service
     * @name capturaDocumentacionPopup.Services.CapturaDocumentacionPopupSrv
     * @description
     * #rest
     * Servicio para mostrar el popup de direcciones de cliente
     */
    export class CapturaDocumentacionPopupSrv {
        static $inject = ['$injector'];

        public showPopup: boolean;
        public iframeURL: string;
        public isShopping: boolean;

        constructor(public $injector) {
            let vm = this;
        }

        setParametersIFrameRoute(option: number) {
            // TODO: parámetros que se le van a pasar al iframe
            // Se van a rellenar aquí y se van a leer de aquí en el componente del iframe

        }
        

    }
}
