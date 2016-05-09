(function() {
'use strict';

    angular
        .module('pogodno')
        .controller('ReportController', ReportController);

    /** @ngInject */
    function ReportController(adminService, $location, GravatarFactory, $firebaseArray) {
        var repCtrl = this;

        repCtrl.reportedComments = [];
        repCtrl.logout = logout;
        repCtrl.showLoginAdmin = adminService.admin;
        repCtrl.gravatarUrl = gravatarUrl;
        repCtrl.approvedComment = approvedComment;
        repCtrl.deleteComment = deleteComment;

        activate();

        function activate() {
            if(!adminService.admin.connected) {
                $location.path('admin');
            }
            getReportedComments();
        }

        function getReportedComments() {
            var commentsRef = adminService.admin.getReportedComments();
            repCtrl.reportedComments = $firebaseArray(commentsRef);
        }

        function approvedComment(comment) {
            adminService.admin.replaceVerifiedComment(comment);
            deleteRepoted(comment);
        }

        function deleteRepoted(comment) {
            adminService.admin.deleteReported(comment);
        }

        function deleteComment(comment) {
            deleteRepoted(comment);
            adminService.admin.deleteComment(comment);
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
