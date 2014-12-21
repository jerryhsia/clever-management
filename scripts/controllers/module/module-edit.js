'use strict';
angular.module(app.name).controller('moduleEditCtrl',
  function($scope, $modalInstance, $moduleService, module)
  {
    $scope.form = module ? angular.copy(module) : {};

    $scope.save = function () {
      var p;
      if (angular.isDefined($scope.form.id)) {
        p = $moduleService.patchModule($scope.form);
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
