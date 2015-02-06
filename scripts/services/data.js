'use strict';
angular.module(app.name).service('$dataService',
  function ($http, $userService, $translate)
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

    this.getExportUrl = function(module, params) {
      params.export = true;
      params._lang = $translate.use();
      
      var loginedUser = $userService.getLoginedUser();
      params['access-token'] = loginedUser['access_token'];

      var url = app.api + '/datas/' + module.name;
      var strings = [];

      angular.forEach(params, function(value, key) {
        strings.push(key+'='+value);
      });

      strings = strings.join('&');
      return url + '?' + strings;
    };
  }
);
