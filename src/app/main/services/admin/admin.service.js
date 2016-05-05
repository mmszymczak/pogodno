(function(){
    'use strict';

    angular
        .module('pogodno')
        .service('adminService', adminService);

    adminService.$inject = [];

    function adminService() {
        var admin = {
            connected: false,
            username: '',
            moderateArr: [],
            sendCommentToModerator: sendCommentToModerator,
            approvedCommentPublish: approvedCommentPublish
        };
        return {admin: admin};

        function sendCommentToModerator(commentObj) {
            var placeRef = new Firebase('https://pogodno.firebaseio.com/moderate/');
            placeRef.push(commentObj);
        }

        function approvedCommentPublish(commentObj) {
            commentObj = cleanObjToPush(commentObj);
            var placeRef = new Firebase('https://pogodno.firebaseio.com/_content/'+ commentObj.dbID + '/document/reviews');
            placeRef.push(commentObj);
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
                pseudonim: comment.pseudonim
            }
            return cleanObj;
        }

    }

})();
