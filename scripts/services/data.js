'use strict';
angular.module(app.name).service('$dataService',
  function ($http)
  {
    this.search = function (module, params) {
      return $http.get(app.api + '/datas/' + module.name, {
        params: params
      });
    };

    this.create = function (module, data) {
      return $http.post(app.api + '/datas/' + module.name, data);
    };

    this.patch = function (module, data) {
      return $http.put(app.api + '/datas/' + module.name + '/' + data.id, data);
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
