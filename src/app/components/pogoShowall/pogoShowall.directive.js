(function() {
    'use strict';

    angular
        .module('pogodno')
        .directive('pogoShowall', pogoShowall);

    /** @ngInject */
    function pogoShowall() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/pogoShowall/pogoShowall.html',
            controller: 'ShowallController',
            controllerAs: 'showallCtrl'
        };
        return directive;
    }

})();
