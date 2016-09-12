(function () {
    'use strict';

    angular
        .module('horas_extra')
        .controller('JornadasController', JornadasController);

    /*@ngInject*/
    function JornadasController(Periodos, Jornadas, $scope, triBreadcrumbsService) {
        var vm = this;
        vm.jornadas = [];

        vm.query = {
            order: 'empleado.nombre',
            page: 1,
            limit: '10',
            limitOptions: [10, 20, 50, 'Todo']
        };
        vm.filter = false;

        vm.selectedIndex = 0;

        vm.getJornadas = getJornadas;
        vm.saveJornada = saveJornada;
        vm.formatTime2 = formatTime2;
        vm.removeFilter = removeFilter;

        ////////////////

        Periodos.getActual().then(setdiasPeriodo);

        $scope.$watch('vm.selectedIndex', changeSelectedTab);

        triBreadcrumbsService.breadcrumbs.crumbs.push({name: 'Día a día'});

        ////////////////

        function getJornadas(fecha) {
            vm.fecha = fecha;
            vm.promise = Jornadas.getByFecha(vm.fecha.format('YYYY-MM-DD'));
            vm.promise.then(function(jornadas){
                vm.jornadas = jornadas;
                jornadas.forEach(function (jornada) {
                    jornada.hora_entrada1 = moment(jornada.hora_entrada1, 'HH:mm').toDate();
                    jornada.hora_salida1 = moment(jornada.hora_salida1, 'HH:mm').toDate();
                    jornada.hora_entrada2 = moment(jornada.hora_entrada2, 'HH:mm').toDate();
                    jornada.hora_salida2 = moment(jornada.hora_salida2, 'HH:mm').toDate();
                });
            });
        }

        function checkMarca(marca, jornada) {
            var hora_entrada1 = moment(jornada.hora_entrada1),
                hora_salida1 = moment(jornada.hora_salida1),
                hora_entrada2 = moment(jornada.hora_entrada2),
                hora_salida2 = moment(jornada.hora_salida2);

            if(marca === 'hora_entrada1'){
                if (hora_entrada1.isValid() && hora_salida1.isValid()){
                    gurdar(jornada);
                }
            }
        }

        function saveJornada(jornada) {
            var _jornada = jornada.clone(),
                hora_entrada1 = moment(jornada.hora_entrada1),
                hora_salida1 = moment(jornada.hora_salida1),
                hora_entrada2 = moment(jornada.hora_entrada2),
                hora_salida2 = moment(jornada.hora_salida2);

            if(hora_entrada1.isValid() && hora_salida1.isValid()){
                _jornada.hora_entrada1 = hora_entrada1.format('HH:mm');
                _jornada.hora_salida1 = hora_salida1.format('HH:mm');

                if(!hora_entrada2.isValid() && !hora_salida2.isValid()){
                    _jornada.hora_entrada2 = null;
                    _jornada.hora_salida2 = null;
                    guardar();
                } else if(hora_entrada2.isValid() && hora_salida2.isValid() && hora_entrada2 > hora_salida1){
                    _jornada.hora_entrada2 = hora_entrada2.format('HH:mm');
                    _jornada.hora_salida2 = hora_salida2.format('HH:mm');
                    guardar();
                }
            };

            function guardar() {
                _jornada.cedula_empleado = jornada.empleado.cedula;
                _jornada.fecha = vm.fecha.format("YYYY-MM-DD");
                vm.promise = _jornada.id ? _jornada.put() : _jornada.post();
                vm.promise.then(function () {
                    getJornadas(vm.fecha);
                })
            }
        }

        function setdiasPeriodo(periodo) {
            vm.dias = [];
            var minFecha = moment(periodo.fecha_inicio);
            var maxFecha = moment(periodo.fecha_final);
            var index = 0;
            while (minFecha <= maxFecha) {
                vm.dias.push({
                    label: minFecha.format("DD"),
                    fecha: minFecha.clone(),
                    futuro: minFecha > moment()
                });
                (minFecha.format('MMDD') === moment().format('MMDD')) && (vm.selectedIndex = index);
                index++;
                minFecha.add(1, 'day');
            }
        }

        function formatTime2(min) {
            if (min == 0) {
                return min;
            }
            var hour = Math.floor(min / 60);
            min = min - hour * 60;
            hour = (hour < 10) ? '0' + hour : hour;
            min = (min < 10) ? '0' + min : min;
            return hour + ':' + min;
        }

        function changeSelectedTab(current, old) {
            if(vm.dias){
                vm.dias[old].label = vm.dias[old].fecha.format("DD");
                vm.dias[current].label = vm.dias[current].fecha.format("MMM DD");
            }
        }

        function removeFilter() {
            vm.filter = false;
            vm.query.search = '';
        }
    }
})();


