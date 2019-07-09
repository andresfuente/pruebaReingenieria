module OrangeFeSARQ.Services {
    'use strict';
    /* tslint:disable no-any */

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:MosaicFileSrv
     * @description
     * Servicio de mosaicFile
     */
    export class MosaicFileSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        private spinnerBlockSrv;
        private creditLimitSrv: OrangeFeSARQ.Services.CreditLimitSrv;

        private $q;
        private injections = {};
        private cacheVersion; // Value to detect if cache has to be cleared depending of input params
        private cache = {}; // Storage to prevent repeating calls to the API
        private storeProvince: string = '';
        private httpService;

        public isTLV: boolean;

        private billingAccountStore: OrangeFeSARQ.Services.BillingAccountStoreSrv;

        private GEOLOCATION_LOCAL: string = 'Geolocation-local';
        private GEOLOCATION_CLIENT: string = 'Geolocation-client';

        public ostypeValue = 'characteristic.OSData.groupData.OStype.value';
        public backCameraResolutionValue = 'characteristic.cameraData.groupData.backCameraResolution.value';
        public screenSizeValue = 'characteristic.screenData.groupData.screenSize.value';
        public hardDiskValue = 'characteristic.memoryData.groupData.hardDisk.value'
        public batteryDurationInConversationValue = 'characteristic.batteryData.groupData.batteryDurationInConversation.value';
        public characteristicColor = 'characteristic.color';
        public categoryName = 'deviceOffering.category.name'



        /**
         * @name OrangeFeSARQ.Services:MosaicFileSrv
         * @description
         * Servicio de mosaicFile
         */
        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
            vm.setStoreProvince();
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#setInjections
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @param {Object} $injector componente que necesita el parent injector.
         * @description
         * Incluye las dependencias necesarias
         */
        setInjections($injector) {
            let srv = this;
            srv.$q = $injector.get('$q');
            srv.httpService = $injector.get('$http');
            srv.spinnerBlockSrv = $injector.get('spinnerBlockSrv');
            srv.creditLimitSrv = $injector.get('creditLimitSrv');
            srv.billingAccountStore = $injector.get('billingAccountStoreSrv');
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#getMosaicData
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @param {string} search Busqueda por texto
         * @param {string} sortString Ordenacion
         * @param {string} targetPage Paginacion (pagina activa)
         * @param {number} pageSize Tamaño de pagina (numero de terminales a mostrar)
         * @param {number} isExistingCustomer 
         * @param {string} commercialAction Tipo de acto comercial [portabilidad/alta/migracion/renove]
         * @param {string} portabilityOrigin Origen de portabilidad [pospago/prepago]
         * @param {string} riskLevel Nivel de riesgo del cliente [alto/medio/bajo]
         * @param {string} channel Canal al que hacer la consulta
         * @param {string} sfid sfid de la tienda
         * @param {string} relatedProductOffering Codigo de la tarifa con la que hacer la consulta
         * @param {string} filters Filtros
         * @param {} mosaicFileCompOWCSStore Contribucion OWCS del componente mosaicFile
         * @param {string} profileBinding Perfil con el que hacer la consulta
         * @param {string} priceNameBinding Tipo de precio con el que hacer la consulta
         * @param {string} ospCustomerSegmentBinding Segmento del cliente [Residencial/Empresa]
         * @param {string} stateOrProvinceBinding Provincia para calcular los impuesto a aplicar 
         * @param {string} workflow Flujo de trabajo
         * @param {string} campana_txt Nombre de la campaña
         * @return {ng.IPromise<{}|void>}
         * @description Metodo para obtener todos los elementos del mosaico de terminales completo
         */
        getMosaicData(
            search: string,
            sortString: string,
            targetPage: number,
            pageSize: number,
            isExistingCustomer: number,
            commercialAction: string,
            portabilityOrigin: string,
            riskLevel: string,
            channel: string,
            sfid: string,
            relatedProductOffering: string,
            filters: any,
            mosaicFileCompOWCSStore: any,
            profileBinding: string,
            priceNameBinding: string,
            ospCustomerSegmentBinding: string,
            stateOrProvinceBinding: string,
            workflow: string,
            callApiStock: boolean,
            campana_txt?: string,
            creditLimit?: number
        ): ng.IPromise<{} | void> {
            let srv = this;
            let params;
            let deferred = srv.$q.defer();
            let priceType = '';
            let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            let shopInfo = JSON.parse(sessionStorage.getItem('shopInfo'));

            let shopGeolocation = shopInfo && shopInfo.province ? shopInfo.province : 'Madrid';
            let clientGeolocation = clientData && clientData.generalAddress && clientData.generalAddress.city ? clientData.generalAddress.city.toUpperCase() : shopGeolocation.toUpperCase();
            const currentBillingAddress = srv.billingAccountStore.getCurrentBillingAddress()

            clientGeolocation = this.setClientGeolocation(currentBillingAddress, clientGeolocation);

            // Cabeceras
            let headers = {
                'Geolocation-local': srv.storeProvince.toUpperCase(),
                'Geolocation-client': clientGeolocation.toUpperCase()
            };
            // ELIMINAR cuando se eliminen los select.
            // Establece el codigo de la tarifa segun lo seleccionado
            let codTarifa = '';
            switch (relatedProductOffering) {
                case 'Love Familia Sin Limites':
                    codTarifa = '1-1RGY9H';
                    break;
                case 'Libre':
                    codTarifa = '1-CWOOG9';
                    break;
                default:
                    codTarifa = relatedProductOffering;
                    break;
            }
            // Establece el nivel de riego
            riskLevel = this.setRiskLevel(riskLevel);
            // Establece el segmento del cliente
            let clientSegment = this.setClientSegment(ospCustomerSegmentBinding);

            params = {
                channel: channel,
                offset: targetPage * pageSize,
                limit: pageSize,
                sort: sortString,
                isExistingCustomer: isExistingCustomer,
                commercialAction: commercialAction,
                portabilityOrigin: portabilityOrigin,
                riskLevel: riskLevel,
                relatedProductOffering: codTarifa,
                ospOpenSearch: search,
                profile: profileBinding,
                segment: clientSegment,
            };

            params[this.categoryName] = priceNameBinding;
            params = srv.getFilters(filters, params);

            if (creditLimit !== undefined && creditLimit !== null) {
                params.creditLimit = Math.round(creditLimit);
            }

            // Parametros para Terminal Libre sin Servicio    
            if (workflow === 'libre') {
                params.channel = 'eShopRES';
                // Se seleccionan los parametros necesarios para la llamada a la OT 
                params = _.pick(params, ['channel', 'isExistingCustomer', 'limit', 'segment',
                    'offset', 'commercialAction', this.categoryName, 'sort', 'relatedProductOffering',
                    'ospOpenSearch', 'brand', 'price', 'deviceType', 'purchaseOption', 'price.fee', 'totalPaymentRange',
                    this.ostypeValue,
                    this.backCameraResolutionValue,
                    this.screenSizeValue,
                    this.hardDiskValue,
                    this.batteryDurationInConversationValue,
                    this.characteristicColor]);
            }

            // Parametros para Prepago   
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = srv.getSelectedCommercialAct();

            if (commercialData[commercialActIndex].ospCartItemSubtype === 'prepago') {
                if (commercialAction) {
                    if (commercialAction.toLowerCase() === 'portabilidad') {
                        delete params.portabilityOrigin;
                    }
                }
            }

            // Parametros para Renove
            ({ params, commercialData, commercialActIndex, clientData } = this.getParamsForRenove(params, commercialData, commercialActIndex, srv, clientData, campana_txt));

            let _headers = new HashMap<string, string>();
            _headers.set(srv.GEOLOCATION_LOCAL, srv.storeProvince.toUpperCase());
            _headers.set(srv.GEOLOCATION_CLIENT, clientGeolocation.toUpperCase());

            // Metodo http nativo por bug en los filtros
            // return srv.httpService({
            //     method: 'GET',
            //     url: srv.genericConstant.getMosaico,
            //     params: params,
            //     headers: headers
            // })
            return srv.httpCacheGeth(srv.genericConstant.getMosaico, { queryParams: params }, _headers, 'mosaicFile', false)
                .then((response) => {
                    return {
                        // tslint:disable-next-line
                        results: parseInt(response.headers()['x-total-count'] || 0),
                        terminals: srv.populateTerminals(
                            response.data,
                            isExistingCustomer,
                            commercialAction,
                            portabilityOrigin,
                            riskLevel,
                            channel,
                            sfid,
                            relatedProductOffering,
                            mosaicFileCompOWCSStore,
                            profileBinding,
                            priceNameBinding,
                            ospCustomerSegmentBinding,
                            stateOrProvinceBinding,
                            priceType,
                            callApiStock,
                            campana_txt,
                            creditLimit
                        )
                    };
                })
                .catch((error) => {
                    throw error;
                });
        }

        private getParamsForRenove(params: any, commercialData: any, commercialActIndex: number, srv: this, clientData: any, campana_txt: string) {
            if (params.commercialAction === 'renove') {
                commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
                commercialActIndex = srv.getSelectedCommercialAct();
                clientData = JSON.parse(sessionStorage.getItem('clientData'));
                if (clientData && clientData.creditLimitRenove && clientData.creditLimitRenove.linesWithVAP && _.size(clientData.creditLimitRenove.linesWithVAP) !== 0) {
                    clientData.creditLimitRenove.linesWithVAP.forEach(lines => {
                        if (lines.line === commercialData[commercialActIndex].serviceNumber && (lines.ventaAPlazos === 'N') || (lines.ventaAPlazos === 'Y' && clientData.creditLimitRenove.upperUmbral)) {
                            params.priceType = 'unico';
                        }
                    });
                }
                params.channel = '';
                params.campaignName = campana_txt;
                /* params = _.pick(params, ['channel', 'offset', 'limit', 'sort', 'commercialAction', 'campaignName',
                        'relatedProductOffering', 'ospOpenSearch', 'brand', 'price', 'deviceType',
                        'purchaseOption', 'price.fee', 'totalPaymentRange', 'characteristic.OSData.groupData.OStype.value',
                        'priceType', 'characteristic.cameraData.groupData.backCameraResolution.value',
                        'characteristic.screenData.groupData.screenSize.value',
                        'characteristic.memoryData.groupData.hardDisk.value',
                        'characteristic.batteryData.groupData.batteryDurationInConversation.value',
                        'characteristic.color']); */
                // Se seleccionan los parametros necesarios para la llamada a la OT
                if (commercialData[commercialActIndex].ospTerminalWorkflow === 'best_renove') {
                    params = _.pick(params, ['channel', 'offset', 'limit', 'sort', 'commercialAction', 'campaignName',
                        'relatedProductOffering', 'ospOpenSearch', 'brand', 'price', 'deviceType',
                        this.categoryName, 'purchaseOption', 'price.fee', 'totalPaymentRange',
                        this.ostypeValue,
                        'priceType', this.ostypeValue,
                        this.backCameraResolutionValue,
                        this.screenSizeValue,
                        this.hardDiskValue,
                        this.batteryDurationInConversationValue,
                        this.characteristicColor]);
                }
                else {
                    params = _.pick(params, ['channel', 'offset', 'limit', 'sort', 'commercialAction', 'campaignName',
                        'relatedProductOffering', 'ospOpenSearch', 'brand', 'price', 'deviceType',
                        'purchaseOption', 'price.fee', 'totalPaymentRange', this.categoryName,
                        this.ostypeValue,
                        'priceType', 'characteristic.cameraData.groupData.backCameraResolution.value',
                        'characteristic.screenData.groupData.screenSize.value',
                        'characteristic.memoryData.groupData.hardDisk.value',
                        'characteristic.batteryData.groupData.batteryDurationInConversation.value',
                        'characteristic.color']);
                }
            }
            return { params, commercialData, commercialActIndex, clientData };
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#getMosaicDataJZ
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @param {string} channel Canal al que hacer la consulta
         * @param {string} search
         * @param {string} commercialAction Canal al que hacer la consulta
         * @param {string} limit Limite de terminales
         * @param {string} offset Modulo del la pagina      * 
         * @param {string} ospFinancialScore 
         * @param {string} paymentType 
         * @param {string} portabilityOrigin 
         * @param {string} scoring scoring  
         * @param {string} showInStock Canal al que hacer la consulta  
         * @param {string} sort   
         * @param {string} sortType  
         * @param {string} mosaicFileCompOWCSStore 
         * @param {string} filters 
         * @param {string} ospCustomerSegmentBinding 
         * @param {string} riskLevel 
         * @param {string} relatedProductOffering 
         * @return {ng.IPromise<{}|void>}
         * @description Metodo para obtener todos los elementos del mosaico de terminales completo
         */
        getMosaicDataJZ(
            channel: string,
            ospOpenSearch:string,
            commercialAction: string,
            limit: string,
            offset: string,
            ospFinancialScore: string,
            paymentType: string,
            portabilityOrigin: string,
            scoring: string,
            showInStock: boolean,
            sort: string,
            sortType: string,
            mosaicFileCompOWCSStore: any,
            filters: any,
            ospCustomerSegmentBinding: string,
            riskLevel: string,
            relatedProductOffering?: string
        ): ng.IPromise<{} | void> {
            let srv = this;
            let params;
            let idPaquete;
            let idPromocion;
            let idTarifa;
            let channelAccountCode;
            // Cabeceras
            let _headers = new HashMap<string, string>();
            _headers.set(srv.GEOLOCATION_LOCAL, srv.storeProvince.toUpperCase());

            // Establece el id tarifa que tenemos seleccionado. Si llegamos no tenemos tarifa, seleccionamos las de fijo por defecto
            if (relatedProductOffering !== '1-2IHOKA') {
                let aux = relatedProductOffering.split('+');
                idTarifa = aux[0];
                idPaquete = aux[1];
                idPromocion = aux[2].split('|');
                idPromocion = idPromocion[0];
                channelAccountCode = '127';
            } else {
                idPaquete = '2983';
                idPromocion = '15870';
                idTarifa = '3117';
                channelAccountCode = '127';
            }

            switch (commercialAction) {
                case 'alta':
                    commercialAction = '0';
                    break;
                case 'portabilidad':
                    commercialAction = '2';
                    break;
                default:
                    commercialAction = '0';
                    break;
            }

            riskLevel = srv.setRiskLevel(riskLevel);

            params = {
                channel: channel,
                ospOpenSearch:ospOpenSearch,
                channelAccountCode: channelAccountCode,
                commercialAction: commercialAction,
                idPaquete: idPaquete,
                idPromocion: idPromocion,
                idTarifa: idTarifa,
                limit: limit,
                offset: offset,
                ospFinancialScore: ospFinancialScore,
                paymentType: paymentType,
                portabilityOrigin: portabilityOrigin,
                scoring: scoring,
                showInStock: showInStock,
                sort: sort,
                sortType: sortType
            };

            params = srv.getFilters(filters, params);

            _headers.set(srv.GEOLOCATION_LOCAL, srv.storeProvince.toUpperCase());

            return srv.httpCacheGeth(srv.genericConstant.getMosaico, { queryParams: params }, _headers, 'mosaicFile', true)
                .then((response) => {

                    return {
                        results: parseInt(response.headers()['x-total-count'] || 0),
                        terminals: _.map(response.data, (terminal: any) => {
                            let srv = this;
                            srv.handleCacheVersion(1, commercialAction, portabilityOrigin, riskLevel, channel);
                            let mosaicTerminal: mosaicFile.Models.OrangeMosaicFileTerminal = this.cache[terminal.deviceSpecification.id];
                            let deferred = srv.$q.defer();
                            mosaicTerminal = new mosaicFile.Models.OrangeMosaicFileTerminal('', deferred);
                            mosaicTerminal.loadCatalogViewData(terminal, ospCustomerSegmentBinding, 'primario', mosaicFileCompOWCSStore);
                            this.spinnerBlockSrv.show=false;
                            return mosaicTerminal;
                        })
                    }
                });
        }

        private setClientSegment(ospCustomerSegmentBinding: string) {
            let clientSegment = '';
            if (ospCustomerSegmentBinding.toUpperCase() === 'RESIDENCIAL') {
                clientSegment = 'Residencial';
            }
            else {
                clientSegment = 'Empresas';
            }
            return clientSegment;
        }

        private setRiskLevel(riskLevel: string) {
            if (riskLevel === 'bajo') {
                riskLevel += ',medio,alto';
            }
            else if (riskLevel === 'medio') {
                riskLevel += ',alto';
            }
            return riskLevel;
        }

        private setClientGeolocation(currentBillingAddress: any, clientGeolocation: any) {
            if (currentBillingAddress && currentBillingAddress.stateOrProvince) {
                clientGeolocation = currentBillingAddress.stateOrProvince.toUpperCase();
            }
            return clientGeolocation;
        }


        /**
        * @ngdoc method
        * @name OrangeFeSARQ.Services:MosaicFileSrv#getFilters
        * @param {string} filters
        * @param {string} params
        * @return {string}
        * @description Metodo para añadir filtros
        */

        getFilters(filters, params) {

            if (filters && filters.length) {
                filters.forEach((filtersParam, index) => {
                    params[Object.keys(filtersParam)[0]] = filtersParam[Object.keys(filtersParam)[0]];
                    if (Object.keys(filtersParam)[0] === 'price') {
                        // tslint:disable-next-line
                        params['priceType'] = 'aplazado';
                    }
                });
            }
            return params;
        }


        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#getMosaicData
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @param {} terminalList Lista de terminales devueltos por la llamada al groupByModel
         * @param {number} isExistingCustomer
         * @param {string} commercialAction Tipo de acto comercial [portabilidad/alta/migracion/renove]
         * @param {string} portabilityOrigin Origen de portabilidad [pospago/prepago]
         * @param {string} riskLevel Nivel de riesgo del cliente [alto/medio/bajo]
         * @param {string} channel Canal al que hacer la consulta
         * @param {string} sfid sfid de la tienda
         * @param {string} relatedProductOffering Codigo de la tarifa con la que hacer la consulta
         * @param {} mosaicFileCompOWCSStore Contribucion OWCS del componente mosaicFile
         * @param {string} profileBinding Perfil con el que hacer la consulta
         * @param {string} priceNameBinding Tipo de precio con el que hacer la consulta
         * @param {string} ospCustomerSegmentBinding Segmento del cliente [Residencial/Empresa]
         * @param {string} stateOrProvinceBinding Provincia para calcular los impuesto a aplicar
         * @param {string} priceType Tipo de precio
         * @param {string} campana_txt Nombre de la campaña
         * @return {ng.IPromise<{}|void>}
         * @description Metodo para obtener los datos de cada uno de los terminales que forman el catalogo
         */
        populateTerminals(
            terminalList,
            isExistingCustomer: number,
            commercialAction: string,
            portabilityOrigin: string,
            riskLevel: string,
            channel: string,
            sfid: string,
            relatedProductOffering: string,
            mosaicFileCompOWCSStore,
            profileBinding: string,
            priceNameBinding: string,
            ospCustomerSegmentBinding: string,
            stateOrProvinceBinding: string,
            priceType: string,
            callApiStock: boolean,
            campana_txt?: string,
            creditLimit?: number
        ) {
            let srv = this;

            // tslint:disable-next-line
            // Para cada uno de los terminales hace la consulta de sus datos
            return _.map(terminalList, (terminal: any) => {
                return srv.getTerminalData(
                    terminal.deviceSpecification.name,
                    isExistingCustomer,
                    commercialAction,
                    portabilityOrigin,
                    riskLevel,
                    channel,
                    sfid,
                    relatedProductOffering,
                    mosaicFileCompOWCSStore,
                    profileBinding,
                    priceNameBinding,
                    ospCustomerSegmentBinding,
                    stateOrProvinceBinding,
                    priceType,
                    callApiStock,
                    campana_txt,
                    creditLimit
                );
            });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#getMosaicData
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @param {string} terminalName Nombre del terminal
         * @param {number} isExistingCustomer
         * @param {string} commercialAction Tipo de acto comercial [portabilidad/alta/migracion/renove]
         * @param {string} portabilityOrigin Origen de portabilidad [pospago/prepago]
         * @param {string} riskLevel Nivel de riesgo del cliente [alto/medio/bajo]
         * @param {string} channel Canal al que hacer la consulta
         * @param {string} sfid sfid de la tienda
         * @param {string} relatedProductOffering Codigo de la tarifa con la que hacer la consulta
         * @param {} mosaicFileCompOWCSStore Contribucion OWCS del componente mosaicFile
         * @param {string} profileBinding Perfil con el que hacer la consulta
         * @param {string} priceNameBinding Tipo de precio con el que hacer la consulta
         * @param {string} ospCustomerSegmentBinding Segmento del cliente [Residencial/Empresa]
         * @param {string} stateOrProvinceBinding Provincia para calcular los impuesto a aplicar
         * @param {string} priceType Tipo de precio
         * @param {string} campana_txt Nombre de la campaña
         * @return {ng.IPromise<{}|void>}
         * @description Metodo para obtener los datos de un terminal
         */

        private getTerminalData(
            terminalName,
            isExistingCustomer: number,
            commercialAction: string,
            portabilityOrigin: string,
            riskLevel: string,
            channel: string,
            sfid: string,
            relatedProductOffering: string,
            mosaicFileCompOWCSStore,
            profileBinding: string,
            priceNameBinding: string,
            ospCustomerSegmentBinding: string,
            stateOrProvinceBinding: string,
            priceType: string,
            callApiStock: boolean,
            campana_txt?: string,
            creditLimit?: number
        ) {
            let srv = this;
            let params;

            //Cabeceras Pangea
            // let _headers = {
            //     'Geolocation-local': srv.storeProvince.toUpperCase(),
            //     'Geolocation-client': stateOrProvinceBinding ? stateOrProvinceBinding.toUpperCase() : srv.storeProvince.toUpperCase
            // };

            //Cabeceras FdC
            let _headers = new HashMap<string, string>();
            let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            let shopInfo = JSON.parse(sessionStorage.getItem('shopInfo'));

            let shopGeolocation = shopInfo && shopInfo.province ? shopInfo.province : 'Madrid';
            let clientGeolocation = clientData && clientData.generalAddress && clientData.generalAddress.city ? clientData.generalAddress.city.toUpperCase() : shopGeolocation.toUpperCase();
            const currentBillingAddress = srv.billingAccountStore.getCurrentBillingAddress()

            if (currentBillingAddress && currentBillingAddress.stateOrProvince) {
                clientGeolocation = currentBillingAddress.stateOrProvince.toUpperCase()
            }

            _headers.set(srv.GEOLOCATION_LOCAL, srv.storeProvince.toUpperCase());
            _headers.set(srv.GEOLOCATION_CLIENT, clientGeolocation.toUpperCase());

            params = {
                channel: channel,
                isExistingCustomer: isExistingCustomer,
                commercialAction: commercialAction,
                portabilityOrigin: portabilityOrigin,
                modelId: terminalName,
                riskLevel: riskLevel,
                relatedProductOffering: relatedProductOffering,
                profile: profileBinding,
                priceType: priceType
            };

            params[this.categoryName] = priceNameBinding;

            // Parametros para Terminal Libre sin Servicio 
            params = this.getParamsTerminalLibre(relatedProductOffering, params);

            // Parametros para Prepago   
            let { commercialData, commercialActIndex } = this.getParamsPrepago(srv, commercialAction, params, creditLimit);

            // Parametros para Renove   
            ({ params, clientData, commercialData, commercialActIndex } = this.paramsForRenove(params, campana_txt, clientData, commercialData, commercialActIndex, srv));

            if (riskLevel === 'bajo') {
                riskLevel += ',medio,alto';
            } else if (riskLevel === 'medio') {
                riskLevel += ',alto';
            }

            srv.handleCacheVersion(isExistingCustomer, commercialAction, portabilityOrigin, riskLevel, channel);
            let mosaicTerminal: mosaicFile.Models.OrangeMosaicFileTerminal = this.cache[terminalName];
            // Si el terminal no estaba cacheado se hace la llamada que devuelve sus datos
            if (!mosaicTerminal) {
                let deferred = srv.$q.defer();

                mosaicTerminal = new mosaicFile.Models.OrangeMosaicFileTerminal('', deferred);

                if (terminalName) {
                    srv.httpCacheGeth(srv.genericConstant.getTerminalDetails, { queryParams: params }, _headers, 'mosaicFile')
                        .then((response) => {
                            // Si la respuesta es vacia se muestra el mensaje de error
                            if (response.data.length === 0) {
                                mosaicTerminal.setError(`Error obtaining ${terminalName} data.`);
                                srv.spinnerBlockSrv.show = false;
                            } else {
                                // Se carga la vista del terminal
                                mosaicTerminal.loadCatalogViewData(response.data,
                                    ospCustomerSegmentBinding,
                                    priceNameBinding,
                                    mosaicFileCompOWCSStore);

                                srv.spinnerBlockSrv.show = false;
                                // Se hace la llamada para recuperar el stock del terminal
                                this.getStockData(mosaicTerminal,
                                    isExistingCustomer,
                                    commercialAction,
                                    portabilityOrigin,
                                    channel,
                                    sfid, callApiStock);

                            }

                        }).catch((error) => {
                            mosaicTerminal.setError(`Error obtaining ${terminalName} data.`);
                            srv.spinnerBlockSrv.show = false;
                        });
                } else {
                    // Si no tenemos el nombre del terminal para hacer la consulta se muestra el mensaje de error
                    mosaicTerminal.setError(`Error obtaining ${terminalName} data.`);
                    srv.spinnerBlockSrv.show = false;
                }
            } else {
                // Si el terminal estaba cacheado no se hace la llamada
                srv.spinnerBlockSrv.show = false;
            }
            // Se devuelve la informacion del terminal
            return mosaicTerminal;
        }

        getVariants(response, ospCustomerSegmentBinding, priceNameBinding, mosaicFileCompOWCSStore) {
            let srv = this;
            let deferred = srv.$q.defer();
            let mosaicTerminal = new mosaicFile.Models.OrangeMosaicFileTerminal('', deferred);

            mosaicTerminal.loadCatalogViewData(response.data,
                                    ospCustomerSegmentBinding,
                                    priceNameBinding,
                                    mosaicFileCompOWCSStore);
            return mosaicTerminal;
        }
        private paramsForRenove(params: any, campana_txt: string, clientData: any, commercialData: any, commercialActIndex: number, srv: this) {
            if (params.commercialAction === 'renove') {
                // Se seleccionan los parametros necesarios para la llamada a la OT
                params.channel = '';
                params.campaignName = campana_txt;
                clientData = JSON.parse(sessionStorage.getItem('clientData'));
                commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
                commercialActIndex = srv.getSelectedCommercialAct();
                if (clientData && clientData.creditLimitRenove && clientData.creditLimitRenove.linesWithVAP && _.size(clientData.creditLimitRenove.linesWithVAP) !== 0) {
                    clientData.creditLimitRenove.linesWithVAP.forEach(lines => {
                        if (lines.line === commercialData[commercialActIndex].serviceNumber && (lines.ventaAPlazos === 'N' || (lines.ventaAPlazos === 'Y' && (clientData.creditLimitRenove.upperUmbral || clientData.creditLimitRenove.upperCreditLimit)))) {
                            params.priceType = 'unico';
                        }
                    });
                }
                // Renove pimaraio
                params = this.getParamsForRenovePrimSecond(commercialData, commercialActIndex, params, clientData);
            }
            return { params, clientData, commercialData, commercialActIndex };
        }

        private getParamsForRenovePrimSecond(commercialData: any, commercialActIndex: number, params: any, clientData: any) {
            if (commercialData[commercialActIndex].ospTerminalWorkflow.toLowerCase() === 'primary_renew' ||
                commercialData[commercialActIndex].ospTerminalWorkflow.toLowerCase() === 'best_renove') {
                if (!params.priceType) {
                    params = _.pick(params, ['campaignName', 'channel', 'commercialAction', 'modelId']);
                }
                else {
                    params = _.pick(params, ['campaignName', 'channel', 'commercialAction', 'modelId', 'priceType', this.categoryName]);
                }
            }
            // Renove secundario
            else if (commercialData[commercialActIndex].ospTerminalWorkflow.toLowerCase() === 'secondary_renew') {
                if (clientData && clientData.creditLimitRenove && (clientData.creditLimitRenove.upperUmbral || clientData.creditLimitRenove.upperCreditLimit)) {
                    params.priceType = 'unico';
                }
                if (!params.priceType) {
                    params = _.pick(params, ['campaignName', 'channel', 'commercialAction', 'modelId', 'relatedProductOffering']);
                }
                else {
                    params = _.pick(params, ['campaignName', 'channel', 'commercialAction', 'modelId', 'relatedProductOffering', 'priceType', this.categoryName]);
                }
            }
            return params;
        }

        private getParamsPrepago(srv: this, commercialAction: string, params: any, creditLimit: number) {
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = srv.getSelectedCommercialAct();
            if (commercialData[commercialActIndex].ospCartItemSubtype === 'prepago') {
                if (commercialAction) {
                    if (commercialAction.toLowerCase() === 'portabilidad') {
                        delete params.portabilityOrigin;
                    }
                }
            }
            if (creditLimit !== undefined && creditLimit !== null) {
                params.creditLimit = Math.round(creditLimit);
            }
            return { commercialData, commercialActIndex };
        }

        private getParamsTerminalLibre(relatedProductOffering: string, params: any) {
            if (relatedProductOffering === '1-CWOOG9') {
                params.channel = 'eShopRES';
                // Se seleccionan los parametros necesarios para la llamada a la OT
                params = _.pick(params, ['channel', 'isExistingCustomer', 'modelId',
                    'relatedProductOffering', 'commercialAction']);
            }
            return params;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#getMosaicData
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @param {mosaicFile.Models.OrangeMosaicFileTerminal} terminal
         * @param {number} isExistingCustomer
         * @param {string} commercialAction Tipo de acto comercial [portabilidad/alta/migracion/renove]
         * @param {string} portabilityOrigin Origen de portabilidad [pospago/prepago]
         * @param {string} channel Canal al que hacer la consulta
         * @param {string} sfid sfid de la tienda
         * @return {ng.IPromise<{}|void>}
         * @description Devuelve el stock de un terminal
         */
        getStockData(
            terminal: mosaicFile.Models.OrangeMosaicFileTerminal,
            isExistingCustomer: number,
            commercialAction: string,
            portabilityOrigin: string,
            channel: string,
            sfid: string,
            callApiStock: boolean
        ) {
            let srv = this;
            srv.spinnerBlockSrv.show = true;
            let codes = _
                .chain(terminal.variants)
                .filter((variant) => variant.id)
                .map((variant) => { return { codes: variant.id }; })
                .value();

            let body = {
                typecode: 'SAP',
                code: codes,
                consultaSfids: [
                    { sfids: sfid }
                ],
                canal: 'MICROSERVICIO',
                externalSystemID: '10'
            };

            let _search = {
                body: body,
                urlParams: ['stock'],
                queryParams: {}
            };

            if (codes.length && !srv.isTLV && callApiStock) {
                srv.httpPost('api/APIStockData/v1', _search, 'mosaicFile.service')
                    .then((response) => {
                        terminal.loadStockData(response.data);
                        //   this.cache[terminal.variants[0].name] = terminal;
                        srv.spinnerBlockSrv.show = false;
                    }).catch((error) => {
                        // This line marks the terminal promise as resolved despite the stock service error
                        terminal.completeLoad();
                        srv.spinnerBlockSrv.show = false;
                    });
            } else {
                terminal.completeLoad();
                srv.spinnerBlockSrv.show = false;
            }
        }

        getTerminalFileData(
            terminalName: string,
            isExistingCustomer: number,
            commercialAction: string,
            portabilityOrigin: string,
            riskLevel: string,
            channel: string,
            sfid: string,
            codTarifa: string,
            fileTerminalCompOWCSStore,
            profileBinding: string,
            priceNameBinding: string,
            callApiStock: boolean,
            ospCustomerSegmentBinding?: string,
            stateOrProvinceBinding?: string,
            campana_txt?: string,
            creditLimit?: number
        ) {
            return this.getTerminalData(
                terminalName,
                isExistingCustomer,
                commercialAction,
                portabilityOrigin,
                riskLevel,
                channel,
                sfid,
                codTarifa,
                fileTerminalCompOWCSStore,
                profileBinding,
                priceNameBinding,
                ospCustomerSegmentBinding,
                stateOrProvinceBinding,
                '',
                callApiStock,
                campana_txt,
                creditLimit).promise;
        }

        handleCacheVersion(
            isExistingCustomer: number,
            commercialAction: string,
            portabilityOrigin: string,
            riskLevel: string,
            channel: string
        ) {
            let cacheString = isExistingCustomer + commercialAction + portabilityOrigin + riskLevel + channel;
            if (cacheString !== this.cacheVersion) {
                this.cacheVersion = cacheString;
                this.cache = {};
            }
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#getDefaultDataOT
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @description
         * Obtiene del session storage los datos por defecto para consultar a la OT 
         */
        getDefaultDataOT(): mosaicFile.Models.DataOT {
            let vm = this;
            let defaultData: mosaicFile.Models.DataOT = new mosaicFile.Models.DataOT();
            let sessionDefaultData = JSON.parse(sessionStorage.getItem('defaultData'));
            if (sessionDefaultData !== null) {
                defaultData = _.cloneDeep(sessionDefaultData);
            }

            let segment = '';
            let cartItemSubType = '';

            let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));

            if (localStorage.getItem('profile')) {
                defaultData.profile = localStorage.getItem('profile');
            } else if (sessionDefaultData && sessionDefaultData.profile !== null) {
                defaultData.profile = sessionDefaultData.profile;
            } else {
                defaultData.profile = 'PDV';
            }
            // Si el segmento y/o el tipo de acto está en el clientData, lo recogemos
            if (clientData) {
                segment = this.getClientSegment(clientData, segment, defaultData);

                cartItemSubType = this.getCartItemSubType(commercialData, cartItemSubType, defaultData);

                if (cartItemSubType.toUpperCase() === 'POSPAGO') {
                    if (segment.toUpperCase() === 'RESIDENCIAL') {
                        this.setRelatedTypeResidentialisExistingCustomer(defaultData);
                    } else { // Caso empresa o autonomo
                        this.setRelatedTypeBusinessExistingCustomer(defaultData);
                    }
                } else { // Prepago
                    this.setPrepagoisExistingCustomer(defaultData);
                }
            }

            return defaultData;
        }
        private setPrepagoisExistingCustomer(defaultData: mosaicFile.Models.DataOT) {
            if (defaultData.relatedTypePrepaid.toUpperCase() === 'MOVIL_FIJO') {
                defaultData.isExistingCustomer = '2';
            }
            else {
                defaultData.isExistingCustomer = '0';
            }
        }

        private setRelatedTypeBusinessExistingCustomer(defaultData: mosaicFile.Models.DataOT) {
            if (defaultData.relatedTypeBusiness.toUpperCase() === 'MOVIL_FIJO') {
                defaultData.isExistingCustomer = '2';
            }
            else {
                defaultData.isExistingCustomer = '0';
            }
        }

        private setRelatedTypeResidentialisExistingCustomer(defaultData: mosaicFile.Models.DataOT) {
            if (defaultData.relatedTypeResidential.toUpperCase() === 'MOVIL_FIJO') {
                defaultData.isExistingCustomer = '2';
            }
            else {
                defaultData.isExistingCustomer = '0';
            }
        }

        private getCartItemSubType(commercialData: any, cartItemSubType: string, defaultData: mosaicFile.Models.DataOT) {
            if (commercialData) {
                let comm: any = _.find(commercialData, { 'ospIsSelected': true });
                if (comm && comm.ospCartItemSubtype) {
                    cartItemSubType = comm.ospCartItemSubtype;
                }
                else {
                    cartItemSubType = defaultData.ospCartItemSubType;
                }
            }
            else {
                cartItemSubType = defaultData.ospCartItemSubType;
            }
            return cartItemSubType;
        }

        private getClientSegment(clientData: any, segment: string, defaultData: mosaicFile.Models.DataOT) {
            if (clientData.ospCustomerSegment) {
                segment = clientData.ospCustomerSegment;
            }
            else {
                segment = defaultData.ospCustomerSegment;
            }
            return segment;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#getDefaultDataOT
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @description
         * Obtiene del session storage los datos para consultar a la OT 
         */
        getDataOT(): mosaicFile.Models.DataOT {
            let vm = this;
            let rates = [];
            let dataOT: mosaicFile.Models.DataOT = new mosaicFile.Models.DataOT();
            let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
            let prescoring = JSON.parse(sessionStorage.getItem('prescoring'));
            let defaultDataOT: mosaicFile.Models.DataOT = vm.getDefaultDataOT();
            let shopInfo = JSON.parse(sessionStorage.getItem('shopInfo'));
            let commercialActIndex;

            commercialActIndex = vm.getSelectedCommercialAct();

            // Se obtienen los datos por defecto           
            dataOT = _.cloneDeep(defaultDataOT);
            dataOT.stateOrProvince = (shopInfo && shopInfo.province) ? shopInfo.province : 'Madrid';
            //dataOT.stateOrProvince = 'Madrid'; // REMOVER

            // Si los datos de clientes se encuentran en el session storage
            this.checkSessionStorageClients(clientData, dataOT, vm);

            // Si los datos del acto comercial se encuentran en el session storage
            rates = this.checkSessionStorageCommercialData(commercialData, commercialActIndex, dataOT, rates, vm);

            // Si los datos de prescoring se encuentran en el session storage
            this.checkSessionStoragePrescoring(prescoring, dataOT);

            if (commercialData[commercialActIndex].ospTerminalWorkflow) {
                switch (commercialData[commercialActIndex].ospTerminalWorkflow) {
                    case 'standar':
                        dataOT.priceName = 'primario';
                        break;
                    case 'secundario':
                        dataOT.priceName = 'secundario';
                        break;
                    case 'libre':
                        dataOT.priceName = 'primario';
                        dataOT.relatedRateResidential = '1-CWOOG9';
                        dataOT.relatedRateBusiness = '1-CWOOG9';
                        dataOT.ospCartItemType = 'alta';
                        // Si hay un 2 ponemos un 0, y en otro caso mantenemos el valor que hay
                        dataOT.isExistingCustomer = dataOT.isExistingCustomer === '2' ? '0' : dataOT.isExistingCustomer;
                        break;
                    case 'primary_renew':
                        dataOT.campana_txt = commercialData[commercialActIndex].nameSgmr;
                        dataOT.ospCartItemType = 'renove';

                        if (dataOT.ospCustomerSegment.toUpperCase() === 'RESIDENCIAL') {
                            dataOT.relatedRateResidential = commercialData[commercialActIndex].originRate;
                        } else {
                            dataOT.relatedRateBusiness = commercialData[commercialActIndex].originRate;
                        }
                        break;
                    case 'secondary_renew':
                        dataOT.campana_txt = commercialData[commercialActIndex].nameSgmr;
                        dataOT.ospCartItemType = 'renove';
                        dataOT.priceName = 'secundario';
                        if (dataOT.ospCustomerSegment.toUpperCase() === 'RESIDENCIAL') {
                            dataOT.relatedRateResidential = commercialData[commercialActIndex].originRate;
                        } else {
                            dataOT.relatedRateBusiness = commercialData[commercialActIndex].originRate;
                        }
                        break;
                    case 'best_renove':
                        // Si es mejorRenove -> meter la campaña
                        ///dataOT = new mosaicFile.Models.DataOT();
                        dataOT.campana_txt = commercialData[commercialActIndex].nameSgmr;
                        dataOT.ospCartItemType = 'renove';
                        dataOT.isExistingCustomer = '';
                        dataOT.channel = 'noChannel';
                        if (dataOT.ospCustomerSegment.toUpperCase() === 'RESIDENCIAL') {
                            dataOT.relatedRateResidential = commercialData[commercialActIndex].originRate;
                        } else {
                            dataOT.relatedRateBusiness = commercialData[commercialActIndex].originRate;
                        }
                        break;

                    default: dataOT.priceName = 'primario';
                }
            }
            this.emptyOriginType(commercialData, commercialActIndex, dataOT);
            return dataOT;
        }

        private emptyOriginType(commercialData: any, commercialActIndex: any, dataOT: mosaicFile.Models.DataOT) {
            if (commercialData[commercialActIndex].ospCartItemType === 'migracion') {
                dataOT.originType = '';
            }
        }

        private checkSessionStoragePrescoring(prescoring: any, dataOT: mosaicFile.Models.DataOT) {
            if (prescoring) {
                // Riesgo de Credito
                if (prescoring.creditRiskRating && prescoring.creditRiskRating.length > 0) {
                    dataOT.creditRiskRating = prescoring.creditRiskRating;
                }
            }
        }

        private checkSessionStorageCommercialData(commercialData: any, commercialActIndex: any, dataOT: mosaicFile.Models.DataOT, rates: any[], vm: this) {
            if (commercialData && commercialActIndex !== -1) {
                // Tipo de Contrato
                this.getContractType(commercialData, commercialActIndex, dataOT);
                // Identificador del acto comercial
                this.getCommercialActIndex(commercialData, commercialActIndex, dataOT);
                // Tarifa
                rates = this.getRate(commercialData, commercialActIndex, dataOT, rates, vm);
            }
            return rates;
        }

        private checkSessionStorageClients(clientData: any, dataOT: mosaicFile.Models.DataOT, vm: this) {
            if (clientData) {
                // Tipo de cliente
                if (sessionStorage.getItem('cv') && clientData.clientType) { // Existente
                    dataOT.isExistingCustomer = clientData.clientType;
                }
                // Segmento
                this.getSegment(clientData, dataOT);
                // Provincia                
                this.getProvince(clientData, dataOT, vm);
            }
        }

        private getSegment(clientData: any, dataOT: mosaicFile.Models.DataOT) {
            if (clientData.ospCustomerSegment && clientData.ospCustomerSegment.length > 0) {
                dataOT.ospCustomerSegment = clientData.ospCustomerSegment;
            }
        }

        private getProvince(clientData: any, dataOT: mosaicFile.Models.DataOT, vm: this) {
            if (clientData.postalContact && clientData.postalContact.stateOrProvince &&
                clientData.postalContact.stateOrProvince.length > 0) {
                dataOT.stateOrProvince = clientData.postalContact.stateOrProvince;
            }
            if (vm.creditLimitSrv.isValidSFIDNMC() && clientData && clientData.creditLimitCapta && clientData.creditLimitCapta.creditLimitAvailable !== null) {
                dataOT.creditLimit = clientData.creditLimitCapta.creditLimitAvailable;
            }
        }

        private getRate(commercialData: any, commercialActIndex: any, dataOT: mosaicFile.Models.DataOT, rates: any[], vm: this) {
            if (commercialData[commercialActIndex].rates && commercialData[commercialActIndex].rates.length > 0) {
                // Ordena las tarifas en orden descendiente segun su precio
                if (dataOT.ospCustomerSegment.toUpperCase() === 'RESIDENCIAL') {
                    rates = _.sortBy(commercialData[commercialActIndex].rates, ['taxIncludedPrice']);
                    rates.reverse();
                    // Obtenemos la tarifa con mayor valor
                    if (commercialData[commercialActIndex].ospCartItemSubtype &&
                        commercialData[commercialActIndex].ospCartItemSubtype === 'prepago') {
                        dataOT.relatedRatePrepaid = rates[0].siebelId;
                        dataOT.isExistingCustomer = vm.getClientType(dataOT.relatedRatePrepaid);
                    }
                    else {
                        dataOT.relatedRateResidential = rates[0].siebelId;
                        dataOT.isExistingCustomer = vm.getClientType(dataOT.relatedRateResidential);
                    }
                }
                else {
                    rates = _.sortBy(commercialData[commercialActIndex].rates, ['taxeFreePrice']);
                    rates.reverse();
                    // Obtenemos la tarifa con mayor valor
                    dataOT.relatedRateBusiness = rates[0].siebelId;
                    dataOT.isExistingCustomer = vm.getClientType(dataOT.relatedRateBusiness);
                }
            }
            return rates;
        }

        private getCommercialActIndex(commercialData: any, commercialActIndex: any, dataOT: mosaicFile.Models.DataOT) {
            if (commercialData[commercialActIndex].ospCartItemType && commercialData[commercialActIndex].ospCartItemType.length > 0) {
                dataOT.ospCartItemType = commercialData[commercialActIndex].ospCartItemType;
            }
        }

        private getContractType(commercialData: any, commercialActIndex: any, dataOT: mosaicFile.Models.DataOT) {
            if (commercialData[commercialActIndex].originType && commercialData[commercialActIndex].originType.length > 0) {
                dataOT.ospCartItemSubType = commercialData[commercialActIndex].ospCartItemSubtype;
                dataOT.originType = commercialData[commercialActIndex].originType;
            }
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#getMosaicData
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @param {string} SAPCode Codigo SAP del terminal
         * @param {number} isExistingCustomer
         * @param {string} commercialAction Tipo de acto comercial [portabilidad/alta/migracion/renove]
         * @param {string} portabilityOrigin Origen de portabilidad [pospago/prepago]
         * @param {string} riskLevel Nivel de riesgo del cliente [alto/medio/bajo]
         * @param {string} channel Canal al que hacer la consulta
         * @param {string} sfid sfid de la tienda
         * @param {string} relatedProductOffering Codigo de la tarifa con la que hacer la consulta
         * @param {} mosaicFileCompOWCSStore Contribucion OWCS del componente mosaicFile
         * @param {string} profileBinding Perfil con el que hacer la consulta
         * @param {string} priceNameBinding Tipo de precio con el que hacer la consulta
         * @param {string} ospCustomerSegmentBinding Segmento del cliente [Residencial/Empresa]
         * @param {string} stateOrProvinceBinding Provincia para calcular los impuesto a aplicar
         * @param {string} priceType Tipo de precio
         * @param {string} campana_txt Nombre de la campaña
         * @return {ng.IPromise<{}|void>}
         * @description Metodo para obtener los datos de un terminal
         */
        private getTerminalDataSAPCode(
            SAPCode,
            isExistingCustomer: number,
            channel: string,
            ospCustomerSegmentBinding: string,
            mosaicFileCompOWCSStore,
            sfid: string,
            callApiStock: boolean
        ) {
            let srv = this;
            let headers = new HashMap<string, string>();
            let params;
            params = {
                channel: channel,
                isExistingCustomer: isExistingCustomer,
                commercialAction: 'portabilidad',
                deviceSpecificationId: SAPCode,
                fields: 'deviceSpecification,deviceOffering.id'
            };
            let deferred = srv.$q.defer();
            let mosaicTerminal = new mosaicFile.Models.OrangeMosaicFileTerminal('', deferred);
            return srv.httpCacheGeth(srv.genericConstant.getTerminalDetails, { queryParams: params }, headers, 'mosaicFileComp', false)
                .then((response) => {
                    // Si la respuesta es vacia se muestra el mensaje de error
                    if (response.data.length === 0) {
                        mosaicTerminal.setError(`Error obtaining ${SAPCode} data.`);
                        srv.spinnerBlockSrv.show = false;
                        return mosaicTerminal;
                    } else {
                        // Se carga la vista del terminal
                        mosaicTerminal.loadCatalogViewData(response.data,
                            ospCustomerSegmentBinding,
                            'primario',
                            mosaicFileCompOWCSStore);
                        // Se hace la llamada para recuperar el stock del terminal
                        this.getStockData(mosaicTerminal,
                            isExistingCustomer,
                            'portabilidad',
                            'pospago',
                            channel,
                            sfid, callApiStock);

                    }

                }).catch((error) => {
                    mosaicTerminal.setError(`Error obtaining ${SAPCode} data.`);
                    srv.spinnerBlockSrv.show = false;
                });

            // Se devuelve la informacion del terminal
            /// return mosaicTerminal;
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#getSelectedCommercialAct
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @description
         * @return {boolean} Retorna el indice del commercialData que se esta modificando,
         * en caso contrario retorna -1
         */
        getSelectedCommercialAct(): number {
            let commercialData = [];
            commercialData = JSON.parse(sessionStorage.getItem('commercialData'));

            return _.findIndex(commercialData, function (currentCommercialAct) {
                return currentCommercialAct.ospIsSelected === true;
            });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#setStoreProvince
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @description
         * Establece el nombre de la provincia de la tienda         
         */
        setStoreProvince() {
            let vm = this;
            let shopInfo = JSON.parse(sessionStorage.getItem('shopInfo'));
            if (shopInfo !== null && shopInfo.province) {
                vm.storeProvince = shopInfo.province;
            }
        }
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#setStoreProvince
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @description
         * Establece si se ha logado con perfil televenta         
         */
        setTLV(tlv) {
            let vm = this;
            vm.isTLV = tlv;
        }
        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:MosaicFileSrv#getClientType
         * @methodOf OrangeFeSARQ.Services:MosaicFileSrv
         * @param {string} siebelId idSiebel de la tarifa con la que se llama a la OT
         * @description
         * Calcula el tipo de cliente con el que se hace la llamada a la OT         
         */
        getClientType(siebelId: string) {
            let vm = this;
            let type = '2'; // Por defecto es el valor que se devuelve

            let cv = sessionStorage.getItem('cv');

            if (!cv || cv === null || cv === undefined) {
                let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));

                // Buscamos el tipo de esta tarifa en commercial data
                if (commercialData && commercialData.length > 0) {
                    let currentAct: any = _.find(commercialData, { 'ospIsSelected': true });

                    type = this.getType(currentAct, siebelId, type);
                }
            } else {
                let clientData = JSON.parse(sessionStorage.getItem('clientData'));

                type = this.setClientDataType(clientData, type);
            }

            return type;
        }

        private getType(currentAct: any, siebelId: string, type: string) {
            if (currentAct !== null && currentAct.rates && currentAct.rates.length > 0) {
                let movilFijoRate: any = _.find(currentAct.rates, function (rate: any) {
                    if (rate.siebelId === siebelId && rate.typeService.toUpperCase() === 'MOVIL_FIJO') {
                        return rate;
                    }
                });
                // Todas las tarifas que no sean movil_fijo van con un 0
                let movilRate: any = _.find(currentAct.rates, function (rate: any) {
                    if (rate.siebelId === siebelId && rate.typeService.toUpperCase() !== 'MOVIL_FIJO') {
                        return rate;
                    }
                });
                type = this.setType(movilFijoRate, type, movilRate);
            }
            return type;
        }

        private setClientDataType(clientData: any, type: string) {
            if (clientData && clientData.clientType) {
                type = clientData.clientType;
            }
            return type;
        }

        private setType(movilFijoRate: any, type: string, movilRate: any) {
            if (movilFijoRate !== undefined && movilFijoRate !== null) {
                type = '2';
            }
            else if (movilRate !== undefined && movilRate !== null) {
                type = '0';
            }
            return type;
        }
    }
}
