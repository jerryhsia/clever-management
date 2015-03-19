'use strict';
angular.module(clever.name).service('$alertService',
  function ($rootScope, $timeout)
  {

    function shift () {
      $timeout(function(){
        $rootScope.alerts.splice(0, 1);
        if ($rootScope.alerts.length > 0) {
          shift();
        }
      }, clever.alert_time);
    }

    this.push = function (message) {
      if (angular.isArray(message)) {
        for (var key in message) {
          $rootScope.alerts.push(message[key]);
        }
      } else {
        $rootScope.alerts.push(message);
      }
      shift();
    };

    this.remove = function (index) {
      $rootScope.alerts.splice(index, 1);
    };
  }
);
angular.module(clever.name).controller('alertCtrl',
  function($scope, $rootScope, $alertService) {
    $scope.close = function (index) {
      $alertService.remove(index);
    };
  }
);
