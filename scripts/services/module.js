'use strict';
angular.module(app.name).service('$moduleService',
  function ($http)
  {
    this.searchModule = function (params) {
      return $http.get(app.api + '/modules', {
        params: params
      });
    };

    this.searchField = function (module, params) {
      return $http.get(app.api + '/modules/' + module.id + '/fields', {
        params: params
      });
    };

    this.createField = function (module, field) {
      return $http.post(app.api + '/modules/' + module.id + '/fields', field, {
        withCredentials: true
      });
    };

    this.patchField = function (module, field) {
      return $http.put(app.api + '/modules/' + module.id + '/fields/' + field.id, field);
    };
  }
);
