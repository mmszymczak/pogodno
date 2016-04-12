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
      // controller: MainController,
      // controllerAs: 'mainCtrl'
    };
    return directive;

    // function jumboController(webDevTec){
    //   var vm = this;
    //   vm.active = webDevTec.getActiveThing();
    //   console.log(webDevTec.getActiveThing());

    // }
  }

})();
