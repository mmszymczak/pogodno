(function() {
    'use strict';

    angular
        .module('pogodno')
        .directive('pogoNavbar', pogoNavbar);

    /** @ngInject */
    function pogoNavbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/pogoNavbar/pogoNavbar.html'
        };

        return directive;

        /** @ngInject */
    }

})();
