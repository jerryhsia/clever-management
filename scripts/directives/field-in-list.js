'use strict';
angular.module(app.name).directive('fieldInList',
  function ()
  {
    function controller ($scope) {
      if ($scope.field) {

      }
    }

    return {
      restrict: 'AE',
      templateUrl: 'views/widget/field-in-list.html',
      controller: controller
    }
  }
);
