(function() {
    'use strict';

    angular
        .module('quejas-y-reclamos')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('triangular.quejas-y-reclamos-interponer', {
                url: '/quejas_y_reclamos',
                templateUrl: 'app/modules/quejas-y-reclamos/nueva-queja.tmpl2.html',
                controller: 'NuevaQuejaController',
                controllerAs: 'vm',
                data: {
                    permissions: {
                        only: 'newQueja'
                    }
                }
            })
            .state('triangular.quejas-y-reclamos-listado-actuales', {
                url: '/lista_quejas_y_reclamos',
                templateUrl: 'app/modules/quejas-y-reclamos/lista-quejas.tmpl.html',
                controller: 'ListaQuejasController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        contentClass: 'triangular-non-scrolling',
                        sideMenuSize: 'icon',
                        footer: false
                    },
                    permissions: {
                        only: 'verQuejas'
                    }
                }
            })
            .state('triangular.quejas-y-reclamos-listado-actuales.responder', {
                url: '/:quejaId',
                templateUrl: 'app/modules/quejas-y-reclamos/responder-queja.tmpl.html',
                controller: 'ResponderQuejaController',
                controllerAs: 'vm'
            });

        triMenuProvider.addMenu({
                name: 'Tengo una queja',
                icon: 'zmdi zmdi-comment-alert',
                type: 'link',
                priority: 2.1,
                state: 'triangular.quejas-y-reclamos-interponer',
                permission: 'newQueja'
            });
        triMenuProvider.addMenu({
                name: 'Quejas y Reclamos',
                icon: 'zmdi zmdi-comment-alert',
                type: 'link',
                priority: 2.1,
                state: 'triangular.quejas-y-reclamos-listado-actuales',
                permission: 'verQuejas'
            });
    }
})();
