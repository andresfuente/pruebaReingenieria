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

        private $q;
        private injections = {};
        private cacheVersion; // Value to detect if cache has to be cleared depending of input params
        private cache = {}; // Storage to prevent repeating calls to the API
        private storeProvince: string = '';
        private httpService;

        public isTLV: boolean;

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
            campana_txt?: string
        ): ng.IPromise<{} | void> {
            let srv = this;
            let params;
            let deferred = srv.$q.defer();
            let priceType = '';
            // Cabeceras
            let headers = {
                'Geolocation-local': srv.storeProvince.toUpperCase(),
                'Geolocation-client': stateOrProvinceBinding ? stateOrProvinceBinding.toUpperCase() : srv.storeProvince.toUpperCase()
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
            if (riskLevel === 'bajo' || riskLevel === 'medio') {
                riskLevel += ',alto';
            }
            // Establece el segmento del cliente
            let clientSegment = '';
            if (ospCustomerSegmentBinding.toUpperCase() === 'RESIDENCIAL') {
                clientSegment = 'Residencial';
            } else {
                clientSegment = 'Empresas';
            }

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
                'deviceOffering.category.name': priceNameBinding
            };
            if (filters && filters.length) {
                filters.forEach((filtersParam, index) => {
                    params[Object.keys(filtersParam)[0]] = filtersParam[Object.keys(filtersParam)[0]];
                    if (Object.keys(filtersParam)[0] === 'price') {
                        // tslint:disable-next-line
                        params['priceType'] = 'aplazado';
                    }
                });
            }
            // Parametros para Terminal Libre sin Servicio    
            if (workflow === 'libre') {
                params.channel = 'eShopRES';
                // Se seleccionan los parametros necesarios para la llamada a la OT 
                params = _.pick(params, ['channel', 'isExistingCustomer', 'limit', 'segment',
                    'offset', 'commercialAction', 'deviceOffering.category.name', 'sort', 'ospOpenSearch',
                    'brand', 'price', 'deviceType', 'purchaseOption', 'relatedProductOffering', 'price.fee',
                    'characteristic.OSData.groupData.OStype.value',
                    'characteristic.cameraData.groupData.backCameraResolution.value',
                    'characteristic.screenData.groupData.screenSize.value',
                    'characteristic.memoryData.groupData.hardDisk.value',
                    'characteristic.batteryData.groupData.batteryDurationInConversation.value',
                    'characteristic.color']);
            }

            // Parametros para Prepago   
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = srv.getSelectedCommercialAct();

            if (commercialData[commercialActIndex].ospCartItemSubtype === 'prepago') {
                let defaultData = JSON.parse(sessionStorage.getItem('defaultData'));

                if (defaultData && defaultData.relatedRatePrepaid) {
                    params.relatedProductOffering = defaultData.relatedRatePrepaid;
                } else {
                    params.relatedProductOffering = '1-PD62X9';
                }
            }

            // Parametros para Renove
            if (params.commercialAction === 'renove') {
                let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
                let commercialActIndex = srv.getSelectedCommercialAct();

                params.channel = '';
                params.campaignName = campana_txt;
                // Se seleccionan los parametros necesarios para la llamada a la OT
                if (commercialData[commercialActIndex].ospTerminalWorkflow === 'primary_renew') { // Renove primario
                    params = _.pick(params, ['channel', 'offset', 'limit', 'sort', 'commercialAction', 'campaignName']);
                } else { // Renove secundario
                    params = _.pick(params, ['channel', 'offset', 'limit', 'sort', 'commercialAction', 'campaignName',
                        'relatedProductOffering']);
                }
            }
            // Metodo http nativo por bug en los filtros
            return srv.httpService({
                method: 'GET',
                url: srv.genericConstant.getMosaico,
                params: params,
                headers: headers
            })
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
                            campana_txt
                        )
                    };
                })
                .catch((error) => {
                    throw error;
                });
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
            campana_txt?: string
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
                    campana_txt
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
            campana_txt?: string

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
            _headers.set('Geolocation-local', srv.storeProvince.toUpperCase());
            _headers.set('Geolocation-client', stateOrProvinceBinding);


            params = {
                channel: channel,
                isExistingCustomer: isExistingCustomer,
                commercialAction: commercialAction,
                portabilityOrigin: portabilityOrigin,
                modelId: terminalName,
                riskLevel: riskLevel,
                relatedProductOffering: relatedProductOffering,
                profile: profileBinding,
                'deviceOffering.category.name': priceNameBinding,
                priceType: priceType
            };

            // Parametros para Terminal Libre sin Servicio 
            if (relatedProductOffering === '1-CWOOG9') {
                params.channel = 'eShopRES';
                // Se seleccionan los parametros necesarios para la llamada a la OT
                params = _.pick(params, ['channel', 'isExistingCustomer', 'modelId',
                    'relatedProductOffering', 'commercialAction']);
            }

            // Parametros para Prepago   
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = srv.getSelectedCommercialAct();

            if (commercialData[commercialActIndex].ospCartItemSubtype === 'prepago') {
                let defaultData = JSON.parse(sessionStorage.getItem('defaultData'));

                if (defaultData && defaultData.relatedRatePrepaid) {
                    params.relatedProductOffering = defaultData.relatedRatePrepaid;
                } else {
                    params.relatedProductOffering = '1-PD62X9';
                }
            }

            // Parametros para Renove   
            if (params.commercialAction === 'renove') {
                // Se seleccionan los parametros necesarios para la llamada a la OT
                params.channel = '';
                params.campaignName = campana_txt;
                let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
                let commercialActIndex = srv.getSelectedCommercialAct();
                // Renove pimaraio
                if (commercialData[commercialActIndex].ospTerminalWorkflow.toLowerCase() === 'primary_renew') {
                    priceNameBinding = 'primario';
                    params = _.pick(params, ['channel', 'commercialAction', 'modelId']);
                }
                // Renove secundario
                if (commercialData[commercialActIndex].ospTerminalWorkflow.toLowerCase() === 'secondary_renew') {
                    priceNameBinding = 'secundario';
                    params = _.pick(params, ['channel', 'commercialAction', 'modelId', 'relatedProductOffering']);
                }
            }
            if (riskLevel === 'bajo' || riskLevel === 'medio') {
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
                                // Se hace la llamada para recuperar el stock del terminal
                                this.getStockData(mosaicTerminal,
                                    isExistingCustomer,
                                    commercialAction,
                                    portabilityOrigin,
                                    channel,
                                    sfid);
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
            sfid: string
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

            if (codes.length && !srv.isTLV) {
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
            ospCustomerSegmentBinding?: string,
            stateOrProvinceBinding?: string
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
                '').promise;
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

            defaultData.profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : 'PDV' ;

            // Si el segmento y/o el tipo de acto está en el clientData, lo recogemos
            if (clientData) {
                if (clientData.ospCustomerSegment) {
                    segment = clientData.ospCustomerSegment;
                } else {
                    segment = defaultData.ospCustomerSegment;
                }

                if (commercialData) {
                    let comm : any = _.find(commercialData, {'ospIsSelected': true});

                    if (comm && comm.ospCartItemSubtype) {
                        cartItemSubType = comm.ospCartItemSubtype;
                    } else {
                        cartItemSubType = defaultData.ospCartItemSubType;
                    }
                } else {
                    cartItemSubType = defaultData.ospCartItemSubType;
                }

                if (cartItemSubType.toUpperCase() === 'POSPAGO') {
                    if (segment.toUpperCase() === 'RESIDENCIAL') {
                        if (defaultData.relatedTypeResidential.toUpperCase() === 'MOVIL_FIJO') {
                            defaultData.isExistingCustomer = '2';
                        } else {
                            defaultData.isExistingCustomer = '0';
                        }
                    } else { // Caso empresa o autonomo
                        if (defaultData.relatedTypeBusiness.toUpperCase() === 'MOVIL_FIJO') {
                            defaultData.isExistingCustomer = '2';
                        } else {
                            defaultData.isExistingCustomer = '0';
                        }
                    }
                } else { // Prepago
                    if (defaultData.relatedTypePrepaid.toUpperCase() === 'MOVIL_FIJO') {
                        defaultData.isExistingCustomer = '2';
                    } else {
                        defaultData.isExistingCustomer = '0';
                    }
                }
            }

            return defaultData;
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
            let prescoring = JSON.parse(sessionStorage.getItem('prescoring'));
            let defaultDataOT: mosaicFile.Models.DataOT = vm.getDefaultDataOT();
            let commercialActIndex;

            // Se obtienen los datos por defecto           
            dataOT = _.cloneDeep(defaultDataOT);
            dataOT.stateOrProvince = 'Madrid'; // REMOVER

            // Si los datos de clientes se encuentran en el session storage
            if (clientData) {
                // Tipo de cliente
                if (sessionStorage.getItem('cv') && clientData.clientType) { // Existente
                    dataOT.isExistingCustomer = clientData.clientType;
                }

                // Segmento
                if (clientData.ospCustomerSegment && clientData.ospCustomerSegment.length > 0) {
                    dataOT.ospCustomerSegment = clientData.ospCustomerSegment;
                }
                // Provincia                
                if (clientData.postalContact && clientData.postalContact.stateOrProvince &&
                    clientData.postalContact.stateOrProvince.length > 0) {
                    dataOT.stateOrProvince = clientData.postalContact.stateOrProvince;
                }
            }
            commercialActIndex = vm.getSelectedCommercialAct();
            // Si los datos del acto comercial se encuentran en el session storage
            if (commercialData && commercialActIndex !== -1) {
                // Tipo de Contrato
                if (commercialData[commercialActIndex].originType && commercialData[commercialActIndex].originType.length > 0) {
                    dataOT.ospCartItemSubType = commercialData[commercialActIndex].originType;
                }
                // Identificador del acto comercial
                if (commercialData[commercialActIndex].ospCartItemType && commercialData[commercialActIndex].ospCartItemType.length > 0) {
                    dataOT.ospCartItemType = commercialData[commercialActIndex].ospCartItemType;
                }
                // Tarifa
                if (commercialData[commercialActIndex].rates && commercialData[commercialActIndex].rates.length > 0) {
                    // Ordena las tarifas en orden descendiente segun su precio
                    if (dataOT.ospCustomerSegment.toUpperCase() === 'RESIDENCIAL') {
                        rates = _.sortBy(commercialData[commercialActIndex].rates, ['taxIncludedPrice']);
                        rates.reverse();
                        // Obtenemos la tarifa con mayor valor
                        dataOT.relatedRateResidential = rates[0].siebelId;
                        dataOT.isExistingCustomer = vm.getClientType(dataOT.relatedRateResidential);
                    } else {
                        rates = _.sortBy(commercialData[commercialActIndex].rates, ['taxeFreePrice']);
                        rates.reverse();
                        // Obtenemos la tarifa con mayor valor
                        dataOT.relatedRateBusiness = rates[0].siebelId;
                        dataOT.isExistingCustomer = vm.getClientType(dataOT.relatedRateBusiness);
                    }
                }
            }
            
            // Si los datos de prescoring se encuentran en el session storage
            if (prescoring) {
                // Riesgo de Credito
                if (prescoring.creditRiskRating && prescoring.creditRiskRating.length > 0) {
                    dataOT.creditRiskRating = prescoring.creditRiskRating;
                }
            }

            if (commercialData[commercialActIndex].ospTerminalWorkflow) {
                switch (commercialData[commercialActIndex].ospTerminalWorkflow) {
                    case 'standar': dataOT.priceName = 'primario';
                        break;
                    case 'secundario': dataOT.priceName = 'secundario';
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
                        break;
                    case 'secondary_renew':
                        dataOT.campana_txt = commercialData[commercialActIndex].nameSgmr;
                        dataOT.ospCartItemType = 'renove';
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
                        break;

                    default: dataOT.priceName = 'primario';
                }
            }
            if (commercialData[commercialActIndex].ospCartItemType === 'migracion') {
                dataOT.ospCartItemSubType = 'todos';
            }
            return dataOT;
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
            sfid: string
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
                            sfid);
                        return mosaicTerminal;
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
                    let currentAct : any = _.find(commercialData, {'ospIsSelected': true});

                    if (currentAct !== null && currentAct.rates && currentAct.rates.length > 0) {
                        let movilFijoRate : any = _.find(currentAct.rates, function (rate : any) {
                            if (rate.siebelId === siebelId && rate.typeService.toUpperCase() === 'MOVIL_FIJO') {
                                return rate;
                            }
                        });

                        // Todas las tarifas que no sean movil_fijo van con un 0
                        let movilRate : any = _.find(currentAct.rates, function (rate : any) {
                            if (rate.siebelId === siebelId && rate.typeService.toUpperCase() !== 'MOVIL_FIJO') {
                                return rate;
                            }
                        });

                        if (movilFijoRate !== undefined && movilFijoRate !== null) {
                            type = '2';
                        } else if (movilRate !== undefined && movilRate !== null) {
                            type = '0';
                        }
                    }
                }
            } else {
                let clientData = JSON.parse(sessionStorage.getItem('clientData'));

                if (clientData && clientData.clientType) {
                    type = clientData.clientType;
                }
            }

            return type;
        }
    }
}
