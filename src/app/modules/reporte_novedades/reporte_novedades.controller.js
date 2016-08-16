(function() {
    'use strict';

    angular
        .module('app.reporte_novedades')
        .controller('ReporteNovedadesController', ReporteNovedadesController);

    /* @ngInject */
    function ReporteNovedadesController($scope, $state) {
        var vm = this;

        vm.query = {
            order: 'empleado.apellidos',
            filter: filter,
            search: ''
        };

        vm.removeFilter = removeFilter;

        ////////////////

        $scope.$watch('selectedTab', function(current, old) {
            switch (current) {
                case 0:
                    $state.go("triangular.reporte_novedades.bonificaciones");
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
            }
        });

        ////////////////

        function filter(item) {
            var empleado = item.empleado;
            var lowercaseQuery = angular.lowercase(vm.query.search);
            var c1 = (angular.lowercase(empleado.cedula).indexOf(lowercaseQuery) >= 0);
            var c2 = (angular.lowercase(empleado.apellidos).indexOf(lowercaseQuery) >= 0);
            var c3 = (angular.lowercase(empleado.nombre).indexOf(lowercaseQuery) >= 0);
            return (c1 || c2 || c3);
        }

        function removeFilter() {
            vm.filter = false;
            vm.query.search = '';
        }
    }
})();