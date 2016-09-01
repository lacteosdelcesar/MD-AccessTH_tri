/**
 * Created by tav0 on 24/08/16.
 */

(function() {
    'use strict';

    angular
        .module('app.auth')
        .run(permissionRun);

    /* @ngInject */
    function permissionRun($rootScope, $state, PermRoleStore, authService, $log) {
        // si tengo el token, recargo el usuario
        authService.getCurrentUser();

        // create roles for app
        var roles = ['SUPERADMIN', 'A_RRHH', 'ENC_AREA', 'EMPL_ORD', 'EMPL_TEMP', 'EMPL_INACTIVO'];
        angular.forEach(roles, function (rol) {
            PermRoleStore.defineRole(rol, function (roleName) {
                return authService.hasPermission(roleName);
            });
        });

        ////////// watches

        // redirect all denied permissions to 401
        var deniedHandle = $rootScope.$on('$stateChangePermissionDenied', accessDenied);

        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', checkAuthenticated);

        // remove watch on destroy
        $rootScope.$on('$destroy', function() {
            deniedHandle();
            stateChangeStartEvent();
        });

        //////////

        // default redirect if access is denied
        function accessDenied() {
            $state.go('401');
        }

        function checkAuthenticated(event, to) {
            $log.info(to);
            if (to.data && to.data.permissions) {
                if (!authService.checkSession()) {
                    event.preventDefault();
                    $state.go('login');
                }
            }
        }
    }
})();
