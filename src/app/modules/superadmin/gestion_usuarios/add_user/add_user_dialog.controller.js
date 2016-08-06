(function() {
    'use strict';

    angular
        .module('gestion_usuarios')
        .controller('DialogNewUserController', DialogNewUserController);

    /* @ngInject */
    function DialogNewUserController($mdDialog, roles, OneRequest) {
        var vm = this;
        var selected_in_area = {};
        vm.user = {areas: []};
        vm.cancel = cancel;
        vm.hide = hide;
        vm.toggle = toggle;
        vm.existe = existe;
        vm.parcial = parcial;
        vm.total = total;
        vm.toggleAll = toggleAll;

        /////////////////////////
        vm.roles = _.filter(roles, function (rol) {
            if(['A_RRHH', 'ENC_AREA'].indexOf(rol.nombre) >= 0) return true;
        });

        OneRequest.to('distritos').then(function(data) {
            vm.distritos = data;
        });

        OneRequest.to('areas').then(function(data) {
            vm.areas = data;
            vm.areas.forEach(function (area) {
                selected_in_area[area.codigo] = [];
            })
        });
        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.user);
        }

        function cancel() {
            $mdDialog.cancel();
        }
        
        function toggle(codigo, area) {
            var i = selected_in_area[area].indexOf(codigo);
            if(i > -1){
                selected_in_area[area].splice(i, 1);
            } else {
                selected_in_area[area].push(codigo);
            }
        }
        
        function existe(codigo, area) {
            return selected_in_area[area].indexOf(codigo) > -1;
        }

        function parcial(area) {
            return (selected_in_area[area.codigo].length !== 0 &&
            area.sub_areas.length !== selected_in_area[area.codigo].length);
        }
        
        function total(area) {
            return area.sub_areas.length == selected_in_area[area.codigo].length;
        }
        
        function toggleAll(area) {
            if (total(area)) {
                console.log(selected_in_area[area.codigo]);
                selected_in_area[area.codigo] = [];
            } else if (selected_in_area[area.codigo].length >= 0) {
                console.log(selected_in_area[area.codigo]);
                selected_in_area[area.codigo] = area.sub_areas.map(function (area) {
                    return area.codigo;
                });
            }
        }
    }
})();
