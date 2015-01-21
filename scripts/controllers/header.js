'use strict';
angular.module(app.name).controller('headerCtrl',
  function($scope, $translate)
  {
    $scope.menu = [
      {
        name: 'role',
        title: $translate.instant('role'),
        url: '/roles',
        icon: 'glyphicon glyphicon-user'
      },
      {
        name: 'module',
        title: $translate.instant('module'),
        url: '/modules',
        icon: 'glyphicon glyphicon-th-large'
      },
      {
        name: 'data',
        title: $translate.instant('data'),
        url: '/datas',
        icon: 'glyphicon glyphicon-hdd'
      },
      {
        name: 'log',
        title: $translate.instant('log'),
        url: '/logs',
        icon: 'glyphicon glyphicon-list'
      },
      {
        name: 'setting',
        title: $translate.instant('setting'),
        url: '/settings',
        icon: 'glyphicon glyphicon-cog'
      }
    ];

    $scope.helloTip = $translate.instant('hello_tip', {name: 'Jerry'});
  }
);
