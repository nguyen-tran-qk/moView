(function() {
  'use strict';

  angular.module('MoviewServices')
    .factory('MovieService', ['$http', '$q', function($http, $q) {
      var movie,
        data = {};
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
        getMovieInfo: function(id, user_id, callback, errorCallback) {
          $http.get('/movies/' + id, {user_id: user_id})
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
        manageMovie: function(userId, id, movie, isUpdate, callback, errorCallback) {
          $http.post('/movies/' + id, { user_id: userId, update: isUpdate, data: movie })
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
        addRating: function(userId, id, points, isUpdate, callback, errorCallback) {
          $http.post('/movies/' + id, { user_id: userId, update: isUpdate, points: points })
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
        }
      };
    }]);
}());
