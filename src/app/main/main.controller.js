(function() {
  'use strict';

  angular
    .module('pogodno')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($route, $q, internalDb, Issuu, $location, $anchorScroll, $scope, $compile, $routeParams, firebaseUrl, $firebaseArray, $timeout) {
    //MainController['$inject'] = ['firebaseUrl']; 
    
    console.log(Issuu.all());

    Issuu.all()    
        .then(
            // function (result) {
            //     $timeout(function(){
            //         vm.allIssuu = result;
            //         console.log(result);
            //     }, 5000);
            // },
            function (error) {
                console.log(error.statusText);
            }
        );

        //console.log(vm.allIssuu);



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
    { "coverCuriosities" :"1444"},
];

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

    if (!vm.acmeDb) { vm.acmeDb = {}; 
        if (!vm.acmeDb._content) { 
            vm.acmeDb._content = [];
            vm.allDoc.forEach(function(element,index){
                vm.acmeDb._content[index] = {};
                vm.acmeDb._content[index].document = {};

                if (!vm.acmeDb._content[index].document.reviews) { 
                    vm.acmeDb._content[index].document.reviews = [];
                    if (coverCuriosities[index].coverCuriosities !== undefined) {
                        vm.acmeDb._content[index].document.coverCuriosities = coverCuriosities[index].coverCuriosities;
                    }
                        vm.acmeDb._content[index].document.coverID = pad(index+1);
                        vm.acmeDb._content[index].document.title = element.document.title;
                        vm.acmeDb._content[index].document.pageCount = element.document.pageCount;
                        vm.acmeDb._content[index].document.created = element.document.created;

                }
                vm.acmeDb._content[index].document.id = element.document.documentId;
            });   

            // console.log(vm.acmeDb);
            // ref.set(vm.acmeDb);
                //             var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + 'document/reviews');
                // vm.messages = $firebaseArray(ref);
                // vm.messages.$add(vm.acmeDb);
        }
    }

    function resetDatabase(){
        var json = JSON.stringify(vm.acmeDb._content, function( key, value ) {
            if( key === "$$hashKey" ) {
                return undefined;
            }
            return value;
        });

        var finalData = angular.fromJson(json); 

        var reviewsRef = ref.child('_content/');
        reviewsRef.set(finalData);
};
        
        

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
            if (element.document.id === $location.path().substring(7)) {
                vm.activeThing = vm.acmeDb._content[index].document;
                vm.showJumbo = true;
                console.log(vm.acmeDb._content[index].document)
                $scope.activeIssuuId = vm.acmeDb._content[index].document.id;
                $anchorScroll(vm.acmeDb._content[index].document);
                vm.currentDocumentIndex = index;
                console.log(vm.acmeDb);
                var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/document/reviews');
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


        var reviewsRef = ref.child('_content/'+ vm.currentDocumentIndex + '/document/reviews');
        
        vm.messages = $firebaseArray(reviewsRef);
        vm.messages.$add(vm.review);

        vm.review = {};

    }

    function search(query){
        vm.query = query;
    }

  }
})();
