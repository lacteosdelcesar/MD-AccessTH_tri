/**
 * Created by tav0 on 7/06/16.
 */

(function() {
    'use strict';

    angular
        .module('common')
        .factory('Toast', factory);

    /* @ngInject */
    function factory($mdToast) {
        var service = {
            show: show
        }
        return service;

        function show(text, position, delay) {
            position || (position = 'bottom right');
            delay || (delay = 5000);
            $mdToast.show(
                $mdToast.simple()
                    .content(text)
                    .position(position)
                    .hideDelay(delay)
            );
        }
    }
})();
