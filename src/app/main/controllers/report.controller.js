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
            var commentsRef = new Firebase('https://pogodno.firebaseio.com/reported/');

            repCtrl.reportedComments = $firebaseArray(commentsRef);
        }

        function approvedComment(comment) {
            adminService.admin.replaceVerifiedComment(comment);
            deleteRepoted(comment);
        }

        function deleteRepoted(comment) {
            var reportRef = new Firebase('https://pogodno.firebaseio.com/reported/'+comment.$id);
            reportRef.remove();
        }

        function deleteComment(comment) {
            deleteRepoted(comment);
            var commentsRef = new Firebase('https://pogodno.firebaseio.com/_content/'+ comment.dbID + '/document/reviews/'+comment.commonId);
            commentsRef.remove();
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
