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
      $http.get(apiUrl + 'work?filter=copilotId%3Dunassigned')
      .success(function(data, status, headers, config) {
        service.projects = data.result.content;
         deferred.resolve(data.result.content)
        }).
          error(function(data, status, headers, config) {
            console.log('error getting projects', data);
        });
        return deferred.promise
     };

    service.getAssignedProjects = function() {
      var deferred = $q.defer();
      var user = UserV3Service.getCurrentUser();
        $http.get(apiUrl + 'work?filter=copilotId%3D'+user.id)
        .success(function(data, status, headers, config) {
           service.projects = data.result.content;
           deferred.resolve(data.result.content)
          }).
            error(function(data, status, headers, config) {
              console.log('error getting projects', data);
          });
          return deferred.promise
     };

    return service;

  }
})();
