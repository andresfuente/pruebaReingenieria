var OrangeFeSARQ;
(function (OrangeFeSARQ) {
    var Services;
    (function (Services) {
        'use strict';
        var ContractsSrv = (function () {
            function ContractsSrv() {
                this.getPrepagoLines = function (products) {
                };
                this.getPospagoLines = function (products) {
                };
                this.getContract = function (products, msisdn) {
                    for (var i in products) {
                        if (products[i].productCharacteristic) {
                            for (var j in products[i].productCharacteristic) {
                                if (products[i].productCharacteristic[j].name === "MSISDN") {
                                    if (products[i].productCharacteristic[j].value === msisdn) {
                                        return products[i].ospProductType;
                                    }
                                }
                            }
                        }
                    }
                };
            }
            return ContractsSrv;
        }());
        Services.ContractsSrv = ContractsSrv;
        angular.module('contracts', [])
            .service('contractsSrv', ContractsSrv);
    })(Services = OrangeFeSARQ.Services || (OrangeFeSARQ.Services = {}));
})(OrangeFeSARQ || (OrangeFeSARQ = {}));
//# sourceMappingURL=contracts.service.js.map