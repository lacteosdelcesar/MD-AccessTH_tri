(function() {
    'use strict';

    angular
        .module('certificados')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('triangular.certificados-slr-basico', {
                url: '/certificados/salario_basico',
                templateUrl: 'app/modules/certificados/certificados.tmpl.html',
                controller: 'CertificadoController',
                controllerAs: 'vm',
                resolve: {tipo: function(){return 2}},
                data: {
                    permissions: {
                        only: ['EMPL_ORD']
                    }
                }
            })
            .state('triangular.certificados-slr-promedio', {
                url: '/certificados/salario_promedio',
                templateUrl: 'app/modules/certificados/certificados.tmpl.html',
                controller: 'CertificadoController',
                controllerAs: 'vm',
                resolve: {tipo: function(){return 3}},
                data: {
                    permissions: {
                        only: ['EMPL_ORD']
                    }
                }
            })
            .state('triangular.certificados-no-slr', {
                url: '/certificados/no_salario',
                templateUrl: 'app/modules/certificados/certificados.tmpl.html',
                controller: 'CertificadoController',
                controllerAs: 'vm',
                resolve: {tipo: function(){return 1}},
                data: {
                    permissions: {
                        only: ['EMPL_ORD', 'EMPL_INACTIVO']
                    }
                }
            });

        triMenuProvider.addMenu({
            name: 'Certificados',
            icon: 'zmdi zmdi-collection-text',
            type: 'dropdown',
            priority: 1.1,
            permission: 'certificados',
            children: [
                {name: 'Sin Salario',
                    state: 'triangular.certificados-no-slr',
                    type: 'link',
                    permission: 'crtSinSlr'
                },
                {name: 'Salario Básico',
                    state: 'triangular.certificados-slr-basico',
                    type: 'link',
                    permission: 'crtSlrBasico'
                },
                {name: 'Salario Promedio',
                    state: 'triangular.certificados-slr-promedio',
                    type: 'link',
                    permission: 'crtSlrPromedio'
                }
            ]
        });
    }
})();
