module OrangeFeSARQ.Services {
    'use strict';

    // TODO: Añadir los métodos necesario aquí para poder referenciar desde los inyectores
    export interface IApiOrchestatorSrv {

    }

    export class ApiOrchestatorSrv implements IApiOrchestatorSrv {
        private orangeModelMapper = {};
        private pendingOperations = {};

        static $inject = ['$http']

        constructor(private $http: ng.IHttpService) {
            // Manuel debug
            window['orangeModelMapper'] = this.orangeModelMapper;
            window['pendingOperations'] = this.pendingOperations;
        }

        get = (tag: string, url: string, cb: Function) => {
            if(this.existsDataModel(tag)) {
                console.log('Existe ya el modelo...');
                cb(null, { name: 'Sema', surname: 'Garcia'});
            } else {
                console.log('No existe aún el modelo...');
                if(this.isPendingOperation(tag)) {
                    console.log('Espera, que ya estoy yendo a por él');
                    this.pendingOperations[tag].push(cb);
                } else {
                    console.log('No, no lo tengo... pero te lo traigo');
                    // Si no existe, es el primero en meterlo
                    this.pendingOperations[tag] = [cb];

                    // Una vez añadido, llamamos para traerlo
                    this.$http.get(url).then(
                        (response) => {
                            console.log('DataOK: ', response);
                            // Almacenamos el modelo
                            this.orangeModelMapper[tag] = (response.data);

                            // Llamamos a los callbacks y desencolamos
                            _.each(this.pendingOperations[tag], (callback) => {
                                callback(null, this.orangeModelMapper[tag]);
                            });
                        },
                        (error) => {
                            console.log('DataKO: ', error);
                        }
                    ).finally(() => {
                        console.log('Desencolando ' + tag + '...');

                        // Revisar si esto es eficiente
                        // Quitamos las peticiones pendientes pq ya han sido servidas
                        this.pendingOperations[tag] = [];  // = null;
                    });
                }
            }
        }

        existsDataModel = (tag: string): boolean => {
            return _.has(this.orangeModelMapper, tag);
        };

        isPendingOperation = (tag: string): boolean => {
            return _.has(this.pendingOperations, tag);
        };
    }

    // Registration
    angular.module('orchestator', [])
        .service('apiOrchestatorSrv', ApiOrchestatorSrv);

}
