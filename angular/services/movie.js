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
        addMovie: function(movie, callback, errorCallback) {
          $http.post('/movies', movie)
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
