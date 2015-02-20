'use strict';
angular.module(app.name).controller('roleIndexCtrl',
  function($scope, $modal, $roleService, $moduleService, $translate)
  {

    $scope.selectedRole = null;
    $scope.selectedIndex = 0;

    $scope.selectedModule = null;
    $scope.permission = {};

    $scope.selectRole = function (role, index) {
      $scope.selectedRole = angular.copy(role);
      $scope.selectedIndex = index;

      if ($scope.selectedModule) {
        loadFields();
      }
    };

    $scope.editRole = function (role, index) {
      var modal = $modal.open({
        templateUrl: 'views/role/edit.html',
        controller: 'roleEditCtrl',
        windowClass: 'middle-modal',
        resolve: {
          module: function () {
            return $scope.selectedModule;
          },
          role: function () {
            return role;
          }
        }
      });
      modal.result.then(function(role) {
        if (angular.isDefined(index)) {
          $scope.roles[index] = role;
        } else {
          loadRoles();
        }
      });
    };

    $scope.deleteRole = function (role) {
      if (!confirm($translate.instant('confirm_delete'))) return false;
      $roleService.deleteRole(role).success(function(data) {
        loadRoles();
      });
    };

    function loadRoles() {
      $roleService.getRoles().success(function(data) {
        $scope.roles = data;
        if ($scope.roles.length > 0) {
          $scope.selectRole($scope.roles[0]);
          loadModules();
        }
      });
    }

    function loadModules() {
      $moduleService.getModules().success(function(data) {
        $scope.modules = data;
        if (data.length > 0) {
          $scope.selectModule(data[0]);
        }
      });
    }

    function parsePermission() {
      if (!angular.isDefined($scope.permission.data_permission) || !angular.isObject($scope.permission.data_permission)) {
        $scope.permission.data_permission = {
          list: false,
          create: false,
          update: false,
          view: false
        };
      }
      if (!angular.isDefined($scope.permission.data_condition)) {
        $scope.permission.data_condition = '';
      }
      if (!angular.isDefined($scope.permission.field_permission) || !angular.isObject($scope.permission.field_permission)) {
        $scope.permission.field_permission = {};
      }
    }

    function loadPermisson() {
      if (!angular.isObject($scope.selectedRole.permission)) {
        $scope.selectedRole.permission = {};
      }
      $scope.permission = $scope.selectedRole.permission;
       parsePermission();
    }

    function loadFields() {
      $moduleService.getFields($scope.selectedModule).success(function(data) {
        $scope.fields = data;
        loadPermisson();
      });
    }

    $scope.selectModule = function(module) {
      $scope.selectedModule = module;
      loadFields();
    };

    $scope.selectAll = function() {
      angular.forEach($scope.fields, function(field, key) {
        $scope.permission.field_permission[field.name] = {
          create: true,
          update: true,
          view: true
        };
      });
    };

    $scope.invertSelect = function() {
      var actions = ['create', 'update', 'view'];
      angular.forEach($scope.fields, function(field, key) {
        if (!angular.isDefined($scope.permission.field_permission[field.name])) {
          $scope.permission.field_permission[field.name] = {
            create: true,
            update: true,
            view: true
          };
        } else {
          for (var i = actions.length - 1; i >= 0; i--) {
            if (
              angular.isDefined($scope.permission.field_permission[field.name][actions[i]]) && 
              $scope.permission.field_permission[field.name][actions[i]]
              ) {
              $scope.permission.field_permission[field.name][actions[i]] = false;
            } else {
              $scope.permission.field_permission[field.name][actions[i]] = true;
            }
          };
        }
      });
    };

    $scope.savePermission = function() {
      $roleService.updateRole($scope.selectedRole);
    };

    (function () {
      loadRoles();
    })();
  }
);
