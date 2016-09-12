/**
 * Created by tav0 on 4/09/16.
 */

(function() {
    'use strict';

    angular
        .module('periodos')
        .factory('Periodos', factory);

    /* @ngInject */
    function factory(AbstractRepository) {
        function Repository() {
            AbstractRepository.call(this, 'periodos');
        }

        AbstractRepository.extend(Repository);

        Repository.prototype.getActual = function () {
            return this.restangular.one(this.route, 'actual').withHttpConfig({ cache: true }).get();
        }

        return new Repository();
    }
})();
