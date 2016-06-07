/**
 * Created by tav0 on 6/06/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .factory('OneRequest', reposytory);

    /* @ngInject */
    function reposytory(Restangular) {
        var service = {
            to: sendRequest
        }
        return service;

        function sendRequest(route, params) {
            return Restangular.all(route).getList(params);
        }
    }
})();
