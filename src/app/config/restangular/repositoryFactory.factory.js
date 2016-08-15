/**
 * Created by tav0 on 2/06/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .factory('RepositoriesFactory', factory);

    /* @ngInject */
    function factory(AbstractRepository) {
        return {
            'new': newRepo
        }

        function newRepo(endpoint) {
            function Repository() {
                AbstractRepository.call(this, endpoint);
            }

            AbstractRepository.extend(Repository);

            return new Repository();
        }
    }
})();
