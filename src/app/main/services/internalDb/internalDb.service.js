(function() {
  'use strict';

  angular
      .module('pogodno')
      .service('internalDb', internalDb);

  /** @ngInject */
  function internalDb(firebaseUrl, $firebaseObject) {
    var vm = this;

    var ref = new Firebase(firebaseUrl);

    vm.setPage = setPage;
    vm.getPage = getPage;
    vm.getTotalNumPage = getTotalNumPage;
    vm.setTotalNumPage = setTotalNumPage;
    vm.getImportantData = getImportantData;

    vm.currentPage = 1;
    vm.totalNumPage;
    vm.issuuData = {}
    vm.obj = [];

    function getPage() {
      return vm.currentPage;
    }

    function setPage(element) {
      vm.currentPage = element
    }

    function getTotalNumPage() {
      return vm.totalNumPage;
    }

    function setTotalNumPage(element) {
      vm.totalNumPage = element
    }

    function getImportantData(data) {
      data.forEach(function(element,index){
          vm.obj[index] = {};
          vm.obj[index].document = {};
          vm.obj[index].document.coverID = ((index+1) < 10) ? '0' + (index+1).toString() : (index+1).toString();
          vm.obj[index].document.title = element.document.title;
          vm.obj[index].document.pageCount = element.document.pageCount;
          vm.obj[index].document.created = element.document.created;
          vm.obj[index].document.id = element.document.documentId;

          $firebaseObject(ref.child('_content').child(index).child('document')).$loaded(
            function(data) {
              vm.obj[index].document.coverCuriosities = data.coverCuriosities;
              vm.obj[index].document.posts = data.posts;

            },
            function(error) {
              console.error("Error:", error);
            }
          );


          if (!vm.obj[index].document.reviews) {
              vm.obj[index].document.reviews = [];
          }
      });
      return vm.obj;
    }

    return {
      getPage : getPage,
      setPage : setPage,
      getTotalNumPage : getTotalNumPage,
      setTotalNumPage : setTotalNumPage,
      getImportantData : vm.getImportantData
    }
  }

})();
