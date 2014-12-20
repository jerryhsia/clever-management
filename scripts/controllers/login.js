'use strict';
angular.module(app.name).controller('loginCtrl',
  function($scope, $userService, $http)
  {
    $scope.form = {
      identity: '',
      password: '',
      remember: false
    };

    $http.post(app.api+'/1.php', {name: 'xiajie'}, {withCredentials: true});

    $scope.login = function() {
      $userService.login($scope.form).success(function(data) {
        debug(data);
      });
    }
  }
);
