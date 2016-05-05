(function(){
    'use strict';

    angular
        .module('pogodno')
        .service('adminService', adminService);

    adminService.$inject = [];

    function adminService() {
        //  when user logged in whole informations load here
        var admin = {
            connected: false,
            username: ''
        };
        return {admin: admin};
    }

})();
