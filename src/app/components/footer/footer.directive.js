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
      // controller: FooterController,
      // controllerAs: 'vm',
      // bindToController: true
    };

    return directive;

    /** @ngInject */
    // function FooterController(moment) {
    //   var vm = this;

    //   // "vm.creationDate" is available by directive option "bindToController: true"
    //   vm.relativeDate = moment(vm.creationDate).fromNow();
    // }
  }

})();
