(function() {
  'use strict';
  var app = angular.module('MoviewDirectives', []);
  app.filter('moment', function() {
      return function(string, format) {
        if (string && moment(string).isValid()) {
          return moment(string).format(format);
        } else {
          return string;
        }
      };
    })
    .filter('fromNow', function() {
      return function(string, isSuffixed) {
        if (moment(string).isValid()) {
          if (isSuffixed === true) {
            return moment(string).fromNow(true);
          } else {
            return moment(string).fromNow();
          }
        } else {
          return string;
        }
      };
    });
}());
