'use strict';
angular.module(app.name).controller('dataIndexCtrl',
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

    $scope.editData = function (data) {
      var modal = $modal.open({
        templateUrl: 'views/data/data-edit.html',
        controller: 'dataEditCtrl',
        windowClass: 'middle-modal',
        resolve: {
          module: function () {
            return $scope.selectedModule;
          },
          data: function () {
            return data;
          }
        }
      });
      modal.result.then(function(data) {
        $scope.selectModule($scope.selectedModule);
      });
    };

    $scope.deleteData = function(data) {
      if (confirm($translate.instant('confirm_delete'))) {
        $moduleService.deleteField($scope.selectedModule, data).success(function(data) {
          loadFields();
        });
      }
    };

    (function () {
      loadModules();
    })();
  }
);
