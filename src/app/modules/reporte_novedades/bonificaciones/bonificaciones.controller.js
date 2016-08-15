/**
 * Created by tav0 on 10/08/16.
 */

(function () {
    'use strict';

    angular
        .module('app.reporte_novedades')
        .controller('BonificacionesController', Bonificaciones);

    /* @ngInject */
    function Bonificaciones(Bonificaciones, $mdEditDialog, $mdDialog) {
        var vm = this;
        vm.bonificaciones = []
        
        vm.edit = edit;
        vm.delete = delet;
        vm.showModalCalcular = showModalCalcular;

        ////////////////

        getBonificaciones();

        ////////////////

        function getBonificaciones() {
            Bonificaciones.getList().then(function(bonificaciones){
                vm.bonificaciones = bonificaciones;
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
                        return $q.reject();
                    }
                    bonificacion.valor = input.$modelValue;
                    bonificacion.put();
                    console.log(bonificacion);
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
                console.log(bonificacion);
                bonificacion.put();
            });
        };

        function delet(event, bonificacion, index) {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro que desea eliminar el registro?')
                .ariaLabel('seguro?')
                .targetEvent(event)
                .ok('Si, eliminar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                bonificacion.remove().then(success, error);
                function success() {
                    vm.bonificaciones.splice(index, 1);
                }
                function error() {

                }
            });
        }
    }
})();