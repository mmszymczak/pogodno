(function() {
    'use strict';

    angular
        .module('pogodno')
        .run(runBlock);

    runBlock.$inject = ['$log'];

    function runBlock($log) {

        $log.debug('runBlock end');
    }

})();
