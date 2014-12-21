'use strict';
angular.module(app.name).service('$moduleService',
  function ($http)
  {
    this.searchModule = function (params) {
      return $http.get(app.api + '/modules', {
        params: params
      });
    };

    this.createModule = function (module) {
      return $http.post(app.api + '/modules', module);
    };

    this.patchModule = function (module) {
      return $http.put(app.api + '/modules/' + module.id, module);
    };

    this.deleteModule = function(module) {
      return $http.delete(app.api + '/modules/' + module.id);
    };

    this.searchField = function (module, params) {
      return $http.get(app.api + '/modules/' + module.id + '/fields', {
        params: params
      });
    };

    this.createField = function (module, field) {
      return $http.post(app.api + '/modules/' + module.id + '/fields', field);
    };

    this.patchField = function (module, field) {
      return $http.put(app.api + '/modules/' + module.id + '/fields/' + field.id, field);
    };

    this.deleteField = function (module, field) {
      return $http.delete(app.api + '/modules/' + module.id + '/fields/' + field.id);
    };
  }
);
