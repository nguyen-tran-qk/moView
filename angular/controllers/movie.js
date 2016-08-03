(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('MovieController', ['$scope', '$sce', '$http', '$uibModal', '$stateParams', '$state', 'UserService', 'MovieService', function($scope, $sce, $http, $uibModal, $stateParams, $state, UserService, MovieService) {
      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }
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
    }])
}());
