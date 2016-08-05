(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('MovieController', ['$scope', '$uibModal', 'MovieService', function($scope, $uibModal, MovieService) {
      if ($scope.user.role !== 32) {
        $state.go('index.home');
      };
      $scope.deleteMovie = function(userId, movieId) {
        MovieService.manageMovie(userId, movieId, null, function(res) {
          if (res && res.meta.code <= 200) {
            $scope.refreshMovie();
          } else {
            console.log('Something went wrong, the server diededededededed');
          }
        })
      };
      $scope.openMovieModal = function(movie) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/movie-popup.html',
          controller: 'PopupController',
          size: 'lg',
          resolve: {
            movie: movie,
            user: $scope.user
          }
        });
        modalInstance.result.then(function(movie) {
          if (movie) {
            $scope.refreshMovie();
          }
        });
      };
    }])
    .controller('PopupController', ['$scope', '$uibModal', '$uibModalInstance', 'MovieService', 'movie', 'user', function($scope, $uibModal, $uibModalInstance, MovieService, movie, user) {
      if (movie && user) {
        $scope.isUpdate = true;
        $scope.movie = movie;
        $scope.user = user;
      }
      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
      $scope.addMovie = function() {
        if ($scope.isUpdate) {
          MovieService.manageMovie($scope.user.id, $scope.movie.id, $scope.movie, function(res) {
            if (res) {
              $uibModalInstance.close(res);
            }
          })
        } else {
          MovieService.addMovie($scope.movie, function(res) {
            if (res && res.body && res.body.id) {
              $uibModalInstance.close(res.body.id);
            } else {
              console.log('Something went wrong, the server diededededededed');
            }
          });
        }
      };
    }]);
}());
