(function() {
  'use strict';
  angular.module('MoviewControllers', [])
    .controller('MainController', ['$scope', '$http', '$uibModal', '$anchorScroll', '$location', 'UserService', function($scope, $http, $uibModal, $anchorScroll, $location, UserService) {
      $scope.user = {};
      $scope.isActive = false;
      //get users list from API
      // UserService.getUserList(function(res) {
      //   $scope.usersList = res;
      // });
      $scope.gotoAnchor = function(x) {
        $location.hash('footerwrap');
        $anchorScroll();
      };
      $scope.activeButton = function() {
        $scope.isActive = !$scope.isActive;
      };


      $scope.myInterval = 5000;
      $scope.noWrapSlides = false;
      $scope.active = 0;
      var slides = $scope.slides = [];
      var currIndex = 0;
      $scope.addSlide = function() {
        var newWidth = window.screen.width + slides.length + 1;
        slides.push({
          image: 'http://lorempixel.com/' + newWidth + '/400',
          text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
          id: currIndex++
        });
      };
      for (var i = 0; i < 4; i++) {
        $scope.addSlide();
      }
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
