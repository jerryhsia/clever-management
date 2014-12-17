'use strict';
angular.module(app.name).service('$roleService',
  function ($http)
  {
    this.search = function (params) {
      return $http.get(app.api + '/roles', {
        params: params
      });
    };
  }
);
