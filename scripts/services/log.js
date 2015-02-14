'use strict';
angular.module(app.name).service('$logService',
  function ($http)
  {
    this.getModules = function() {
      return $http.get(app.api + '/logs/modules');
    };

    this.getLogs = function(params) {
      return $http.get(app.api + '/logs', {
        params: params
      });
    };

    this.deleteLog = function(id) {
      return $http.delete(app.api + '/logs/'+id);
    };
  }
);
