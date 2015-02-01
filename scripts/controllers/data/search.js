'use strict';
angular.module(app.name).controller('dataSearchCtrl',
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
      $scope.$parent.params = params;
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
        if (field.name == 'id' || (data.module.is_user && field.name == 'user_id')) return;
        if (data.module.is_user && field.is_user_field) {
          userFields[field.name] = field;
        } else {
          fields.push(field);
        }
      });
      if (angular.isDefined(userFields['role_ids'])) {
        $scope.form['role_ids'] = [];
        $roleService.search().success(function(data) {
          $scope.roles = data;
        });
      }
      $scope.fields = fields;
      $scope.userFields = userFields;
    });
  }
);
