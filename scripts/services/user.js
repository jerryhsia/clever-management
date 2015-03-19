'use strict';
angular.module(clever.name).service('$userService',
  function ($http, $cookieStore, $rootScope) {
    var key = 'loginedUser';

    this.login = function (user) {
      return $http.post(clever.api + '/users/authentication', user);
    };

    this.setLoginedUser = function(user) {
      $rootScope[key] = user;
      $cookieStore.put(key, user);
    };

    this.getLoginedUser = function() {
      var user = $cookieStore.get(key);
      if (angular.isDefined(user) && angular.isObject(user)) {
        return user;
      } else {
        return null;
      }
    };

    this.logout = function() {
      $rootScope[key] = null;
      $cookieStore.remove(key);
      return true;
    }
  }
);
