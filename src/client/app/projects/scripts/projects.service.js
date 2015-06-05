(function () {
  'use strict';

  angular
    .module('app.projects')
    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['$q', 'data'];
  /* @ngInject */
  function ProjectsService($q, data) {

    var service = {

      // functions
      getWorkRequests        : null,

    };


    service.getWorkRequests = function() {
      var deferred = $q.defer();
      data.get('work-request').then(function(data) {
        deferred.resolve(data.result.content);
        console.log('this is data', data)
      });
      return deferred.promise;
    };

    service.getAssignedProjects = function() {
      var deferred = $q.defer();
      data.get('copilot-assigned-projects').then(function(data) {
        deferred.resolve(data.result.content);
        console.log('this is copilot', data.result.content)
      });
      return deferred.promise;
    };

    return service;

  }
})();
