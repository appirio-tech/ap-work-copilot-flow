(function () {
  'use strict';

  angular
    .module('app.projects')
    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['$q', '$http', 'data', 'UserService'];
  /* @ngInject */
  function ProjectsService($q, $http, data, UserService) {

    var service = {

      // functions
      getWorkRequests        : null,

    };


    service.getWorkRequests = function() {
      var deferred = $q.defer();
      data.get('work-request', {filter: 'copilotId=unassigned'}).then(function(data) {
        deferred.resolve(data.result.content);
      }).catch(function(e) {
            console.log('error on open projects', e);
            $q.reject(e);
        });
        return deferred.promise;
    };

    service.getAssignedProjects = function() {
      var deferred = $q.defer();
      data.get('copilot-assigned-projects', {copilotId: UserService.currentUser.id}).then(function(data) {
          //  var req = {
          //  method: 'GET',
          //  url: 'https://api.topcoder-dev.com/v3/app-work-requests',
          //  params: { filter: 'copilotId=unassigned&id='+project.id}
          // }
         var mapped = data.result.content.map(function(project) {
          console.log('before', project)
           $http( {
           method: 'GET',
           url: 'https://api.topcoder-dev.com/v3/app-work-requests',
           params: { filter: 'copilotId=unassigned&id='+project.id}
          }).success(function(projectData, status) {
            project.name = projectData.result.content[0].name;
            console.log('le mod proje', project)
            return project;
          })
          })
          // deferred.resolve(mod)
      console.log('mapped', mapped)
        });
      return deferred.promise;
    };

    service.getProjectName = function(project) {
      var deferred = $q.defer();
       var req = {
       method: 'GET',
       url: 'https://api.topcoder-dev.com/v3/app-work-requests',
       params: { filter: 'copilotId=unassigned&id='+project.id}
      }
      $http(req).success(function(data, status) {
        deferred.resolve(data.result.content[0].name);
        console.log('ugh', data.result.content[0].name)
      })
      return deferred.promise
      };

    return service;

  }
})();
