(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($route, $q, toastr, internalDb, IssuuFactory, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $firebaseObject, Firebase, GravatarFactory) {

    var vm = this;
    internalDb.setTotalNumPage(IssuuFactory.doStuff().rsp._content.result.totalCount);


    var ref = new Firebase(firebaseUrl);

    vm.totalNumPages = internalDb.getTotalNumPage();

    vm.hashValue = $routeParams.filter;
    vm.showHeader = true;
    vm.login = login;
    vm.activeThing = '';
    vm.addReview = addReview;
    vm.hideJumbo = hideJumbo;
    vm.showJumbo = false;
    vm.isActive = isActive;
    vm.resetForm = resetForm;
    vm.limitToValue = 3;
    vm.allDoc = IssuuFactory.doStuff().rsp._content.result._content;
    vm.acmeDb = internalDb.getImportantData(vm.allDoc);

    function resetForm(form) {
      form.$setPristine();
    }

    vm.go = go;
    vm.awesomeThingCurrent;

    vm.currentPage = internalDb.getPage();

    vm.pageSize = IssuuFactory.doStuff().rsp._content.result.pageSize;
    vm.pageChangeHandler = pageChangeHandler;
    vm.changePagin = changePagin;
    vm.itemsPerPage = 6;
    vm.gravatarUrl = gravatarUrl;
    vm.showLoginAdmin = true;

    function gravatarUrl(email) {
      return GravatarFactory(email);
    }

    function pageChangeHandler(num) {
        internalDb.setPage(num);
    }

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

    $scope.$on("$routeChangeSuccess", function () {
        vm.acmeDb.forEach(function(element,index){
            if (element.document.coverID === $location.path().substring(7)) {
                vm.activeThing = vm.acmeDb[index].document;
                vm.showJumbo = true;
                vm.activeIssuuId = vm.acmeDb[index].document.id;
                $anchorScroll(vm.acmeDb[index].document);
                vm.currentDocumentIndex = index;
                var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/document/reviews');
                vm.messages = $firebaseArray(reviewsRef);
            }
        });

        if($location.path().substring(1)) {
            vm.showHeader = false;
        } else {
            vm.showHeader = true;
        }
        vm.currentPage = internalDb.getPage();
    });

/////////////// Navbar ////////////////////////////////////////
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

    vm.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || '';
        return page === currentRoute ? 'active' : '';
    };
/////////////// Navbar ////////////////////////////////////////

    // function resetDatabase() {
    //     var json = JSON.stringify(vm.acmeDb._content, function( key, value ) {
    //         if( key === "$$hashKey" ) {
    //             return undefined;
    //         }
    //         return value;
    //     });

    //     var finalData = angular.fromJson(json);
    //     var reviewsRef = ref.child('_content/');
    //     reviewsRef.set(finalData);
    // }

    function hideJumbo() {
      return vm.showJumbo = false;
    }

    function isActive(item) {
        return vm.activeThing.coverID === item;
    }

    function go()  {
        $anchorScroll();
    }

    function addReview() {
      vm.review.date = Date.now();
        console.log(vm.review);
        var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/document/reviews');
        vm.messages = $firebaseArray(reviewsRef);
        vm.messages.$add(vm.review);
        vm.review = {};
    }

    function changePagin(){
       internalDb.setPage(vm.currentPage);
    }

  }
})();
