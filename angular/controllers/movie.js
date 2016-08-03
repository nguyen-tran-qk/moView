(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('MovieController', ['$scope', '$sce', '$http', '$uibModal', '$stateParams', '$state', 'UserService', 'MovieService', function($scope, $sce, $http, $uibModal, $stateParams, $state, UserService, MovieService) {
      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      };
      MovieService.getMovieInfo(parseInt($stateParams.id), function(res) {
        if (res && res.meta.code <= 200) {
          console.log(res);
          $scope.movieDetail = res.body;
          if ($scope.movieDetail.trailer && $scope.movieDetail.trailer.indexOf('watch?v=') !== -1) {
            $scope.movieDetail.trailer = $scope.movieDetail.trailer.replace('watch?v=', 'embed/');
            $scope.movieDetail.trailer = $scope.movieDetail.trailer.replace('https:', '');
          }
        }
      });
      MovieService.getMovieList(function(res) {
        if (res && res.meta.code <= 200) {
          $scope.movies = res.body;
        }
      });
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
        MovieService.addMovie($scope.movie);
        $uibModalInstance.dismiss('cancel');
      };
    }]);
}());
