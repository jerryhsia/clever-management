'use strict';
angular.module(app.name).controller('dataEditCtrl',
  function($scope, $modalInstance, $translate, $moduleService, $dataService, $roleService, module, data)
  {
    $scope.module = module;
    $scope.form = data ? angular.copy(data) : {};
    if (module.is_user) {
      $scope.form.password = '';
      if (angular.isDefined($scope.form.id)) {
        $scope.form.passwordTip = $translate.instant('null_not_change');
      } else {
        $scope.form.passwordTip = $translate.instant('please_input')+' '+$translate.instant('password');
      }
    }

    $scope.save = function () {
      var p;
      if (angular.isDefined($scope.form.id)) {
        p = $dataService.patch(module, $scope.form);
      } else {
        p = $dataService.create(module, $scope.form);
      }
      p.success(function(data) {
        $modalInstance.close(data);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    function loadFields() {
      $moduleService.searchField(module).success(function(data) {
        var fields = [];
        var userFields = {};
        angular.forEach(data, function(field, key) {
          if (field.can_edit) {
            if (module.is_user && field.is_user_field) {
              userFields[field.name] = field;
            } else {
              fields.push(field);
            }
          }
        });
        $scope.fields = fields;
        $scope.userFields = userFields;
        if (module.is_user) {
          $roleService.search().success(function(data) {
            $scope.roles = data;
          });
        }
        initSources();
      });
    }

    function initSources() {
      $scope.sources = {};
      angular.forEach($scope.fields, function(field, key) {
        if (field.has_relation) {
          if (field.relation_type == 'has_one') {
            var temp = [];
            temp.push($scope.form[field.name+'_model']);
            $scope.sources[field.name] = temp;
          }
          if (field.relation_type == 'has_many') {
            $scope.sources[field.name] = $scope.form[field.name+'_model'];
          }
        }
      });
    }

    $scope.getSources = function(field, keyword) {
      if (!keyword) return false;
      $dataService.search(field.relation_module, {keyword: keyword}).success(function(data) {
        $scope.sources[field.name] = data;
      });
    };

    (function() {
      loadFields();
    })();
  }
);
