'use strict';
angular.module(clever.name).service('$moduleService',
  function ($http)
  {
    var moduleCache = false;

    function clearModuleCache() {
      moduleCache = false;
    }

    this.getModules = function () {
      if (moduleCache === false) {
        moduleCache = $http.get(clever.api + '/modules', {
          params: {}
        });
      }
      return moduleCache;
    };

    this.createModule = function (module) {
      clearModuleCache();
      return $http.post(clever.api + '/modules', module);
    };

    this.updateModule = function (module) {
      clearModuleCache();
      return $http.put(clever.api + '/modules/' + module.id, module);
    };

    this.deleteModule = function(module) {
      clearModuleCache();
      return $http.delete(clever.api + '/modules/' + module.id);
    };

    var fieldCache = {};

    function clearFieldCache(module) {
      delete fieldCache[module.id];
    }

    this.getFields = function (module) {
      if (!angular.isDefined(fieldCache[module.id])) {
        fieldCache[module.id] = $http.get(clever.api + '/modules/' + module.id + '/fields', {
          params: {}
        });
      }

      return fieldCache[module.id];
    };

    this.createField = function (module, field) {
      clearFieldCache(module);
      return $http.post(clever.api + '/modules/' + module.id + '/fields', field);
    };

    this.updateField = function (module, field) {
      clearFieldCache(module);
      return $http.put(clever.api + '/modules/' + module.id + '/fields/' + field.id, field);
    };

    this.batchUpdateField = function (module, fields) {
      clearFieldCache(module);
      return $http.put(clever.api + '/modules/' + module.id + '/fields', fields);
    };

    this.deleteField = function (module, field) {
      clearFieldCache(module);
      return $http.delete(clever.api + '/modules/' + module.id + '/fields/' + field.id);
    };
  }
);
