var OrangeFeSARQ;
(function (OrangeFeSARQ) {
    var Services;
    (function (Services) {
        'use strict';
        var OrangeOwcs = (function () {
            function OrangeOwcs(httpCacheOrange, genericConstant, owcsIdsConstant, $injector) {
                this.httpCacheOrange = httpCacheOrange;
                this.genericConstant = genericConstant;
                this.owcsIdsConstant = owcsIdsConstant;
                this.$injector = $injector;
                var vm = this;
                vm.keys = vm.owcsIdsConstant.owcs;
            }
            OrangeOwcs.prototype.setDataInStore = function (section) {
                var vm = this;
                for (var i = 0; i < section.length; i++) {
                    if (vm.keys[section[i].compId] !== null && vm.keys[section[i].compId] !== undefined) {
                        var storeService = vm.$injector.get(vm.keys[section[i].compId].store);
                        if (storeService !== null) {
                            storeService.section = section[i];
                        }
                    }
                }
            };
            OrangeOwcs.prototype.setDataHeader = function (section) {
                var vm = this;
                var storeService = vm.$injector.get(vm.keys['header_comp'].store);
                if (vm.keys['locator']) {
                    var locator = vm.$injector.get(vm.keys['locator'].store);
                    locator.section = section[0];
                }
                storeService.section = [];
                if (storeService !== null) {
                    storeService.section = section;
                    for (var i in storeService.section) {
                        if (storeService.section[i].listModule) {
                            vm.setDataInStore(storeService.section[i].listModule);
                        }
                    }
                }
            };
            OrangeOwcs.prototype.setDataFooter = function (section) {
                var vm = this;
                var storeService = vm.$injector.get(vm.keys['footer_comp'].store);
                for (var i = 0; i < section.length; i++) {
                    storeService.section = [];
                    if (storeService !== null) {
                        storeService.section = section[i];
                    }
                }
            };
            OrangeOwcs.prototype.getLayoutMetada = function (key, exp) {
                if (exp === void 0) { exp = null; }
                var vm = this;
                return vm.httpCacheOrange.gett(vm.genericConstant.owcsUrl, { urlParams: [vm.genericConstant.site, key] }, 5 * 60 * 1000, false)
                    .then(function (metaInfoResponse) {
                    if (metaInfoResponse.data) {
                        var layoutMetaData = metaInfoResponse.data;
                        vm.setDataHeader(layoutMetaData.headerSection);
                        vm.setDataInStore(layoutMetaData.topSection);
                        vm.setDataInStore(layoutMetaData.centralSection);
                        vm.setDataInStore(layoutMetaData.leftSection);
                        vm.setDataInStore(layoutMetaData.rightSection);
                        vm.setDataInStore(layoutMetaData.bottomSection);
                        vm.setDataFooter(layoutMetaData.footerSection);
                        return layoutMetaData;
                    }
                }, function (error) {
                    console.error('[Error-fallback] ' + JSON.stringify(error));
                }).catch(function (error) {
                    console.error('[Error] MetaInfo error: ' + JSON.stringify(error));
                });
            };
            OrangeOwcs.$inject = ['httpCacheOrange', 'genericConstant', 'owcsIdsConstant', '$injector'];
            return OrangeOwcs;
        }());
        Services.OrangeOwcs = OrangeOwcs;
        angular.module('orangeOwcs', [])
            .service('orangeOwcs', OrangeOwcs);
    })(Services = OrangeFeSARQ.Services || (OrangeFeSARQ.Services = {}));
})(OrangeFeSARQ || (OrangeFeSARQ = {}));
//# sourceMappingURL=orangeOWCS.service.js.map