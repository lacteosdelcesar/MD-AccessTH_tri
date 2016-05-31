/**
 * Created by tav0 on 25/05/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config(jwtInterceptorProvider, $httpProvider, API) {
        jwtInterceptorProvider.tokenGetter = tokenGetter;

        $httpProvider.interceptors.push('jwtInterceptor');

        function tokenGetter(config, UserService) {
            var jwt = UserService.getToken();
            if(jwt && config.url.indexOf(API) === 0){
                return jwt;
            }
        }
    }
})();

