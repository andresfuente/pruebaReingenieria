module OrangeFeSARQ.Services {
    'use strict';

    export class SrvFile extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        private httpService: any;
        private orangeMosaicElementSrv;
        public $scope;
        public $q;
        public MosaicFileSrv;

        public viewState = {
            selectedVariant: null,
            accordion: {}
        };

        private cachedTerminalName: string;
        private cachedTerminalPromise;

        private isClientBinding;
        private commercialActionBinding;
        private portabilityBinding;
        private riskLevelBinding;
        private channelBinding;
        private relatedProductoOfferingBinding;
        private profileBinding;

        private riskLevel: string[] = ['bajo', 'medio', 'alto', 'todos'];

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.$scope = $injector.get('$rootScope');
            vm.$q = $injector.get('$q');
            vm.httpService = $injector.get('$http');
            vm.MosaicFileSrv = $injector.get('MosaicFileSrv');
            // vm.MosaicFileSrv = $injector.get('srvMosaic'); //Using common component
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

        /* Datos del terminal */
        getData(str_id, sfid, fileTerminalCompOWCSStore, callApiStock) {
            let srv = this;
            let relatedProductOffering;
            let clientData = JSON.parse(sessionStorage.getItem('clientData'));
            let commercialData = JSON.parse(sessionStorage.getItem('commercialData'));
            let commercialActIndex = srv.getSelectedCommercialAct();

            if (srv.cachedTerminalName && srv.cachedTerminalName === str_id) {
                return srv.cachedTerminalPromise;
            } else {
                let dataOT = srv.MosaicFileSrv.getDataOT();
                if (localStorage.getItem('profile')) {
                    dataOT.profile = localStorage.getItem('profile').toLocaleUpperCase();
                } else {
                    dataOT.profile = localStorage.getItem('rol').toLocaleUpperCase();
                }
                // Se define el tipo de tarifa dependiendo del segmento del cliente
                relatedProductOffering = this.getRelatedProductOffering(dataOT, relatedProductOffering);

                if (dataOT.creditRiskRating === 'bajo' || dataOT.creditRiskRating === 'medio') {
                    dataOT.creditRiskRating += ',alto';
                }

                if (clientData && clientData.creditLimitCapta && clientData.creditLimitCapta.creditLimitAvailable !== null) {
                    dataOT.creditLimit = clientData.creditLimitCapta.creditLimitAvailable;
                }

                if (commercialData[commercialActIndex].ospTerminalWorkflow === 'primary_renew' ||
                    commercialData[commercialActIndex].ospTerminalWorkflow === 'secondary_renew' ||
                    commercialData[commercialActIndex].ospTerminalWorkflow === 'best_renove') {
                    dataOT.campana_txt = commercialData[commercialActIndex].nameSgmr;
                    if (dataOT.creditLimit && dataOT.creditLimit !== null){
                        delete dataOT.creditLimit;
                    }
                }

                srv.cachedTerminalPromise = srv.MosaicFileSrv.getTerminalFileData(
                    str_id, Number(dataOT.isExistingCustomer), dataOT.ospCartItemType,
                    dataOT.ospCartItemSubType, dataOT.creditRiskRating,
                    dataOT.channel, sfid, relatedProductOffering,
                    fileTerminalCompOWCSStore, dataOT.profile, dataOT.priceName, callApiStock,
                    dataOT.ospCustomerSegment, dataOT.stateOrProvince, dataOT.campana_txt, dataOT.creditLimit
                ).then((terminal) => {
                    srv.viewState.selectedVariant = terminal.variants[0];
                    return terminal;
                });

                srv.cachedTerminalName = str_id;
                return srv.cachedTerminalPromise;
            }
        }

        private getRelatedProductOffering(dataOT: any, relatedProductOffering: any) {
            if (dataOT.ospCustomerSegment.toUpperCase() === 'RESIDENCIAL') {
                relatedProductOffering = dataOT.relatedRateResidential;
            }
            else {
                relatedProductOffering = dataOT.relatedRateBusiness;
            }
            return relatedProductOffering;
        }

        /* Datos del color */
        getVariant() {
            let vm = this;
            return vm.viewState.selectedVariant;
        }

        setVariant(variant) {
            let vm = this;
            vm.viewState.selectedVariant = variant;
        }

        getAccordion(label) {
            let vm = this;
            return vm.viewState.accordion[label];
        }

        setAccordion(label, view) {
            let vm = this;
            vm.viewState.accordion[label.trim()] = view;
        }

        createLabels(labels: Object): Array<Object> {
            let vm = this,
                aLabels: Array<Object> = [];

            angular.forEach(labels, (value, key) => {
                let name = value.name.replace(/\./g, "_");

                aLabels[name] = {
                    description: value.description,
                    value: value.value
                }
            });

            return aLabels;
        };

        createModules(modules: Array<String>): any {
            let vm = this,
                obj: Object = {};

            angular.forEach(modules, function (value, key) {
                this[value.toString()] = true;
            }, obj);

            return obj;
        };

    }

    // Registration
    angular.module('srvFile', [])
        .service('srvFile', OrangeFeSARQ.Services.SrvFile);
}
