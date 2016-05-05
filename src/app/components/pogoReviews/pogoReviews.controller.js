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

        function gravatarUrl(email) {
            return GravatarFactory(email);
        }

    }

})();
