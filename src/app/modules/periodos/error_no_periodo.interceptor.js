/**
 * Created by tav0 on 26/10/16.
 */

(function() {
    'use strict';

    angular
        .module('periodos')
        .run(alertNoPeriodo)
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $rootScope) {
            return {
                'responseError': responseError
            };

            function responseError(rejection) {
                if(rejection.data.errors.E_NOTFOUND_PERIODO){
                    $rootScope.$broadcast('alertNoPeriodo');
                }
                return $q.reject(rejection);
            }
        });
    }

    /* @ngInject */
    function alertNoPeriodo($rootScope, $mdDialog, Toast) {
        var alert = 'No hay un periodo actual valido en el sistema, comuníquese con soporte.';
        $rootScope.$on('alertNoPeriodo', function(){
            $mdDialog.show(
                $mdDialog.alert()
                    .textContent(alert)
                    .ok('OK')
            ).finally(function() {
                Toast(alert, 'top right', 360000);
            });
        });
    }
})();

