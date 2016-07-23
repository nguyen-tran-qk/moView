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
    	  $urlRouterProvider
    	    .otherwise('/');
    }]);
}());