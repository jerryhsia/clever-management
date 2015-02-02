'use strict';
angular.module(app.name).controller('roleIndexCtrl',
  function($scope, $roleService)
  {

    $scope.selectedRole = null;

    $scope.selectRole = function (role) {
      $scope.selectedRole = role;
    };

    function loadRoles() {
      $roleService.getRoles().success(function(data) {
        $scope.roles = data;
        if ($scope.roles.length > 0) {
          $scope.selectRole($scope.roles[0]);
        }
      });
    }

    (function () {
      loadRoles();
    })();
  }
);
