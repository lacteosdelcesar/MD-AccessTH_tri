(function() {
    'use strict';

    angular
        .module('app.permission.authentication')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
        .state('authentication', {
            abstract: true,
            views: {
                'root': {
                    templateUrl: 'app/modules/permission/authentication/layouts/authentication.tmpl.html'
                }
            },
            data : {
                noRequiresLogin: true
            }
        })
        .state('authentication.login', {
            url: '/login',
            templateUrl: 'app/modules/permission/authentication/login/login.tmpl.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .state('authentication.lock', {
            url: '/lock',
            templateUrl: 'app/modules/permission/authentication/lock/lock.tmpl.html',
            controller: 'LockController',
            controllerAs: 'vm'
        })
        .state('triangular.profile', {
            url: '/profile',
            templateUrl: 'app/modules/permission/authentication/profile/profile.tmpl.html',
            controller: 'ProfileController',
            controllerAs: 'vm'
        });
    }
})();
