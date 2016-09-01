/**
 * Created by tav0 on 7/06/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .factory('Toast', factory);

    /** @ngInject **/
    function factory($mdToast) {
        return function (text, position, delay, parent) {
            $mdToast.show({
                template: '' +
                '<md-toast id="language-message" layout="column" layout-align="center start">' +
                '<div class="md-toast-content">' +
                text +
                '</div>' +
                '</md-toast>',
                hideDelay: delay || 4000,
                position: position || 'top right',
                parent: parent || '#content'
            });
        };
    }
})();
