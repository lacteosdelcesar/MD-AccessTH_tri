(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'triangular',
            'ngAnimate', 'ngCookies', 'ngMessages', 'ngMaterial',
            'angularMoment', 'md.data.table', 'restangular',
            'permission', 'permission.ui',

            'seed-module',
            'app.error_pages',
            'app.auth',

            'superadmin',

            'home_empleados',
            'certificados',
            'quejas-y-reclamos',

            'empleados',
            'horas_extra',
            'reporte_novedades'
        ]);
})();
