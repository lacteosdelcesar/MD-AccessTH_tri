(function() {
    'use strict';

    angular
        .module('app.reporte_novedades')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.reporte_novedades', {
            url: '/reporte_novedades',
            templateUrl: 'app/modules/reporte_novedades/reporte_novedades.tmpl.html',
            // controller: 'SeedPageController',
            // controllerAs: 'vm',
            data: {
                permissions: {
                    only: 'reporteNovedades'
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'Reportar Novedades',
            icon: 'fa fa-tree',
            type: 'link',
            priority: 2.2,
            state: 'triangular.reporte_novedades',
            permission: 'reporteNovedades'
        });
    }
})();
