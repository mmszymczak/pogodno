(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('DescriptionController', DescriptionController);

    DescriptionController.$inject = ['internalDb'];

    function DescriptionController(internalDb) {

        var vm = this;
        vm.limitToValue = 3;

        vm.activeThing = internalDb.getActiveThing();
    }

})();
