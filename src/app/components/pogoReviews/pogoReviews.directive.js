(function() {
    'use strict';

    angular
        .module('pogodno')
        .directive('pogoReviews', pogoReviews);

    function pogoReviews() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/pogoReviews/pogoReviews.html',
            controller: 'ReviewController',
            controllerAs: 'ReviewCtrl'
        };

        return directive;

    }

})();
