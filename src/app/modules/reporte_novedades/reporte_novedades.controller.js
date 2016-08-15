(function() {
    'use strict';

    angular
        .module('app.reporte_novedades')
        .controller('ReporteNovedadesController', ReporteNovedadesController);

    /* @ngInject */
    function ReporteNovedadesController($scope, $state) {
        var vm = this;

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
    }
})();