(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
    function NavbarController($route, $q, toastr, internalDb, IssuuFactory, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $firebaseObject, Firebase, GravatarFactory) {

        var vm = this;
        vm.hideJumbo = hideJumbo;
        vm.navClass = navClass;

        vm.navLinks = [{
            Title: '',
            LinkText: 'Strona Główna'
        }, {
            Title: 'team',
            LinkText: 'O Redakcji'
        }, {
            Title: 'about',
            LinkText: 'O Gazecie'
        }];

        function navClass(page) {
            var currentRoute = $location.path().substring(1) || '';
            return page === currentRoute ? 'active' : '';
        }

        function hideJumbo() {
          return vm.showJumbo = false;
        }
    }
    
})();
