(function() {
  'use strict';
  angular.module('MoviewControllers', [])
    .controller('MainController', ['$scope', '$http', '$uibModal', 'UserService', function($scope, $http, $uibModal, UserService) {
      $scope.user = {};
      //get users list from API
      UserService.getUserList(function(res) {
        $scope.usersList = res;
      });
      // $http.get('/users')
      //   .success(function(res) {
      //     $scope.usersList = res;
      //   });


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
                // $http.post('/login', { username: $scope.user.username, password: $scope.user.password })
          //   .success(function(res) {
          //     if (res && res.username) {
          //       $uibModalInstance.close(res);
          //     } else {}
          //   });
      $scope.ok = function() {
        UserService.login($scope.user, function(res) {
          if (res && res.username) {
            $uibModalInstance.close(res);
          } else {}
        })
      };

      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
    }]);
}());
