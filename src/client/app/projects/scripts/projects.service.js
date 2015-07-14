(function () {
  'use strict';

  angular
    .module('app.projects')
    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['$q', '$http', 'data', 'UserV3Service'];
  /* @ngInject */
  function ProjectsService($q, $http, data, UserV3Service) {

    var service = {

      openPromises: [],
      promises: [],
      // functions
      getWorkRequests        : null,

    };

    service.getWorkRequests = function() {
      var deferred = $q.defer();
      data.get('work-request', {filter: 'copilotId=unassigned'}).then(function(data) {
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
          deferred.resolve(copilotData.result.content)
        });
      return deferred.promise;
    }

    return service;

  }
})();
