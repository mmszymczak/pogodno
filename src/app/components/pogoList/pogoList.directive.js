(function() {
    'use strict';

    angular
        .module('pogodno')
        .directive('pogoList', pogoList);

    /** @ngInject */
    function pogoList() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/pogoList/pogoList.html',
            controller: 'ListController',
            controllerAs: 'ListCtrl'
        };

        return directive;

        /** @ngInject */
    }

})();
