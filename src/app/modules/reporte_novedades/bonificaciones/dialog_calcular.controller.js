(function () {
    'use strict';

    angular
        .module('reporte_novedades')
        .controller('BonificacionDialogController', controller);

    /* @ngInject */
    function controller(bonificacion, $mdDialog, Empleados) {
        var vm = this;
        vm.valor_bonificacion = 0;
        vm.simulateQuery = true;
        vm.empleados = [];
        vm.selectedEmpleado = null;

        vm.calcular_bonificacion = calcular_bonificacion;
        vm.selectedItemChange = selectedItemChange;
        vm.cancel = cancel;
        vm.acept = acept;

        ////////////////

        getEmpleados();

        ////////////////

        function cancel() {
            $mdDialog.cancel();
        }

        function acept(){
            $mdDialog.hide({
                cedula_empleado_remplazado: vm.selectedEmpleado.cedula,
                numero_de_dias: vm.diasRemplazo,
                valor_bonificacion: vm.valor_bonificacion
            });
        }

        function calcular_bonificacion(salario){
            vm.valor_bonificacion = salario* vm.diasRemplazo/30;
        }

        function selectedItemChange(item) {
            if(!item){
                vm.valor_bonificacion = 0;
                vm.diasRemplazo = 0;
            }
        }

        function getEmpleados() {
            Empleados.getList({include: 'salario'}).then(function (data) {
                vm.empleados = data.filter(function (empleado) {
                    if(empleado.cedula != bonificacion.empleado.cedula) {
                        empleado.display = angular.uppercase(empleado.apellidos+ ' ' + empleado.nombre);
                        return empleado.plain();
                    }
                });
            });
        }
    }
})();
