(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('ListController', ListController);

    ListController.$inject = ['internalDb'];

    function ListController(internalDb) {

        var vm = this;

        vm.go = go;
        vm.acmeDb = internalDb.getImportantData();

        function go()  {
            $anchorScroll();
        }

    }
})();
