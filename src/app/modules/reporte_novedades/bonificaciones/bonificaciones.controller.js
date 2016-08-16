/**
 * Created by tav0 on 10/08/16.
 */

(function () {
    'use strict';

    angular
        .module('app.reporte_novedades')
        .controller('BonificacionesController', Bonificaciones);

    /* @ngInject */
    function Bonificaciones(Bonificaciones, Empleados, $mdEditDialog, $mdDialog, Toast) {
        var vm = this;
        vm.bonificaciones = [];
        vm.bonificacion = {};
        vm.search_text = '';

        vm.edit = edit;
        vm.delete = delet;
        vm.save = save;
        vm.showModalCalcular = showModalCalcular;

        ////////////////

        getBonificaciones();

        ////////////////

        function getBonificaciones() {
            vm.promise = Bonificaciones.getList();
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
                    })
                    if(no_esta) {
                        empleado.display = angular.uppercase(empleado.apellidos+ ' ' + empleado.nombre)
                        return empleado.plain();
                    }
                })
            })
        }

        function save(bonificacion) {
            bonificacion.por_remplazo || (bonificacion.por_remplazo = 0);
            bonificacion.cedula_empleado = bonificacion.empleado.cedula;
            delete bonificacion.empleado;
            Bonificaciones.create(bonificacion).then(function () {
                vm.bonificacion = {};
                vm.search_text = '';
                Toast.show('Bonificacion guardada');
                getBonificaciones();
            })
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
                        return $q.reject();
                    }
                    bonificacion.valor = input.$modelValue;
                    bonificacion.por_remplazo = false;
                    vm.promise = bonificacion.put();
                    vm.promise.then(function () {
                        Toast.show('Bonificacion guardada');
                    })
                }
            };

            $mdEditDialog.small(editDialog).then(function (ctrl) {
                var input = ctrl.getInput();
                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        }

        function showModalCalcular(event, bonificacion) {
            $mdDialog.show({
                templateUrl: 'app/modules/reporte_novedades/bonificaciones/dialog_calcular_bonificacion.html',
                controller: 'BonificacioRemaplazoDialog',
                controllerAs: 'vm',
                targetEvent: event,
                locals: {
                    bonificacion: bonificacion
                }
            }).then(function (detalles) {
                bonificacion.valor = parseFloat(detalles.valor_bonificacion.toFixed(2));
                bonificacion.detalles_remplazo = detalles;
                bonificacion.por_remplazo = true;
                if(bonificacion.id){
                    vm.promise = bonificacion.put();
                    vm.promise.then(function () {
                        Toast.show('Bonificacion guardada');
                    })
                }
            });
        };

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
                    Toast.show('Registro Eliminado');
                    vm.bonificaciones.splice(index, 1);
                }
                function error() {

                }
            });
        }
    }
})();