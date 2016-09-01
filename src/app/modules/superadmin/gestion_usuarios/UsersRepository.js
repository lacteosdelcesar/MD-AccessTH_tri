/**
 * Created by tav0 on 2/06/16.
 */

(function() {
    'use strict';

    angular
        .module('gestion_usuarios')
        .factory('Users', repository);

    /* @ngInject */
    function repository(AbstractRepository) {
        function UsersRepository() {
            AbstractRepository.call(this, 'users');
        }

        AbstractRepository.extend(UsersRepository);

        return new UsersRepository();
    }
})();
