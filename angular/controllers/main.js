(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('MainController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$uibModal', '$anchorScroll', '$location', 'UserService', 'MovieService', 'login', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $anchorScroll, $location, UserService, MovieService, login) {
      $rootScope.$pageFinishedLoading = false;
      $scope.user = login;
      $scope.$state = $state;

      $scope.activeButton = function() {
        $scope.isActive = !$scope.isActive;
      };

      //function to open Login modal, refer to ui-bootstrap docs for Modals
      $scope.openLogin = function(signUp) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/login.html',
          controller: 'LoginController',
          resolve: {
            signUp: signUp
          }
        });
        modalInstance.result.then(function(user) {
          $scope.user = user;
        });
      };
      $scope.logOut = function() {
        UserService.logOut(function(res) {
          if (res && res.meta.code <= 300) {
            $scope.user = null;
          }
        });
        $scope.user = UserService.isLoggedIn();
      };
      $scope.scrollToSection = function(section) {
        $('html,body').animate({
          scrollTop: $(section).offset().top
        }, 'slow');
      };
    }])
    .controller('LoginController', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'UserService', 'signUp', function($scope, $http, $uibModal, $uibModalInstance, UserService, signUp) {
      if (signUp) {
        $scope.up = signUp;
      }
      $scope.user = {
        'username': '',
        'password': null
      };
      $scope.signUp = function() {
        UserService.signUp($scope.user, function(res) {
          if (res && res.meta.code <= 200) {
            $scope.login();
          }
        })
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
