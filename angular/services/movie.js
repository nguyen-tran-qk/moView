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
        getMovieInfo: function(callback, errorCallback) {
          $http.get('/movies')
            .success(function(res) {
              if (res && res.body) {
                if (res.body.uid) {
                  user = res.body;
                }
                if (callback) {
                  callback();
                }
              }
            })
            .error(function(res) {
              if (errorCallback) {
                errorCallback();
              }
            });
        }
      };
    }]);
}());
