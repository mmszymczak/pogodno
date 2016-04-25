(function() {
  'use strict';

  angular
      .module('pogodno')
      .service('internalDb', internalDb);

  /** @ngInject */
  function internalDb() {
    var vm = this;
    
    vm.setData = setData;
    vm.getData = getData;
    vm.setIssuu = setIssuu;
    vm.getIssuu = getIssuu;

    vm.currentPage;
    vm.issuuData = {}

    function getData() {
      return vm.data;
    }

    function setData(element) {
      vm.data = element
    }

    function setIssuu(element) {
      vm.issuuData = element
    }

    function getIssuu(){
      return vm.issuuData;
    }

    return {
      getData : getData,
      setData : setData,
      getIssuu : getIssuu,
      setIssuu : setIssuu
    }
  }

})();
