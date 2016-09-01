(function() {
    'use strict';

    angular
        .module('certificados')
        .controller('VerificarCertificadoController', VerificarCertificadoController);

    /* @ngInject */
    function VerificarCertificadoController(OneRequest, $mdSidenav, $sce, $window) {
        var vm = this;
        vm.pdf = null;
        vm.codigo = '';
        vm.downloadCertificado = downloadCertificado;
        vm.consultar = consultar;
        vm.closeView = closeView;
        vm.loading = false;

        ////////////////

        function consultar() {
            vm.loading = true;
            OneRequest.to('empleados/certificado_laboral/'+vm.codigo).then(success, error);
            function success(data) {
                vm.loading = false;
                vm.content = data.content;
                vm.certificado = data.certificado;
                vm.mensajError = undefined;
            }
            function error(err) {
                vm.loading = false;
                vm.content = undefined;
                if(err.status == 404){
                    vm.mensajError = 'El código ingresado no es valido';
                } else {
                    vm.mensajError = 'Lo sentimos mucho, Ha ocurrido un error inesperado';
                }
            }
        }

        function downloadCertificado(){
            vm.loading = true;
            if(vm.pdf === null){
                OneRequest.base.one('empleados/certificado_laboral/' + vm.codigo + '/pdf')
                    .withHttpConfig({responseType: 'arraybuffer'}).get()
                    .then(function (data) {
                        var file = new Blob([data], {type: 'application/pdf'});
                        var fileURL = $window.URL.createObjectURL(file);
                        vm.pdf = $sce.trustAsResourceUrl(fileURL);
                        vm.loading = false;
                        $mdSidenav('view-certificado').toggle();
                    });
            } else {
                vm.loading = false;
                $mdSidenav('view-certificado').toggle();
            }
        }

        function closeView() {
            $mdSidenav('view-certificado').close();
        }
    }

})();
