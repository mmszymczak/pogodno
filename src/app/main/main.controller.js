(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($route, $q, internalDb, Issuu, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $timeout) {
    //MainController['$inject'] = ['firebaseUrl']; 
    
// Issuu.all()
//         .then(
//             function (result) {
//                 $timeout(function(){
//                     vm.allIssuu = result;
//                 }, 5000);
//             },
//             function (error) {
//                 console.log(error.statusText);
//             }
//         );

//         console.log(vm.allIssuu);



    var vm = this;
    var ref = new Firebase(firebaseUrl);
    vm.hashValue = $routeParams.filter;

    

    vm.activeThing = '';
    vm.addReview = addReview;
    vm.hideJumbo = hideJumbo;
    vm.showJumbo = false;
    vm.resetDatabase = resetDatabase;
    
    vm.allData = Issuu.const();
    vm.allDoc = vm.allData.rsp._content.result._content;
    vm.allIssuu;

    vm.go = go;
    vm.search = search;
    vm.awesomeThingCurrent;



    if (!vm.acmeDb) { vm.acmeDb = {}; 
        if (!vm.acmeDb._content) { 
            vm.acmeDb._content = [];
            vm.allDoc.forEach(function(element,index){
                vm.acmeDb._content[index] = {};
                if (!vm.acmeDb._content[index].reviews) { 
                    vm.acmeDb._content[index].reviews = [];
                }
                vm.acmeDb._content[index].id = element.document.documentId;
            });   
        }
    }

    function resetDatabase(){
        ref.set(vm.acmeDb);
    }


        var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/reviews');
        

/////////////// Navbar ////////////////////////////////////////
    vm.navLinks = [{
        Title: '',
        LinkText: 'Strona Główna',
    }, {
        Title: 'team',
        LinkText: 'O Redakcji'
    }, {
        Title: 'about',
        LinkText: 'O Gazecie'
    }];

    vm.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || '';
        return page === currentRoute ? 'active' : '';
    };
/////////////// Navbar ////////////////////////////////////////


    function hideJumbo() {
      return vm.showJumbo = false;
    }

    $scope.$on("$routeChangeSuccess", function () {
        vm.acmeDb._content.forEach(function(element,index,array){
            if (element.id === $location.path().substring(7)) {
                vm.activeThing = vm.acmeDb._content[index];
                vm.showJumbo = true;
                $scope.activeIssuuId = vm.acmeDb._content[index].id;
                $anchorScroll();
                vm.currentDocumentIndex = index;
                var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/reviews');
                vm.messages = $firebaseArray(reviewsRef);
            }
        });
    });


    function go(path){
        $location.path(path);
        $anchorScroll();
    }

    function addReview() {
        console.log(vm.review);


        var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/reviews');
        
        vm.messages = $firebaseArray(reviewsRef);
        vm.messages.$add(vm.review);
        console.log(vm.messages);

        vm.review = {};

    }

    function search(query){
        vm.query = query;
    }

  }
})();
