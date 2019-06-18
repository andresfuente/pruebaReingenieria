module OrangeFeSARQ.Constant {
    'use strict';

    angular.module('literalConstant', [])
        .constant('literalConstant', {

            //aPIS         

            d3StackedChart: {
                nodata: "No hay datos para mostrar"
            },
            lineList: {
                contractType: {
                    FIXED: 'FIXED',
                    POSPAGO: 'POSPAGO',
                    PREPAGO: 'PREPAGO'
                }
            }
        });
}
