'use strict';
angular.module(clever.name).controller('appEditCtrl',
  function($scope, $modalInstance, $appService, $roleService, app)
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

    function loadRoles() {
      $roleService.getRoles().success(function(data) {
        $scope.roles = data;
      });
    }

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    (function(){
      loadRoles();
    })();
  }
);
