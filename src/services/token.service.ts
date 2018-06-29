module OrangeFeSARQ.Services {
    'use strict';

    export class TokenSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private url: string;
        public genericConstant;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        getToken(msisdn: string, key: string, compName: string) {
            let vm = this;
            let apiUrl: string = vm.genericConstant.token;
            let brand: string = vm.genericConstant.brand;

            let request: OrangeFeSARQ.Models.getToken_request = <OrangeFeSARQ.Models.getToken_request>{};
            request.inputString = msisdn;
            request.key = key;

            let _search: Object = {
                queryParams: request,
                urlParams: [brand, 'aes', 'encrypt']
            };

            return vm.httpCacheGett(apiUrl, _search, compName)
                .then(
                    (successData) => {
                        return successData;
                    },
                    (errorData) => {
                        return errorData;
                    }
                );
        }

        genToken(body: any, compName: string = 'tokenSrv') {
            let vm = this;
            let apiUrl: string = vm.genericConstant.token;
            const method: string = 'token';
            const brand: string = vm.genericConstant.brand;

            let _search: Object = {
                body: body,
                urlParams: [brand, method]
            };

            return vm.httpPost(apiUrl, _search, compName)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error.data;
                });
        }

        /**
         * @ngdoc method
         * @name #getEncryptUrlToken
         * @name getEncryptUrlToken.GetEncryptUrlTokenSrv
         * @returns {object} Devuelve una promesa con el response
         */
        getEncryptURLToken(emailAdress: string, nameFirst: string, nameLast: string, compName: string, refresh: boolean = false) {
            let vm = this;
            let apiUrl: string = vm.genericConstant.token;

            let _search: Object = {
                queryParams: {
                    p_userid: emailAdress,
                    p_passwd: '',
                    'p_email.addr': emailAdress,
                    'p_name.first': nameFirst,
                    'p_name.last': nameLast,
                    p_li_passwd: 'db846445891927ba',
                },
                urlParams: ['encryptUrlToken']
            };

            return vm.httpCacheGett(apiUrl, _search, compName, refresh)
                .then((successData) => {
                    return successData;
                },
                    (errorData) => {
                        return errorData;
                    })
                .catch(function (error) {
                    return error;
                });
        }

        /**
         * @ngdoc method
         * @name OrangeFeSARQ.Services.TokenSrv#getDocument
         * @memberOf OrangeFeSARQ.Services.TokenSrv
         * @param {string} docEncrypted El valor de la URL para descargar el documento encriptada
         * @param {string} compName Nombre del componente que realiza la llamada
         * @description
         * Consulta al API Token para obtener los datos del archivo especificado, mediante la entrada de
         * docEncrypted
         * @returns {ng.IPromise} Los datos del archivo en Base64, la configuración base y los datos de las
         * cabeceras de la respuesta 
         */
        getDocument(docEncrypted: string, compName: string): ng.IPromise<any>  {
            let vm = this;

            const apiUrl: string = vm.genericConstant.token;
            const METHOD: string = 'getDocumentByToken';

            let _search: Object = {
                urlParams: [METHOD],
                queryParams: {
                    encriptedUrl: docEncrypted
                }
            }

            return vm.httpCacheGett(apiUrl, _search, compName)
                .then( (response) => {
                    return response;
                })
                .catch( (error) => {
                    return error;
                });
        }

    }
    angular.module('tokenModule', [])
        .service('tokenSrv', OrangeFeSARQ.Services.TokenSrv);
}
