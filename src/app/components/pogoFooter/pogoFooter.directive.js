(function() {
    'use strict';

    angular
        .module('pogodno')
        .directive('pogoFooter', pogoFooter);


    function pogoFooter() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/pogoFooter/pogoFooter.html'
        };

        return directive;
    }

})();
