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
        resolve: {
        init: function(IssuuFactory) {
            return IssuuFactory.promise;
        }
        },
        resolveAs: 'dataIssuu'
      })
      .when('/team', {
        templateUrl: '/app/main/pages/team.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
        init: function(IssuuFactory) {
            return IssuuFactory.promise;
        }
        },
        resolveAs: 'dataIssuu'
      })
      .when('/about', {
        templateUrl: '/app/main/pages/about.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
        init: function(IssuuFactory) {
            return IssuuFactory.promise;
        }
        },
        resolveAs: 'dataIssuu'
      })
      .when('/pages/:documentId', {
        templateUrl: '/app/main/pages/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
        init: function(IssuuFactory) {
            return IssuuFactory.promise;
        }
        },
        resolveAs: 'dataIssuu'
      })
      .when('/admin', {
        templateUrl: '/app/main/pages/admin.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
        init: function(IssuuFactory) {
            return IssuuFactory.promise;
        }
        },
        resolveAs: 'dataIssuu'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
