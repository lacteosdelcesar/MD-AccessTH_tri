/**
 * Created by tav0 on 2/06/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config(RestangularProvider, API) {
        RestangularProvider.setBaseUrl(API);

        RestangularProvider.addResponseInterceptor(parseApiResponse);

        function parseApiResponse(data, operation) {
            var response = data;

            if (data.data) {
                response = data.data;
                response.metadata = _.omit(data, 'data');
            }

            return response;
        }
    }
})();
