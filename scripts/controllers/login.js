'use strict';
angular.module(app.name).controller('loginCtrl',
  function($scope, $userService, $http)
  {
    $scope.form = {
      identity: '',
      password: '',
      alert: false,
      remember: false
    };

    $scope.login = function() {
      $userService.login($scope.form).success(function(data) {
        debug(data);
      });
    }
  }
);
