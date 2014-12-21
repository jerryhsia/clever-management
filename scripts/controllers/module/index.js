'use strict';
angular.module(app.name).controller('moduleIndexCtrl',
  function($scope, $modal, $moduleService, $translate)
  {
    $scope.selectedModule = null;

    $scope.selectModule = function (module) {
      $scope.selectedModule = module;
      loadFields();
    };

    function loadModules() {
      $moduleService.searchModule().success(function(data) {
        $scope.modules = data;
        if ($scope.modules.length > 0) {
          $scope.selectModule($scope.modules[0]);
        }
      });
    }

    $scope.editModule = function (module) {
      var modal = $modal.open({
        templateUrl: 'views/module/module-edit.html',
        controller: 'moduleEditCtrl',
        windowClass: 'middle-modal',
        resolve: {
          module: function () {
            return module;
          }
        }
      });
      modal.result.then(function(module) {
        loadModules();
      });
    };

    $scope.deleteModule = function (module) {
      if (!confirm($translate.instant('confirm_delete'))) return false;
      $moduleService.deleteModule(module).success(function(data) {
        loadModules();
      });
    };

    function loadFields() {
      $moduleService.searchField($scope.selectedModule).success(function(data) {
        $scope.fields = data;
      });
    }

    $scope.editField = function (field) {
      var modal = $modal.open({
        templateUrl: 'views/module/field-edit.html',
        controller: 'fieldEditCtrl',
        windowClass: 'middle-modal',
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
      if (!confirm($translate.instant('confirm_delete'))) return false;
      $moduleService.deleteField($scope.selectedModule, field).success(function(data) {
        loadFields();
      });
    };

    (function () {
      loadModules();
    })();
  }
);
