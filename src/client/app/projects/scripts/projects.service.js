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
      data.get('work-request', {filter: 'copilotId=unassigned'}).then(function(data) {
        deferred.resolve(data.result.content);
        console.log('the open projects', data.result.content)
      }).catch(function(e) {
            console.log('error on open projects', e);
            $q.reject(e);
        });
        return deferred.promise;
    };

    service.getAssignedProjects = function() {
      var deferred = $q.defer();
      data.get('copilot-assigned-projects', {copilotId: UserService.currentUser.id}).then(function(data) {
        deferred.resolve(data.result.content);
        console.log('the assigned projects', data.result.content)
      });
      return deferred.promise;
    };

    return service;

  }
})();
