(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($route, $q, toastr, internalDb, IssuuFactory, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $firebaseObject, Firebase, GravatarFactory) {

    var vm = this;
    console.log(IssuuFactory.doIssuuStuff());
    internalDb.setTotalNumPage(IssuuFactory.doIssuuStuff().rsp._content.result.totalCount);

    var ref = new Firebase(firebaseUrl);

    vm.totalNumPages = internalDb.getTotalNumPage();
    vm.showAbout = false;
    vm.showAboutChange = showAboutChange;
    vm.hashValue = $routeParams.filter;
    vm.showHeader = true;
    vm.hideJumbo = hideJumbo;
    vm.showJumbo = false;
    vm.isActive = isActive;
    vm.acmeDb = internalDb.getImportantData();

    vm.acmeDb.forEach(function(element,index){
        if (element.document.coverID === $location.path().substring(7)) {
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


    function pageChangeHandler(num) {
        internalDb.setPage(num);
    }

    function showAboutChange() {
      vm.showAbout = true;
    }



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
