(function () {
    'use strict';

    angular
        .module('quejas-y-reclamos')
        .controller('ResponderQuejaController', ResponderQuejaController);

    /* @ngInject */
    function ResponderQuejaController(dataservice_qr, UserService, $scope, $state) {
        var vm = this;
        vm.buzon = {};

        vm.enviarPQR = enviarPQR;

        loadPQR();
        function loadPQR() {
            // return dataservice_qr.getById($stateParams.quejaId).then(function(data){
            if(!dataservice_qr.selectedQueja){
                $state.go('triangular.quejas-y-reclamos-listado-actuales');
            }else {
                vm.buzon = dataservice_qr.selectedQueja;
            }
            // });
        }

        function enviarPQR() {
            vm.buzon.user_id = UserService.currentUser().id;
            dataservice_qr.postR(vm.buzon.id, {'respuesta': vm.buzon.respuesta}).then(succes);
            function succes(respons) {
                vm.buzon.fecha_respuesta = new Date();
                $scope.$emit('queja_respondida', vm.buzon);
            }
        }

    }
})();
