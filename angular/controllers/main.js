(function() {
  'use strict';
  angular.module('MoviewControllers', [])
    .controller('MainController', ['$scope', '$http', '$uibModal', 'UserService', function($scope, $http, $uibModal, UserService) {
      $scope.user = {};
      //get users list from API
      // UserService.getUserList(function(res) {
      //   $scope.usersList = res;
      // });

      $scope.isActive = false;
      $scope.activeButton = function() {
        $scope.isActive = !$scope.isActive;
      };
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
    .controller('LoginController', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'UserService', function($scope, $http, $uibModal, $uibModalInstance, UserService) {
      $scope.user = {
        'username': '',
        'password': null
      };
      $scope.login = function() {
        UserService.login($scope.user, function(res) {
          if (res && res.meta && res.meta.code <= 300) {
            $scope.errorMessage = '';
            $uibModalInstance.close(res.body.user);
          } else if (res && res.meta && res.meta.code >= 500) {
            $scope.errorMessage = 'Server Error';
          } else if (res && res.meta.code >= 400) {
            $scope.errorMessage = res.meta.message;
          }
        })
      };

      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
    }]);
}());
