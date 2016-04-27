(function() {
  'use strict';

  angular
      .module('pogodno')
      .service('internalDb', internalDb);

  /** @ngInject */
  function internalDb() {
    var vm = this;
    
    vm.setPage = setPage;
    vm.getPage = getPage;
    vm.getTotalNumPage = getTotalNumPage;
    vm.setTotalNumPage = setTotalNumPage;

    vm.currentPage = 1;
    vm.totalNumPage;
    vm.issuuData = {}

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


    return {
      getPage : getPage,
      setPage : setPage,
      getTotalNumPage : getTotalNumPage,
      setTotalNumPage : setTotalNumPage
    }
  }

})();
