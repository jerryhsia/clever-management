'use strict';
angular.module(clever.name, [
  'ngSanitize',
  'ngCookies',
  'ui.bootstrap',
  'ui.router',
  'ui.select',
  'ui.sortable',
  'angularFileUpload',
  'pascalprecht.translate',
  'angular-loading-bar',
  'jerryhsia.minieditor'
]).config(function ($stateProvider, $locationProvider, $urlRouterProvider, $translateProvider, $httpProvider, uiSelectConfig, cfpLoadingBarProvider) {

  $httpProvider.interceptors.push('interceptor');

  uiSelectConfig.theme = 'bootstrap';
  uiSelectConfig.resetSearchInput = true;

  cfpLoadingBarProvider.includeSpinner = false;

  $translateProvider.useStaticFilesLoader({
    prefix: 'i18n/',
    suffix: '.json'
  });

  $urlRouterProvider.otherwise('/datas');
  $locationProvider.html5Mode(false);

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
  }).state('log', {
    url: '/logs',
    templateUrl: 'views/log/index.html',
    controller: 'logIndexCtrl'
  }).state('module', {
    url: '/modules',
    templateUrl: 'views/module/index.html',
    controller: 'moduleIndexCtrl'
  }).state('app', {
    url: '/apps',
    templateUrl: 'views/app/index.html',
    controller: 'appIndexCtrl'
  }).state('data', {
    url: '/datas',
    templateUrl: 'views/data/index.html',
    controller: 'dataIndexCtrl'
  });
}).run(function ($rootScope, $translate, $state, $userService, $location) {
  $rootScope.clever = clever;
  $rootScope.alerts = [];
  $translate.use(clever.lang);

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
