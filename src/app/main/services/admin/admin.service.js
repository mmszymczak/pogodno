(function(){
    'use strict';

    angular
        .module('pogodno')
        .service('adminService', adminService);

    adminService.$inject = ['firebaseUrl'];

    function adminService(firebaseUrl) {
        var admin = {
            connected: false,
            username: '',
            moderateArr: [],
            sendCommentToModerator: sendCommentToModerator,
            approvedCommentPublish: approvedCommentPublish,
            sendCommentToReport: sendCommentToReport,
            cleanObjToPush: cleanObjToPush,
            replaceVerifiedComment: replaceVerifiedComment,
            deleteComment: deleteComment,
            deleteReported: deleteReported,
            getReportedComments: getReportedComments,
            getCommentsToModerate: getCommentsToModerate,
            deleteModerateComment: deleteModerateComment
        };
        return {admin: admin};

        function sendCommentToModerator(commentObj) {
            var placeRef = new Firebase(firebaseUrl + 'moderate/');
            placeRef.push(commentObj);
        }

        function sendCommentToReport(commentObj) {
            var placeRef = new Firebase(firebaseUrl + 'reported/');
            placeRef.push(commentObj);
        }

        function approvedCommentPublish(commentObj) {
            commentObj = cleanObjToPush(commentObj);
            var placeRef = new Firebase(firebaseUrl + '_content/'+ commentObj.dbID + '/document/reviews');
            placeRef.push(commentObj);
        }

        function replaceVerifiedComment(commentObj) {
            var commentID = commentObj.commonId;
            commentObj = cleanObjToPush(commentObj);

            var placeRef = new Firebase(firebaseUrl + '_content/'+ commentObj.dbID + '/document/reviews/');
            placeRef.child(commentID).update(commentObj);
        }

        function deleteComment(commentObj) {
            var commentsRef = new Firebase(firebaseUrl + '_content/'+ commentObj.dbID + '/document/reviews/'+ commentObj.commonId);
            commentsRef.remove();
        }

        function deleteReported(commentObj) {
            var reportRef = new Firebase(firebaseUrl + 'reported/'+ commentObj.$id);
            reportRef.remove();
        }

        function getReportedComments() {
            var commentsRef = new Firebase(firebaseUrl + 'reported/');
            return commentsRef;
        }

        function getCommentsToModerate() {
            var commentsRef = new Firebase(firebaseUrl + 'moderate/');
            return commentsRef;
        }

        function deleteModerateComment(commentObj) {
            var commentsRef = new Firebase(firebaseUrl + 'moderate/'+ commentObj.$id);
            commentsRef.remove();
        }

        function cleanObjToPush(comment){
            if(typeof comment.context == 'undefined'){
                comment.context = '';
            }
            var cleanObj = {
                context: comment.context,
                date: comment.date,
                dbID: comment.dbID,
                grade: comment.grade,
                mail: comment.mail,
                pseudonim: comment.pseudonim,
                reported: false
            }
            return cleanObj;
        }

    }

})();
