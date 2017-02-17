module OrangeFeSARQ.Services {
    'use strict';

    export class ActivationAndConfigurationSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        private urlActivationAndConfiguration: string;
        private brand: string;
        private requestModel: OrangeFeSARQ.Models.GetActivationAndConfigurationModel;
        private responseModel: OrangeFeSARQ.Models.SetActivationAndConfigurationModel;

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.urlActivationAndConfiguration = vm.genericConstant.activationAndConfiguration;
            vm.brand = vm.genericConstant.brand;
            vm.setInjections($injector);
        }

        setInjections($injector) {
            let vm = this;
            vm.genericConstant = $injector.get('genericConstant');
        }

        getData(msisdn: string, queryType: string, lineCategory: string, segment:string = '', componentName: string = 'row_switch_services'): ng.IPromise <OrangeFeSARQ.Models.GetActivationAndConfigurationModel> {
            let vm = this;
            let _search: Object = {
                queryParams: {
                    queryType: queryType,
                    lineCategory: lineCategory,
                    segment: segment
                },
                urlParams: [vm.brand, 'service', msisdn]
            };

            return vm.httpCacheGett(vm.urlActivationAndConfiguration, _search, componentName)
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
        
        changeStateService(data: OrangeFeSARQ.Models.SetActivationAndConfigurationModel, componentName = 'row_switch_services'): ng.IPromise <OrangeFeSARQ.Models.SetActivationAndConfigurationModel>  {
            let vm = this;
            
            let _search: Object = {
                queryParams: data,
                urlParams: [vm.brand, 'service']
            };
            //Llamada al post con la url +  datos + url para descachear
            return vm.httpPost(vm.urlActivationAndConfiguration, _search, componentName)
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    return error;
                });
        }
    }
}