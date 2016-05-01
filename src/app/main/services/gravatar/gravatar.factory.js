(function() {
  'use strict';

    angular
    .module('pogodno')
    .factory('GravatarFactory', GravatarFactory);

    function GravatarFactory(){
        var avatarSize = 80;
        var avatarUrl = "http://www.gravatar.com/avatar/"
      return function(email) {
        return avatarUrl + CryptoJS.MD5(email) + avatarSize.toString();
      }
    }

})();
