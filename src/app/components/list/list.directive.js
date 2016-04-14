(function() {
  'use strict';

  angular
    .module('pogodno')
    .directive('documentsList', documentsList);

  /** @ngInject */
  function documentsList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/list/list.html',
    };

    return directive;

    /** @ngInject */
  }

})();
