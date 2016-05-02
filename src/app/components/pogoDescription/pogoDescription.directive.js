(function() {
    'use strict';

    angular
        .module('pogodno')
        .directive('pogoDescription', pogoDescription);

    /** @ngInject */
    function pogoDescription() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/pogoDescription/pogoDescription.html',
            controller: 'DescriptionController',
            controllerAs: 'DescriptionCtrl'
        };

        return directive;

        /** @ngInject */
    }

})();
