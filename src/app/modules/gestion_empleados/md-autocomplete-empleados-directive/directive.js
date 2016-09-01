(function() {
    'use strict';

    angular.module('empleados')
        .directive('mdAutoCompleteEmpleados', MdAutoCompleteEmpleados);

    function MdAutoCompleteEmpleados() {
        return {
            restrict: 'AE',
            templateUrl: 'app/modules/gestion_empleados/md-autocomplete-empleados-directive/md-autocomplete-empleado.tmpl.html',
            controller: 'AutoCompleteEmpleadosController',
            controllerAs: 'vm',
            scope:{
                selectedEmpleado: '=?',
                empleados: '=',
                searchText: '=?',
                selectedChange: '&',
                placeholder: '@'
            }
        };
    }
})();
