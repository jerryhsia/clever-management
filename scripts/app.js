'use strict';
angular.module(app.name, [
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap',
  'ui.router',
  'ngCookies',
  'angularFileUpload',
  'pascalprecht.translate'
]).config(function ($stateProvider, $locationProvider, $urlRouterProvider, $cookieStoreProvider, $translateProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('interceptor');

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'loginCtrl'
  }).state('index', {
    url: '/index',
    templateUrl: 'views/index.html',
    controller: 'indexCtrl'
  }).state('role', {
    url: '/roles',
    templateUrl: 'views/role/index.html',
    controller: 'roleIndexCtrl'
  }).state('module', {
    url: '/modules',
    templateUrl: 'views/module/index.html',
    controller: 'moduleIndexCtrl'
  });

  $translateProvider.useStaticFilesLoader({
    prefix: 'scripts/i18n/',
    suffix: '.json'
  });
}).run(function ($rootScope, $translate, $state) {
  $rootScope.app = app;
  $translate.use('zh-CN');
  $state.go('index');

  $rootScope.$on('$stateChangeSuccess', function (event, toState, fromState) {
    $rootScope.toState = toState;
    if (angular.isDefined(fromState.name)) {
      debug('State chenged from \''+fromState.name+'\' to \''+toState.name+'\'');
    }
  });
});
