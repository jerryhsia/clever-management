'use strict';
angular.module(app.name).controller('fieldEditCtrl',
  function($scope, $modal, $moduleService, module, field)
  {
    $scope.form = field ? field : {};

    $scope.save = function () {
      var p = null;
      if (angular.isDefined($scope.form.id)) {
        $moduleService.patchField(module, $scope.form);
      } else {
        $moduleService.createField(module, $scope.form);
      }
    };
  }
);
