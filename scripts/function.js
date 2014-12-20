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
