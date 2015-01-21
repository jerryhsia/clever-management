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

      $scope.sources = {};
      angular.forEach($scope.fields, function(field, key) {
        if (field.relation_id > 0) {
          if (field.relation_type == 'has_one') {
            var temp = [];
            if (angular.isDefined($scope.form[field.name]) && $scope.form[field.name].length > 0) {
              temp.push($scope.form[field.model_field]);
            }
            $scope.sources[field.name] = temp;
          }
          if (field.relation_type == 'has_many') {
            if (!angular.isDefined($scope.form[field.name]) || !angular.isArray($scope.form[field.name])) {
              $scope.form[field.name] = [];
              $scope.form[field.model_field] = [];
            }
            $scope.sources[field.name] = $scope.form[field.model_field];
          }
        }

        if (field.input == 'checkbox') {
          $scope.form[field.name + '_temp'] = {};
          angular.forEach($scope.form[field.name], function(value, key) {
            $scope.form[field.name + '_temp'][value] = true;
          });
        }

        if (field.input == 'date') {
          $scope.form[field.name + '_temp'] = $scope.form[field.name];
        }
      });
    }

    $scope.getSources = function(field, keyword) {
      if (!keyword) return false;
      $dataService.search(field.relation_module, {keyword: keyword}).success(function(data) {
        $scope.sources[field.name] = data;
      });
    };

    $scope.files = {};
    $scope.uploadInfo = {};

    $scope.upload = function(field) {
      if (angular.isArray($scope.files[field.name]) && $scope.files[field.name].length > 0) {
        $scope.uploadInfo[field.name] = {uploading: true, uploaded: 0};
        $fileService.upload(app.api + '/files', $scope.files[field.name][0])
          .success(function(data) {
            if (field.input == 'file') {
              $scope.form[field.name] = data.id;
              $scope.form[field.model_field] = data;
            } else {
              $scope.form[field.name].push(data.id);
              $scope.form[field.model_field].push(data);
            }
            delete $scope.files[field.name];
            delete $scope.uploadInfo[field.name];
          }).progress(function (evt) {
            $scope.uploadInfo[field.name].uploaded = parseInt(100 * evt.loaded / evt.total);
          }).error(function (data) {
            delete $scope.files[field.name];
            delete $scope.uploadInfo[field.name];
          });
      }
    };

    $scope.deleteFile = function(field, index) {
      if (confirm($translate.instant('confirm_delete'))) {
        if (field.input == 'file') {
          $scope.form[field.name] = '';
          $scope.form[field.model_field] = null;
        }

        if (field.input == 'multiple_file') {
          var file = $scope.form[field.model_field][index];
          angular.forEach($scope.form[field.name], function(value, key) {
            if (value == file.id) {
              $scope.form[field.name].splice(key, 1);
            }
          });
          $scope.form[field.model_field].splice(index, 1);
        }
      }
    };

    function beforeSave() {
      angular.forEach($scope.fields, function(field, key) {
        if (field.input == 'checkbox') {
          $scope.form[field.name] = [];
          angular.forEach($scope.form[field.name+'_temp'], function(value, key) {
            if (value) {
              $scope.form[field.name].push(key);
            }
          });
        }

        if (field.input == 'date') {
          $scope.form[field.name] = dateToString($scope.form[field.name + '_temp']);
        }
      });
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
