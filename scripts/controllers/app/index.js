'use strict';
angular.module(clever.name).controller('appIndexCtrl',
  function($scope, $modal, $appService, $translate)
  {
    function loadApps() {
      $appService.getApps().success(function(data) {
        $scope.apps = data;
      });
    }

    $scope.editApp = function (app, index) {
      var modal = $modal.open({
        templateUrl: 'views/app/edit.html',
        controller: 'appEditCtrl',
        windowClass: 'middle-modal',
        resolve: {
          app: function () {
            return app;
          }
        }
      });
      modal.result.then(function(app) {
        if (angular.isDefined(index)) {
          $scope.apps[index] = app;
        } else {
          loadApps();
        }
      });
    };

    $scope.deleteApp = function (app) {
      if (!confirm($translate.instant('confirm_delete'))) return false;
      $appService.deleteApp(app).success(function(data) {
        loadApps();
      });
    };

    $scope.editApp = function (app, index) {
      var modal = $modal.open({
        templateUrl: 'views/app/edit.html',
        controller: 'appEditCtrl',
        windowClass: 'middle-modal',
        resolve: {
          app: function () {
            return app;
          }
        }
      });
      modal.result.then(function(data) {
        if (angular.isDefined(index)) {
          $scope.apps[index] = data;
        } else {
          loadApps();
        }
      });
    };

    (function () {
      loadApps();
    })();
  }
);
