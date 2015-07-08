(function () {
  'use strict';

  angular
    .module('app.projects')
    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['$q', '$http', 'data', 'UserService', 'UserV3Service'];
  /* @ngInject */
  function ProjectsService($q, $http, data, UserService, UserV3Service) {

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
      console.log('im here')
      var deferred = $q.defer();
      UserV3Service.getCurrentUser(function(user) {
      data.get('copilot-assigned-projects', {copilotId: user.id}).then(function(copilotData) {
        console.log('ughhhhhh', copilotData);
        service.openPromises = copilotData.result.content;
        var promises = copilotData.result.content.map(function(project) {
        return data.get('copilot-work-request', {id: project.id}).then(function(workData) {
          return workData.result.content;
        });
        })
        $q.all(promises)
        .then(function(data) {
          data.forEach(function(dataProject) {
            service.openPromises.forEach(function(project) {
              if (project.id === dataProject.id) {
                project.name = dataProject.name;
                project.createdAt = dataProject.createdAt;
                project.requestType = dataProject.requestType;
              }
            })
          })
          deferred.resolve(service.openPromises)
         })
        })

        })
        return deferred.promise;
       }

    return service;

  }
})();
