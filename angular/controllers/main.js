(function() {
	'use strict';
	angular.module('MoviewControllers', [])
		.controller('MainController', ['$scope', '$http', function($scope, $http) {
			//get users list from API
			//this should be implemented in services
			$http.get('/users')
				.success(function(res) {
					$scope.users = res;
				});
		}]);
}());