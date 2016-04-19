(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($route, $q, internalDb, Issuu, $location, $anchorScroll, $scope, $compile, $routeParams) {
    var vm = this;
    vm.hashValue = $routeParams.filter;
    vm.acmeDb = {};
    vm.comment = {};
    vm.activeThing = '';
    vm.addReview = addReview;
    vm.hideJumbo = hideJumbo;
    vm.showJumbo = false;
    vm.allIssuu = {};
    vm.allData = Issuu.const();
    vm.allDoc = vm.allData.rsp._content.result._content;
    vm.awesomeThings = vm.allDoc;
    vm.go = go;
    vm.search = search;
    vm.id = "";
    vm.refreshPage = false;
    vm.awesomeThingCurrent;
    vm.temp = {"rsp":{"_content":{"document":{"username":"lekkim","name":"racing","documentId":"090623122351-f691a27cfd744b80b25a2c8f5a51d596","title":"Race cars","access":"public","state":"P","category":"012000","type":"009000","origin":"singleupload","pageCount":0,"ep":1245759831,"description":"Race cars of Le Man 2009","tags":["cars","le man","racing"],"folders":["3935f331-5d5b-4694-86ce-6f26c6dee809"]}},"stat":"ok"}};
    console.log(vm.temp);

    console.log(vm.allDoc);
    console.log(vm.activeThing);
    // Issuu.all(function(data){
    //     vm.allDoc = data;
    // });

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

    function hideJumbo() {
      return vm.showJumbo = false;
    }

    $scope.$on("$routeChangeSuccess", function () {
        vm.allDoc.forEach(function(element,index,array){
            if (element.document.documentId === $location.path().substring(7)) {
                vm.activeThing = vm.allDoc[index];
                vm.showJumbo = true;
                $scope.activeIssuuId = vm.activeThing.document.documentId;
            }
        });
    });

    function go(path){
        $location.path(path);
        $anchorScroll();
    }

    function addReview(product) {
        if (!vm.activeThing.document.reviews){
            vm.activeThing.document.reviews = [];
        }
        //product.id = vm.activeThing.document.documentId;
        //vm.acmeDb.comments.push(product);
        console.log(vm.acmeDb);
        vm.acmeDb['data'].push({"teamId":"4","status":"pending"});
        var jsonStr = JSON.stringify(vm.acmeDb);
        console.log(jsonStr);
        // vm.activeThing.document.reviews.push(product);
        // console.log(vm.activeThing);
        vm.comment = {};
    }

    function search(query){
        vm.query = query;
    }

  }
})();
