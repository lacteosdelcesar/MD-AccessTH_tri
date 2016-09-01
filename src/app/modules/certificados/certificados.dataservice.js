(function () {
    'use strict';

    angular
        .module('certificados')
        .factory('dataservice_certificados', dataservice);

    /* @ngInject */
    function dataservice($http, API) {
        return {
            download: download
        };

        function download(id, tipo) {
            return $http({
                url: API + 'empleados/' + id + '/certificado_laboral/' + tipo,
                method: 'GET',
                headers: {'Accept': 'application/pdf'},
                responseType: 'arraybuffer'
            })
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


