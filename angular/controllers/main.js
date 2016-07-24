(function() {
  'use strict';
  angular.module('MoviewControllers', [])
    .controller('MainController', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
    	$scope.user = {};
      //get users list from API
      //this should be implemented in services
      $http.get('/users')
        .success(function(res) {
          $scope.usersList = res;
        });

      //function to open Login modal, refer to ui-bootstrap docs for Modals
      $scope.openLogin = function() {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/login.html',
          controller: 'LoginController',
          resolve: {
            // user: function
          }
        });
        modalInstance.result.then(function(user) {
        	$scope.user = user;
        });
      };
    }])
    .controller('LoginController', ['$scope', '$http', '$uibModal', '$uibModalInstance', function($scope, $http, $uibModal, $uibModalInstance) {
    	$scope.user = {
    		'username': '',
    		'password': null
    	};
      $scope.ok = function() {
      	$http.post('/login', {username: $scope.user.username, password: $scope.user.password})
      		.success(function(res) {
      			if (res && res.username) {
       				$uibModalInstance.close(res);
      			} else {}
      		});
      };

      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
    }]);
}());
