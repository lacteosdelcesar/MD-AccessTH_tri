/**
 * Created by tav0 on 10/08/16.
 */

(function () {
    'use strict';

    angular
        .module('reporte_novedades')
        .controller('DescuentosController', Descuentos);

    /* @ngInject */
    function Descuentos(Descuentos, Empleados, $mdEditDialog, $mdDialog, Toast) {
        var vm = this;
        vm.descuentos = [];
        vm.descuento = {};
        vm.search_text = '';

        vm.edit = edit;
        vm.delete = delet;
        vm.save = save;

        ////////////////

        getDescuentos();

        ////////////////

        function getDescuentos() {
            getempleados();
        }

        function getempleados() {
            Empleados.getList().then(function (data) {
                vm.empleados = data.map(function (empleado) {
                    empleado.display = angular.uppercase(empleado.apellidos+ ' ' + empleado.nombre);
                    return empleado.plain();
                });
            });
        }

        function save(descuento) {
            descuento.cedula_empleado = descuento.empleado.cedula;
            delete descuento.empleado;
            Descuentos.create(descuento).then(function () {
                vm.descuento = {};
                vm.search_text = '';
                Toast('Descuento guardado');
                getDescuentos();
            });
        }

        function edit(event, descuento) {
            var editDialog = {
                modelValue: descuento.valor,
                placeholder: '$',
                type: 'number',
                targetEvent: event,
                save: function (input) {
                    if(input.$modelValue === 0) {
                        input.$invalid = true;
                    }
                    descuento.valor = input.$modelValue;
                    vm.promise = descuento.save();
                    vm.promise.then(function () {
                        Toast('Descuento guardado');
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

        function delet(event, descuento, index)  {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro que desea eliminar el registro?')
                .ariaLabel('seguro?')
                .targetEvent(event)
                .ok('Si, eliminar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                vm.promise = descuento.remove();
                vm.promise.then(success, error);
                function success() {
                    Toast('Registro Eliminado');
                    vm.descuentos.splice(index, 1);
                }
                function error() {

                }
            });
        }
    }
})();
