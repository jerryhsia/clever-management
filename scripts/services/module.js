'use strict';
angular.module(app.name).service('$moduleService',
  function ($http)
  {
    var moduleCache = false;

    function clearModuleCache() {
      moduleCache = false;
    }

    this.getModules = function () {
      if (moduleCache === false) {
        moduleCache = $http.get(app.api + '/modules', {
          params: {}
        });
      }
      return moduleCache;
    };

    this.createModule = function (module) {
      clearModuleCache();
      return $http.post(app.api + '/modules', module);
    };

    this.updateModule = function (module) {
      clearModuleCache();
      return $http.put(app.api + '/modules/' + module.id, module);
    };

    this.deleteModule = function(module) {
      clearModuleCache();
      return $http.delete(app.api + '/modules/' + module.id);
    };

    var fieldCache = {};

    function clearFieldCache(module) {
      delete fieldCache[module.id];
    }

    this.getFields = function (module) {
      if (!angular.isDefined(fieldCache[module.id])) {
        fieldCache[module.id] = $http.get(app.api + '/modules/' + module.id + '/fields', {
          params: {}
        });
      }

      return fieldCache[module.id];
    };

    this.createField = function (module, field) {
      clearFieldCache(module);
      return $http.post(app.api + '/modules/' + module.id + '/fields', field);
    };

    this.updateField = function (module, field) {
      clearFieldCache(module);
      return $http.put(app.api + '/modules/' + module.id + '/fields/' + field.id, field);
    };

    this.batchUpdateField = function (module, fields) {
      clearFieldCache(module);
      return $http.put(app.api + '/modules/' + module.id + '/fields', fields);
    };

    this.deleteField = function (module, field) {
      clearFieldCache(module);
      return $http.delete(app.api + '/modules/' + module.id + '/fields/' + field.id);
    };
  }
);
