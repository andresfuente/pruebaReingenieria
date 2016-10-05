var FdC;
(function (FdC) {
    var Services;
    (function (Services) {
        'use strict';
        var CustomerViewStore = (function () {
            function CustomerViewStore() {
            }
            Object.defineProperty(CustomerViewStore.prototype, "info", {
                get: function () {
                    return this._info;
                },
                set: function (value) {
                    this._info = value;
                },
                enumerable: true,
                configurable: true
            });
            return CustomerViewStore;
        }());
        Services.CustomerViewStore = CustomerViewStore;
        angular.module('customerViewStore', [])
            .service('customerViewStore', CustomerViewStore);
    })(Services = FdC.Services || (FdC.Services = {}));
})(FdC || (FdC = {}));
//# sourceMappingURL=customerViewStore.service.js.map