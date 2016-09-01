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
        vm.getUsers = getUsers;
        vm.removeFilter = removeFilter;
        vm.resetPasword = resetPasword;

        ////////////////

        vm.getUsers();
        getRoles();
        $scope.$on('addUser', addUser);
        $scope.$on('syncUsers', syncUsers);

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
            });
        }

        function filterUsername(user) {
            return user.username.search(vm.query.search) === 0;

        }

        function removeFilter() {
            vm.filter = false;
            vm.query.search = '';
        }

        function addUser($event) {
            $mdDialog.show({
                templateUrl: 'app/modules/superadmin/gestion_usuarios/add_user/add_user_dialog.tmpl.html',
                controller: 'DialogNewUserController',
                controllerAs: 'vm',
                targetEvent: $event,
                locals: {
                    roles: vm.roles
                }
            }).then(function(user) {
                Users.create(user).then(function (user) {
                    vm.users.push(user);
                    Toast('usuario registrado');
                }, function () {
                    Toast('ha ocurrido un error');
                });
            });
        }

        function resetPasword($event, user) {
            $mdDialog.show(
                $mdDialog.confirm()
                    .title('Esta seguro de continuar?')
                    .textContent('Se cambiara la contraseña actual del usuario por la contraseña por defecto')
                    .ariaLabel('reset-pasword')
                    .targetEvent($event)
                    .ok('Continuar')
                    .cancel('Cancelar')
            ).then(function() {
                vm.promise = user.customPUT(null, 'reset_password');
                vm.promise.then(function(){
                    Toast('contraseña de usuario cambiada');
                }, function() {
                    Toast('ha ocurrido un error');
                });
            });
        }

        function syncUsers($event) {
            $mdDialog.show({
                templateUrl: 'app/modules/superadmin/gestion_usuarios/sync/sync_dialog.tmpl.html',
                controller: 'DialogSyncUserController',
                controllerAs: 'vm',
                targetEvent: $event
            }).then(function() {
                getUsers();
            });
        }

    }
})();
