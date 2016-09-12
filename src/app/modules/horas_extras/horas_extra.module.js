(function() {
    'use strict';

    angular
        .module('horas_extra', [])
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('triangular.horas_extra', {
                url: '/horas_extra',
                templateUrl: 'app/modules/horas_extras/horas_extras.tmpl.html',
                controller: 'HorasExtraController',
                controllerAs: 'vm',
                data: {
                    permissions: {
                        only: ['ENC_AREA']
                    }
                }
            })
            .state('triangular.diadia', {
                url: '/horas_extra/diadia',
                templateUrl: 'app/modules/horas_extras/diadia/jornadas.tmpl.html',
                controller: 'JornadasController',
                controllerAs: 'vm',
                params: { empleado: null },
                data: {
                    permissions: {
                        only: ['ENC_AREA']
                    }
                }
            })
            .state('triangular.diadia_empleado', {
                url: '/horas_extra/diadia_empleado',
                templateUrl: 'app/modules/horas_extras/diadia/de_empleado/diadia_empleado.tmpl.html',
                controller: 'DiadiaController',
                controllerAs: 'vm',
                params: { empleado: null },
                data: {
                    permissions: {
                        only: ['ENC_AREA']
                    }
                }
            });

        triMenuProvider.addMenu({
            name: 'Horas Extra',
            icon: 'fa fa-clock-o',
            type: 'link',
            priority: 3.2,
            state: 'triangular.horas_extra'
        });
    }
})();
