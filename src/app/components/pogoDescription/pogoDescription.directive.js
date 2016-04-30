(function() {
    'use strict';

    angular
        .module('pogodno')
        .directive('pogoDescription', pogoDescription);

    /** @ngInject */
    function pogoDescription() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/pogoDescription/pogoDescription.html'
        };

        return directive;

        /** @ngInject */
    }

})();
