(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, triSettings, authService, triLoaderService) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.triSettings = triSettings;

        vm.logError = false;
        vm.mensajeError = '';
        // create blank user variable for login form
        vm.user = {
            email: '',
            password: ''
        };

        ////////////////

        if (authService.getCurrentUser()) {
            redirectRoles(authService.getCurrentUser().rol);
        }

        ////////////////

        function loginClick() {
            triLoaderService.setLoaderActive(true);
            authService.login(vm.user.email, vm.user.password).then(success, fail);
            function success(user) {
                triLoaderService.setLoaderActive(false);
                redirectRoles(user.rol);
            }
            function fail(error) {
                triLoaderService.setLoaderActive(false);
                vm.logError = true;
                switch (error.status) {
                    case 401:
                        vm.mensajeError = 'Nombre de usuario o contraseña incorrecta';
                        break;
                    case -1:
                        vm.mensajeError = 'No es posible conectarse con el servidor';
                        break;
                    default:
                        vm.mensajeError = 'A ocurrido un erro inesperado';
                }
            }
        }

        function redirectRoles(rol) {
            if (rol == 'EMPL_ORD' || rol == 'EMPL_INACTIVO' || rol == 'EMPL_TEMP') {
                $state.go('triangular.solicitudes-empl-inicio');
            } else if (rol == 'ENC_AREA') {
                $state.go('triangular.reporte_novedades');
            } else if (rol == 'A_RRHH') {
                $state.go('triangular.quejas-y-reclamos-listado-actuales');
            } else if (rol == 'SUPERADMIN') {
                $state.go('triangular.superadmin_sync');
            }
        }
    }
})();
