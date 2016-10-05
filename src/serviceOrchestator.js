var OrangeFeSARQ;
(function (OrangeFeSARQ) {
    var Services;
    (function (Services) {
        'use strict';
        var ApiOrchestatorSrv = (function () {
            function ApiOrchestatorSrv($http) {
                var _this = this;
                this.$http = $http;
                this.orangeModelMapper = {};
                this.pendingOperations = {};
                this.get = function (tag, url, cb) {
                    if (_this.existsDataModel(tag)) {
                        console.log('Existe ya el modelo...');
                        cb(null, { name: 'Sema', surname: 'Garcia' });
                    }
                    else {
                        console.log('No existe aún el modelo...');
                        if (_this.isPendingOperation(tag)) {
                            console.log('Espera, que ya estoy yendo a por él');
                            _this.pendingOperations[tag].push(cb);
                        }
                        else {
                            console.log('No, no lo tengo... pero te lo traigo');
                            _this.pendingOperations[tag] = [cb];
                            _this.$http.get(url).then(function (response) {
                                console.log('DataOK: ', response);
                                _this.orangeModelMapper[tag] = (response.data);
                                _.each(_this.pendingOperations[tag], function (callback) {
                                    callback(null, _this.orangeModelMapper[tag]);
                                });
                            }, function (error) {
                                console.log('DataKO: ', error);
                            }).finally(function () {
                                console.log('Desencolando ' + tag + '...');
                                _this.pendingOperations[tag] = [];
                            });
                        }
                    }
                };
                this.existsDataModel = function (tag) {
                    return _.has(_this.orangeModelMapper, tag);
                };
                this.isPendingOperation = function (tag) {
                    return _.has(_this.pendingOperations, tag);
                };
                window['orangeModelMapper'] = this.orangeModelMapper;
                window['pendingOperations'] = this.pendingOperations;
            }
            ApiOrchestatorSrv.$inject = ['$http'];
            return ApiOrchestatorSrv;
        }());
        Services.ApiOrchestatorSrv = ApiOrchestatorSrv;
        angular.module('orchestator', [])
            .service('apiOrchestatorSrv', ApiOrchestatorSrv);
    })(Services = OrangeFeSARQ.Services || (OrangeFeSARQ.Services = {}));
})(OrangeFeSARQ || (OrangeFeSARQ = {}));
//# sourceMappingURL=serviceOrchestator.js.map