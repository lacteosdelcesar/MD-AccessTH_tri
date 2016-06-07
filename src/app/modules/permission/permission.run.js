(function() {
    'use strict';

    angular
        .module('app.permission')
        .run(permissionRun);


    function permissionRun($rootScope, jwtHelper, $state, RoleStore, UserService) {

        const roles = [
            ['SUPERADMIN', ['gestion_usuarios']],
            ['A_RRHH', ['verQuejas']],
            ['EMPL_ORD', ['panelEmpleados', 'certificados', 'newQueja', 'crtSinSlr', 'crtSlrBasico', 'crtSlrPromedio']],
            ['EMPL_TEMP', ['panelEmpleados', 'newQueja']],
            ['EMPL_INACTIVO', ['panelEmpleados', 'certificados', 'crtSinSlr']]
        ].map(function (rol) {
            RoleStore.defineRole(rol[0], rol[1], checkRole);
        });


        ///////////////////////

        // default redirect if access is denied
        function accessDenied() {
            $state.go('401');
        }

        // function that calls user service to check if permission is allowed
        function checkRole(permission, transitionProperties) {
            return UserService.hasPermission(permission, transitionProperties);
        }

        // watches

        // redirect all denied permissions to 401
        var deniedHandle = $rootScope.$on('$stateChangePermissionDenied', accessDenied);

        // remove watch on destroy
        $rootScope.$on('$destroy', function() {
            deniedHandle();
        });

        $rootScope.$on('$stateChangeStart', function(e, to) {
            if (!to.data || !to.data.noRequiresLogin || to.data.noRequiresLogin == false) {
                var jwt = UserService.getToken();
                if (!jwt || jwtHelper.isTokenExpired(jwt)) {
                    e.preventDefault();
                    $state.go('authentication.login');
                }
            }
        });
    }
})();
