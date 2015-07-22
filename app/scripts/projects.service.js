(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.projects')
    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['$q', '$http', 'UserV3Service', 'apiUrl'];
  /* @ngInject */
  function ProjectsService($q, $http, UserV3Service, apiUrl) {

    var service = {

      projects: [],
      // functions
      getWorkRequests: null,
      getAssignedProjects: null

    };

    service.getWorkRequests = function() {
      var deferred = $q.defer();
      $http.get(apiUrl)
      data.get('work-request', {filter: 'copilotId=unassigned'}).then(function(data) {
        service.projects = data.result.content;
        deferred.resolve(data.result.content);
      }).catch(function(e) {
            console.log('Error on open projects', e);
            $q.reject(e);
      });
        return deferred.promise;
    };

    service.getAssignedProjects = function() {
      var deferred = $q.defer();
      var user = UserV3Service.getCurrentUser();
        data.get('work-request', {filter: 'copilotId='+user.id}).then(function(copilotData) {
          service.projects = copilotData.result.content;
          deferred.resolve(copilotData.result.content)
        });
      return deferred.promise;
    }

    return service;

  }
})();
