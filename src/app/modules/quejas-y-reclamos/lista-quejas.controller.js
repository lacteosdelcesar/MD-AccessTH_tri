(function() {
    'use strict';

    angular
        .module('quejas-y-reclamos')
        .controller('ListaQuejasController', ListaQuejasController);

    /* @ngInject */
    function ListaQuejasController(dataservice_qr, $state, $scope) {
        var vm = this;
        vm.quejas = {};
        vm.open = open;

        load();
        function load(){
            dataservice_qr.getAll().then(function(data){
                vm.quejas = data;
            });
        }

        function open(q) {
            vm.selected = q.id;
            dataservice_qr.selectedQueja = q;
            $state.go('triangular.quejas-y-reclamos-listado-actuales.responder', {quejaId: q.id});
        }


        $scope.$on('queja_respondida', function(event, queja){
            //TODO: no esta tomando la fecha de respuesta
            for (var i=0; i<vm.quejas.sin_responder.length; i++) {
                if(vm.quejas.sin_responder[i].id == queja.id){
                    vm.quejas.respondidas.push(vm.quejas.sin_responder[i]);
                    vm.quejas.sin_responder.splice(i, 1);
                }
            }
        });

    }
})();
