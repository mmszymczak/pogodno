(function() {
  'use strict';

  angular
    .module('pogodno')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/main/pages/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        //resolve: MainController.resolve
        resolve: {
        init: function(Issuu) {
            console.log(Issuu.all());
            return Issuu.all();
        }
        },
        resolveAs: 'dataIssuu'
      })
      .when('/team', {
        templateUrl: '/app/main/pages/team.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: '/app/main/pages/about.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/pages/:documentId', {
        templateUrl: '/app/main/pages/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
