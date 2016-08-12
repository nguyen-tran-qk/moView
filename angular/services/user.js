(function() {
  'use strict';

  angular.module('MoviewServices')
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
          return (localStorage.user) ? JSON.parse(localStorage.user) : false;
        },
        getFacebookInfo: function(token) {
          var deferred = $q.defer();
          FB.api('/me', {fields: 'id, name, last_name, email' , access_token: token}, function(res) {
            if (!res || res.error) {
              deferred.reject('Error occured');
            } else {
              deferred.resolve(res);
            }
          });
          return deferred.promise;
        },
        login: function(user, callback, errorCallback) {
          $http.post('/login', { username: user.username, password: user.password })
            .success(function(res) {
              if (res.body.user) {
                localStorage.setItem('user', JSON.stringify(res.body.user));
              }
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
          localStorage.removeItem('user');
          // $http.get('/users/sign-out')
          //   .success(function(res) {
          //     user = null;
          //     if (callback) {
          //       callback(res);
          //     }
          //   })
          //   .error(function() {
          //     if (errorCallback) {
          //       errorCallback();
          //     }
          //   });
        },
        getUserList: function(callback, errorCallback) {
          $http.get('/users')
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
