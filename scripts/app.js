'use strict';
angular.module(app.name, [
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap',
  'ui.router',
  'ui.select',
  'ui.sortable',
  'ngCookies',
  'angularFileUpload',
  'pascalprecht.translate',
  'angular-loading-bar',
  'jerryhsia.minieditor'
]).config(function ($stateProvider, $locationProvider, $urlRouterProvider, $translateProvider, $httpProvider, uiSelectConfig, cfpLoadingBarProvider) {

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('interceptor');

  uiSelectConfig.theme = 'bootstrap';
  uiSelectConfig.resetSearchInput = true;

  cfpLoadingBarProvider.includeSpinner = false;

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'loginCtrl'
  }).state('home', {
    url: '/',
    templateUrl: 'views/index.html',
    controller: 'indexCtrl'
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
  }).state('data', {
    url: '/datas',
    templateUrl: 'views/data/index.html',
    controller: 'dataIndexCtrl'
  });

  $translateProvider.useStaticFilesLoader({
    prefix: 'scripts/i18n/',
    suffix: '.json'
  });
}).run(function ($rootScope, $translate, $state, $userService, $location) {
  $rootScope.app = app;
  $rootScope.alerts = [];
  $translate.use(app.lang);

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    var loginedUser = $userService.getLoginedUser();
    if (loginedUser) {
      $rootScope.loginedUser = loginedUser;
      if (toState.name == 'login') {
        event.preventDefault();
        $state.go('index');
      }
    } else {
      if (toState.name != 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $rootScope.currentState = toState;
  });
});
