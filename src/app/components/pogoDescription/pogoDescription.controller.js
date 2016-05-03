(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('DescriptionController', DescriptionController);

  /** @ngInject */
    function DescriptionController(internalDb) {

        var vm = this;
        vm.limitToValue = 3;

        vm.activeThing = internalDb.getActiveThing();
    }

})();
