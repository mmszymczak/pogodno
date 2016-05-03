(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('AdminController', AdminController);

  /** @ngInject */
  function AdminController($route, $q, toastr, internalDb, IssuuFactory, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $firebaseObject, Firebase, GravatarFactory) {

    var vm = this;
    var ref = new Firebase(firebaseUrl);
    vm.login = login;
    vm.showLoginAdmin = true;

    function login(){
          ref.authWithPassword({
          email    : vm.username,
          password : vm.password
        }, function(error) {    // authData param
          if (error) {
            toastr.error('Oj... Coś poszło nie tak.');
            vm.showLoginAdmin = true;
          } else {
            toastr.success('Pomyślna próba zalogowania!');
            vm.adminAuth = true;
            vm.showLoginAdmin = false;
          }
        });
    }



  }
})();
