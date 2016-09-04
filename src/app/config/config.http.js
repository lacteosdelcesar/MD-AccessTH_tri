/**
 * Created by tav0 on 25/05/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config(RestangularProvider, API) {

        RestangularProvider.setBaseUrl(API);

        RestangularProvider.addResponseInterceptor(parseApiResponse);

        /////////

        function parseApiResponse(data) {
            var response = data;

            if (data.data) {
                response = data.data;
                delete data.data;
                response.metadata = data;
            }

            return response;
        }
    }
})();
