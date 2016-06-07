(function() {
    'use strict';

    angular
        .module('gestion_usuarios')
        .controller('SincronizarController', SincronizarController);

    /* @ngInject */
    function SincronizarController($scope, Users, OneRequest, $mdDialog, Toast) {
        var vm = this;
        vm.query = {
            order: '-id',
            page: 1,
            limit: '10',
            filterUsername: filterUsername,
            filterRol: '',
            limitOptions: [10, 20, 50, 'Todo']
        };
        vm.filter = false;
        vm.promise;
        vm.getUsers = getUsers;
        vm.removeFilter = removeFilter;
        vm.resetPasword = resetPasword;

        ////////////////

        vm.getUsers();
        getRoles();
        $scope.$on('addUser', addUser);

        ////////////////

        function getUsers() {
            vm.promise = Users.getList();
            vm.promise.then(function(users){
                vm.users = users;
            });
        }
        function getRoles() {
            OneRequest.to('users/roles').then(function (roles) {
                vm.roles = roles;
            })
        }

        function filterUsername(user) {
            if(user.username.search(vm.query.search) === 0) return true;
            return false
        }

        function removeFilter() {
            vm.filter = false;
            vm.query.search = '';
        }

        function addUser($event) {
            $mdDialog.show({
                templateUrl: 'app/modules/superadmin/gestion_usuarios/add_user_dialog.tmpl.html',
                controller: 'DialogNewUserController',
                controllerAs: 'vm',
                targetEvent: $event,
                locals: {
                    roles: vm.roles
                }
            }).then(function(user) {
                Users.create(user).then(function (user) {
                    vm.users.push(user);
                    Toast.show('usuario registrado');
                }, function (err) {
                    console.log(err)
                    Toast.show('ha ocurrido un error');
                });
            });
        }

        function resetPasword($event, user) {
            $mdDialog.show(
                $mdDialog.confirm()
                    .title('Esta seguro de continuar?')
                    .textContent('se cambiara la contraseña actual del usuario por la contraseña por defecto')
                    .ariaLabel('reset-pasword')
                    .targetEvent($event)
                    .ok('Continuar')
                    .cancel('Cancelar')
            ).then(function() {
                vm.promise = user.customPUT(null, 'reset_password');
                vm.promise.then(function(){
                    Toast.show('contraseña de usuario cambiada');
                }, function(err) {
                    console.log(err)
                    Toast.show('ha ocurrido un error');
                });
            });
        };

    }
})();
