'use strict';
angular.module(app.name).controller('dataSearchCtrl',
  function($scope)
  {
    $scope.isOpened = false;

    $scope.toggle = function() {
      $scope.isOpened = !$scope.isOpened;
    };

    $scope.form = {};

    $scope.search = function() {
      var params = {};
      angular.forEach($scope.form, function(value, key) {
        if (angular.isArray(value)) {
          params[key] = value.join(',');
        } else {
          params[key] = value;
        }
      });
      $scope.$parent.clear();
      $scope.$parent.params = params;
      $scope.$parent.loadDatas();
    };

    $scope.reset = function() {
      $scope.form = {};
      $scope.$parent.clear();
      $scope.$parent.loadDatas();
    };
  }
);
