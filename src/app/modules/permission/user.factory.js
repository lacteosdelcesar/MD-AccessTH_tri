(function() {
    'use strict';

    angular
        .module('app.permission')
        .factory('UserService', UserService);

    /* @ngInject */
    function UserService($q, $http, RoleStore, API, jwtHelper, $window) {
        var _currentUser;

        var service = {
            hasPermission: hasPermission,
            login: login,
            logout: logout,
            updatePassword: updatePassword,
            getToken: getToken,
            setToken: setToken,
            currentUser: currentUser
        };

        return service;

        ///////////////

        function hasPermission(permission) {
            var deferred = $q.defer();
            var role = currentUser().rol.nombre;
            var hasPermission = false;
            if(RoleStore.hasRoleDefinition(role)) {
                // get the role
                var roleDef = RoleStore.getRoleDefinition(role);
                // check if the permission we are validating is in this role's permissions
                if(-1 !== roleDef.permissionNames.indexOf(permission)) {
                    hasPermission = true;
                }
            }
            if(hasPermission) {
                deferred.resolve();
            }else {
                deferred.reject();
            }

            // return promise
            return deferred.promise;
        }

        function login (name, password) {
            var data = {'username': name, 'password': password};
            var defered = $q.defer();
            $http.post(API+'users/token', data)
                .then(function(response){
                    setToken(response.data.token);
                    defered.resolve(currentUser());
                }, function (error) {
                    defered.reject(error)
                });
            return defered.promise;
        }
        function logout() {
            sessionStorage.clear();
            _currentUser = undefined;
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

            function failure(error) {
                //logger.error('XHR Failed for getAvengers.' + error.data);
            }
        }

        function getToken(){
            return sessionStorage.getItem('jwt');
        }

        function setToken(jwt){
            sessionStorage.setItem('jwt', jwt);
        }

        function currentUser(){
            if(!_currentUser){
                var decodedJwt = jwtHelper.decodeToken(getToken());
                _currentUser = decodedJwt.user;
            }
            return _currentUser;
        }
    }
})();
