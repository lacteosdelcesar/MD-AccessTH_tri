(function() {
    'use strict';

    angular
        .module('app.panel_empleados')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider, triLayoutProvider) {

        triLayoutProvider.setDefaultOption('sideMenuSize', 'full');

        $stateProvider
        .state('triangular.solicitudes-empl-inicio', {
            url: '/mypanel',
            templateUrl: 'app/modules/panel_empleados/inicio.tmpl.html',
            controller: 'PanelEmpleadosController',
            controllerAs: 'vm',
            data: {
                permissions: {
                    only: 'panelEmpleados'
                }
            }
        })

        triMenuProvider.addMenu({
            name: 'Inicio',
            icon: 'zmdi zmdi-home',
            type: 'link',
            priority: 0.0,
            state: 'triangular.solicitudes-empl-inicio',
            permission: 'panelEmpleados'
        });
    }
})();
