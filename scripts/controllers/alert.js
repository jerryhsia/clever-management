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

    this.push = function (message) {
      if (angular.isDefined(message.type)) {
        $rootScope.alerts.push(message);
      } else {
        for (var key in message) {
          $rootScope.alerts.push(message[key]);
        }
      }
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
