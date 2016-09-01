(function() {
    'use strict';

    angular
        .module('app.error_pages', [])
        .config(config);

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state('404', {
                url: '/404',
                views: {
                    'root': {
                        templateUrl: 'app/modules/error_pages/404.tmpl.html',
                        controller: 'ErrorPageController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('401', {
                url: '/401',
                views: {
                    'root': {
                        templateUrl: 'app/modules/error_pages/401.tmpl.html',
                        controller: 'ErrorPageController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('500', {
                url: '/500',
                views: {
                    'root': {
                        templateUrl: 'app/modules/error_pages/500.tmpl.html',
                        controller: 'ErrorPageController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
