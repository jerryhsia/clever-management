'use strict';
angular.module(app.name).controller('loginCtrl',
  function($scope, $userService, $state)
  {
    $scope.form = {
      identity: '',
      password: '',
      alert: false,
      remember: true
    };

    $scope.login = function() {
      $userService.login($scope.form).success(function(data) {
        $userService.setLoginedUser(data);
        $state.go('index');
      });
    }
  }
);
