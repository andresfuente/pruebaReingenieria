// Injecciones necesarias para el Parent Controller
function includeDeps() {    
    angular.mock.module('ngComponentRouter');
    angular.mock.module('servicesCommons');

    // Comps
    // angular.mock.module('notificationCenter');
    // angular.mock.module('popup');
    // angular.mock.module('spinnerBlock');

    // Libs
    angular.mock.module('genericConstant');
    angular.mock.module('literalConstant');

    // Arq
    angular.mock.module('AppConfigManager');
    angular.mock.module('orange-arq-common');
}

function prepareTest(vm, params: any[], functions: any[]) {
    for (let p of params) {
        vm[p.property] = p.value;
    }
    for (let f of functions) {
        if (!f.params) {
            vm[f.name]();
        } else {
            vm[f.name](this, Array.prototype.slice.call(f.params, 0));

        }
    }
}
