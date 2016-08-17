(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('DetailController', ['$scope', '$rootScope', '$timeout', '$sce', '$uibModal', '$stateParams', '$state', 'UserService', 'MovieService', function($scope, $rootScope, $timeout, $sce, $uibModal, $stateParams, $state, UserService, MovieService) {
      $rootScope.$pageFinishedLoading = false;
      $scope.max = 5;
      $scope.isReadonly = false;
      $scope.myReview = '';
      $scope.edit = {};
      $scope.limitNum = 10;
      $scope.allChallengesLoaded = false;

      $scope.refreshMovie = function() {
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
      };
      $scope.refreshMovie();
      
      $scope.loadMore = function() {
        if ($scope.limitNum < $scope.movieDetail.reviews.length) {
          $scope.limitNum += 10;
          if ($scope.limitNum >= $scope.movieDetail.reviews.length) {
            $scope.allChallengesLoaded = true;
          }
        } else {
          $scope.limitNum = 10;
          $scope.allChallengesLoaded = false;
        }
      };

      $scope.toggleEdit = function(id) {
        $scope.edit = {};
        $scope.edit.id = id;
      };

      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
      };

      $scope.addRating = function() {
        if ($scope.user && $scope.user.id) {
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

      $scope.editComment = function(reviewId, content) {
        if ($scope.user && $scope.user.role === 1) {
          $scope.waiting = true;
          $scope.tempCom = { id: reviewId };
          // $scope.myReview = content;
          MovieService.updateReview(reviewId, $scope.movieDetail.id, content, true, function(res) {
            if (res && res.length) {
              $scope.edit = {};
              $scope.movieDetail.reviews = res;
              $scope.myReview = '';
              $scope.waiting = false;
              $scope.tempCom = {};
            }
          });
        } else {
          $scope.openLogin();
        }
      }
      $scope.cancelEdit = function() {
        $scope.edit = {};
      }
      $scope.tempCom = {};
      $scope.addComment = function() {
        $scope.tempCom = {};
        if ($scope.user && $scope.user.role === 1) {
          $scope.waiting = true;
          $scope.tempCom = {
            id: 'abc',
            movie_id: $scope.movieDetail.id,
            content: $scope.myReview,
            user_name: $scope.user.username,
            updated_at: new Date()
          }
          $scope.movieDetail.reviews.unshift($scope.tempCom);
          MovieService.addReview($scope.movieDetail.id, $scope.myReview, function(res) {
            if (res && res.length) {
              $scope.movieDetail.reviews = res;
              $scope.myReview = '';
            } else {
              $scope.movieDetail.reviews.shift($scope.tempCom);
            }
            $scope.waiting = false;
          });
        } else {
          $scope.openLogin();
        }
      };
      $scope.delete = function(review) {
        if ($scope.user) {
          $scope.waiting = true;
          $scope.tempCom = { id: review.id };
          MovieService.updateReview(review.id, review.movie_id, null, null, function(res) {
            if (res) {
              if (res.length) {
                $scope.movieDetail.reviews = res;
                $scope.waiting = false;
                $scope.tempCom = {};
              } else {
                $scope.movieDetail.reviews = [];
              }
            }
          });
        }
      };
      
    }])
}());
