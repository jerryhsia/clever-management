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
      $moduleService.getFields($scope.selectedModule).success(function(data) {
        $scope.fields = data;
        $scope.$broadcast('loadedFields', {module: $scope.selectedModule, fields: data});
        var listFields = [];
        angular.forEach(data, function(field, key) {
          if (field.is_list) listFields.push(field.name);
        });
        $scope.listFields = listFields.join(',');
        $scope.loadDatas();
      });
    }

    $scope.pagination = getPagination();
    $scope.params = {};
    $scope.sorts = {};
    $scope.searchs = {};

    $scope.toggleSort = function(name) {
      if (angular.isDefined($scope.sorts[name])) {
        $scope.sorts[name] = $scope.sorts[name] == '-' ? '+' : '-';
      } else {
        $scope.sorts[name] = '-';
      }
      $scope.loadDatas();
    };

    function getParams() {
      $scope.params.per_page = $scope.pagination.perPage;
      $scope.params.page = $scope.pagination.currentPage;

      var sorts = [];
      angular.forEach($scope.fields, function(field, index) {
        if (angular.isDefined($scope.sorts[field.name])) {
          var re = $scope.sorts[field.name] == '-' ? '-' : '';
          sorts.push(re+field.name);
        }
      });

      var other = {
        sort: sorts.join(','),
        fields: $scope.listFields
      };
      return angular.extend($scope.params, other, $scope.searchs);
    }

    $scope.clear = function() {
      $scope.pagination.currentPage = 1;
      $scope.sorts = {};
      $scope.searchs = {};
    };

    $scope.loadDatas = function() {
      $dataService.search($scope.selectedModule, getParams()).success(function(data, status, headers) {
        $scope.datas = data;
        $scope.pagination = getPagination(headers);
      });
    };

    function loadModules() {
      $moduleService.getModules().success(function(data) {
        $scope.modules = data;
        if ($scope.modules.length > 0) {
          $scope.selectModule($scope.modules[0]);
        }
      });
    }

    $scope.editData = function (data, index) {
      var modal = $modal.open({
        templateUrl: 'views/data/edit.html',
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
          $scope.loadDatas();
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

    $scope.exportData = function () {
      var modal = $modal.open({
        templateUrl: 'views/data/export.html',
        controller: 'dataExportCtrl',
        windowClass: 'middle-modal',
        resolve: {
          fields: function () {
            return $scope.fields;
          }
        }
      });
      modal.result.then(function(data) {
        var params = getParams();
        data['fields'] = data.fields.join(',');
        params = angular.extend(params, data);
        var url = $dataService.getExportUrl($scope.selectedModule, params);
        window.open(url);
      });
    };

    (function () {
      loadModules();
    })();
  }
);
