(function() {
    'use strict';

    angular
        .module('app.permission.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController(UserService, $mdDialog) {
        var vm = this;
        vm.user = {};

        vm.updatePaswword = updatePaswword;

        function updatePaswword(){
            var user = UserService.currentUser();
            var data= {
                id_user: user.id,
                password: vm.user.current,
                new_password: vm.user.password,
                username: user.nombre
            }
            UserService.updatePassword(data).then(
                function(response){
                    if(response) {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .title('')
                                .content('su contraseña ha sido actualizada')
                                .ariaLabel('alert dialog contraseña actualizada')
                                .ok('aceptar')
                        );
                        vm.user = {};
                    } else {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .content('La contraseña actual ingresada no coincide con su contraseña real')
                                .ariaLabel('alert dialog contraseña error')
                                .ok('aceptar')
                        )
                        vm.user = {};
                    }
                }
            );
        }
    }
})();
