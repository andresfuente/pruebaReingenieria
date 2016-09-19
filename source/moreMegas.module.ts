module moreMegas {
    'use strict';

    angular.module('moreMegas', [])
        .component('moreMegasComp', new moreMegas.Components.MoreMegasComp())
        .controller('moreMegasCtrl', moreMegas.Controllers.MoreMegasCtrl)

}
