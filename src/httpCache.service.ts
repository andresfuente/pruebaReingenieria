module OrangeFeSARQ.Services {
    'use strict';

    /**
     * @ngdoc service
     * @name OrangeFeSARQ.Services:HttpCacheOrange
     * @description
     * Clase que va a gestionar todas las peticiones Http de la aplicacion
     * se va a encargar de gestionar la cache en las peticiones get y de invalidar
     * en caso de que sea necesario
     */
    export class HttpCacheOrange {
        public static $inject = ['$http', '$q', '$cacheFactory', 'utils'];
        public static keys: string[] = [];

        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private $cacheFactory: ng.ICacheFactoryService,
            private utils) {

        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:HttpCacheOrange#post
         * @param {string} url de la api sin parametros.
         * @param {Object} requestParams Parámetros
         * @param {string=} [resetCacheKey=''] restea las llamadas a una url
         * @methodOf OrangeFeSARQ.Services:HttpCacheOrange
         * @description
         * realiza la peticion post, los parámetros que recibe son:
         * @example
         * Typical usage
         * ```js
         *  return vm.httpCacheOrange.post(vm.genericConstant.activityRegister, _search,'/sites/REST/controller/GridController/FichaCliente')
         * .then(function (response) {
         *          return response.data;
         *       })
         * .catch(function (error) {
         *           return error;
         *       });
         *
         * }
         * ```
         *
         * @return {Object} Type ng.IPromise<any>
         */
        public post(url: string, params: any, resetCacheKey: string = ''): ng.IPromise<any> {
            let vm = this;

            if (params && params.urlParams && params.urlParams.length > 0) {
                for (let i: number = 0; i < params.urlParams.length; i++) {
                    url += '/' + params.urlParams[i]
                }
            }

            let _search: any;
            let key = url;

            // vm.$http.defaults.headers.post['Content-Type'] = 'text/plainn';
            return vm.$http.post(url, params.queryParams)
                .then(
                (successData) => {
                    if (resetCacheKey != '') {
                        let httpCache = vm.$cacheFactory.get('$http');
                        for (let j: number = 0; j < HttpCacheOrange.keys.length; j++) {
                            if (HttpCacheOrange.keys[j].indexOf(resetCacheKey) != -1) {
                                httpCache.remove(HttpCacheOrange.keys[j]);
                            }
                        }
                    }
                    return successData;
                },
                (errorData) => {
                    return errorData;
                }
                );

        }

        public put(url: string, params: any, resetCacheKey: any = {}): ng.IPromise<any> {
            let vm = this;

            let _search: any = {
                params: params
            };

            return vm.$http.get(url, _search)
                .then(
                (successData) => {
                    if (resetCacheKey != {}) {
                        let httpCache = vm.$cacheFactory.get('$http');
                        let key = resetCacheKey.url + vm.utils.extractProperties(resetCacheKey._search.params);
                        httpCache.remove(key);
                    }
                    return successData;
                },
                (errorData) => {
                    return errorData;
                }
                );

        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services:HttpCacheOrange#get
         * @param {string} url de la api sin parametros.
         * @param {Object} params Parámetros en el siguiente formato  .
         * @param {number=} [time=(1000 * 0.5 * 60)] Tiempo de vida de la cache por defecto 5 mimutos.
         * @param {boolean=} [refresh=false] Invalida la cache por defecto false
         * @methodOf OrangeFeSARQ.Services:HttpCacheOrange
         * @description
         * realiza la peticion get
         * @example
         * Typical usage
         * ```js
         * let vm = this;
         * let _search:Object = {
         *        queryParams: {
         *             msisdn: msisdn
         *        },
         *        urlParams: ['orange', 'customerView', 'get']

         *    };
         * return vm.httpCacheOrange.gett(vm.clientAPIUrl, _search)
         * .then(function (response) {
         *            return response.data;
         *        })
         * .catch(function (error) {
         *             return error;
         *        });
         * ```
         *
         * @return {Object} Type ng.IPromise<any>
         */

        public gett(url: string, params: any, time: number = (1000 * 0.5 * 60), refresh: boolean): ng.IPromise<any> {
            let vm = this;
            if (params && params.urlParams && params.urlParams.length > 0) {
                for (let i: number = 0; i < params.urlParams.length; i++) {
                    url += '/' + params.urlParams[i]
                }
                url += '?'
            }
            let _search: any;
            let key = url;
            if (params && params.queryParams) {
                _search = {
                    params: params.queryParams
                };
                key = url + vm.utils.extractProperties(_search.params);
            }

            let httpCache = vm.$cacheFactory.get('$http');

            let cacheResponse: any = httpCache.get(key);
            if (!cacheResponse || refresh || cacheResponse.expireDate < (new Date()).getTime()) {
                return vm.$http.get(url, _search)
                    .then(
                    (successData) => {
                        // console.info("LLAMADA CORRECTA URL " + successData.config.url, successData);
                        let d = { responseData: successData, expireDate: (new Date()).getTime() + time };
                        if (HttpCacheOrange.keys.indexOf(key) == -1) {
                            HttpCacheOrange.keys.push(key);
                        }
                        httpCache.put(key, d);
                        return successData;
                    },
                    (errorData) => {
                        // console.error("LLAMADA ERRONEA A URL " + errorData.config.url, errorData);

                        return errorData;
                    }
                    );
            } else {
                let promise = vm.$q.defer();
                promise.resolve(cacheResponse.responseData);
                return promise.promise;
            }
        }
    }

    angular.module('httpCacheOrange', [])
        .service('httpCacheOrange', OrangeFeSARQ.Services.HttpCacheOrange);

}
