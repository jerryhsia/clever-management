'use strict';
angular.module(clever.name).service('$appService',
  function ($http)
  {
    var appCache = false;

    function clearAppCache() {
      appCache = false;
    }

    this.getApps = function () {
      if (appCache === false) {
        appCache = $http.get(clever.api + '/apps', {
          params: {}
        });
      }
      return appCache;
    };

    this.createApp = function (app) {
      clearAppCache();
      return $http.post(clever.api + '/apps', app);
    };

    this.updateApp = function (app) {
      clearAppCache();
      return $http.put(clever.api + '/apps/' + app.id, app);
    };

    this.deleteApp = function(app) {
      clearAppCache();
      return $http.delete(clever.api + '/apps/' + app.id);
    };
  }
);
