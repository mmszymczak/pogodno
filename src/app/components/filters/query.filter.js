(function() {
    'use strict';

angular
    .module('pogodno')
    .filter('queryFilter', queryFilter);


    function queryFilter () {

        return function (allItems, query) {

            if (!query) { 

                return allItems; 

            } else {

                var items = [];
                var regex = new RegExp( query, "g");

                for ( var i = 0 ; i < allItems.length ; i ++ ) {

                    if ( regex.test(allItems[i].name) ) {
                    items.push(allItems[i]);
                    }
                }
                return items;
            }  
        } 
    }
  
})();