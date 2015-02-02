'use strict';
angular.module(app.name).controller('roleIndexCtrl',
  function($scope, $modal, $roleService, $moduleService, $translate)
  {

    $scope.selectedRole = null;
    $scope.selectedIndex = 0;

    $scope.selectRole = function (role, index) {
      $scope.selectedRole = angular.copy(role);
      $scope.selectedIndex = index;
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
      if (!angular.isDefined($scope.selectRole.permission.data_permission)) {
        $scope.selectRole.permission.data_permission = {
          list: false,
          create: false,
          update: false,
          view: false
        };
      }
    }

    function loadFields(module) {
      $moduleService.getFields(module).success(function(data) {
        $scope.fields = data;
      });
    }

    $scope.selectModule = function(module) {
      $scope.selectedModule = module;
      loadFields(module);
    };

    $scope.selectAll = function() {
      angular.forEach($scope.fields, function(field, key) {
        $scope.selectedRole.permission.field_permission[field.name] = {
          create: true,
          update: true,
          view: true
        };
      });
    };

    $scope.invertSelect = function() {
      var actions = ['create', 'update', 'view'];
      angular.forEach($scope.fields, function(field, key) {
        if (!angular.isDefined($scope.selectedRole.permission.field_permission[field.name])) {
          $scope.selectedRole.permission.field_permission[field.name] = {
            create: true,
            update: true,
            view: true
          };
        } else {
          for (var i = actions.length - 1; i >= 0; i--) {
            if (
              angular.isDefined($scope.selectedRole.permission.field_permission[field.name][actions[i]]) && 
              $scope.selectedRole.permission.field_permission[field.name][actions[i]]
              ) {
              $scope.selectedRole.permission.field_permission[field.name][actions[i]] = false;
            } else {
              $scope.selectedRole.permission.field_permission[field.name][actions[i]] = true;
            }
          };
        }
      });
    };

    $scope.savePermission = function() {
      $roleService.updateRole($scope.selectedRole).success(function(data) {
        $scope.roles[$scope.selectedIndex] = data;
      });
    };

    (function () {
      loadRoles();
    })();
  }
);
