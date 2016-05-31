(function() {
    'use strict';

    angular
        .module('app')
        .config(themesConfig);

    /* @ngInject */
    function themesConfig ($mdThemingProvider, triThemingProvider, triSkinsProvider) {
        /**
         *  PALETTES
         */
        $mdThemingProvider.definePalette('blueklarens', {
            "50": "#bed9f9",
            "100": "#78b0f3",
            "200": "#4492ef",
            "300": "#136dd8",
            "400": "#105fbc",
            "500": "#0e51a0",
            "600": "#0c4384",
            "700": "#093468",
            "800": "#07264c",
            "900": "#04182f",
            "A100": "#bed9f9",
            "A200": "#78b0f3",
            "A400": "#105fbc",
            "A700": "#093468",
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 A100',
            'contrastStrongLightColors': '300 400 A200 A400'
        });

        /**
         *  SKINS
         */

        // BLUE KLARENS SKIN
        triThemingProvider.theme('bluek')
            .primaryPalette('blueklarens' , {
                'default': '500'
            })
            .accentPalette('green', {
                'default': '700'
            })
            .warnPalette('deep-orange');

        triSkinsProvider.skin('blue-klarens', 'Blue Klarens')
            .sidebarTheme('bluek')
            .toolbarTheme('bluek')
            .logoTheme('bluek')
            .contentTheme('bluek');


        /**
         *  FOR DEMO PURPOSES ALLOW SKIN TO BE SAVED IN A COOKIE
         *  This overrides any skin set in a call to triSkinsProvider.setSkin if there is a cookie
         *  REMOVE LINE BELOW FOR PRODUCTION SITE
         */
        triSkinsProvider.useSkinCookie(true);

        /**
         *  SET DEFAULT SKIN
         */
        triSkinsProvider.setSkin('blue-klarens');
    }
})();
