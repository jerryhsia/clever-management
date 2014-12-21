'use strict';
angular.module(app.name).controller('fieldEditCtrl',
  function($scope, $modalInstance, $moduleService, module, field)
  {
    $scope.form = field ? angular.copy(field) : {};

    $scope.save = function () {
      var p;
      if (angular.isDefined($scope.form.id)) {
        p = $moduleService.patchField(module, $scope.form);
      } else {
        p = $moduleService.createField(module, $scope.form);
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
