(function() {
  'use strict';
  angular.module('MoviewControllers')
    .controller('DemoController', ['$scope', '$uibModal', '$state', 'UserService', function($scope, $uibModal, $state, UserService) {
      $scope.user = (localStorage.user) ? JSON.parse(localStorage.user) : false;
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
            auth2.disconnect();
            $scope.user = '';
            $state.reload();
          });
        } else {
          FB.logout(function(res) {
            $scope.user = '';
            $state.reload();
          });
        }
        localStorage.removeItem('user');
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
        var user = UserService.getFacebookInfo($scope.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        $uibModalInstance.close(user);
      }
      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
      $scope.options = {
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': function(res) {
          var user = {
            name: res.wc.Za,
            last_name: res.wc.Na,
            email: res.wc.hg,
            login: 'google'
          }
          localStorage.setItem('user', JSON.stringify(user));
          $uibModalInstance.close(user);
        }
      }
    }])
    .directive('googleSignInButton', function() {
      return {
        scope: {
          buttonId: '@',
          options: '&'
        },
        template: '<div>Google</div>',
        link: function(scope, element, attrs) {
          var div = element.find('div')[0];
          div.id = attrs.buttonId;
          gapi.signin2.render(div.id, scope.options()); //render a google button, first argument is an id, second options
        }
      };
    });

}());
