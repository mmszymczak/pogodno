(function() {
    'use strict';

    angular
        .module('pogodno')
        .directive('pogoNavbar', pogoNavbar);

    function pogoNavbar() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/pogoNavbar/pogoNavbar.html',
            controller: 'NavbarController',
            controllerAs: 'NavbarCtrl'
        };

        return directive;

    }

})();
