/**
 * Created by tav0 on 25/05/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($httpProvider, jwtOptionsProvider, RestangularProvider, DOMAIN_API, API) {

        jwtOptionsProvider.config({
            whiteListedDomains: [DOMAIN_API],
            tokenGetter: tokenGetter
        });

        $httpProvider.interceptors.push('jwtInterceptor');

        RestangularProvider.setBaseUrl(API);

        RestangularProvider.addResponseInterceptor(parseApiResponse);

        /////////

        function parseApiResponse(data) {
            var response = data;

            if (data.data) {
                response = data.data;
                delete data.data;
                response.metadata = data;
            }

            return response;
        }

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
