(function() {
  'use strict';

  angular
    .module('pogodno')
    .directive('acmeFooter', acmeFooter);

  /** @ngInject */
  function acmeFooter() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/footer/footer.html',

    };
    return directive;
  }

})();
