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
        controllerAs: 'main'
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
      .when('/page/:document?', {
        templateUrl: '/app/main/pages/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
