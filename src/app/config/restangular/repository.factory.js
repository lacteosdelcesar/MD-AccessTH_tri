/**
 * Created by tav0 on 2/06/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .factory('AbstractRepository', reposytory);

    /* @ngInject */
    function reposytory(Restangular) {
        function AbstractRepository(route) {
            this.restangular = Restangular;
            this.route = route;
        }

        AbstractRepository.prototype = {
            getList: function (params) {
                return this.restangular.all(this.route).getList(params);
            },
            get: function (id, params) {
                return this.restangular.one(this.route, id).get(params);
            },
            update: function (updatedResource) {
                return updatedResource.put().$object;
            },
            create: function (newResource) {
                return this.restangular.all(this.route).post(newResource);
            },
            remove: function (object) {
                return this.restangular.one(this.route, object.id).remove();
            }
        };

        AbstractRepository.extend = function (repository) {
            repository.prototype = Object.create(AbstractRepository.prototype);
            repository.prototype.constructor = repository;
        };

        return AbstractRepository;
    }
})();
