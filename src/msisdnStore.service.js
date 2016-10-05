var FdC;
(function (FdC) {
    var Services;
    (function (Services) {
        'use strict';
        var MsisdnStore = (function () {
            function MsisdnStore() {
            }
            Object.defineProperty(MsisdnStore.prototype, "msisdn", {
                get: function () {
                    return this._msisdn;
                },
                set: function (value) {
                    this._msisdn = value;
                },
                enumerable: true,
                configurable: true
            });
            return MsisdnStore;
        }());
        Services.MsisdnStore = MsisdnStore;
        angular.module('msisdnStore', [])
            .service('msisdnStore', MsisdnStore);
    })(Services = FdC.Services || (FdC.Services = {}));
})(FdC || (FdC = {}));
//# sourceMappingURL=msisdnStore.service.js.map