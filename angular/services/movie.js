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
          $http.post('/movies/' + id, {update: isUpdate, data: movie })
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
          $http.post('/movies/' + id, {update: isUpdate, points: points })
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
