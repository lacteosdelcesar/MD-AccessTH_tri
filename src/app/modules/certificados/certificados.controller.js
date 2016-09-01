(function() {
    'use strict';

    angular
        .module('certificados')
        .controller('CertificadoController', CertificadoController);

    /* @ngInject */
    function CertificadoController(dataservice_certificados, authService, $sce, tipo, $window) {
        var vm = this;
        vm.pdf = null;
        downloadCertificado();

        function downloadCertificado(){
            var user = authService.getCurrentUser();
            return dataservice_certificados.download(user.username, tipo).then(function (data) {
                var file = new Blob([data], {type: 'application/pdf'});
                var fileURL = $window.URL.createObjectURL(file);
                vm.pdf = $sce.trustAsResourceUrl(fileURL);
                //window.open(fileURL, "Ceftificado Laboral" , "width=870,height=600,Directories=NO");
            });
        }
    }
})();
