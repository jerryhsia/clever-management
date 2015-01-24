'use strict';
angular.module(app.name).directive('cleverField',
  function ()
  {
    function controller ($scope, $translate, $dataService, $fileService) {
      var name = $scope.field.name;
      var modelField = $scope.field.model_field;
      var tempField = name + '_temp';
      $scope.tempField = tempField;
      $scope.field.placeholder = '';

      if ($scope.sence == 'search') {
        $scope.field.is_null = 1;
        if (inArray($scope.field.input, ['textarea', 'editor'])) {
          $scope.field.input = 'input';
        }
      }

      switch ($scope.field.input) {
        case 'date':
          $scope.form[tempField] = $scope.form[name];
          $scope.change = function() {
            $scope.form[name] = dateToString($scope.form[tempField]);
          };
          break;
        case 'editor':
          $scope.editor = app.editor;
          break;
        case 'checkbox':
          $scope.form[tempField] = {};
          angular.forEach($scope.form[name], function(value, key) {
            $scope.form[tempField][value] = true;
          });
          $scope.change = function() {
            $scope.form[name] = [];
            angular.forEach($scope.form[tempField], function(value, key) {
              if (value) {
                $scope.form[name].push(key);
              }
            });
          };
          break;
      }

      if ($scope.field.input == 'select' || $scope.field.input == 'multiple_select') {
        $scope.sources = {};
        if ($scope.field.relation_id > 0) {
          if ($scope.field.relation_type == 'has_one') {
            var temp = [];
            if (angular.isDefined($scope.form[name]) && $scope.form[name].length > 0) {
              temp.push($scope.form[modelField]);
            }
            $scope.sources[name] = temp;
          }
          if ($scope.field.relation_type == 'has_many') {
            if (!angular.isDefined($scope.form[name]) || !angular.isArray($scope.form[name])) {
              $scope.form[name] = [];
              $scope.form[modelField] = [];
            }
            $scope.sources[name] = $scope.form[modelField];
          }
        }

        $scope.getSources = function(field, keyword) {
          if ($scope.field.relation_id == 0 || !keyword) return false;
          $dataService.search(field.relation_module, {keyword: keyword}).success(function(data) {
            $scope.sources[field.name] = data;
          });
        };
      }

      if ($scope.field.input == 'file' || $scope.field.input == 'multiple_file') {
        $scope.files = {};
        $scope.uploadInfo = {};

        $scope.upload = function(field) {
          if (angular.isArray($scope.files[field.name]) && $scope.files[field.name].length > 0) {
            $scope.uploadInfo[field.name] = {uploading: true, uploaded: 0};
            $fileService.upload(app.api + '/files', $scope.files[field.name][0])
              .success(function(data) {
                if (field.input == 'file') {
                  $scope.form[field.name] = data.id;
                  $scope.form[field.model_field] = data;
                } else {
                  $scope.form[field.name].push(data.id);
                  $scope.form[field.model_field].push(data);
                }
                delete $scope.files[field.name];
                delete $scope.uploadInfo[field.name];
              }).progress(function (evt) {
                $scope.uploadInfo[field.name].uploaded = parseInt(100 * evt.loaded / evt.total);
              }).error(function (data) {
                delete $scope.files[field.name];
                delete $scope.uploadInfo[field.name];
              });
          }

          $scope.deleteFile = function(field, index) {
            if (confirm($translate.instant('confirm_delete'))) {
              if (field.input == 'file') {
                $scope.form[field.name] = '';
                $scope.form[field.model_field] = null;
              }

              if (field.input == 'multiple_file') {
                var file = $scope.form[field.model_field][index];
                angular.forEach($scope.form[field.name], function(value, key) {
                  if (value == file.id) {
                    $scope.form[field.name].splice(key, 1);
                  }
                });
                $scope.form[field.model_field].splice(index, 1);
              }
            }
          };
        };
      }
    }

    function link () {

    }

    return {
      restrict: 'AE',
      scope: {
        form: '=ngModel',
        field: '=field',
        sence: '@sence'
      },
      require: 'ngModel',
      templateUrl: 'views/directive/clever-field.html',
      controller: controller,
      link: link
    }
  }
);
