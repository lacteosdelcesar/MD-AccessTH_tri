(function() {
    'use strict';

    angular
        .module('certificados')
        .controller('CertificadoSlrPromedioController', CertificadoSlrPromedioController);

    /* @ngInject */
    function CertificadoSlrPromedioController(dataservice_certificados, UserService, $sce) {
        var vm = this;
        vm.pdf = null;
        downloadCertificado();

        function downloadCertificado(){
            var user = UserService.currentUser();
            return dataservice_certificados.download(user.username, 3).then(function (data) {
                var file = new Blob([data], {type: 'application/pdf'});
                var fileURL = window.URL.createObjectURL(file);
                vm.pdf = $sce.trustAsResourceUrl(fileURL);
                console.log(vm.fileURL);
                //window.open(fileURL, "Ceftificado Laboral" , "width=870,height=600,Directories=NO");
            });
        }
    }

})();