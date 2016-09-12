/**
 * Created by tav0 on 4/09/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .directive('nextOnEnter', nextOnEnter);

    function nextOnEnter() {
        return function(scope, element) {
            element.bind('keydown keypress', function(event) {
                if(event.which === 13) {
                    event.preventDefault();
                    var fields=$(this).parents('form:eq(0),body').find('input, textarea, select');
                    var index=fields.index(this);
                    if(index> -1&&(index+1)<fields.length)
                        fields.eq(index+1).focus();
                }
            });
        }
    }
})();
