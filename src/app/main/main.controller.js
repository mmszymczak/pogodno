(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.creationDate = 1460370412681;
    vm.showJumbo = false;
    vm.toggleWindow = toggleWindow;
    vm.activeThing = '';
    vm.addReview = addReview;
    
    //vm.awesomeThings = webDevTec.getTec();
    
    activate();

    function activate() {
      vm.awesomeThings = webDevTec.getTec();
    }

    // function getMagazines() {
    //   vm.awesomeThings = webDevTec.getTec();
    // }

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

      // webDevTec.activeThing = vm.activeThing;
      
      webDevTec.setActiveThing(vm.activeThing);
      console.log(webDevTec.getActiveThing());
    }

    function addReview(product){
      console.log(product);
      console.log(vm.activeThing.comments);
     vm.activeThing.comments.push(product);
    }
  }

})();
