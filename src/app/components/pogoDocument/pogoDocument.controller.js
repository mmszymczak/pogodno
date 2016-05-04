(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('DocumentController', DocumentController);

    DocumentController.$inject = ['internalDb', '$location'];

    function DocumentController(internalDb, $location) {

        var vm = this;
        vm.acmeDb = internalDb.getImportantData();
        vm.activeIssuuId;
        vm.showJumbo;

        vm.acmeDb.forEach(function(element,index){
          if (element.document.coverID === $location.path().substring(7)) {
              vm.showJumbo = true;
              internalDb.setActiveIssuuId(vm.acmeDb[index].document.id);
              vm.activeIssuuId = internalDb.getActiveIssuuId();
          }
        });

  }

})();
