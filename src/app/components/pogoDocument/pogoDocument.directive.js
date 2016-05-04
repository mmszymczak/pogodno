(function() {
    'use strict';

    angular
        .module('pogodno')
        .directive('pogoDocument', pogoDocument);


    function pogoDocument() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/pogoDocument/pogoDocument.html',
            controller: 'DocumentController',
            controllerAs: 'documentCtrl'
        };
        return directive;

    }
})();
