'use strict';
angular.module(clever.name).controller('datepickerCtrl', function ($scope) {

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.format = 'yyyy-MM-dd';
});
