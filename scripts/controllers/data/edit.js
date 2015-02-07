'use strict';
angular.module(app.name).controller('dataEditCtrl',
  function($scope, $modalInstance, $translate, $moduleService, $dataService, $roleService, $fileService, module, data)
  {
    $scope.module = module;

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    function loadData() {
      if (angular.isDefined(data.id)) {
        $dataService.view(module, data.id).success(function(data) {
          $scope.form = data;
          loadFields();
        });
      } else {
        $scope.form = data;
        loadFields();
      }
    }

    function loadFields() {
      $moduleService.getFields(module).success(function(data) {
        var fields = [];
        var userFields = {};
        angular.forEach(data, function(field, key) {
          if (!field.can_edit) return;
          if (field.is_user_field) {
            userFields[field.name] = field;
          } else {
            fields.push(field);
          }
        });
        $scope.fields = fields;
        $scope.userFields = userFields;
        if (module.is_user) {
          $roleService.getRoles().success(function(data) {
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

    $scope.save = function () {
      var p;
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
      loadData();
    })();
  }
);
