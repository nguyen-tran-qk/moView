(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('MovieController', ['$scope', '$http', '$uibModal', '$stateParams', '$state', 'UserService', 'MovieService', function($scope, $http, $uibModal, $stateParams, $state, UserService, MovieService) {

      // $scope.getMovieDetails = function() {
      MovieService.getMovieInfo(parseInt($stateParams.id), function(res) {
        if (res && res.meta.code <= 200) {
          console.log(res);
          $scope.movieDetail = res.body;
        }
      });
      // };
    }])
}());
