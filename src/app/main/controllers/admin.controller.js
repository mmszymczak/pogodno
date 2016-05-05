(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('AdminController', AdminController);

  /** @ngInject */
  function AdminController($route, $q, toastr, internalDb, adminService, IssuuFactory, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $firebaseObject, Firebase, GravatarFactory) {

    var vm = this;
    var ref = new Firebase(firebaseUrl);
    vm.login = login;
    vm.logout = logout;
    vm.showLoginAdmin = adminService.admin;

    function login(){
          ref.authWithPassword({
          email    : vm.username,
          password : vm.password
        }, function(error) {    // authData param
          if (error) {
            toastr.error('Oj... Coś poszło nie tak.');
            vm.showLoginAdmin.connected = false;
          } else {
            toastr.success('Pomyślna próba zalogowania!');
            vm.adminAuth = true;
            vm.showLoginAdmin.connected = true;
            vm.showLoginAdmin.username = vm.username;
          }
        });
    }

    function logout() {
        adminService.admin.connected = false;
    }



  }
})();
