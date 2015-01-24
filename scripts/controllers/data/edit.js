'use strict';
angular.module(app.name).controller('dataEditCtrl',
  function($scope, $modalInstance, $translate, $moduleService, $dataService, $roleService, $fileService, module, data)
  {
    $scope.module = module;
    $scope.form = data ? angular.copy(data) : {};

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    function loadFields() {
      $moduleService.getFields(module).success(function(data) {
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
        initData();
      });
    }

    function initData() {
      if (module.is_user) {
        $scope.form.password = '';
        if (angular.isDefined($scope.form.id)) {
          $scope.form.passwordTip = $translate.instant('null_not_change');
        } else {
          $scope.form.passwordTip = $translate.instant('please_input')+' '+$translate.instant('password');
        }
      }
    }

    function beforeSave() {

    }

    $scope.save = function () {
      var p;
      beforeSave();
      if (angular.isDefined($scope.form.id)) {
        p = $dataService.update(module, $scope.form);
      } else {
        p = $dataService.create(module, $scope.form);
      }
      p.success(function(data) {
        $modalInstance.close(data);
      });
    };

    (function() {
      loadFields();
    })();
  }
);
