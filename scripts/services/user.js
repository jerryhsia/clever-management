'use strict';
angular.module(app.name).service('$userService',
  function ($http)
  {
    this.login = function (user) {
      debug(user);
      return $.post(app.api + '/users/authentication', user);
      //return $http.post(app.api + '/users/authentication', user);
    };
  }
);
