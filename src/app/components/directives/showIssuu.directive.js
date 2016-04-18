(function() {
  'use strict';

  angular
    .module('pogodno')
    .directive('showIssuu', showIssuu);

  /** @ngInject */
  function showIssuu($window) {
    var directive = {
      restrict: 'E',
      scope: {
        id : '='
      },
      link : function(scope){
        scope.$watch('id',func, true);
        console.log(5, scope);
        function func(id) {
          scope.test = id;
        }
      },
      templateUrl: 'app/components/directives/showIssuu.html'
    };
    return directive;
  }

})();