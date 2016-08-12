(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('DemoController', ['$scope', '$uibModal', '$state', 'UserService', function($scope, $uibModal, $state, UserService) {
      $scope.openDemoLogin = function() {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/demo-login.html',
          controller: 'DemoLoginController',
          resolve: {
            // user: function
          }
        });
        modalInstance.result.then(function(user) {
          $scope.user = user;
        });
      };
      $scope.logout = function() {
        if ($scope.user.login === 'google') {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function() {
            console.log('User signed out.');
            $scope.user = '';
            $state.reload();
          });
        } else {
          FB.logout(function(res) {
            $scope.user = '';
            $state.reload();
          });
        }
      }
    }])
    .controller('DemoLoginController', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'UserService', function($scope, $http, $uibModal, $uibModalInstance, UserService) {
      $scope.fbLogin = function() {
        FB.login(function(res) {
          $scope.accessToken = res.authResponse.accessToken;
          $scope.getFacebookInfo();
        }, { scope: 'public_profile,email' });
      }
      $scope.getFacebookInfo = function() {
        var user = UserService.getFacebookInfo($scope.accessToken)
        $uibModalInstance.close(user);
      }
      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
      $scope.onSignIn = function(res) {
        var user = {
          name: res.wc.wc,
          last_name: res.wc.Na,
          email: res.wc.hg,
          login: 'google'
        }
        $uibModalInstance.close(user);
      }
    }])
    .directive('googleSignInButton', function() {
      return {
        scope: {
          gClientId: '@',
          callback: '&onSignIn'
        },
        template: '<a href ng-click="onSignInButtonClick()" class="btn btn-warning btn-block btn-lg">Google</a>',
        controller: ['$scope', '$attrs', function($scope, $attrs) {
          gapi.load('auth2', function() { //load in the auth2 api's, without it gapi.auth2 will be undefined
            gapi.auth2.init({
              client_id: $attrs.gClientId
            });
            var GoogleAuth = gapi.auth2.getAuthInstance(); //get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init
            $scope.onSignInButtonClick = function() { //add a function to the controller so ng-click can bind to it
              GoogleAuth.signIn().then(function(response) { //request to sign in
                $scope.callback({ response: response });
              });
            };
          });
        }]
      };
    });
}());
