'use strict';
angular.module(clever.name).factory('interceptor',
  function($rootScope, $q, $alertService, $translate, $cookieStore)
  {
    return {
      'request': function(config) {
        if (inArray(config['method'], ['PUT', 'POST'])) {
          $rootScope.submiting = true;
        }

        if (angular.isDefined($rootScope.loginedUser)) {
          config.headers['X-Access-Token'] = $rootScope.loginedUser.access_token;
        }

        var lang = $translate.use();
        if (lang) {
          config.headers['Accept-Language'] = (lang == 'zh-CN') ? 'zh-CN' : 'en-US';
        }
        return config;
      },

      'requestError': function(rejection) {
        $rootScope.submiting = false;
        return $q.reject(rejection);
      },

      'response': function(response) {
        $rootScope.submiting = false;
        if (angular.isDefined(response.config) && inArray(response.config.method, ['POST', 'PUT', 'DELETE'])) {
          if (angular.isDefined(response.config.data)
            && angular.isObject(response.config.data)
            && angular.isDefined(response.config.data.alert)
            && response.config.data.alert == false
          ) {
            return response;
          }
          $alertService.push({type: 'success', message: $translate.instant('operate_success')});
        }
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
        } else if (rejection.status == 401) {
          $cookieStore.remove('loginedUser');
          delete $rootScope.loginedUser;
        } else {
          var message = '';
          if (rejection.data && angular.isDefined(rejection.data.message)) {
            message = rejection.data.message;
          } else {
            message = $translate.instant('system_error_tip');
          }
          $alertService.push({type: 'danger', message: message});
        }
        return $q.reject(rejection);
      }
    };
  }
);
