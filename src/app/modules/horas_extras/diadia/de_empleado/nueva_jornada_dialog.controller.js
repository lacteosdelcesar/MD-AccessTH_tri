(function () {
    'use strict';

    angular
        .module('horas_extra')
        .controller('JornadaDialog', JornadaDialog);

    /* @ngInject */
    function JornadaDialog(jornada, fechas_trabajadas, $mdDialog, Periodos) {
        var vm = this;
        vm.hora_entrada1 = null;
        vm.hora_salida1 = null;
        vm.hora_entrada2 = null;
        vm.hora_salida2 = null;
        vm.salida1Mayor = false;
        vm.editFecha = false;
        vm.horas_trabajadas = 0;

        vm.validarForm = validarForm;
        vm.fecha_trabajada = fecha_trabajada;
        vm.cancel = cancel;
        vm.acept = acept;

        ////////////////

        if (jornada !== null) {
            vm.editar = true;
            vm.hora_entrada1 = moment(jornada.hora_entrada1, 'HH:mm').toDate();
            vm.hora_salida1 = moment(jornada.hora_salida1, 'HH:mm').toDate();
            vm.hora_entrada2 = moment(jornada.hora_entrada2, 'HH:mm').toDate();
            vm.hora_salida2 = moment(jornada.hora_salida2, 'HH:mm').toDate();
            vm.fecha = moment(jornada.fecha).toDate();
        }

        Periodos.getActual().then(function (periodo) {
            vm.minFecha = moment(periodo.fecha_inicio).toDate();
            var periodo_fecha_final = moment(periodo.fecha_final);
            vm.maxFecha = (periodo_fecha_final < moment()) ? periodo_fecha_final.toDate() : moment().toDate();

            vm.fecha = moment(periodo.fecha_inicio);
            while (fechas_trabajadas.indexOf(vm.fecha.format("YYYY-MM-DD")) != -1) {
                vm.fecha.add(1, 'day');
            }
            vm.fecha = vm.fecha.toDate();
        })

        ////////////////

        function cancel() {
            $mdDialog.cancel();
        }

        function acept() {
            var jornada = {
                hora_entrada1:  moment(vm.hora_entrada1).format("HH:mm"),
                hora_salida1:  moment(vm.hora_salida1).format("HH:mm"),
                hora_entrada2:  moment(vm.hora_entrada2).format("HH:mm"),
                hora_salida2:  moment(vm.hora_salida2).format("HH:mm"),
                fecha:  moment(vm.fecha).format("YYYY-MM-DD")
            }
            if (jornada.hora_entrada2 === 'Invalid date'|| jornada.hora_salida2 === 'Invalid date') {
                jornada.hora_entrada2 = '';
                jornada.hora_salida2 = '';
            }
            $mdDialog.hide(jornada);
        }

        function fecha_trabajada(fecha) {
            return fechas_trabajadas.indexOf(moment(fecha).format("YYYY-MM-DD")) === -1
        }

        function validarForm(form) {
            var entrada1 = form.he1,
                salida1 = form.hs1,
                entrada2 = form.he2,
                salida2 = form.hs2;
            vm.horas_trabajadas = 0;

            if (salida1.$valid && entrada1.$valid) {
                salida1.entradaMayor = (entrada1.$dateValue >= salida1.$dateValue);
                vm.horas_trabajadas = (salida1.$dateValue - entrada1.$dateValue) / 3600000;
                vm.horas_trabajadas += salida1.entradaMayor ? 24 : 0;

                if (entrada2.$valid && entrada2.$dirty) {
                    entrada2.salida1Mayor = (salida1.$dateValue >= entrada2.$dateValue);
                    form.$invalid = entrada2.salida1Mayor;
                    vm.horas_trabajadas = 0;

                    if (salida2.$valid && salida2.$viewValue != '') {
                        salida2.entradaMayor = (entrada2.$dateValue >= salida2.$dateValue);
                        var horas_trabajadas2 = (salida2.$dateValue - entrada1.$dateValue) / 3600000;
                        vm.horas_trabajadas += salida2.entradaMayor ? horas_trabajadas2+24 : horas_trabajadas2;
                    }
                }
            }
            vm.horas_trabajadas = (vm.horas_trabajadas % 1 != 0) ? vm.horas_trabajadas.toFixed(2) : vm.horas_trabajadas;
        }
    }
})();
