'use strict';
angular.module(clever.name).controller('headerCtrl',
  function($scope, $translate, $userService, $state)
  {
    $scope.menu = [
      {
        name: 'role',
        title: $translate.instant('role'),
        url: '/roles',
        icon: 'users'
      },
      {
        name: 'app',
        title: $translate.instant('app'),
        url: '/apps',
        icon: 'th-large'
      },
      {
        name: 'module',
        title: $translate.instant('module'),
        url: '/modules',
        icon: 'th'
      },
      {
        name: 'data',
        title: $translate.instant('data'),
        url: '/datas',
        icon: 'hdd-o'
      },
      {
        name: 'log',
        title: $translate.instant('log'),
        url: '/logs',
        icon: 'list'
      },
      {
        name: 'setting',
        title: $translate.instant('setting'),
        url: '/settings',
        icon: 'cog'
      }
    ];

    $scope.logout = function() {
      if ($userService.logout()) {
        $state.go('login');
      }
    };

    (function() {
      var hour = (new Date()).getHours();
      var section = 1;
      if (hour >= 6 && hour <= 11) {
        section = 1;
      } else if (hour >= 12 && hour <= 16) {
        section = 2;
      } else {
        section = 3;
      }
      $scope.helloTip = $translate.instant('hello_tip_' + section, {name: $scope.loginedUser.name});
    })();
  }
);
