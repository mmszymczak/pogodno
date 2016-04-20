/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('pogodno')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('firebaseUrl', 'https://pogodnodb.firebaseio.com/');

})();
