/**
 * Created by tav0 on 2/06/16.
 */

(function() {
    'use strict';

    angular
        .module('gestion_usuarios')
        .factory('Descuentos', factory);

    /* @ngInject */
    function factory(RepositoriesFactory) {

        return new RepositoriesFactory.new('descuentos');
    }
})();
