(function() {
  'use strict';

  angular
    .module('pogodno')
    .directive('pogoReviews', pogoReviews);

  /** @ngInject */
  function pogoReviews() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/pogoReviews/pogoReviews.html'
    };

    return directive;

    /** @ngInject */
  }

})();
