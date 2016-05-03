(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('ReviewController', ReviewController);

  /** @ngInject */
    function ReviewController(Firebase, firebaseUrl, GravatarFactory, IssuuFactory, internalDb) {

        var vm = this;
        vm.addReview = addReview;
        vm.resetForm = resetForm;
        vm.gravatarUrl = gravatarUrl;
        vm.allDoc = IssuuFactory.doIssuuStuff().rsp._content.result._content;
        vm.acmeDb = internalDb.getImportantData(vm.allDoc);
        vm.messages = internalDb.getMessages();

        function resetForm(form) {
            form.$setPristine();
        }

        function addReview() {
            vm.messages = internalDb.getMessages();
            vm.review.date = Date.now();
            vm.messages.$add(vm.review);
            vm.review = {};
        }

        function gravatarUrl(email) {
          return GravatarFactory(email);
        }

    }

})();
