(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('ReviewController', ReviewController);

  /** @ngInject */
    function ReviewController(Firebase, adminService, firebaseUrl, GravatarFactory, IssuuFactory, internalDb) {

        var vm = this;
        vm.addReview = addReview;
        vm.resetForm = resetForm;
        vm.gravatarUrl = gravatarUrl;
        vm.allDoc = IssuuFactory.doIssuuStuff().rsp._content.result._content;
        vm.acmeDb = internalDb.getImportantData(vm.allDoc);
        vm.messages = internalDb.getMessages();
        vm.approvedComment = false;
        vm.adminStatus = adminService.admin;
        vm.deleteReview = deleteReview;
        vm.reportReview = reportReview;

        function resetForm(form) {
            form.$setPristine();
        }

        function addReview() {
            vm.messages = internalDb.getMessages();
            vm.review.date = Date.now();
            vm.review.dbID = internalDb.getCurrentDocumentIndex();

            adminService.admin.sendCommentToModerator(vm.review);

            vm.review = {};
            vm.approvedComment = true;
        }

        function reportReview(review) {
            var reviewDbId = review.$id;
            review = adminService.admin.cleanObjToPush(review);

            review.reported = true;
            review.commonId = reviewDbId;

            var placeRef = new Firebase('https://pogodno.firebaseio.com/_content/'+ review.dbID + '/document/reviews/');
            placeRef.child(review.commonId).update(review);

            adminService.admin.sendCommentToReport(review);
        }

        function deleteReview(review) {
            if(adminService.admin.connected) {
                var commentsRef = new Firebase('https://pogodno.firebaseio.com/_content/'+review.dbID+'/document/reviews/'+review.$id);
                commentsRef.remove();
            }
        }

        function gravatarUrl(email) {
            return GravatarFactory(email);
        }

    }

})();
