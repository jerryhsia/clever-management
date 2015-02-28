'use strict';
angular.module(clever.name).controller('appEditCtrl',
  function($scope, $modalInstance, $appService, app)
  {
    $scope.form = angular.copy(app);

    $scope.save = function () {
      var p;
      if (angular.isDefined($scope.form.id)) {
        p = $appService.updateApp($scope.form);
      } else {
        p = $appService.createApp($scope.form);
      }
      p.success(function(data) {
        $modalInstance.close(data);
      });
    };

    function loadApps() {
      $appService.getApps().success(function(data) {
        angular.forEach(data, function(value, key) {
          if (value.id == clever.id) {
            data.splice(key, 1);
          }
        });
        $scope.apps = data;
      });
    }

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    (function(){
      if (!angular.isDefined($scope.form.id)) {
        //loadApps();
      }
    })();
  }
);
