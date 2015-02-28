'use strict';
angular.module(clever.name).service('$roleService',
  function ($http)
  {

    var roleCache = false;

    function clearRoleCache() {
      roleCache = false;
    }

    this.getRoles = function () {
      if (roleCache === false) {
        roleCache = $http.get(clever.api + '/roles', {
          params: {}
        });
      }
      return roleCache;
    };

    this.createRole = function (role) {
      clearRoleCache();
      return $http.post(clever.api + '/roles', role);
    };

    this.updateRole = function (role) {
      clearRoleCache();
      return $http.put(clever.api + '/roles/' + role.id, role);
    };

    this.deleteRole = function(role) {
      clearRoleCache();
      return $http.delete(clever.api + '/roles/' + role.id);
    };

    this.getPermission = function(role, params) {
      return $http.get(clever.api + '/roles/' + role.id + '/permissions', {
        params: params
      });
    };

    this.updatePermission = function(role, attributes) {
      return $http.post(clever.api + '/roles/' + role.id + '/permissions', attributes, {
        params: {
          
        }
      });
    };
  }
);
