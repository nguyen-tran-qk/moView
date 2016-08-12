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
              controller: 'MainController'
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
