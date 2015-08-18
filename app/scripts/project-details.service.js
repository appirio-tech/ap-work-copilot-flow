(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.project-details')
    .factory('ProjectDetailsService', ProjectDetailsService);

  ProjectDetailsService.$inject = ['$resouce', 'API_URL', 'UserV3Service'];

  function ProjectDetailsService($resource, API_URL, UserV3Service) {
    var service = {

      // variables
      // work           : null,
      // claimedProjectId: null,
      // currentUserId: null,
      // workDetails: {},

    };

   // service.initializeCopilotWork = function(id) {
   //  service.workDetails[id] = {};
   //  var deferred = $q.defer();
   //  $http.get(API_URL+'/work/'+id)
   //    .success(function(data, status, headers, config) {
   //     service.work = data.result.content;
   //      service.workDetails[id].status = service.work.status;
   //     deferred.resolve(service.work);
   //   }).
   //   error(function(data, status, headers, config) {
   //     console.log('error on work details', data)
   //   });
   //     return deferred.promise;
   //  };

    service.submitClaim= function(projectId) {
      var user = UserV3Service.getCurrentUser();
      $http.post(API_URL+'/copilots/'+user.id+'/projects/',
        {"id": projectId}
        ).success(function(data, status, headers, config) {
          console.log('the data', data)
         $rootScope.$emit('projectClaimed');
         if (!service.workDetails[projectId]) {
            service.workDetails[projectId] = {}
          }
            service.workDetails[projectId].status = 'Assigned';
        }).
          error(function(data, status, headers, config) {
            console.log('error on project claim', data);
        });
     };

   service.submitChallenges = function(projectId, challengesEstimate) {
    var user = UserV3Service.getCurrentUser();
    $http.put(API_URL+'/copilots/'+user.id+'/projects/'+projectId+'',
      {"id": projectId, "estimate": challengesEstimate, "status": "estimated"}
      ).success(function(data, status, headers, config) {
       if (!service.workDetails[projectId]) {
            service.workDetails[projectId] = {}
        }
        service.workDetails[projectId].status = 'Estimate';
        service.workDetails[projectId].estimate = challengesEstimate;
      }).
      error(function(data, status, headers, config) {
        console.log('error on submit estimates', data);
      });
    };

   service.launchProject = function(projectId) {
    var user = UserV3Service.getCurrentUser();
    $http.put(API_URL+'/copilots/'+user.id+'/projects/'+projectId+'',
      {"id": projectId, "estimate": service.workDetails[projectId].estimate, "status": "launched"}
      ).success(function(data, status, headers, config) {
       if (!service.workDetails[projectId]) {
            service.workDetails[projectId] = {}
        }
        service.workDetails[projectId].status = 'Launched';
      }).
      error(function(data, status, headers, config) {
        console.log('error on project launch', data);
      });
    }

   service.projectAvailable = function(project, projectId) {
      var claimedProjectStatuses =
      ['Assigned',
      'Estimate',
      'Approved',
      'awaiting_launch',
      'Launched']
      if (service.workDetails[projectId]) {
        return claimedProjectStatuses.indexOf(service.workDetails[projectId].status) < 0
      } else {
      return project.status === 'Incomplete' || project.status === 'Submitted';
      }
   }

   service.showStatusComponent = function(projectId, status) {
      if (service.workDetails[projectId]) {
        return service.workDetails[projectId].status === status;
      }
   }

   service.openCreateChallenges = function(projectId) {
    if (service.workDetails[projectId]) {
      service.workDetails[projectId].status = 'awaiting_launch';
    }
   }

    return service;

  }
})();
