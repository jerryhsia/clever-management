'use strict';
angular.module(app.name).controller('dataExportCtrl',
  function($scope, $modalInstance, fields)
  {
    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.submit = function () {
      angular.forEach($scope.temp, function(isSelected, field) {
        if (isSelected) {
          $scope.form.fields.push(field);
        }
      });
      $modalInstance.close($scope.form);
    };

    (function() {
      $scope.fields = fields;
      $scope.form = {
        fields: [],
        format: 'xls',
        mode: 'origin',
      };

      $scope.temp = {};
      angular.forEach(fields, function(field, key) {
        $scope.temp[field.name] = true;
      });
    })();
  }
);
