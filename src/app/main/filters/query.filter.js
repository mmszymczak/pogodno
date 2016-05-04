(function() {
  'use strict';

  angular
    .module('pogodno')
    .filter("queryFilter", queryFilter);

    queryFilter.$inject = ['$parse'];

    function queryFilter($parse) {
		return function(value, context, path) {
			return $parse(path).assign(context, value);
		};
	}

})();
