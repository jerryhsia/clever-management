'use strict';
angular.module(app.name).service('$roleService',
  function ($http)
  {

    var roleCache = false;

    function clearRoleCache() {
      roleCache = false;
    }

    this.getRoles = function () {
      if (roleCache === false) {
        roleCache = $http.get(app.api + '/roles', {
          params: {}
        });
      }
      return roleCache;
    };

    this.createRole = function (role) {
      clearRoleCache();
      return $http.post(app.api + '/roles', role);
    };

    this.updateRole = function (role) {
      clearRoleCache();
      return $http.put(app.api + '/roles/' + role.id, role);
    };

    this.deleteRole = function(role) {
      clearRoleCache();
      return $http.delete(app.api + '/roles/' + role.id);
    };
  }
);
