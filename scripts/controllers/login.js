'use strict';
angular.module(app.name).controller('loginCtrl',
  function($scope, $userService)
  {
    $scope.form = {
      identity: '',
      password: '',
      remember: false
    };

    $scope.login = function() {
      $userService.login($scope.form).success(function(data) {
        debug(data);
      });
    }
  }
);
