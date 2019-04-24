module OrangeFeSARQ.Services {
    'use strict';

    export class getRolProfileSrv extends OrangeFeSARQ.Services.ParentService {
        static $inject = ['$injector'];
        public $scope;

        // Storage data
        private loginData;
        private rolesFFCC = new Array<String>();
        private rolesTLV = new Array<String>();
        private rolesPDV = new Array<String>();

        // Client
        private defaultSegment:string;
        private residencial:string = 'Residencial';
        private autonomo:string = 'Autonomo';

        constructor(public $injector) {
            super($injector);
            let vm = this;
            vm.setInjections($injector);
            vm.initService();
        }

        private setInjections($injector) {
            const vm = this;
            vm.$scope = $injector.get('$rootScope');
        }

        private initService() {
            let vm = this;
            vm.loginData = JSON.parse(sessionStorage.getItem('loginData'));
            vm.getRol();
        }

        /**
		 * @ngdoc method
		 * @name getRolProfile.Services:getRolProfileSrv#getRol
		 * @author David López Corbelle (dlopecor)
		 * @methodOf getRolProfile.Services:getRolProfileSrv
		 * @description
		 * Recoge los roles de la cabecera y genera el segmento por defecto
		 */
		private getRol() {
            let vm = this;
            
			if (OrangeFeSARQ.Controllers.ParentController.shared
				&& OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore
				&& OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.listModule) {
				OrangeFeSARQ.Controllers.ParentController.shared.headerFooterStore.listModule.forEach(element => {
					if (element.compId === 'header_block_comp' && element.listOption) {
						this.setRol(element.listOption);
					}
				});
			}

			// Comprobación Rol
			vm.defaultSegment = _.includes(vm.rolesFFCC, vm.loginData.rol) ? vm.autonomo : vm.residencial;
		}

		/**
		 * @ngdoc method
		 * @name getRolProfile.Services:getRolProfileSrv#setRol
		 * @author David López Corbelle (dlopecor)
		 * @methodOf getRolProfile.Services:getRolProfileSrv
		 * @description
		 * Setea los valores de las listas de roles para el componente
		 */
		private setRol(lista){
			let vm = this;
			lista.forEach(option => {
				if (option.name === 'defaultFFCC' && option.listOptionsLiteral) {
					if (_.size(option.listOptionsLiteral) !== 0) {
						option.listOptionsLiteral.forEach(literal => {
							vm.rolesFFCC.push(literal.value);
						});
					}
				} else if (option.name === 'defaultTLV' && option.listOptionsLiteral) {
					if (_.size(option.listOptionsLiteral) !== 0) {
						option.listOptionsLiteral.forEach(literal => {
							vm.rolesTLV.push(literal.value);
						});
					}
                } else if (option.name === 'defaultPDV' && option.listOptionsLiteral) {
					if (_.size(option.listOptionsLiteral) !== 0) {
						option.listOptionsLiteral.forEach(literal => {
							vm.rolesPDV.push(literal.value);
						});
					}
				}
			});
		}
		
		/**
		* @ngdoc method
		* @name getRolProfile.Services:getRolProfileSrv#isRolFFCC
		* @author David López Corbelle (dlopecor)
		* @methodOf getRolProfile.Services:getRolProfileSrv
		* @description
		* Comprueba si el rol pertenece a FFCC
		*/
	    public isRolFFCC():boolean {
			let vm = this;

			if (_.includes(vm.rolesFFCC, vm.loginData.rol)) {
				return true;
			} else {
                return false;
            }
        }

		/**
		* @ngdoc method
		* @name getRolProfile.Services:getRolProfileSrv#isRolTLV
		* @author David López Corbelle (dlopecor)
		* @methodOf getRolProfile.Services:getRolProfileSrv
		* @description
		* Comprueba si el rol pertenece a TLV
		*/
		public isRolTLV():boolean {
			let vm = this;

			if (_.includes(vm.rolesTLV, vm.loginData.rol)) {
				return true;
			} else {
                return false;
            }
        }
        
        /**
		* @ngdoc method
		* @name getRolProfile.Services:getRolProfileSrv#isRolPDV
		* @author David López Corbelle (dlopecor)
		* @methodOf getRolProfile.Services:getRolProfileSrv
		* @description
		* Comprueba si el rol pertenece a PDV
		*/
		public isRolPDV():boolean {
			let vm = this;

			if (_.includes(vm.rolesPDV, vm.loginData.rol)) {
				return true;
			} else {
                return false;
            }
        }

        /**
		* @ngdoc method
		* @name getRolProfile.Services:getRolProfileSrv#getDefaultSegment
		* @author David López Corbelle (dlopecor)
		* @methodOf getRolProfile.Services:getRolProfileSrv
		* @description
		* Comprueba si el rol pertenece a PDV
		*/
		public getDefaultSegment():string {
            let vm = this;
            return vm.defaultSegment;
        }
    }

    // Registration
    angular.module('getRolProfileSrv', []).service('getRolProfileSrv', OrangeFeSARQ.Services.getRolProfileSrv);
}
