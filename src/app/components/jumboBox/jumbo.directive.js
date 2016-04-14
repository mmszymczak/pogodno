(function() {
  'use strict';

  angular
    .module('pogodno')
    .directive('acmeJumbo', acmeJumbo);

  /** @ngInject */
  function acmeJumbo() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/jumboBox/jumbo.html'
    };
    return directive;
  }

})();
