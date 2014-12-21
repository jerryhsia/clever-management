'use strict';
angular.module(app.name).controller('moduleIndexCtrl',
  function($scope, $modal, $moduleService, $translate)
  {
    $scope.selectedModule = null;

    $scope.selectModule = function (module) {
      $scope.selectedModule = module;
      loadFields();
    };

    function loadFields() {
      $moduleService.searchField($scope.selectedModule).success(function(data) {
        $scope.fields = data;
      });
    }

    function loadModules() {
      $moduleService.searchModule().success(function(data) {
        $scope.modules = data;
        if ($scope.modules.length > 0) {
          $scope.selectModule($scope.modules[0]);
        }
      });
    }

    $scope.editField = function (field) {
      var modal = $modal.open({
        templateUrl: 'views/module/field-edit.html',
        controller: 'fieldEditCtrl',
        windowClass: '',
        resolve: {
          module: function () {
            return $scope.selectedModule;
          },
          field: function () {
            return field;
          }
        }
      });
      modal.result.then(function(field) {
        $scope.selectModule($scope.selectedModule);
      });
    };

    $scope.deleteField = function(field) {
      if (confirm($translate.instant('confirm_delete'))) {
        $moduleService.deleteField($scope.selectedModule, field).success(function(data) {
          loadFields();
        });
      }
    };

    (function () {
      loadModules();
    })();
  }
);
