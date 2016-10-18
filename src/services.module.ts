module OrangeFeSARQ.Constant {
    'use strict';

    angular.module('servicesCommons')
        .service('userSrv', OrangeFeSARQ.Services.UserSrv)
        .service('utils', OrangeFeSARQ.Services.Utils)
        .service('vapListSrv', OrangeFeSARQ.Services.VapListSrv)
        .service('amortizationSrv', OrangeFeSARQ.Services.AmortizationSrv)
        .service('contractsSrv', OrangeFeSARQ.Services.ContractsSrv)
        .service('tmcodeTranslateSrv', OrangeFeSARQ.Services.TmCodeTranslateSrv)
}