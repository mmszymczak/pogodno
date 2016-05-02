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
                    init: ["IssuuFactory","$q", function (IssuuFactory, $q) {
                        return $q.all({
                            issuu: IssuuFactory.promiseIssuu,
                            allData: IssuuFactory.getImportantData
                        });
                    }]
                },
            })
            .when('/team', {
                templateUrl: '/app/main/pages/team.html',
                controller: 'MainController',
                controllerAs: 'main',
                resolve: {
                    init: ["IssuuFactory","$q", function (IssuuFactory, $q) {
                        return $q.all({
                            issuu: IssuuFactory.promiseIssuu,
                            allData: IssuuFactory.getImportantData
                        });
                    }]
                },
            })
            .when('/about', {
                templateUrl: '/app/main/pages/about.html',
                controller: 'MainController',
                controllerAs: 'main',
                resolve: {
                    init: function(IssuuFactory) {
                            return IssuuFactory.promiseIssuu;
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
                            return IssuuFactory.promiseIssuu;
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
                            return IssuuFactory.promiseIssuu;
                    }
                },
                resolveAs: 'dataIssuu'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();
