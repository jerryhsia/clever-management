'use strict';
angular.module(app.name).controller('logViewCtrl',
  function($scope, $modalInstance, log)
  {
    $scope.log = log;
    console.log(log);

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  }
);
