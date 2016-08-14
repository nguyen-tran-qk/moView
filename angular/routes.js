(function() {
  'use strict';

  angular.module('CarettRoutes', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('index', {
          url: '/',
          views: {
            'main': {
              templateUrl: 'views/main.html',
              controller: 'MainController',
              resolve: {
                login: ['$q', '$timeout', 'UserService', '$state', function($q, $timeout, UserService, $state) {
                  var deferred = $q.defer();
                  if (UserService.isLoggedIn()) {
                    deferred.resolve(UserService.isLoggedIn());
                  } else {
                    $timeout(deferred.reject);
                    $state.go('index');
                  }
                  return deferred.promise;
                }]
              }
            }
          }
        })
        .state('index.home', {
          url: 'home',
          views: {
            'content': {
              templateUrl: 'views/home.html',
              controller: 'MainController'
            }
          }
        })
        .state('index.movie', {
          url: 'movie/{id:int}',
          views: {
            'content': {
              templateUrl: 'views/movie-detail.html',
              controller: 'DetailController'
            }
          }
        })
        .state('index.demo', {
          url: 'demo',
          views: {
            'content': {
              templateUrl: 'views/demo.html',
              controller: 'DemoController'
            }
          }
        })
        .state('index.manage', {
          url: 'manage',
          views: {
            'content': {
              templateUrl: 'views/manage-movie.html',
              controller: 'MovieController'
            }
          }
        })
      $urlRouterProvider
        .otherwise('/home');
    }]);
}());
