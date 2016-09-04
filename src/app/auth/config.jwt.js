/**
 * Created by tav0 on 25/05/16.
 */

(function() {
    'use strict';

    angular
        .module('app.auth')
        .config(config);

    /** @ngInject */
    function config($httpProvider, jwtOptionsProvider) {

        jwtOptionsProvider.config({
            whiteListedDomains: ['localhost'],
            tokenGetter: tokenGetter
        });

        $httpProvider.interceptors.push('jwtInterceptor');

        /////////

        /** @ngInject */
        function tokenGetter(options, authService, API) {
            var jwt = authService.getToken();
            if (jwt && options.url.indexOf(API) === 0) {
                if (!authService.checkSession()) {
                    authService.refreshToken().then(function (jwt) {
                        return jwt;
                    }, function () {
                        return null;
                    });
                } else {
                    return jwt;
                }
            }
        }
    }
})();
