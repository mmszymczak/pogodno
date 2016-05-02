(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('ReviewController', ReviewController);

  /** @ngInject */
    function ReviewController($route, $q, toastr, internalDb, IssuuFactory, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $firebaseObject, Firebase, GravatarFactory) {

        var ref = new Firebase(firebaseUrl);
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
            // var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/document/reviews');
            // vm.messages = $firebaseArray(reviewsRef);
            vm.review.date = Date.now();
            vm.messages.$add(vm.review);
            vm.review = {};
        }

        function gravatarUrl(email) {
          return GravatarFactory(email);
        }

    }

})();
