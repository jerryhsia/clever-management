'use strict';
angular.module(app.name).controller('dataEditCtrl',
  function($scope, $modalInstance, $moduleService, module, data)
  {
    $scope.form = data ? angular.copy(data) : {};

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

    function loadFields() {
      $moduleService.searchField(module).success(function(data) {
        $scope.fields = data;
      });
    }

    (function() {
      loadFields();
    })();
  }
);
