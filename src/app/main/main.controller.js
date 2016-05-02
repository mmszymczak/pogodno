(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($route, $q, toastr, internalDb, IssuuFactory, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $firebaseObject, Firebase, GravatarFactory) {

    var vm = this;
    internalDb.setTotalNumPage(IssuuFactory.doIssuuStuff().rsp._content.result.totalCount);

    var ref = new Firebase(firebaseUrl);

    vm.totalNumPages = internalDb.getTotalNumPage();
    vm.hashValue = $routeParams.filter;
    vm.showHeader = true;
    vm.login = login;
    vm.hideJumbo = hideJumbo;
    vm.showJumbo = false;
    vm.isActive = isActive;
    vm.acmeDb = internalDb.getImportantData();
    console.log(IssuuFactory.doFirebaseStuff());

    console.log($scope);
    // vm.acmeDb = IssuuFactory.promiseData();
    console.log(vm.acmeDb);

    vm.acmeDb.forEach(function(element,index){
        if (element.document.coverID === $location.path().substring(7)) {
            console.log("jestem w srodku",vm.acmeDb);
            internalDb.setActiveThing(vm.acmeDb[index].document);
            vm.activeThing = internalDb.getActiveThing();

            vm.showJumbo = true;

            internalDb.setActiveIssuuId(vm.acmeDb[index].document.id);
            vm.activeIssuuId = internalDb.getActiveIssuuId();

            $anchorScroll(vm.acmeDb[index].document);

            internalDb.setCurrentDocumentIndex(index);
            vm.currentDocumentIndex = internalDb.getCurrentDocumentIndex();

            var reviewsRef = ref.child('_content/'+ internalDb.getCurrentDocumentIndex() + '/document/reviews');
            internalDb.setMessages($firebaseArray(reviewsRef));
            vm.messages = internalDb.getMessages();
        }

        if($location.path().substring(1)) {
            vm.showHeader = false;
        } else {
            vm.showHeader = true;
        }
        vm.currentPage = internalDb.getPage();
    });


    vm.go = go;
    vm.awesomeThingCurrent;

    vm.currentPage = internalDb.getPage();

    vm.pageSize = IssuuFactory.doIssuuStuff().rsp._content.result.pageSize;
    vm.pageChangeHandler = pageChangeHandler;
    vm.changePagin = changePagin;
    vm.itemsPerPage = 6;
    vm.showLoginAdmin = true;

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
    // console.log(4234234,vm.acmeDb);
    // vm.acmeDb.forEach(function(element,index){
    //     console.log(123,vm.acmeDb);
    //     console.log(321,vm.acmeDb[index]);
    //     if (element.document.coverID === $location.path().substring(7)) {

    //         internalDb.setActiveThing(vm.acmeDb[index].document);
    //         vm.activeThing = internalDb.getActiveThing();

    //         console.log(internalDb.getActiveThing());


    //         vm.showJumbo = true;

    //         internalDb.setActiveIssuuId(vm.acmeDb[index].document.id);
    //         vm.activeIssuuId = internalDb.getActiveIssuuId();

    //         $anchorScroll(vm.acmeDb[index].document);

    //         internalDb.setCurrentDocumentIndex(index);
    //         vm.currentDocumentIndex = internalDb.getCurrentDocumentIndex();

    //         var reviewsRef = ref.child('_content/'+ internalDb.getCurrentDocumentIndex() + '/document/reviews');
    //         internalDb.setMessages($firebaseArray(reviewsRef));
    //         vm.messages = internalDb.getMessages();
    //     }

    //     if($location.path().substring(1)) {
    //         vm.showHeader = false;
    //     } else {
    //         vm.showHeader = true;
    //     }
    //     vm.currentPage = internalDb.getPage();
    // });

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
        return internalDb.getActiveThing() === item;
    }

    function go()  {
        $anchorScroll();
    }

    function changePagin(){
       internalDb.setPage(vm.currentPage);
    }


  }
})();
