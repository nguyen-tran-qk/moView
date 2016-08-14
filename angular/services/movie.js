(function() {
  'use strict';

  angular.module('MoviewServices')
    .factory('MovieService', ['$http', '$q', function($http, $q) {
      var movie,
        data = {},
        getReviews = function(movie_id, callback, errorCallback) {
          $http.get('/movies/' + movie_id + '/reviews')
            .success(function(res) {
              if (callback) {
                callback(res);
              }
            })
            .error(function() {
              // return false;
            });
        };
      return {
        getDataValue: function(name) {
          return data[name];
        },
        getMovieList: function(callback, errorCallback) {
          $http.get('/movies')
            .success(function(res) {
              if (callback) {
                callback(res);
              }
            })
            .error(function() {
              if (errorCallback) {
                errorCallback();
              }
            });
        },
        getMovieInfo: function(id, callback, errorCallback) {
          $http.get('/movies/' + id)
            .success(function(res) {
              if (callback) {
                callback(res);
              }
            })
            .error(function() {
              if (errorCallback) {
                errorCallback();
              }
            });
        },
        manageMovie: function(id, movie, isUpdate, callback, errorCallback) {
          $http.post('/movies/' + id, { update: isUpdate, data: movie })
            .success(function(res) {
              if (callback) {
                callback(res);
              }
            })
            .error(function() {
              if (errorCallback) {
                errorCallback();
              }
            });
        },
        addRating: function(id, points, isUpdate, callback, errorCallback) {
          $http.post('/movies/' + id, { update: isUpdate, points: points })
            .success(function(res) {
              if (callback) {
                callback(res);
              }
            })
            .error(function() {
              if (errorCallback) {
                errorCallback();
              }
            });
        },
        addMovie: function(movie, callback, errorCallback) {
          $http.post('/movies', { data: movie })
            .success(function(res) {
              if (callback) {
                callback(res);
              }
            })
            .error(function() {
              if (errorCallback) {
                errorCallback();
              }
            });
        },
        addReview: function(movie_id, content, callback1, errorCallback) {
          $http.post('/movies/' + movie_id + '/reviews', { data: content })
            .success(function(res) {
              if (res && res.body.id) {
                var reviews;
                getReviews(movie_id, function(res) {
                  if (res && res.length) {
                    reviews = res;
                  } else {
                    reviews = false;
                  }
                  if (callback1) {
                    callback1(reviews);
                  }
                });
              }
            })
            .error(function() {
              if (errorCallback) {
                errorCallback();
              }
            });
        },
        updateReview: function(review_id, movie_id, content, isUpdate, callback, errorCallback) {
           $http.post('/reviews/' + review_id, { update: isUpdate, data: content })
            .success(function(res) {
              if (res && res.body.id) {
                var reviews;
                getReviews(movie_id, function(res) {
                  if (res && res.length) {
                    reviews = res;
                  } else {
                    reviews = false;
                  }
                  if (callback) {
                    callback(reviews);
                  }
                });
              }
            })
            .error(function() {
              if (errorCallback) {
                errorCallback();
              }
            });
        }
      };
    }]);
}());
