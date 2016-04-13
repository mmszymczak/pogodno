(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $timeout, webDevTec, toastr) {
    var vm = this;

    vm.comment = {};
    vm.awesomeThings = webDevTec.getTec();
    vm.creationDate = 1460370412681;
    vm.showJumbo = false;
    vm.toggleWindow = toggleWindow;
    vm.activeThing = '';
    vm.addReview = addReview;


    function toggleWindow(awesomeThing){
      if (vm.activeThing === ''){
        vm.showJumbo = !vm.showJumbo;
        vm.activeThing = awesomeThing;
      } else if (awesomeThing.title === vm.activeThing.title){
        vm.showJumbo = !vm.showJumbo;
      } else if (!vm.showJumbo) {
        vm.activeThing = awesomeThing;
        vm.showJumbo = !vm.showJumbo;
      } else {
        vm.activeThing = awesomeThing;
      }
      //console.log(1, vm.activeThing);
      //webDevTec.setActiveThing(vm.activeThing);
    }

    function addReview(product){
     vm.activeThing.reviews.push(product);
     vm.comment = {};
    }
  }

})();
