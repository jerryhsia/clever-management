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
      $scope.$parent.params = $scope.form;
      $scope.$parent.loadDatas(true);
    };

    $scope.reset = function() {
      $scope.form = {};
      $scope.search();
    };

    $scope.$on('searchToggle', function(d,data) {
      $scope.isOpened = !$scope.isOpened;
    });
  }
);
