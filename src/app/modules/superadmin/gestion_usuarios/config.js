(function() {
    'use strict';

    angular
        .module('gestion_usuarios')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('triangular.superadmin_sync', {
                url: '/sync_up',
                views: {
                    '@triangular': {
                        templateUrl: 'app/modules/superadmin/gestion_usuarios/index_users.tmpl.html',
                        controller: 'SincronizarController',
                        controllerAs: 'vm',
                    },
                    'belowContent@triangular': {
                        templateUrl: 'app/modules/superadmin/gestion_usuarios/fab_controls/fab-button.tmpl.html',
                        controller: 'FabController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    permissions: {
                        only: ['SUPERADMIN']
                    },
                    layout: {
                        sideMenuSize: 'hidden'
                    }
                }
            });

        triMenuProvider.addMenu({
            name: 'Gestionar Usuarios',
            icon: 'zmdi zmdi-accounts',
            type: 'link',
            priority: 10.0,
            state: 'triangular.superadmin_sync',
            permission: 'gestion_usuarios'
        });
    }
})();
