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
        console.log('open projects', data.result.content);
      }).catch(function(e) {
            console.log('error on open projects', e);
            $q.reject(e);
        });
        return deferred.promise;
    };

    service.getAssignedProjects = function() {
      var deferred = $q.defer();
      data.get('copilot-assigned-projects', {copilotId: UserService.currentUser.id}).then(function(data) {
        var openPromises = data.result.content;
        var promises = data.result.content.map(function(project) {
         return $http({
           method: 'GET',
           url: 'https://api.topcoder-dev.com/v3/app-work-requests/',
           params: { filter: 'copilotId=unassigned&id='+project.id}
            })
       });
        $q.all(promises)
        .then(function(data) {
          data.forEach(function(dataProject) {
            openPromises.forEach(function(project) {
              if (project.id === dataProject.data.result.content[0].id) {
                project.name = dataProject.data.result.content[0].name;
                project.requestType = dataProject.data.result.content[0].requestType;
              }
            })
          })
          console.log('open promises', openPromises)
          deferred.resolve(openPromises)
         })
        })
        return deferred.promise;
       }

       // $scope.promises = data.result.content;
       // var promises = data.result.content.map(function(project) {
       //   return $http('specific call for project');
       // });
       // $q.all(promises)
       // .then (data) {
       //   # data is array of projects
       //   # look in $scope.promises for the same project.id as each project in data (data[0], data[1])
       //   # and update
       //   }



    // get names:
    // data.result.content.map(function(project) {
    //        $http({
    //        method: 'GET',
    //        url: 'https://api.topcoder-dev.com/v3/app-work-requests/',
    //        params: { filter: 'copilotId=unassigned&id='+project.id}
    //       }).success(function(projectData, status) {
    //         project.name = projectData.result.content[0].name;
    //         console.log('le mod proje', project)
    //         return project;
    //         // deferred.resolve(project)
    //       }).error(function(data) {
    //         console.log('error on mapping', data)
    //     })
    //       }));
    //       })
    //   });


    // service.getProjectName = function(project) {
    //   var deferred = $q.defer();
    //    var req = {
    //    method: 'GET',
    //    url: 'https://api.topcoder-dev.com/v3/app-work-requests',
    //    params: { filter: 'copilotId=unassigned&id='+project.id}
    //   }
    //   $http(req).success(function(data, status) {
    //     deferred.resolve(data.result.content[0].name);
    //     console.log('ugh', data.result.content[0].name)
    //   })
    //   return deferred.promise
    //   };

    return service;

  }
})();
