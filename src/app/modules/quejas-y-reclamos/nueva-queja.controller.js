(function() {
    'use strict';

    angular
        .module('quejas-y-reclamos')
        .controller('NuevaQuejaController', NuevaQuejaController);

    /* @ngInject */
    function NuevaQuejaController(dataservice_qr, UserService) {
        var vm = this;
        vm.buzon = {};
        vm.enviarPQR = enviarPQR;
        vm.nuevaPQR = nuevaPQR;

        loadPQR();
        function loadPQR() {
            dataservice_qr.getByEmpleado(UserService.currentUser().username).then(function (data) {
                if(data){
                    vm.buzon = data;
                    vm.buzon.fecha = new Date(vm.buzon.fecha.date);
                    vm.buzon.fecha_respuesta = vm.buzon.fecha_respuesta ? new Date(vm.buzon.fecha_respuesta.date) : '';
                }else{
                    resetBuzon();
                }
            });
        }

        function resetBuzon() {
            vm.buzon = {
                id: -1,
                cedula_empleado: UserService.currentUser().username,
                mensaje: '',
                fecha: new Date(),
                respuesta: null,
                fecha_respuesta: null,
                usuario_que_responde: null
            };
        }

        function enviarPQR() {
            dataservice_qr.post(vm.buzon).then(function(){
                resetBuzon();
                loadPQR();
            });
        }

        function nuevaPQR() {
            if(vm.buzon.usuario_que_responde == null) dataservice_qr.delete(vm.buzon);
            resetBuzon();
        }
    }
})();
