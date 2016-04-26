(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($route, $q, toastr, internalDb, Issuu, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $firebaseAuth, $rootScope, $timeout) {
    

    $scope.data = Issuu.doStuff();
    internalDb.setTotalNumPage($scope.data.rsp._content.result.totalCount);

    var vm = this;
    var ref = new Firebase(firebaseUrl);

    vm.totalNumPages = internalDb.getTotalNumPage();

    vm.hashValue = $routeParams.filter;
    vm.showHeader = true;
    vm.login = login;
    vm.activeThing = '';
    vm.addReview = addReview;
    vm.hideJumbo = hideJumbo;
    vm.showJumbo = false;
    vm.resetDatabase = resetDatabase;
    vm.isActive = isActive;

    vm.allDoc = $scope.data.rsp._content.result._content;
    
    vm.go = go;
    vm.awesomeThingCurrent;
    vm.showNextThings = showNextThings;
    vm.currentPagePagination;
    vm.changePagePagination = changePagePagination;

    $scope.currentPage = internalDb.getPage();
    vm.pageSize = 6;

    console.log(vm.allDoc);
    console.log($scope.data);

    $scope.pageChangeHandler = function(num) {
    internalDb.setPage(num);
    };

    function login(){
        console.log(ref);
        vm.dataLoading = true;
            console.log(vm.username, vm.password);
          ref.authWithPassword({
          email    : vm.username,
          password : vm.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
            toastr.error('Oj... Coś poszło nie tak.');
            vm.dataLoading = false;
          } else {
            console.log("Authenticated successfully with payload:", authData);
            toastr.success('Pomyślna próba zalogowania!');
            $location.path('/');
          }
        });  
    }
    

////// Data to save on firebase ///////////////////////////////
    var coverCuriosities = [
        { "coverCuriosities" :"Totemy dla zastępów ze 'Skautingu dla Chłopców'"},
        { "coverCuriosities" :"Nogi Sharon Stone"},
        { "coverCuriosities" : undefined },
        { "coverCuriosities" : undefined },
        { "coverCuriosities" :"Sałatka.exe"},
        { "coverCuriosities" :"Miejsca opuszczone przez środowiska starszoharcerskie hufca"},
        { "coverCuriosities" :"Ścieżkami zdrowia"},
        { "coverCuriosities" :"Prace nad Statutem"},
        { "coverCuriosities" :"Jestem harcerką!"},
        { "coverCuriosities" :"A jednak się kręci (pogodno.exe)"},
        { "coverCuriosities" :"Gotowe na wszystko (Desperate Girl Guides)"},
        { "coverCuriosities" :"Przebłyski strategii (sałatka.exe 2008)"},
        { "coverCuriosities" :"Jerzy śni o Maćku..."},
        { "coverCuriosities" :"Wanted"},
        { "coverCuriosities" :"Znajdź swoją drogę"},
        { "coverCuriosities" :"Floating Pogodno"},
        { "coverCuriosities" :"Ostatnio"},
        { "coverCuriosities" :"Zapłać u mnie składki!"},
        { "coverCuriosities" :"Dziesiątka pół-wysoka"},
        { "coverCuriosities" :"Układ okresowy pierwiastków"},
        { "coverCuriosities" :"Druh komendant Czuwa!"},
        { "coverCuriosities" :"Biblioteczka exe!"},
        { "coverCuriosities" :"Opowieść wigilijna"},
        { "coverCuriosities" :"Pokolenie exe"},
        { "coverCuriosities" :"Hairmaster"},
        { "coverCuriosities" :"Kiedy drużynowy się nudzi..."},
        { "coverCuriosities" :"Przepowiednia na koniec świata"},
        { "coverCuriosities" :"exe HISTORIA"},
        { "coverCuriosities" :"Katastrofa?"},
        { "coverCuriosities" :"Pieczątki"},
        { "coverCuriosities" :"Hetman na c1"},
        { "coverCuriosities" :"Czas leczy rany"},
        { "coverCuriosities" :"1444"}
    ];
////// Data to save on firebase ///////////////////////////////

   function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    $scope.$on("$routeChangeSuccess", function () {
        vm.acmeDb._content.forEach(function(element,index,array){
            if (element.document.id === $location.path().substring(7)) {
                vm.activeThing = vm.acmeDb._content[index].document;
                console.log(vm.activeThing);
                vm.showJumbo = true;
                $scope.activeIssuuId = vm.acmeDb._content[index].document.id;
                $anchorScroll(vm.acmeDb._content[index].document);
                vm.currentDocumentIndex = index;
                var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/document/reviews');
                vm.messages = $firebaseArray(reviewsRef);
            }
        });

        if(!!$location.path().substring(1)) {
            vm.showHeader = false;
        } else {
            vm.showHeader = true;
        }

    });

    if (!vm.acmeDb) { vm.acmeDb = {}; 
        if (!vm.acmeDb._content) { 
            vm.acmeDb._content = [];
            vm.allDoc.forEach(function(element,index){
                vm.acmeDb._content[index] = {};
                vm.acmeDb._content[index].document = {};
                if (!vm.acmeDb._content[index].document.reviews) { 
                    vm.acmeDb._content[index].document.reviews = [];
                    if (angular.isDefined(coverCuriosities[index].coverCuriosities)) {
                        vm.acmeDb._content[index].document.coverCuriosities = coverCuriosities[index].coverCuriosities;
                    }
                        vm.acmeDb._content[index].document.coverID = pad(index+1);
                        vm.acmeDb._content[index].document.title = element.document.title;
                        vm.acmeDb._content[index].document.pageCount = element.document.pageCount;
                        vm.acmeDb._content[index].document.created = element.document.created;

                }
                vm.acmeDb._content[index].document.id = element.document.documentId;
            });   
        }
    }
        
/////////////// Navbar ////////////////////////////////////////
    vm.navLinks = [{
        Title: '',
        LinkText: 'Strona Główna'
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

    function resetDatabase() {
        var json = JSON.stringify(vm.acmeDb._content, function( key, value ) {
            if( key === "$$hashKey" ) {
                return undefined;
            }
            return value;
        });

        var finalData = angular.fromJson(json); 
        var reviewsRef = ref.child('_content/');
        reviewsRef.set(finalData);
    }   

    function hideJumbo() {
      return vm.showJumbo = false;
    }

    function isActive(item) {
        return vm.activeThing.id === item;
    };

    function go(path)  {
        $location.path(path);
        $anchorScroll();
    }

    function addReview() {
        var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/document/reviews');
        vm.messages = $firebaseArray(reviewsRef);
        vm.messages.$add(vm.review);
        vm.review = {};
    }

    function showNextThings() {
        vm.allThingsLength = vm.acmeDb._content.length;
        vm.totalItemsPagination = vm.allThingsLength * 6;
        internalDb.setData(vm.currentPagePagination);
    return (vm.currentPagePagination-1) * 6;
    }

    function changePagePagination(el) {
        internalDb.setData(el);
    }

  }
})();
