module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name linesDashboard.Service
     * @description
     * #rest
     * Servicio que consume la información de lineas del cliente
     */
    export class LinesDashboardServ extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];

        private httpService: any;
        private contentData: Array<any> = [];
        public $scope;
        public $q;

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
            vm.genericConstant = $injector.get('genericConstant');
        }

        /**
         * @ngdoc service
         * @name linesDashboard.Service:linesDashboardServ#getData
         * @param {String} dni DNI del usuario a consultar
         * @methodOf orangeInteractionSelect.Service:orangeInteractionSelectServ
         * @description Llamada al Api que nos devuelve las consultas
         * @returns {object} Devuelve una promesa con el response
         */

        getData( idNumber : String ) {
            let vm = this,
                fFind = false,
                _contentData = {},
                deferred = vm.$q.defer();

            angular.forEach( vm.contentData, function(value, key) {
                if( value.idNumber === idNumber ) {
                    _contentData = value;
                    fFind = true;
                }
            });

            /* Comprobamos si tenemos los datos */
            if( fFind ) {
                setTimeout( () => {
                    deferred.resolve( _contentData );
                });
            } else {
                vm.getLoadData( idNumber )
                    .then( (res) => {
                        vm.contentData.push( angular.extend({}, {idNumber: idNumber}, res))

                        deferred.resolve( res );
                    })
                    .catch( (e) => {
                        deferred.reject( e );
                    });
            }

            return deferred.promise;
        }

        getLoadData( idNumber : String ) {
            let vm = this,
                url = vm.genericConstant.linesUsage;
            let _search = {
                queryParams: {
                    individualPublicId: idNumber
                },
                urlParams: ['orange', 'linesUsage', 'get']
            };
            return vm.httpCacheGett( url, _search ).then(getDataComplete, getDataFailed);

            function getDataComplete ( res ) : Object {

                let url = '/api/CPandVAP/v1/agreement/' + vm.genericConstant.brand + '/residential/' +  idNumber,
                    options : Object = {
                        method: 'GET',
                        url: url,
                        headers: {'Content-Type': 'application/json'},
                        transformRequest: angular.identity,
                        //params: queryParams,
                        data: {}
                    };

                return vm.httpService( options ).then(getDataAgreementsComplete, getDataAgreementsFailed);

                function getDataAgreementsComplete ( response : any ) : Object {
                    if( res.data.LinesUsage && res.data.LinesUsage.lineUsageList.length > 0 ) {
                        angular.forEach( res.data.LinesUsage.lineUsageList, function(value, key) {
                            angular.forEach( response.data.agreements, ( valueAgreements, keyAgreements ) => {
                                if( value.number === valueAgreements.lineNumber ) {
                                    angular.extend( this[key], {
                                        endDateTime: valueAgreements.endDateTime,
                                        amortization: valueAgreements.amortization
                                    });
                                }
                            });
                        }, res.data.LinesUsage.lineUsageList );
                    }

                    return res.data;
                }

                function getDataAgreementsFailed( err : any ) : Object {
                    switch (err.status ) {
                        case 404:
                            err.message = 'No existe registro para este cliente';
                        break;
                        default:
                            err.message = 'Error generico';
                        break;
                    }

                    return {
                        agreements: [],
                        error: {
                            status: err.status,
                            message: err.message
                        }
                    }
                }
            }

            function getDataFailed( err : any ) : Object {
                switch (err.status ) {
                    case 404:
                        err.message = 'No existe registro para este cliente';
                    break;
                    default:
                        err.message = 'Error generico';
                    break;
                }

                return {
                    LinesUsage: [],
                    error: {
                        status: err.status,
                        message: err.message
                    }
                }
            }
        }
    }
}