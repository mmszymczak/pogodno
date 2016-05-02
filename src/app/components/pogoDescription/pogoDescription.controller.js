(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('DescriptionController', DescriptionController);

  /** @ngInject */
    function DescriptionController($route, $q, toastr, internalDb, IssuuFactory, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $firebaseObject, Firebase, GravatarFactory) {

        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.limitToValue = 3;
        vm.allDoc = IssuuFactory.doIssuuStuff().rsp._content.result._content;
        // vm.acmeDb = internalDb.getImportantData(vm.allDoc);

        vm.activeThing = internalDb.getActiveThing();

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
