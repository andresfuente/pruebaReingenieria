var OrangeFeSARQ;
(function (OrangeFeSARQ) {
    var Services;
    (function (Services) {
        'use strict';
        var HttpCacheOrange = (function () {
            function HttpCacheOrange($http, $q, $cacheFactory, utils) {
                this.$http = $http;
                this.$q = $q;
                this.$cacheFactory = $cacheFactory;
                this.utils = utils;
            }
            HttpCacheOrange.prototype.post = function (url, requestParams, resetCacheKey) {
                if (resetCacheKey === void 0) { resetCacheKey = ''; }
                var vm = this;
                return vm.$http.post(url, requestParams)
                    .then(function (successData) {
                    if (resetCacheKey != '') {
                        var httpCache = vm.$cacheFactory.get('$http');
                        for (var j = 0; j < HttpCacheOrange.keys.length; j++) {
                            if (HttpCacheOrange.keys[j].indexOf(resetCacheKey) != -1) {
                                httpCache.remove(HttpCacheOrange.keys[j]);
                            }
                        }
                    }
                    return successData;
                }, function (errorData) {
                    return errorData;
                });
            };
            HttpCacheOrange.prototype.put = function (url, params, resetCacheKey) {
                if (resetCacheKey === void 0) { resetCacheKey = {}; }
                var vm = this;
                var _search = {
                    params: params
                };
                return vm.$http.get(url, _search)
                    .then(function (successData) {
                    if (resetCacheKey != {}) {
                        var httpCache = vm.$cacheFactory.get('$http');
                        var key = resetCacheKey.url + vm.utils.extractProperties(resetCacheKey._search.params);
                        httpCache.remove(key);
                    }
                    return successData;
                }, function (errorData) {
                    return errorData;
                });
            };
            HttpCacheOrange.prototype.gett = function (url, params, time, refresh) {
                if (time === void 0) { time = (1000 * 0.5 * 60); }
                var vm = this;
                if (params && params.urlParams && params.urlParams.length > 0) {
                    for (var i = 0; i < params.urlParams.length; i++) {
                        url += '/' + params.urlParams[i];
                    }
                    url += '?';
                }
                var _search;
                var key = url;
                if (params && params.queryParams) {
                    _search = {
                        params: params.queryParams
                    };
                    key = url + vm.utils.extractProperties(_search.params);
                }
                var httpCache = vm.$cacheFactory.get('$http');
                var cacheResponse = httpCache.get(key);
                if (!cacheResponse || refresh || cacheResponse.expireDate < (new Date()).getTime()) {
                    return vm.$http.get(url, _search)
                        .then(function (successData) {
                        var d = { responseData: successData, expireDate: (new Date()).getTime() + time };
                        if (HttpCacheOrange.keys.indexOf(key) == -1) {
                            HttpCacheOrange.keys.push(key);
                        }
                        httpCache.put(key, d);
                        return successData;
                    }, function (errorData) {
                        return errorData;
                    });
                }
                else {
                    var promise = vm.$q.defer();
                    promise.resolve(cacheResponse.responseData);
                    return promise.promise;
                }
            };
            HttpCacheOrange.$inject = ['$http', '$q', '$cacheFactory', 'utils'];
            HttpCacheOrange.keys = [];
            return HttpCacheOrange;
        }());
        Services.HttpCacheOrange = HttpCacheOrange;
        angular.module('httpCacheOrange', [])
            .service('httpCacheOrange', OrangeFeSARQ.Services.HttpCacheOrange);
    })(Services = OrangeFeSARQ.Services || (OrangeFeSARQ.Services = {}));
})(OrangeFeSARQ || (OrangeFeSARQ = {}));
//# sourceMappingURL=httpCache.service.js.map