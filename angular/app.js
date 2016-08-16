(function() {
  'use strict';
  var app = angular.module('MoviewApp', ['ngAnimate', 'ui.bootstrap', 'MoviewControllers', 'CarettRoutes', 'MoviewServices', 'MoviewDirectives']);

  app.run(['$rootScope', '$window', 'UserService',
    function($rootScope, $window, UserService) {
      window.fbAsyncInit = function() {
        FB.init({
          appId: '162826914124462',
          channelUrl: 'angular/channel.html',
          xfbml: true,
          version: 'v2.7'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  ]);
}());
