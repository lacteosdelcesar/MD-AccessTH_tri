(function() {
    'use strict';

    angular
        .module('gestion_usuarios')
        .controller('FabController', FabController);

    /* @ngInject */
    function FabController($rootScope) {
        var vm = this;
        vm.addTodo = addTodo;
        vm.sync = sync;

        ////////////////

        function addTodo($event) {
            $rootScope.$broadcast('addUser', $event);
        }

        function sync($event) {
            $rootScope.$broadcast('syncUsers', $event);
        }
    }
})();
