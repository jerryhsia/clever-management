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

    this.update = function (module, data) {
      return $http.put(app.api + '/datas/' + module.name + '/' + data.id, data);
    };

    this.delete = function (module, data) {
      return $http.delete(app.api + '/datas/' + module.name + '/' + data.id);
    };
  }
);
