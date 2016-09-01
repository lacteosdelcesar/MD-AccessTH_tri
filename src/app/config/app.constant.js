(function() {
    'use strict';

    angular
        .module('app')
        // set a constant for the API we are connecting to
        .constant('API', 'http://localhost/dev/accessrh/lmn-untitledApi-K/public/api/')
        .constant('DOMAIN_API', 'localhost');
})();
