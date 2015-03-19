'use strict';
angular.module(clever.name).service('$dataService',
  function ($http, $userService, $translate)
  {
    this.search = function (module, params) {
      return $http.get(clever.api + '/datas/' + module.name, {
        params: params
      });
    };

    this.create = function (module, data) {
      return $http.post(clever.api + '/datas/' + module.name, data);
    };

    this.update = function (module, data) {
      return $http.put(clever.api + '/datas/' + module.name + '/' + data.id, data);
    };

    this.delete = function (module, data) {
      return $http.delete(clever.api + '/datas/' + module.name + '/' + data.id);
    };

    this.view = function(module, id) {
      return $http.get(clever.api + '/datas/' + module.name + '/' + id);
    }

    this.getExportUrl = function(module, params) {
      params.export = true;
      params._lang = $translate.use();
      
      var loginedUser = $userService.getLoginedUser();
      params['access-token'] = loginedUser['access_token'];

      var url = clever.api + '/datas/' + module.name;
      var strings = [];

      angular.forEach(params, function(value, key) {
        strings.push(key+'='+value);
      });

      strings = strings.join('&');
      return url + '?' + strings;
    };
  }
);
