(function() {
    'use strict';

    angular
        .module('horas_extra')
        .controller('HorasExtraController', HorasExtraController);

    /* @ngInject */
    function HorasExtraController(OneRequest) {
        var vm = this;
        vm.hlaboradas = [];
        vm.query = {
            order: 'empleado.nombre',
            page: 1,
            limit: '10',
            limitOptions: [10, 20, 50, 'Todo']
        };
        vm.filter = false;

        vm.removeFilter = removeFilter;
        vm.minToHour = minToHour;

        ////////////////

        getEmpleados();

        ////////////////

        function getEmpleados() {
            vm.promise = OneRequest.to('hlaboradas');
            vm.promise.then(function(hlaboradas){
                vm.hlaboradas = hlaboradas;
            });
        }

        function removeFilter() {
            vm.filter = false;
            vm.query.search = '';
        }

        function minToHour(min){
            var h = min/60;
            return (h % 1 != 0) ? (h).toFixed(2) : h;
        }

    }
})();
