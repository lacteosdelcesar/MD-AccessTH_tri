/**
 * Created by tav0 on 03/09/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($mdDateLocaleProvider) {

        $mdDateLocaleProvider.months = [
            'Enero', 'Febrero', 'Marzo', 'Abril',
            'Mayo', 'Junio', 'Julio', 'Agosto',
            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        $mdDateLocaleProvider.shortMonths = [
            'Ene','Feb','Mar','Abr','Mayo','Jun','Jul','Ago','Sept','Oct','Nov','Dic'
        ];
        $mdDateLocaleProvider.days = [
            'Lunes', 'Martes', 'Miércoles', 'Jueves',
            'Viernes', 'Sábado', 'Domingo'
        ];
        $mdDateLocaleProvider.shortDays = [
            'Lun','Mar','Mié','Jue','Vie','Sáb','Dom'
        ];

        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'L', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('L');
        };
        $mdDateLocaleProvider.monthHeaderFormatter = function(date) {
            return $mdDateLocaleProvider.shortMonths[date.getMonth()] + ' ' + date.getFullYear();
        };
        $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
            return 'Semana ' + weekNumber;
        };
        $mdDateLocaleProvider.msgCalendar = 'Calendario';
        $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
    }
})();
