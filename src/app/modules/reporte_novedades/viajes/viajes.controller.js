/**
 * Created by tav0 on 10/08/16.
 */

(function () {
    'use strict';

    angular
        .module('reporte_novedades')
        .controller('ViajesController', Viajes);

    /* @ngInject */
    function Viajes(Viajes, Empleados, $mdEditDialog, $mdDialog, Toast) {
        var vm = this;
        vm.bonificaciones = [];
        vm.bonificacion = {};
        vm.search_text = '';

        vm.edit = edit;
        vm.delete = delet;
        vm.save = save;

        ////////////////

        getBonificaciones();

        ////////////////

        function getBonificaciones() {
            vm.promise = Viajes.getList();
            vm.promise.then(function(bonificaciones){
                vm.bonificaciones = bonificaciones;
                getempleados();
            });
        }

        function getempleados() {
            Empleados.getList().then(function (data) {
                var bonificaciones = vm.bonificaciones.slice();
                vm.empleados = data.filter(function (empleado) {
                    var no_esta = bonificaciones.every(function (bonificacion, index, _bonificaciones) {
                        if(empleado.cedula == bonificacion.empleado.cedula){
                            _bonificaciones.splice(index, 1);
                            return false;
                        }
                        return true;
                    });
                    if(no_esta) {
                        empleado.display = angular.uppercase(empleado.apellidos+ ' ' + empleado.nombre);
                        return empleado.plain();
                    }
                });
            });
        }

        function save(bonificacion) {
            bonificacion.cedula_empleado = bonificacion.empleado.cedula;
            delete bonificacion.empleado;
            Viajes.create(bonificacion).then(function () {
                vm.bonificacion = {};
                vm.search_text = '';
                Toast('Vieaje guardado');
                getBonificaciones();
            });
        }

        function edit(event, bonificacion) {
            var editDialog = {
                modelValue: bonificacion.valor,
                placeholder: '$',
                type: 'number',
                targetEvent: event,
                save: function (input) {
                    if(input.$modelValue === 0) {
                        input.$invalid = true;
                    }
                    bonificacion.valor = input.$modelValue;
                    vm.promise = bonificacion.save();
                    vm.promise.then(function () {
                        Toast('Vieaje guardado');
                    });
                }
            };

            $mdEditDialog.small(editDialog).then(function (ctrl) {
                var input = ctrl.getInput();
                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        }

        function delet(event, bonificacion, index)  {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro que desea eliminar el registro?')
                .ariaLabel('seguro?')
                .targetEvent(event)
                .ok('Si, eliminar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                vm.promise = bonificacion.remove();
                vm.promise.then(success, error);
                function success() {
                    Toast('Registro Eliminado');
                    vm.bonificaciones.splice(index, 1);
                }
                function error() {

                }
            });
        }
    }
})();
