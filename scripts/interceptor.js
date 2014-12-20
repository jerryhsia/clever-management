'use strict';
angular.module(app.name).factory('interceptor',
  function($rootScope)
  {
    return {
      'request': function(config) {
        if (inArray(config['method'], ['PUT', 'POST'])) {
          $rootScope.submiting = true;
        }
        return config;
      },

      'response': function(response) {
        $rootScope.submiting = false;
        return response;
      },

      'responseError': function(response) {
        $rootScope.submiting = false;
        return response;
      }
    };
  }
);
