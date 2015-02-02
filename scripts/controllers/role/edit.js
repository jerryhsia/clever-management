'use strict';
angular.module(app.name).controller('roleEditCtrl',
  function($scope, $modalInstance, $roleService, role)
  {
    $scope.form = angular.copy(role);

    $scope.save = function () {
      var p;
      if (angular.isDefined($scope.form.id)) {
        p = $roleService.updateRole($scope.form);
      } else {
        p = $roleService.createRole($scope.form);
      }
      p.success(function(data) {
        $modalInstance.close(data);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  }
);
