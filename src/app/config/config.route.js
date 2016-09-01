(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        // set default routes when no path specified
        $urlRouterProvider.when('/', '/login');

        // always goto 404 if route not found
        $urlRouterProvider.otherwise('/404');

        $urlRouterProvider.rule(function($injector, $location) {

            var path = $location.path();
            var hasTrailingSlash = path[path.length-1] === '/';

            if(hasTrailingSlash) {

                //if last charcter is a slash, return the same url without the slash
                var newPath = path.substr(0, path.length - 1);
                return newPath;
            }

        });
    }
})();
