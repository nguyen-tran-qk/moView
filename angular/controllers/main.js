(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('MainController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$uibModal', '$anchorScroll', '$location', 'UserService', 'MovieService', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $anchorScroll, $location, UserService, MovieService) {
      gapi.load('auth2', function() { //load in the auth2 api's, without it gapi.auth2 will be undefined
        gapi.auth2.init({
          client_id: '16234131622-pmjdusc75n1s8b885banj766qarbu4v4.apps.googleusercontent.com'
        });
      }); 

      $scope.user = UserService.isLoggedIn();
      $scope.$state = $state;
      $scope.isActive = false;
      $rootScope.$pageFinishedLoading = false;
      
      $scope.activeButton = function() {
        $scope.isActive = !$scope.isActive;
      };
      $scope.refreshMovie = function() {
        MovieService.getMovieList(function(res) {
          if (res && res.meta.code <= 200) {
            $scope.movies = res.body;
            $scope.chunkedMovies = chunk($scope.movies, 2);
            $timeout(function() {
              $rootScope.$pageFinishedLoading = true;
            }, 1000);
          }
        })
      };
      $scope.refreshMovie(); // un-comment after demo
      // $timeout(function() { // remove after demo
      //   $rootScope.$pageFinishedLoading = true;
      // }, 1000);

      function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
          newArr.push(arr.slice(i, i + size));
        }
        return newArr;
      }

      $scope.viewMovieDetail = function(id) {
        $state.go('index.movie', { 'id': id });
      };
      // fake slide
      $scope.myInterval = 3000;
      $scope.noWrapSlides = false;
      $scope.active = 0;
      $scope.slides = [];
      var currIndex = 0;
      $scope.addSlide = function() {
        var newWidth = window.screen.width >= 1920 ? 1915 + $scope.slides.length + 1 : window.screen.width + $scope.slides.length + 1;
        $scope.slides.push({
          image: 'http://lorempixel.com/' + newWidth + '/400',
          text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][$scope.slides.length % 4],
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
      $scope.logOut = function() {
        UserService.logOut();
        $scope.user = UserService.isLoggedIn();
      }
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
