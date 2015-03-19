'use strict';
angular.module(clever.name).controller('loginCtrl',
  function($scope, $userService, $state)
  {
    $scope.form = {
      account: '',
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
