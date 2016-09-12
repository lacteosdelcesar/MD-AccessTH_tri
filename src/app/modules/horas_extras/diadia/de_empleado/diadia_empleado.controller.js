(function() {
    'use strict';

    angular
        .module('horas_extra')
        .controller('DiadiaController', DiadiaController);

    /* @ngInject */
    function DiadiaController(Jornadas, $stateParams, $state, triBreadcrumbsService, $mdDialog, Toast) {
        var vm = this;
        vm.jornadas = [];
        vm.empleado = $stateParams.empleado;

        vm.showModalCalcular = showModalCalcular;
        vm.showModalAdd = showModalAdd;
        vm.delet = delet;
        vm.formatTime = formatTime;
        vm.formatTime2 = formatTime2;

        var dialogJornada = {
            templateUrl: 'app/modules/horas_extras/diadia/de_empleado/nueva_jornada_dialog.tmpl.html',
            controller: 'JornadaDialog',
            controllerAs: 'vm'
        }

        ////////////////

        if(!vm.empleado) {
            $state.go('triangular.horas_extra');
        } else {
            getDiadia();
        }

        triBreadcrumbsService.breadcrumbs.crumbs.push({name: 'Día a día'});

        ////////////////

        function getDiadia() {
            vm.promise = Jornadas.getByEmpleado(vm.empleado.cedula);
            vm.promise.then(function(jornadas){
                vm.jornadas = jornadas;
                jornadas.forEach(function (jornada) {
                    if(jornada.horas.fo != 0 || jornada.horas.efd != 0 || jornada.horas.efn != 0) {
                        jornada.dia_festivo = true;
                    }
                });
            });
        }

        function showModalCalcular(ev, jornada) {
            dialogJornada.targetEvent = ev;
            dialogJornada.locals ={
                jornada: jornada,
                fechas_trabajadas: []
            };
            $mdDialog.show(dialogJornada).then(function (_jornada) {
                vm.aux = jornada.clone();
                vm.aux.hora_entrada1 = _jornada.hora_entrada1;
                vm.aux.hora_salida1 = _jornada.hora_salida1;
                vm.aux.hora_entrada2 = _jornada.hora_entrada2;
                vm.aux.hora_salida2 = _jornada.hora_salida2;
                vm.aux.fecha = _jornada.fecha;
                vm.promise = vm.aux.save();
                vm.promise.then(function(){
                    delete vm.aux;
                    getDiadia();
                }, function () {
                    Toast('Ocurrion un error al editar la jornada')
                });
            });
        }

        function showModalAdd(ev) {
            dialogJornada.targetEvent = ev;
            dialogJornada.locals ={
                jornada: null,
                fechas_trabajadas: fechasTrabajadas()
            };
            $mdDialog.show(dialogJornada).then(function (new_jornada) {
                new_jornada.cedula_empleado = vm.empleado.cedula;
                vm.promise = Jornadas.create(new_jornada);
                vm.promise.then(function(){
                    getDiadia();
                }, function () {
                    Toast('No se pudo almacenar el registro')
                });
            });
        }

        function delet(event, jornada) {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro que desea eliminar el registro?')
                .ariaLabel('seguro?')
                .targetEvent(event)
                .ok('Si, eliminar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                vm.promise = jornada.remove();
                vm.promise.then(function success() {
                    Toast('Registro Eliminado');
                    getDiadia();
                },function () {
                    Toast('Algo extraño ocurrio y no se elimino el registro');
                });
            });
        }

        function formatTime(str){
            var time = new Date("01.01.1970 " + str);
            return (!str) ? '-' : time;
        }

        function formatTime2(min){
            if(min == 0){return min;}
            var hour = Math.floor(min/60);
            var min = min-hour*60;
            // hour = (hour<10) ? '0'+hour : hour;
            min = (min<10) ? '0'+min : min;
            return hour+':'+min;
        }

        function fechasTrabajadas() {
            return vm.jornadas.map(function (jornada) {
                return jornada.fecha;
            })
        }

    }
})();
