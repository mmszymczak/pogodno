(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($route, $q, toastr, internalDb, IssuuFactory, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $firebaseObject, Firebase, GravatarFactory) {

    var vm = this;

    vm.ref = new Firebase(firebaseUrl);
    vm.showAbout = false;
    vm.showHeader = true;
    vm.showJumbo = false;

    vm.showAboutChange = showAboutChange;
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

            var reviewsRef = vm.ref.child('_content/'+ internalDb.getCurrentDocumentIndex() + '/document/reviews');
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

  }
})();
