'use strict';
angular.module(app.name).controller('dataEditCtrl',
  function($scope, $modalInstance, $moduleService, $dataService, module, data)
  {
    $scope.form = data ? angular.copy(data) : {};

    $scope.save = function () {
      var p;
      if (angular.isDefined($scope.form.id)) {
        p = $dataService.patch(module, $scope.form);
      } else {
        p = $dataService.create(module, $scope.form);
      }
      p.success(function(data) {
        $modalInstance.close(data);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    function loadFields() {
      $moduleService.searchField(module).success(function(fields) {
        $scope.fields = fields;
      });
    }

    (function() {
      loadFields();
    })();
  }
);
