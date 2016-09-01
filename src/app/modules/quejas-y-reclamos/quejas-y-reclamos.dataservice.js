(function () {
    'use strict';

    angular
        .module('quejas-y-reclamos')
        .factory('dataservice_qr', dataservice);

    /* @ngInject */
    function dataservice($http, API) {
        var service = {
            getByEmpleado: getByEmpleado,
            getAll: getAll,
            getById: getById,
            post: post,
            delete: delet,
            postR: postR
        };
        return service;

        function getByEmpleado(ide) {
            var uri = API+'empleados/' + ide + '/solicitudes_pqr';
            return $http.get(uri)
                .then(succes)
                .catch(failure);

            function succes(response) {
                return response.data.data;
            }

            function failure() {
                //logger.error('XHR Failed for getAvengers.' + error.data);
            }
        }

        function getById(ide) {
            var uri = API+'solicitudes_pqr/' + ide;
            return $http.get(uri)
                .then(succes)
                .catch(failure);

            function succes(response) {
                return response.data.data;
            }

            function failure() {
                //logger.error('XHR Failed for getAvengers.' + error.data);
            }
        }

        function getAll() {
            var uri = API+'solicitudes_pqr';
            return $http.get(uri)
                .then(succes)
                .catch(failure);

            function succes(response) {
                var data = response.data.data;
                var quejas = { respondidas: [], sin_responder: [] };
                for (var i=0; i<data.length; i++) {
                    data[i].fecha = new Date(data[i].fecha.date);
                    data[i].index = i;
                    if(data[i].respuesta){
                        data[i].fecha_respuesta = new Date(data[i].fecha_respuesta.date);
                        quejas.respondidas.push(data[i]);
                    } else {
                        quejas.sin_responder.push(data[i]);
                    }
                }
                return quejas;
            }

            function failure() {
                //logger.error('XHR Failed for getAvengers.' + error.data);
            }
        }

        function post(b) {
            return $http.post(API+'empleados/' + b.cedula_empleado + '/solicitudes_pqr', b)
                .then(succes)
                .catch(failure);

            function succes(response) {
                return response.data;
            }

            function failure() {
                //logger.error('XHR Failed for getAvengers.' + error.data);
            }
        }

        function delet(b) {
            return $http.delete(API+'solicitudes_pqr/' + b.id)
                .then(succes)
                .catch(failure);

            function succes(response) {
                return response.data;
            }

            function failure() {
                //logger.error('XHR Failed for getAvengers.' + error.data);
            }
        }

        function postR(id, r) {
            return $http.post(API+'solicitudes_pqr/' + id + '/respuesta', r)
                .then(succes)
                .catch(failure);

            function succes(response) {
                return response.data;
            }

            function failure() {
                //logger.error('XHR Failed for getAvengers.' + error.data);
            }
        }
    }
})();
