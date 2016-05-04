(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('ShowallController', ShowallController);


    ShowallController.$inject = ['Firebase', 'firebaseUrl', 'internalDb', 'IssuuFactory', '$location', '$anchorScroll', '$firebaseArray'];

    function ShowallController(Firebase, firebaseUrl, internalDb, IssuuFactory, $location, $anchorScroll, $firebaseArray) {

        var vm = this;
        internalDb.setTotalNumPage(IssuuFactory.doIssuuStuff().rsp._content.result.totalCount);

        vm.ref = new Firebase(firebaseUrl);
        vm.totalNumPages = internalDb.getTotalNumPage();
        vm.currentPage = internalDb.getPage();
        vm.changePagin = changePagin;
        vm.itemsPerPage = 6;
        vm.isActive = isActive;
        vm.acmeDb = internalDb.getImportantData();
        vm.filteredItems;

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


    function changePagin(){
       internalDb.setPage(vm.currentPage);
    }

    function isActive(item) {
        return internalDb.getActiveThing().coverID === item;
    }


    }
})();
