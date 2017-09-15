module OrangeFeSARQ.Services {
    export class NationalitiesService extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private nationalitiesAPIUrl: string;

        constructor($injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
            // getListValue/listName/nacionalidades
        }

        setInjections($injector) {
            let vm = this;
        }

        getNationalities(componentName: string = 'prescoringComp') {
            let vm = this;
            vm.nationalitiesAPIUrl = vm.genericConstant.getNacionalidades;
            let _search: Object = {
                queryParams: {
                },
                urlParams: ['getListValue', 'listName', 'nacionalidades']
            };

            return vm.httpCacheGett(vm.nationalitiesAPIUrl, _search, componentName)
                .then(function (response) {
                    return response.data.response;
                })
                .catch(function (error) {
                    throw error.data;
                });
        }

        setOffer(msisdn: string, ospIDtype: string, ospId: string, origin: string, dest: string, compName: string) {
            let vm = this;
            let apiUrl: string = vm.genericConstant.changeOffer;
            let brand: string = vm.genericConstant.brand;
            let method = 'changeOffer';

            let request = {
                'telefono': msisdn,
                'tipoDoc': ospIDtype,
                'doc': ospId,
                'codOfertaOrigen': origin,
                'codPromoOrigen': '0',
                'codOfertaDestino': dest,
                'codPromoDestino': '0',
            };
            // request.contractType = contractType;

            let _search: Object = {
                body: request,
                queryParams: {},
                urlParams: [brand, method, msisdn]
            };

            return vm.httpPostFull(apiUrl, _search, compName)
                .then((successData) => {
                    if (successData.data && successData.data) {
                        return successData.data;
                    }
                    throw successData.data.error;
                })
                .catch((errorData) => {
                    throw errorData.data;
                });
        }
    }
}
