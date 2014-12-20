'use strict';
angular.module(app.name).controller('fieldEditCtrl',
  function($scope, $modalInstance, $moduleService, module, field)
  {
    $scope.form = field ? field : {};

    $scope.save = function () {
      var p;
      if (angular.isDefined($scope.form.id)) {
        p = $moduleService.patchField(module, $scope.form);
      } else {
        p = $moduleService.createField(module, $scope.form);
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  }
);
