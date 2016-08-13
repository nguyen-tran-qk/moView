(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('DetailController', ['$scope', '$rootScope', '$timeout', '$sce', '$uibModal', '$stateParams', '$state', 'UserService', 'MovieService', function($scope, $rootScope, $timeout, $sce, $uibModal, $stateParams, $state, UserService, MovieService) {
      $rootScope.$pageFinishedLoading = false;
      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      };
      MovieService.getMovieInfo(parseInt($stateParams.id), $scope.user.id, function(res) {
        if (res && res.meta.code <= 200) {
          $scope.movieDetail = res.body;
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
