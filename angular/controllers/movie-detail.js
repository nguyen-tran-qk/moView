(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('DetailController', ['$scope', '$rootScope', '$timeout', '$sce', '$uibModal', '$stateParams', '$state', 'UserService', 'MovieService', function($scope, $rootScope, $timeout, $sce, $uibModal, $stateParams, $state, UserService, MovieService) {
      $rootScope.$pageFinishedLoading = false;
      $scope.max = 5;
      $scope.isReadonly = false;

      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
      };

      $scope.addRating = function() {
        if ($scope.user) {
          $scope.points = $scope.percent / 10
          MovieService.addRating($scope.movieDetail.id, $scope.points, true, function(res) {
            if (res) {
              $scope.refreshMovie();
            }
          })
        } else {
          $scope.openLogin();
        }
      }

      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      };
      MovieService.getMovieInfo(parseInt($stateParams.id), function(res) {
        if (res && res.meta.code <= 200) {
          $scope.movieDetail = res.body;
          $scope.movieDetail.points = ($scope.movieDetail.rating * 50) / 100;
          if ($scope.movieDetail.trailer && $scope.movieDetail.trailer.indexOf('watch?v=') !== -1) {
            $scope.movieDetail.trailer = $scope.movieDetail.trailer.replace('watch?v=', 'embed/');
            $scope.movieDetail.trailer = $scope.movieDetail.trailer.replace('https:', '');
          }
          $timeout(function() {
            $rootScope.$pageFinishedLoading = true;
          }, 1000);
        }
      });
      $scope.addComment = function() {
        if ($scope.user && $scope.user.role) {

        } else {
          $scope.openLogin();
        }
      };
    }])
}());
