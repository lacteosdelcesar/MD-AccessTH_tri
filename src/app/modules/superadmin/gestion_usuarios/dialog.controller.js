(function() {
    'use strict';

    angular
        .module('gestion_usuarios')
        .controller('DialogNewUserController', DialogNewUserController);

    /* @ngInject */
    function DialogNewUserController($mdDialog, roles) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.user = {};

        /////////////////////////
        vm.roles = _.filter(roles, function (rol) {
            if(['A_RRHH', 'ENC_AREA'].indexOf(rol.nombre) >= 0) return true;
        });
        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.user);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
