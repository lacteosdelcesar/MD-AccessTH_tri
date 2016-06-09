(function() {
    'use strict';

    angular
        .module('gestion_usuarios')
        .controller('DialogSyncUserController', DialogSyncUserController);

    /* @ngInject */
    function DialogSyncUserController($mdDialog, OneRequest, Toast) {
        var vm = this;
        vm.loading = false;
        vm.success = false;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.sync = sync;

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.user);
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function sync() {
            vm.loading = true;
            OneRequest.to('empleados/syncup').then(function(data){
                vm.stats = data.plain();
                vm.loading = false;
                vm.success = true;
                Toast.show('Sincronización correcta');
            }, function(err) {
                vm.error = true;
                console.log(err)
                Toast.show('Ha ocurrido un error');
            });
        }
    }
})();
