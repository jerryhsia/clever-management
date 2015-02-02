'use strict';
angular.module(app.name).service('$roleService',
  function ($http)
  {

    var roleCache = false;

    this.getRoles = function () {
      if (roleCache === false) {
        roleCache = $http.get(app.api + '/roles', {
          params: {}
        });
      }
      return roleCache;
    };
  }
);
