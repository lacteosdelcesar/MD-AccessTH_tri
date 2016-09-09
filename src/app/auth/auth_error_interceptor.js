/**
 * Created by tav0 on 9/09/16.
 */

(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('authErrorInterceptor', authErrorInterceptor);

    /** @ngInject **/
    function authErrorInterceptor($q, $window) {
        return {
            responseError: responseError
        }

        function responseError(rejection) {
            if(rejection.status === 401 && rejection.url.search('/login') === -1){
                sessionStorage.clear();
                $window.location.reload();
                return;
            }
            return $q.reject(rejection);
        }
    }
})();
