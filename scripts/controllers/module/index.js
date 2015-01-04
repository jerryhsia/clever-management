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

    $scope.editModule = function (module, index) {
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
        if (angular.isDefined(index)) {
          $scope.modules[index] = module;
        } else {
          loadModules();
        }
      });
    };

    $scope.deleteModule = function (module) {
      if (!confirm($translate.instant('confirm_delete'))) return false;
      $moduleService.deleteModule(module).success(function(data) {
        loadModules();
      });
    };

    $scope.editField = function (field, index) {
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
        if (angular.isDefined(index)) {
          $scope.fields[index] = field;
        } else {
          loadFields();
        }
      });
    };

    $scope.deleteField = function(field, index) {
      if (!confirm($translate.instant('confirm_delete'))) return false;
      $moduleService.deleteField($scope.selectedModule, field).success(function(data) {
        $scope.fields.splice(index, 1);
      });
    };

    $scope.toggle = function(field, name, index) {
      field[name] = field[name] == 1 ? 0 : 1;
      $moduleService.patchField($scope.selectedModule, field).success(function(data) {
        $scope.fields[index] = data;
      });
    };

    (function () {
      loadModules();
    })();
  }
);
