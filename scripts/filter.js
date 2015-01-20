'use strict';
angular.module(app.name).filter('toString', function() {
  return function(item) {
    if (angular.isArray(item)) {
      var result = [];
      for (var i = 0; i < item.length; i++) {
        if (angular.isObject(item[i])) {
          result.push(item[i].to_string);
        } else {
          return item.join(',');
        }
      }
      return result.join(',');
    }

    if (angular.isObject(item)) {
      return item.to_string;
    }

    return item;
  };
}).filter('getFileUrl', function() {
  return function(file) {
    if (angular.isDefined(file) && angular.isDefined(file.url)) {
      return file.url;
    } else {
      return '';
    }
  };
});
