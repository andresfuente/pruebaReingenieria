module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name stockSrv.stockSrv
     * @description
     * Servicio que realiza la llamada a la API Agreement.
     */
    export class stockSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public genericConstant;
        public brand: string;
        public stockServiceUrl: string;
        public data;
        public dataChildren;
        public error;
        public typeDocument;
        public document;
        public imei;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
            vm.brand = vm.genericConstant.brand;
            vm.stockServiceUrl = vm.genericConstant.stockData;

        }

        getStock(filters: Object, compName = 'consultarReservas'): ng.IPromise<Array<consultarReservas.Models.WdtTableModelSAPData>> {
            let vm = this;
            let _data = {
                body: filters,
                queryParams: {
                },
                urlParams: []
            };
            return vm.httpPost(vm.genericConstant.stockData + '/stock', _data, compName)
                .then((response) => {

                    if (response.data[0].error) {
                        vm.error.push(response.data[0].error.description);
                    } else {
                        let dataAux = vm.transformRequest(response.data);
                        for (let i = 0; i < dataAux.length; i++) {
                            vm.data.push(dataAux[i]);
                        }
                    }

                }).catch((error) => {
                    return error;
                })
        }

        transformRequest(saps: Array<consultarReservas.Models.WdtTableModelSAPData>): Array<consultarReservas.Models.WdtTableModel> {
            let vm = this;
            let result = new Array<consultarReservas.Models.WdtTableModel>();
            let auxSap, auxStock;
            for (let i = 0; i < saps.length; i++) {
                auxSap = new consultarReservas.Models.WdtTableModel();
                auxSap.sapIMEI = saps[i].sap;
                auxSap.sapIMEIFather = '';
                auxSap.description = saps[i].description;
                auxSap.reservaCNP = saps[i].reservaCNP;
                auxSap.reservaPDV = saps[i].reservaPDV;
                auxSap.reservaPorta = saps[i].reservaPorta;
                auxSap.ventaCNP = saps[i].ventaCNP;
                auxSap.quantity = saps[i].quantity;
                auxSap.children = new Array<consultarReservas.Models.WdtTableModel>();

                if (saps[i].children !== null) {
                    for (let j = 0; j < saps[i].children.length; j++) {
                        auxStock = new consultarReservas.Models.WdtTableModel();
                        auxStock.sapIMEI = saps[i].children[j].sapIMEI;//
                        auxStock.sapIMEIFather = auxSap.sapIMEI;
                        auxStock.description = saps[i].children[j].description;//
                        auxStock.reservaCNP = saps[i].children[j].reservaCNP;//
                        auxStock.reservaPDV = saps[i].children[j].reservaPDV;//
                        auxStock.reservaPorta = saps[i].children[j].reservaPorta;//
                        auxStock.ventaCNP = saps[i].children[j].ventaCNP; //
                        auxStock.typeDocument = saps[i].children[j].typeDocument;
                        auxStock.document = saps[i].children[j].document;
                        auxStock.idReserva = saps[i].children[j].idReserva;
                        auxStock.material = saps[i].children[j].material;
                        auxStock.quantity = auxSap.quantity;

                        if (auxStock.reservaCNP > 0) {
                            auxStock.state = 'Reserva CNP';
                        } else if (auxStock.reservaPDV > 0) {
                            auxStock.state = 'Reserva PDV';
                        }else if (auxStock.ventaCNP > 0){
                            auxStock.state = 'Venta CNP';
                        }else {
                            auxStock.state = 'Reserva Porta';
                        }
                        if (vm.typeDocument !== '' && vm.typeDocument !== undefined && vm.typeDocument !== null) {
                            if (vm.typeDocument !== '2') {
                                if ((vm.typeDocument === angular.uppercase(auxStock.typeDocument)) &&
                                    (angular.uppercase(vm.document) === angular.uppercase(auxStock.document))) {
                                    auxSap.children.push(auxStock);
                                    vm.dataChildren.push(auxStock);
                                }
                            } else {// es DNI/NIF
                                if (('DNI' === angular.uppercase(auxStock.typeDocument)) &&
                                    (angular.uppercase(vm.document) === angular.uppercase(auxStock.document))) {
                                    auxSap.children.push(auxStock);
                                    vm.dataChildren.push(auxStock);
                                } else if (('NIF' === angular.uppercase(auxStock.typeDocument)) &&
                                    (angular.uppercase(vm.document) === angular.uppercase(auxStock.document))) {
                                    auxSap.children.push(auxStock);
                                    vm.dataChildren.push(auxStock);
                                }
                            }
                        } else if (vm.imei !== null && vm.imei !== undefined && vm.imei !== '') {
                            if (angular.uppercase(vm.imei) === angular.uppercase(auxStock.sapIMEI)) {
                                auxSap.children.push(auxStock);
                                vm.dataChildren.push(auxStock);
                            }

                            //Funcionalidad de boton Limpiar
                        } else if (vm.typeDocument == '' && vm.document == '' && vm.imei == '') {
                            auxSap.children.push(auxStock);
                            vm.dataChildren.push(auxStock);
                        }

                    } // ENDFOR
                } // ENDIF
                result.push(auxSap);
            } // ENDFOR

            return result;
        }

        goodOrder(params: consultarReservas.Models.GoodOrder): ng.IPromise<consultarReservas.Models.GoodOrderResponse> {
            let vm = this;
            let url = vm.genericConstant.stockData + '/goodOrder';
            let _data = {
                body: params,
                queryParams: {
                },
                urlParams: []
            };

            return vm.httpPost(url, _data, '')
                .then((response) => {
                    //vm.errorRequest = null; 
                    //let dataAux = vm.transformRequest(response.data);
                    return response.data;
                })
                .catch((response) => {
                    //vm.errorRequest = response.data.error.code;
                    return response.data;
                });
        }

    }
}
