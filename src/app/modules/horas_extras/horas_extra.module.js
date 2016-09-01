(function() {
    'use strict';

    angular
        .module('horas_extras', [])
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('triangular.horas_estra', {
                url: '/horas_extra',
                templateUrl: 'app/modules/horas_extras/horas_extras.tmpl.html',
                controller: 'HorasExtraController',
                controllerAs: 'vm',
                data: {
                    permissions: {
                        only: ['ENC_AREA']
                    }
                }
            });

        triMenuProvider.addMenu({
            name: 'Horas Extra',
            icon: 'fa fa-tree',
            type: 'link',
            priority: 3.2,
            state: 'triangular.horas_estra'
        });
    }
})();
