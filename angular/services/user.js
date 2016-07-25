(function() {
  'use strict';

  angular.module('MoviewServices', [])
    .factory('UserService', ['$http', '$q', function($http, $q) {
      var user,
        data = {};
      return {
        getDataValue: function(name) {
          return data[name];
        },
        setUser: function(value) {
          user = value;
        },
        isLoggedIn: function() {
          return (user) ? user : false;
        },
        login: function(user, callback, errorCallback) {
          $http.post('/login', { username: user.username, password: user.password })
            .success(function(res) {
              isRunning = false;
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
        logOut: function(callback, errorCallback) {
          $http.get('/users/sign-out')
            .success(function(res) {
              user = null;
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
        getUserList: function(callback, errorCallback) {
          $http.get('/users')
            .success(function(res) {
              if (res && res.body) {
                // if (res.body.uid) {
                //   user = res.body;
                // }
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
        },
        getUserInfo: function(callback, errorCallback) {
          $http.get('/users')
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
        },
        getLogo: function(image, callback) {
          $http.get('/s3-url?filename=' + image)
            .success(function(res) {
              if (res && res.body) {
                if (callback) {
                  callback(res);
                }
              }
            })
            .error(function() {

            });
        }
      };
    }]);
}());
