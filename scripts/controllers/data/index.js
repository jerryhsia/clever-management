'use strict';
angular.module(app.name).controller('dataIndexCtrl',
  function($scope, $modal, $moduleService, $dataService, $translate)
  {
    $scope.selectedModule = null;

    $scope.selectModule = function (module) {
      $scope.selectedModule = module;
      loadFields();
    };

    function loadFields() {
      $moduleService.searchField($scope.selectedModule).success(function(data) {
        $scope.fields = data;
        loadDatas();
      });
    }

    function loadDatas() {
      $dataService.search($scope.selectedModule).success(function(data) {
        $scope.datas = data;
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

    $scope.editData = function (data, index) {
      console.log(index);
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
        if (angular.isDefined(index)) {
          $scope.datas[index] = data;
        } else {
          loadDatas();
        }
      });
    };

    $scope.deleteData = function(data, index) {
      if (confirm($translate.instant('confirm_delete'))) {
        $dataService.delete($scope.selectedModule, data).success(function(data) {
          $scope.datas.splice(index, 1);
        });
      }
    };

    (function () {
      loadModules();
    })();
  }
);
