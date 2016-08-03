(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('MovieController', ['$scope', '$sce', '$http', '$uibModal', '$stateParams', '$state', 'UserService', 'MovieService', function($scope, $sce, $http, $uibModal, $stateParams, $state, UserService, MovieService) {
      if ($scope.user.role !== 32) {
        $state.go('index.home');
      }
      $scope.openMovieModal = function() {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/movie-popup.html',
          controller: 'PopupController',
          resolve: {
            // user: function
          }
        });
        modalInstance.result.then(function(movie) {
          // $scope.movie = movie;
        });
      };
    }])
    .controller('PopupController', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'MovieService', function($scope, $http, $uibModal, $uibModalInstance, MovieService) {
      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
      $scope.addMovie = function() {
        MovieService.addMovie($scope.movie, function(res) {
          if (res && res.body && res.body.id) {
            $uibModalInstance.dismiss('cancel');
          } else {
            // do something
          }
        });
      };
    }]);
}());
