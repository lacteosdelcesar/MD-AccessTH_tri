/**
 * Created by tav0 on 24/08/16.
 */

(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('authService', UserService);

    /** @ngInject **/
    function UserService($q, PermRoleStore, jwtHelper, $http, API, $window) {
        var currentUser = null;

        var service = {
            getCurrentUser: getCurrentUser,
            checkSession: checkSession,
            refreshToken: refreshToken,
            login: login,
            logout: logout,
            updatePassword: updatePassword,
            hasPermission: hasPermission,
            getToken: getToken
        };

        return service;

        ///////////////

        function getCurrentUser() {
            if(!currentUser && sessionStorage.getItem('jwt')){
                return setToken(sessionStorage.getItem('jwt'));
            } else {
                return currentUser;
            }
        }

        function checkSession() {
            var jwt = sessionStorage.getItem('jwt');
            if(!jwt) return false;
            if(jwtHelper.isTokenExpired(jwt)) return 'expired';
            return true;
        }

        function refreshToken() {
            var deferred = $q.defer();
            var promisse = $http({
                url: API + 'new_token',
                skipAuthorization: true,
                method: 'GET',
                headers: {Authorization: 'Bearer ' + getToken()}
            });
            promisse.then(function (response) {
                sessionStorage.setItem('jwt', response.data.token);
                deferred.resolve(response.data.token);
            }, function () {
                sessionStorage.removeItem('jwt');
                deferred.reject();
            });
            return deferred.promise;
        }

        function login (name, password) {
            var data = {'username': name, 'password': password};
            var defered = $q.defer();
            $http.post(API+'users/token', data)
                .then(function(response){
                    setToken(response.data.token);
                    defered.resolve(currentUser);
                }, function (error) {
                    defered.reject(error);
                });
            return defered.promise;
        }

        function logout() {
            sessionStorage.clear();
            currentUser = undefined;
            $window.location.reload();
            //$state.go('authentication.login');
        }

        function updatePassword(data){
            return $http.post(API+'users/my/password', data)
                .then(succes)
                .catch(failure);

            function succes(response) {
                return response.data;
            }
            function failure() {
                //logger.error('XHR Failed for getAvengers.' + error.data);
            }
        }

        function hasPermission(roleDef) {
            var deferred = $q.defer();
            var hasPermission = false;

            // check if user has permission via its roles
            if(PermRoleStore.hasRoleDefinition(currentUser.rol)) {
                // check if the permission we are validating is in this role's permissions
                if(currentUser.rol == roleDef) {
                    hasPermission = true;
                }
            }

            // if we have permission resolve otherwise reject the promise
            if(hasPermission) {
                deferred.resolve();
            }
            else {
                deferred.reject();
            }

            // return promise
            return deferred.promise;
        }

        function setToken(jwt) {
            sessionStorage.setItem('jwt', jwt);
            currentUser = jwtHelper.decodeToken(jwt).user;
            currentUser.rol = currentUser.rol.nombre;
            return currentUser;
        }

        function getToken(){
            return sessionStorage.getItem('jwt');
        }
    }
})();
