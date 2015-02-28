'use strict';
angular.module(clever.name).controller('dataSearchCtrl',
  function($scope, $roleService)
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
      $scope.$parent.searchs = params;
      $scope.$parent.loadDatas();
    };

    $scope.reset = function() {
      $scope.form = {};
      $scope.$parent.clear();
      $scope.$parent.loadDatas();
    };

    $scope.$on('loadedFields', function(d, data) {
      var fields = [];
      var userFields = {};
      angular.forEach(data.fields, function(field, key) {
        if (!field.is_search) return;
        if (field.is_user_field) {
          userFields[field.name] = field;
        } else {
          fields.push(field);
        }
      });
      if (angular.isDefined(userFields['role_ids'])) {
        $scope.form['role_ids'] = [];
        $roleService.getRoles().success(function(data) {
          $scope.roles = data;
        });
      }
      $scope.fields = fields;
      $scope.userFields = userFields;
    });
  }
);
