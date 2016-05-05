(function() {
'use strict';

    angular
        .module('pogodno')
        .controller('ModerateController', ModerateController);

    /** @ngInject */
    function ModerateController(adminService, $location, GravatarFactory, internalDb) {
        var modCtrl = this;

        modCtrl.logout = logout;
        modCtrl.showLoginAdmin = adminService.admin;
        modCtrl.gravatarUrl = gravatarUrl;
        modCtrl.comments = internalDb.getMessages();

        activate();

        function activate() {
            if(!adminService.admin.connected) {
                $location.path('admin');
            }
        }

        function logout() {
            adminService.admin.connected = false;
            $location.path('admin');
        }

        function gravatarUrl(email) {
            return GravatarFactory(email);
        }
    }

})();
