/**
 * Created by tav0 on 2/06/16.
 */

(function() {
    'use strict';

    angular
        .module('gestion_usuarios')
        .factory('Bonificaciones', factory);

    /* @ngInject */
    function factory(RepositoriesFactory) {

        return new RepositoriesFactory.new('bonificaciones');
    }
})();
