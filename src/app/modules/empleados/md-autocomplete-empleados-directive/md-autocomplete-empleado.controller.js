(function() {
    'use strict';

    angular
        .module('empleados')
        .controller('AutoCompleteEmpleadosController', AutoCompleteEmpleadosController);

    /* @ngInject */
    function AutoCompleteEmpleadosController($scope) {

        $scope.querySearch = querySearch;
        $scope.searchTextChange = searchTextChange;

        ////////////////

        function querySearch (query) {
            var lowercaseQuery = angular.lowercase(query);

            var filter = function (empleado) {
                var c1 = (angular.lowercase(empleado.cedula).indexOf(lowercaseQuery) >= 0);
                var c2 = (angular.lowercase(empleado.apellidos).indexOf(lowercaseQuery) >= 0);
                var c3 = (angular.lowercase(empleado.nombre).indexOf(lowercaseQuery) >= 0);
                return (c1 || c2 || c3);
            };

            return query ? $scope.empleados.filter(filter) : $scope.empleados;
        }

        function searchTextChange(text) {
            //$log.info('Text changed to ' + text);
        }
    }
})();