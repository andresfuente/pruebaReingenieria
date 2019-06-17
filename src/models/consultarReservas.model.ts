module consultarReservas.Models {
    'use strict';

    /**
     * @ngdoc model
     * @name consultarReservas.Models:WdtTableModel
     * @description
     * Modelo de consultarReservas
     */
    export class WdtTableModel {

        public typeDocument: string;
        public document: string;

        public sapIMEI: string;
        public sapIMEIFather: string;
        public description: string;
        public deterioradoPDV: number;
        public deterioradoTienda: number;
        public deterioradoEntrada: number;
        public devAlmacen: number;
        public devComercial: number;
        public devGO: number;
        public disponible: number;
        public envioOL: number;
        public faltaPDV: number;
        public faltaEntrada: number;
        public incidencia: number;
        public pEntregaCliente: number;
        public reservaCNP: number;
        public reservaPDV: number;
        public reservaPorta: number;
        public transAlmacen: number;
        public transTTPP: number;
        public ventaCNP: number;

        public sfid: string;
        public material: string;
        public codean: string;

        public count: number = 0;
        public class: string = '';

        public quantity: string;
        public idReserva: string;

        public children: Array<consultarReservas.Models.WdtTableModelStockData>;

        public checked = false;

        constructor() {
            let vm = this;
        }
    }

    export class WdtTableModelStockData {
        public sapIMEI: string;
        public sapIMEIFather: string;
        public description: string;
        public reservaCNP: number;
        public reservaPDV: number;
        public reservaPorta: number;
        public ventaCNP: number;
        public typeDocument: string;
        public document: string;
        public state: string;
        public date: string;
        public idReserva: string;
        public material: string;
        public quantity: string;
    }

    export class WdtTableModelSAPData {
        public operationType: string;
        public codeSFID: string;
        public userId: string;
        public userName: string;
        public position: Array<consultarReservas.Models.Position>;
        public serialNumber: string;
        public subposition: Array<consultarReservas.Models.SubPosition>;
        public idreferenceext: string;
        public idsystemext: string;
        public idtypeext: string;
        public idsubtypeext: string;
        public operationsignal: string;
        public auxiliares: Array<consultarReservas.Models.RespAuxiliar>;
        public typeDocument: string;
        public nif: string;
        public material: string;
        public quantity: string;

        public sap: string;
        public document: string;
        public description: string;
        public reservaCNP: number;
        public reservaPDV: number;
        public reservaPorta: number;
        public ventaCNP: number;

        public children: Array<consultarReservas.Models.WdtTableModelStockData>;
    }

    export class ImportCodesResponse {
        data: Array<ImportCodesResponseData>;
        error: Error;
    }

    export class ImportCodesResponseData {
        typeCode: string;
        code: string;
    }

    export class Error {
        code: number;
        message: string;
        description: string;
        infoURL: string;
    }

    export class WdtTableModelDataStockAcc {
        public description: string;
        public sap: string;
        public ean: string;
        public disponible: WdtTableModelDataStockAccStates;
        public reservaPDV: WdtTableModelDataStockAccStates;
        public reservaPorta: WdtTableModelDataStockAccStates;
        public reservaCNP: WdtTableModelDataStockAccStates;
        public incidencia: WdtTableModelDataStockAccStates;
        public devGO: WdtTableModelDataStockAccStates;
        public pEntregaCliente: WdtTableModelDataStockAccStates;
        public transAlmacen: WdtTableModelDataStockAccStates;
        public transTTPP: WdtTableModelDataStockAccStates;
        public devAlmacen: WdtTableModelDataStockAccStates;
        public faltaEntrada: WdtTableModelDataStockAccStates;
        public faltaPDV: WdtTableModelDataStockAccStates;
        public deterioradoEntrada: WdtTableModelDataStockAccStates;
        public deterioradoPDV: WdtTableModelDataStockAccStates;
        public ventaCNP: WdtTableModelDataStockAccStates;
        public devComercial: WdtTableModelDataStockAccStates;
        public amountToManage: number;
    }

    export class WdtTableModelDataStockAccStates {
        public amount: number;
        public isChecked: boolean;
        public isDisabled: boolean;
    }

    export class WdtQueryParamsExcel {
        public user: string;
        public sfid: string;
    }

    export class GoodOrder {
        public id: string;
        public idOperationTPV: string;

        public operationType: string;
        public codeSFID: string;
        public userId: string;
        public userName: string;
        public position: Array<consultarReservas.Models.Position>;
        public subposition: Array<consultarReservas.Models.SubPosition>;
        public serialNumber: string;
        public idreferenceext: string;
        public idsystemext: string;
        public idtypeext: string;
        public idsubtypeext: string;
        public operationsignal: string;
        public material: string;
        public quantity: string;
        public sap: string;
        public document: string;
        public description: string;
        public reservaCNP: number;
        public reservaPDV: number;
        public reservaPorta: number;
        public typeDocument: string;

        public operationDate: string; // Format: data-time
        public operationHour: string; // Format: date-time
    }

    export class Position {
        public idOperationTPV: string;
        public idposition: string;
        public material: string;
        public eanCode: string;
        public quantity: string;
        public subposition: Array<consultarReservas.Models.SubPosition>;
    }

    export class SubPosition {
        public idOperationTPV: string;
        public idposition: string;
        public idSubposition: string;
        public serialNumber: string;
        public msisdn: string;
        public operationsignal: string;
        public linetype: string;
        public idreferenceext: string;
        public idpositionext: string;
        public idtypeext: string;
        public idsubtypeext: string;
        public idsystemext: string;
        public auxiliares: Array<consultarReservas.Models.RespAuxiliar>;
    }

    export class RespAuxiliar {
        public idOperationTPV: string;
        public idposition: string;
        public idSubposition: string;
        public typeDoc: string;
        public nif: string;
    }

    export class GoodOrderResponse {
        public RespOperacion: Array<consultarReservas.Models.RespOperation>;
        public RestAuxiliar: Array<consultarReservas.Models.RespAuxiliar>;
        public error: Error500;
    }

    export class RespOperation {
        public idOperationTPV: string;
        public idPosition: string;
        public idSubPosition: string;
        public material: string;
        public lote: string;
        public result: string;
        public codError: string;
        public descrError: string;
    }

    export class Error500 {
        public code: string;
        public codeAngular: string;
        public desc: string;
        public error_api: string;
        public title: string;
        public typeMessage: string;
    }
}
