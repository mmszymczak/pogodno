(function() {
'use strict';

    angular
        .module('pogodno')
        .controller('ModerateController', ModerateController);

    /** @ngInject */
    function ModerateController(adminService, $location, GravatarFactory, $firebaseArray) {
        var modCtrl = this;

        modCtrl.comments = [];
        modCtrl.logout = logout;
        modCtrl.showLoginAdmin = adminService.admin;
        modCtrl.gravatarUrl = gravatarUrl;
        modCtrl.approvedComment = approvedComment;
        modCtrl.deleteComment = deleteComment;

        activate();

        function activate() {
            if(!adminService.admin.connected) {
                $location.path('admin');
            }
            getCommentsToModerate();
        }

        function getCommentsToModerate() {
            var commentsRef = adminService.admin.getCommentsToModerate();
            modCtrl.comments = $firebaseArray(commentsRef);
        }

        function approvedComment(comment) {
            adminService.admin.approvedCommentPublish(comment);
            deleteComment(comment);
        }

        function deleteComment(comment) {
            adminService.admin.deleteModerateComment(comment);
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
