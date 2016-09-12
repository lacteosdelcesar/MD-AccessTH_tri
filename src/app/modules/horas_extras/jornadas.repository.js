/**
 * Created by tav0 on 2/09/16.
 */

(function() {
    'use strict';

    angular
        .module('horas_extra')
        .factory('Jornadas', factory);

    /* @ngInject */
    function factory(AbstractRepository) {
        function Repository() {
            AbstractRepository.call(this, 'jornadas');
        }

        AbstractRepository.extend(Repository);

        Repository.prototype.getByEmpleado = function (cedula_empleado) {
            return this.getList({empleado: cedula_empleado});
        }

        Repository.prototype.getByFecha = function (fecha) {
            return this.getList({fecha: fecha});
        }

        return new Repository();
    }
})();
