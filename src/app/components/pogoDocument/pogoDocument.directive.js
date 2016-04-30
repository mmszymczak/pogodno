(function() {
    'use strict';

    angular
        .module('pogodno')
        .directive('pogoDocument', pogoDocument);

    /** @ngInject */
    function pogoDocument() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/pogoDocument/pogoDocument.html'
        };
        return directive;
    }

})();
