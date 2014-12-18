'use strict';
angular.module(app.name).controller('moduleIndexCtrl',
  function($scope, $modal, $moduleService)
  {

    $scope.selectedModule = null;

    $scope.selectModule = function (module) {
      $scope.selectedModule = module;
      $moduleService.searchField(module).success(function(data) {
        $scope.fields = data;
      });
    };

    $scope.editField = function (field) {
      var modal = $modal.open({
        templateUrl: 'views/module/field-edit.html',
        controller: 'fieldEditCtrl',
        windowClass: '',
        size: 'lg',
        resolve: {
          module: function () {
            return $scope.selectedModule;
          },
          field: function () {
            return field;
          }
        }
      });
      modal.result.then(function (result) {

      });
    };

    function loadModules() {
      $moduleService.searchModule().success(function(data) {
        $scope.modules = data;
        if ($scope.modules.length > 0) {
          $scope.selectModule($scope.modules[0]);
        }
      });
    }

    (function () {
      loadModules();
    })();
  }
);
