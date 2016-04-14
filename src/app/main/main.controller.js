(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(internalDb, Issuu, $location, $anchorScroll) {
    var vm = this;
    vm.comment = {};
    //vm.awesomeThings = internalDb.getTec();
    vm.creationDate = 1460370412681;
    vm.showJumbo = false;
    vm.toggleWindow = toggleWindow;
    vm.activeThing = '';
    vm.addReview = addReview;
    vm.hideJumbo = hideJumbo;
    vm.allIssuu = {};
    vm.allData = Issuu.const();
    vm.allDoc = vm.allData.rsp._content.result._content;
    vm.awesomeThings = vm.allDoc;
    vm.go = go;
    // Issuu.const(function(data){ 
    //   //vm.allData = data;
    //   console.log(data);
    // });

    vm.navLinks = [{
        Title: '',
        LinkText: 'Strona Główna',
    }, {
        Title: 'team',
        LinkText: 'O Redakcji'
    }, {
        Title: 'about',
        LinkText: 'O Gazecie'
    }];

    vm.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || '';
        return page === currentRoute ? 'active' : '';
    };


    function hideJumbo() {
      return vm.showJumbo = false;
    }

    function toggleWindow(awesomeThing) {
        console.log(awesomeThing);
      if (vm.activeThing === ''){
        vm.showJumbo = !vm.showJumbo;
        vm.activeThing = awesomeThing;
      } else if (awesomeThing.document.documentId === vm.activeThing.document.documentId){
        vm.showJumbo = !vm.showJumbo;
      } else if (!vm.showJumbo) {
        vm.activeThing = awesomeThing;
        vm.showJumbo = !vm.showJumbo;
      } else {
        vm.activeThing = awesomeThing;
      }
    }

    function addReview(product) {
        if (!vm.activeThing.document.reviews){
            vm.activeThing.document.reviews = [];
        }
        vm.activeThing.document.reviews.push(product);
        vm.comment = {};
    }

    function go(path){
        $location.path(path);
        $anchorScroll();
    }
  
  }

})();
