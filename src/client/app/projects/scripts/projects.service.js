(function () {
  'use strict';

  angular
    .module('app.projects')
    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['$q', 'data', 'UserService'];
  /* @ngInject */
  function ProjectsService($q, data, UserService) {

    var service = {

      // functions
      getWorkRequests        : null,

    };


    service.getWorkRequests = function() {
      var deferred = $q.defer();
      data.get('work-request').then(function(data) {
        deferred.resolve(data.result.content);
      });
      return deferred.promise;
    };

    service.getAssignedProjects = function() {
      var deferred = $q.defer();
      data.get('copilot-assigned-projects', {id: UserService.currentUser.id}).then(function(data) {
        deferred.resolve(data.result.content);
        console.log('the assigned projects', data)
      });
      return deferred.promise;
    };

    return service;

  }
})();
