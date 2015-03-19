'use strict';
angular.module(clever.name).service('$logService',
  function ($http)
  {
    this.getModules = function() {
      return $http.get(clever.api + '/logs/modules');
    };

    this.getLogs = function(params) {
      return $http.get(clever.api + '/logs', {
        params: params
      });
    };

    this.deleteLog = function(id) {
      return $http.delete(clever.api + '/logs/'+id);
    };
  }
);
