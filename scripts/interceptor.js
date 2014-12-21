'use strict';
angular.module(app.name).factory('interceptor',
  function($rootScope, $q, $alertService)
  {
    return {
      'request': function(config) {
        if (inArray(config['method'], ['PUT', 'POST'])) {
          $rootScope.submiting = true;
        }
        return config;
      },

      'requestError': function(rejection) {
        $rootScope.submiting = false;
        return $q.reject(rejection);
      },

      'response': function(response) {
        $rootScope.submiting = false;
        return response;
      },

      'responseError': function(rejection) {
        $rootScope.submiting = false;
        if (rejection.status == 422) {
          var messages = [];
          for (var key in rejection.data) {
            messages.push({type: 'danger', message: rejection.data[key].message});
          }
          $alertService.push(messages);
        } else {
          $alertService.push({type: 'danger', message: rejection.data.message});
        }
        return $q.reject(rejection);
      }
    };
  }
);
