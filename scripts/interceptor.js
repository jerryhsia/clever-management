'use strict';
angular.module(app.name).factory('interceptor',
  function()
  {
    return {
      /*'request': function(config) {
        return config;
      },

      'response': function(response) {
        return response;
      },*/

      'responseError': function(response) {
        return response;
      }
    };
  }
);
