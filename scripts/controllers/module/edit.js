'use strict';
angular.module(app.name).controller('moduleEditCtrl',
  function($scope, $modalInstance, $moduleService, module)
  {
    if (!angular.isDefined(module.id)) {
      module.is_user = 0;
    }
    $scope.form = module;

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
