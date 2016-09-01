/**
 * Created by tav0 on 15/08/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .directive('ngEnter', ngEnter);

    function ngEnter() {
        return function(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter || attrs.ngClick, {$event:event});
                    });

                    event.preventDefault();
                }
            });
        };
    }
})();
