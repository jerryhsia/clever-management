'use strict';
angular.module(app.name).controller('fieldEditCtrl',
  function($scope, $modalInstance, $moduleService, module, field)
  {
    $scope.form = field ? angular.copy(field) : {};

    $scope.save = function () {
      var p;
      if (angular.isDefined($scope.form.id)) {
        p = $moduleService.updateField(module, $scope.form);
      } else {
        p = $moduleService.createField(module, $scope.form);
      }
      p.success(function(data) {
        $modalInstance.close(data);
      });
    };

    function loadModules() {
      $moduleService.getModules().success(function(data) {
        angular.forEach(data, function(value, key) {
          if (value.id == module.id) {
            data.splice(key, 1);
          }
        });
        $scope.modules = data;
      });
    }

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    (function(){
      if (!angular.isDefined($scope.form.id)) {
        loadModules();
      }
    })();
  }
);
