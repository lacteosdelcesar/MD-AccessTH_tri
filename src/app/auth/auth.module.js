(function ()
{
    'use strict';

    angular
        .module('app.auth', ['angular-jwt'])
        .config(config);

    /** @ngInject */
    function config($stateProvider){
        $stateProvider
            .state('authentication', {
                abstract: true,
                views: {
                    'root': {
                        templateUrl: 'app/auth/auth-layout.tmpl.html'
                    }
                }
            })
            .state('login', {
                parent: 'authentication',
                url: '/login',
                templateUrl: 'app/auth/login/login.tmpl.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('lock', {
                parent: 'authentication',
                url: '/lock',
                templateUrl: 'app/auth/lock/lock.tmpl.html',
                controller: 'LockController',
                controllerAs: 'vm'
            })
            .state('profile', {
                parent: 'triangular',
                url: '/profile',
                templateUrl: 'app/auth/profile/profile.tmpl.html',
                controller: 'ProfileController',
                controllerAs: 'vm'
            });
    }

})();
