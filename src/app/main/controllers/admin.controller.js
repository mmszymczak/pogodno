(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['Firebase', 'firebaseUrl'];

  function AdminController(Firebase, firebaseUrl) {

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
