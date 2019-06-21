module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:s8salesOrder
     * @author Jaime Alain
     * @description
     * Servicio para comprobar las ordenes en vuelo
     */
    export class s8salesOrderSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        constructor(public $injector) {
            super($injector);
        }

        /**
         * @ngdoc service
         * @name OrangeFeSARQ.Services:getOrders
         * @author Jaime Alain
         * @description
         * Servicio para comprobar las ordenes en vuelo
         */
        getOrders(publicIdType, publicId, comp) {
            let vm = this;

            let _search: Object = {
                queryParams: {},
                urlParams: [publicIdType, publicId]
            };

            let url = vm.genericConstant.s8SalesOrder + '/inflightOrders';

            return vm.httpCacheGett(url, _search, comp)
                .then((response) => {
                    return response.data;

                })
                .catch((error) => {
                    throw error;
                });
        }
        
        /**
         * Obtener el estado de las órdenes en SIEBEL 8
         * @param accountId Identificador unívoco del cliente en Siebel 8.	
         * @param sistemaInvocante Campo usado por MDW para gestion de URLs 
         * @param primaryOrganization AMENA | RESIDENCIAL | EMPRESAS
         * @param canal Valor por defecto: MICROSERVICIOS
         * @param quoteIds Identificador de oferta en Siebel 8.	
         * @param quoteNumbers  Número de oferta en Siebel 8.
         * @param s8Id Identificador de Siebel 8.	
         * @param comp Componente invocante
         */
        getOrderStatus(accountId: string, sistemaInvocante: string, primaryOrganization: string, canal?: string, quoteIds?: string, quoteNumbers?: string, s8Id?: string, comp = 'orangeServices') {
            let vm = this;
            let endpoint = 'getOrderStatus';

            let _params = {
                queryParams: {
                    AccountId: accountId,
                    quoteIds: quoteIds,
                    canal: canal,
                    sistemaInvocante: sistemaInvocante,
                    quoteNumbers: quoteNumbers,
                    primaryOrganization: primaryOrganization,
                    s8Id: s8Id
                },
                urlParams: [endpoint]
            };

            return vm.httpCacheGett(vm.genericConstant.s8SalesOrder, _params, comp)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    throw error;
                });
        }
    }
}
