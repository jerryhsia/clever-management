'use strict';
angular.module(app.name).service('$userService',
  function ($http) {
    this.login = function (user) {
      return $http.post(app.api + '/users/authentication', user);
    };
  }
);
