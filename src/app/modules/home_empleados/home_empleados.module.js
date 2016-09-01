(function() {
    'use strict';

    angular
        .module('home_empleados', [])
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider, triLayoutProvider) {

        triLayoutProvider.setDefaultOption('sideMenuSize', 'full');

        $stateProvider
            .state('triangular.solicitudes-empl-inicio', {
                url: '/mypanel',
                templateUrl: 'app/modules/home_empleados/inicio.tmpl.html',
                controller: 'PanelEmpleadosController',
                controllerAs: 'vm',
                data: {
                    permissions: {
                        only: ['EMPL_ORD', 'EMPL_TEMP', 'EMPL_INACTIVO']
                    }
                }
            });

        triMenuProvider.addMenu({
            name: 'Inicio',
            icon: 'zmdi zmdi-home',
            type: 'link',
            priority: 0.0,
            state: 'triangular.solicitudes-empl-inicio'
        });
    }
})();
