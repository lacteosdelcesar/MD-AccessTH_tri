/**
 * Created by tav0 on 6/06/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .factory('OneRequest', reposytory);

    /** @ngInject **/
    function reposytory(Restangular) {
        var service = {
            to: sendGet,
            post: sendPost,
            base: Restangular
        };
        return service;

        function sendGet(route, params) {
            return Restangular.all(route).customGET('', params || {});
        }

        function sendPost(route, data, headers) {
            return Restangular.one(route).customPOST(data, '', {}, headers || {});
        }
    }
})();
