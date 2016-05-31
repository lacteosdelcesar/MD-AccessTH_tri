(function() {
    'use strict';

    angular
        .module('app.panel_empleados')
        .controller('PanelEmpleadosController', PanelEmpleadosController);

    /* @ngInject */
    function PanelEmpleadosController() {
        var vm = this;
        vm.testData = ['triangular', 'is', 'great'];
    }
})();
