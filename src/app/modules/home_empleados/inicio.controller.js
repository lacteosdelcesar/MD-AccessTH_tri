(function() {
    'use strict';

    angular
        .module('home_empleados')
        .controller('PanelEmpleadosController', PanelEmpleadosController);

    /* @ngInject */
    function PanelEmpleadosController() {
        var vm = this;
        vm.testData = ['triangular', 'is', 'great'];
    }
})();
