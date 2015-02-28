'use strict';
angular.module(clever.name).directive('fieldInList',
  function ()
  {
    function controller ($scope) {
      if ($scope.field) {

      }
    }

    return {
      restrict: 'AE',
      templateUrl: 'views/directive/field-in-list.html',
      controller: controller
    }
  }
);
