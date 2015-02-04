'use strict';
function debug(object) {
  if (app.debug) {
    console.log(object);
  }
}

function inArray(object, array) {
  for (var i = 0; i < array.length; i++) {
    if (object == array[i]) {
      return true;
    }
  }
  return false;
}

function indexBy (array, column) {
  var result = {};
  for (var index in array) {
    result[array[index][column]] = array[index];
  }
  return result;
}

function stringToDate(date) {
  if (date.indexOf('-') == -1) return date;
  date = date.substring(0, 10);
  date = date.split('-');
  return new Date(date[0], date[1] - 1, date[2]);
}

function dateToString(date) {
  if (!(date instanceof Date)) return date;

  var year = date.getFullYear().toString();
  var month = date.getMonth() + 1;
  month = month.toString().length < 2 ? '0' + month : month;
  var day = date.getDate().toString().length < 2 ? '0' + date.getDate() : date.getDate();

  return year + '-' + month + '-' + day;
}

function getPagination(headers, oldPagination) {
  var pagination = null;
  if (typeof oldPagination !== 'undefined') {
    pagination = oldPagination;
  } else {
    pagination = app.pagination;
  }

  if (typeof headers !== 'undefined') {
    headers = headers();
    pagination['totalItems'] = headers['x-pagination-total-count'] ? headers['x-pagination-total-count'] : 0;
    pagination['numPages'] = headers['x-pagination-page-count'] ? headers['x-pagination-page-count'] : 1;
    pagination['perPage'] = headers['x-pagination-per-page'] ? headers['x-pagination-per-page'] : 20;
    pagination['currentPage'] = headers['x-pagination-current-page'] ? headers['x-pagination-current-page'] : 1;
  }
  return pagination;
}
