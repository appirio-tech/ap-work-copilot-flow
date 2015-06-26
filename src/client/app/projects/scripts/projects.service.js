(function () {
  'use strict';

  angular
    .module('app.projects')
    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['$q', '$http', 'data', 'UserService'];
  /* @ngInject */
  function ProjectsService($q, $http, data, UserService) {

    var service = {

      openPromises: [],

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
      data.get('copilot-assigned-projects', {copilotId: UserService.currentUser.id}).then(function(data) {
        deferred.resolve(data.result.content);
       //  var promises = data.result.content.map(function(project) {
       //   return $http({
       //     method: 'GET',
       //     url: 'https://api.topcoder-dev.com/v3/app-work-requests/',
       //     params: { filter: 'copilotId=unassigned&id='+project.id}
       //      })
       // });
       //  $q.all(promises)
       //  .then(function(data) {
       //    console.log(data)
       //    data.forEach(function(dataProject) {
       //      openPromises.forEach(function(project) {
       //        if (project.id === dataProject.data.result.content[0].id) {
       //          project.name = dataProject.data.result.content[0].name;
       //          project.createdAt = dataProject.data.result.content[0].createdAt;
       //          project.requestType = dataProject.data.result.content[0].requestType;
       //        }
       //      })
       //    })
       //    deferred.resolve(openPromises)
       //   })
        })
        return deferred.promise;
       }

    return service;

  }
})();
