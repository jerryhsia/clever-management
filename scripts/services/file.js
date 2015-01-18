'use strict';
angular.module(app.name).service('$fileService',
  function ($upload)
  {
    this.upload = function (url, file, data) {
      return $upload.upload({
        url: url,
        method: 'POST',
        data: data,
        file: file
      });
    };
  }
);
