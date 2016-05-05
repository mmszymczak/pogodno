(function() {
    'use strict';

    angular
        .module('pogodno')
        .config(routeConfig);

    function routeConfig($routeProvider) {

        var init = {
            init: ["IssuuFactory","$q", function (IssuuFactory, $q) {
                return $q.all({
                    issuu: IssuuFactory.promiseIssuu,
                    allData: IssuuFactory.promiseData
                });
            }]
        };

        $routeProvider
            .when('/', {
                templateUrl: 'app/main/pages/main.html',
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                resolve: init,
                resolveAs: 'initData'
            })
            .when('/team', {
                templateUrl: 'app/main/pages/team.html',
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                resolve: init,
                resolveAs: 'initData'
            })
            .when('/about', {
                templateUrl: 'app/main/pages/about.html',
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                resolve: init,
                resolveAs: 'initData'
            })
            .when('/pages/:coverId', {
                templateUrl: 'app/main/pages/main.html',
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                resolve: init,
                resolveAs: 'initData'
            })
            .when('/admin', {
                templateUrl: 'app/main/pages/admin.html',
                controller: 'AdminController',
                controllerAs: 'adminCtrl',
                resolve: init,
                resolveAs: 'initData'
            })
            .when('/admin/moderate', {
                templateUrl: 'app/main/pages/moderate.html',
                controller: 'ModerateController',
                controllerAs: 'modCtrl',
                resolve: init,
                resolveAs: 'initData'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();
