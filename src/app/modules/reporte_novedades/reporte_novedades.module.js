(function() {
    'use strict';

    angular
        .module('reporte_novedades', ['empleados'])
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('triangular.reporte_novedades', {
                url: '/reporte_novedades',
                templateUrl: 'app/modules/reporte_novedades/reporte_novedades.tmpl.html',
                controller: 'ReporteNovedadesController',
                controllerAs: 'vmp',
                data: {
                    permissions: {
                        only: ['ENC_AREA']
                    }
                }
            })
            .state('triangular.reporte_novedades.bonificaciones', {
                url: '/bonificaciones',
                templateUrl: 'app/modules/reporte_novedades/bonificaciones/bonificaciones.tmpl.html',
                controller: 'BonificacionesController',
                controllerAs: 'vm'
            })
            .state('triangular.reporte_novedades.viajes', {
                url: '/vajes',
                templateUrl: 'app/modules/reporte_novedades/viajes/viajes.tmpl.html',
                controller: 'ViajesController',
                controllerAs: 'vm'
            });

        triMenuProvider.addMenu({
            name: 'Reportar Novedades',
            icon: 'fa fa-calendar-check-o',
            type: 'link',
            priority: 2.2,
            state: 'triangular.reporte_novedades'
        });
    }
})();
