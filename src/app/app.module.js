(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router', 'permission',
            'triangular',
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial',
            'angularMoment', 'md.data.table', 'restangular',
            // 'seed-module',
            // uncomment above to activate the example seed module
            'common',
            'app.permission',
            'app.superadmin',
            'app.panel_empleados'
        ])

        // set a constant for the API we are connecting to
        .constant('API', 'http://mydev/lmn-untitledApi-K/public/api/');
})();
