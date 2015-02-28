'use strict';
angular.module(clever.name).controller('moduleEditCtrl',
  function($scope, $modalInstance, $moduleService, module)
  {
    $scope.form = angular.copy(module);

    if (!angular.isDefined($scope.form.id)) {
      $scope.form.is_user = 0;
    }

    $scope.save = function () {
      var p;
      if (angular.isDefined($scope.form.id)) {
        p = $moduleService.updateModule($scope.form);
      } else {
        p = $moduleService.createModule($scope.form);
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
