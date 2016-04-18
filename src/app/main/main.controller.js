(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($route, $q, internalDb, Issuu, $location, $anchorScroll, $scope, $compile, $routeParams) {
    var vm = this;
    vm.comment = {};
    vm.toggleWindow = toggleWindow;
    vm.activeThing = '';
    $scope.showJumbo = false;
    vm.addReview = addReview;
    vm.hideJumbo = hideJumbo;
    vm.allIssuu = {};
    vm.allData = Issuu.const();
    vm.allDoc = vm.allData.rsp._content.result._content;
    vm.awesomeThings = vm.allDoc;
    vm.go = go;
    vm.search = search;
    vm.id = "";
    vm.refreshPage = false;
    vm.hashValue = $routeParams;
    vm.filterRoute = filterRoute;

    function filterRoute() {
    console.log(vm.hashValue);
    console.log($location.path());
    };

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

    function showJumbo() {
      return vm.showJumbo = true;
    }

    function toggleJumbo() {
      return vm.showJumbo = !vm.showJumbo;
    }


    function toggleWindow(awesomeThing, el) {

        if (vm.activeThing === ''){
        toggleJumbo();
        vm.activeThing = awesomeThing;
        console.log(1);
        console.log(vm.showJumbo);
      } else if (awesomeThing.document.documentId === vm.activeThing.document.documentId){
        vm.showJumbo = !vm.showJumbo;
        console.log(2);
      } else if (!vm.showJumbo) {
        vm.activeThing = awesomeThing;
        vm.showJumbo = !vm.showJumbo;
        console.log(3);

      } else {
        vm.activeThing = awesomeThing;        
        console.log(4);
      }

      $location.href = vm.activeThing.document.revisionId;
       // $route.reload('$location.href');      // ng-href="#/page/{{ awesomeThing.document.revisionId }}"
      // $scope.watch("showJumbo", function(newVal, oldVal){
      //   if ($scope.showJumbo)
      // })
      vm.id = vm.activeThing.document.documentId;

      // vm.refreshPage = true;
      // return vm.showJumbo;
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

    function search(query){
        vm.query = query;
    }

  }
})();
