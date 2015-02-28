'use strict';
angular.module(clever.name).controller('logIndexCtrl',
  function($scope, $modal, $logService, $translate)
  {
    function loadModules() {
      $logService.getModules().success(function(data) {
        $scope.modules = data;
      });
    }

    $scope.params = {};
    $scope.pagination = getPagination();

    function loadLogs() {
      $logService.getLogs($scope.params).success(function(data, status, headers) {
        $scope.logs = data;
        $scope.pagination = getPagination(headers);
      });
    }

    $scope.delete = function(id, index) {
      if (!confirm($translate.instant('confirm_delete'))) return;
      $logService.deleteLog(id).success(function(data) {
        $scope.logs.splice(index, 1);
      }); 
    };

    $scope.search = function() {
      $scope.pagination.currentPage = 1;
      loadLogs();
    };

    $scope.view = function (log) {
      $modal.open({
        templateUrl: 'views/log/view.html',
        controller: 'logViewCtrl',
        windowClass: 'middle-modal',
        resolve: {
          log: function () {
            return log;
          }
        }
      });
    };

    (function() {
      loadModules();
      loadLogs();
    })();
  }
);
