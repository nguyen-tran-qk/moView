(function() {
  'use strict';

  angular.module('MoviewServices', [])
    .factory('UserService', ['$http', '$q', /*'ZendeskWidget',*/ function($http, $q /*, ZendeskWidget*/ ) {
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
          $http({
              url: '/login',
              method: 'POST',
              data: user
            })
            .success(function(res) {
              if (res && res.body && res.meta.code === 200) {
                user = res.body;
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
          $http.get('/users/sign-out')
            .success(function(res) {
              /*try {
                ZendeskWidget.hide();
              } catch(ex) { //Catch cannot inject Zendesk
                console.error(ex);
              }*/

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
