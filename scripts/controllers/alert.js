'use strict';
angular.module(app.name).service('$alertService',
  function ($rootScope, $timeout)
  {
    function shift () {
      $timeout(function(){
        $rootScope.alerts.splice(0, 1);
        if ($rootScope.alerts.length > 0) {
          shift();
        }
      }, app.alert_time);
    }

    this.push = function (type, message) {
      $rootScope.alerts.push({'type': type, message: message});
      shift();
    };

    this.remove = function (index) {
      $rootScope.alerts.splice(index, 1);
    };
  }
);
angular.module(app.name).controller('alertCtrl',
  function($scope, $rootScope, $alertService) {
    $scope.close = function (index) {
      $alertService.remove(index);
    };
  }
);
