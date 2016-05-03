(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('ListController', ListController);

  /** @ngInject */
    function ListController(internalDb) {


        var vm = this;

        vm.go = go;
        vm.acmeDb = internalDb.getImportantData();

        function go()  {
            $anchorScroll();
        }

    }
})();
