(function () {
  'use strict';

  angular
    .module('app.claim-project')
    .factory('ClaimProjectService', ClaimProjectService);

  ClaimProjectService.$inject = ['$rootScope', '$http', '$q', 'data', 'UserService'];
  /* @ngInject */
  function ClaimProjectService($rootScope, $http, $q, data, UserService) {
    // local used by "save" function
    var created = false;
    var service = {

      // variables
      work           : null,
      copilotWork : null,
      claimedProjectId: null,
      copilotWorkId: null,
      workDetails: {},

      // functions
      save           : null,
      savePrice      : null,
      getEstimate    : null,
      resetWork      : null,
      initializeWork : null,
      submitChallenges: null,
      submitClaim: null,
      projectAvailable: null,
      showCreateEstimatesButton: null,
    };

    // using a default helps with resetting after submit
    var defaultWork = {
      name             : null,
      requestType      : null,
      usageDescription : null,
      summary          : null,
      status           : 'Incomplete',
      competitorApps   : [],
      features         : [],
      costEstimate     : { low: 0, high: 0 },
      acceptedTerms    : false
    };

    service.work = angular.copy(defaultWork);

    // these are all the fields we'll actually submit on
    // a POST or PUT. everything else is filtered.
    var submittableFields = [
      'name',
      'requestType',
      'usageDescription',
      'summary',
      'competitorApps',
      'status',
      'features'
    ];

    service.save = function(status, reset) {
      var promise = $q.defer();
      var work = {};

      // copy only submittable fields
      for (var key in service.work) {
        if (submittableFields.indexOf(key) >= 0) {
          work[key] = angular.copy(service.work[key]);
        }
      }

      if (status) {
        work.status = status;
      }

      // need to filter out stuff used for front-end processing
      work.features = work.features.filter(function(x) {
        return x.selected;
      }).map(function(x) {
        x.id = undefined;
        x.description = x.explanation;
        x.explanation = undefined;
        x.selected = undefined;
      });

      if (!created) {
        data.create('work-request', work).then(function(data) {
          created = true;
          service.id = data.result.content;
          service.savePrice();
          promise.resolve(data);
        }).catch(function(e) {
          $q.reject(e);
        });
      } else {
        work.id = service.id;
        data.update('work-request', work).then(function(data) {
          // do nothing
        }).catch(function(e) {
          $q.reject(e);
        });
      }
      if (reset) {
        service.resetWork();
      }
      return promise;
    };

    service.getEstimate = function() {
      var work = service.work;
      if (work.requestType) {
        // this is a calculation of the estimate
        var estimate = work.features.reduce(function(x, y) {
          if (y.selected) {
            x.low += 800;
            x.high += 1200;
          }
          return x;
        }, {low: 2000, high: 2000});
        if (work.costEstimate && work.costEstimate.low > estimate.low) {
          return work.costEstimate;
        } else {
          return estimate;
        }
      } else {
        return {low: 0, high: 0};
      }
    };

    service.savePrice = function() {
      data.get('work-request', {id: service.id}).then(function(data) {
        service.work.costEstimate = data.result.content.costEstimate;
      });
    };

    service.resetWork = function() {
      service.work = angular.copy(defaultWork);
    };

    // service.initializeWork = function(id) {
    //   //reset 'work' for correct project details info
    //   service.copilotWork = null;
    //   service.work = null;
    //   var deferred = $q.defer();
    //   data.get('work-request', {filter: 'copilotId=unassigned', id: id}).then(function(data) {
    //     service.work = data.result.content;
    //     deferred.resolve(service.work);
    //     console.log('work request details', data.result.content);
    //   }).catch(function(e) {
    //     console.log('error on initialize work', e)
    //   })
    //   return deferred.promise;
    // };

   service.initializeCopilotWork = function(id, status) {
      // service.work = null;
      // service.copilotWork = null;
      // console.log('PASSING ID', id)
      //    var deferred = $q.defer();
      //    //later change to dynamic copilot Id
      //    data.get('work-request', {filter: 'copilotId=unassigned', id: id}).then(function(data) {
      //      service.copilotWork = data.result.content;
      //      deferred.resolve(service.copilotWork);
      //      console.log('copilot request details', data.result.content);
      //    });
      //    return deferred.promise;
      //  }
      if (status) {
        service.workDetails[id] = {};
        service.workDetails[id].status = status;
      }
     var deferred = $q.defer();
           data.get('copilot-work-request', {id: id}).then(function(data) {
             service.work = data.result.content;
             deferred.resolve(service.work);
             console.log('work request details', data.result.content);
           }).catch(function(e) {
             console.log('error on initialize work', e)
           })
           return deferred.promise;
         };

    service.submitClaim= function(copilotId, projectId) {
      //   data.create('copilot-assigned-projects', {copilotId: copilotId, "id": "900"}).then(function(data) {
      //     //later change to dynamic copilot project id
      //     service.claimedProjectId = projectId;
      //     $rootScope.$emit('projectClaimed');
      //   }).catch(function(e) {
      //     // service.projectAvailable= false;
      //       console.log('error on project claim', e);
      //       $q.reject(e);
      //   });
        $http.post('https://api.topcoder-dev.com/v3/copilots/'+copilotId+'/projects/', {"id": projectId}).
          success(function(data, status, headers, config) {
           console.log('Updated project status', data);
           service.claimedProjectId = projectId;
           if (!service.workDetails[projectId]) {
                service.workDetails[projectId] = {}
                service.workDetails[projectId].status = 'awaiting_estimates';
            }
            $rootScope.$emit('projectClaimed');
          }).
          error(function(data, status, headers, config) {
            console.log('error on project claim', data)
          });
    };

   service.submitChallenges = function(projectId, challengesEstimate) {
    data.get('copilot-assigned-projects', {id: projectId}).then(function(data) {
      data.result.content.estimate = challengesEstimate;
      data.result.content.status = 'awaiting_approval';
      data.$update({id: projectId});
      $rootScope.$emit('challengeEstimatesSubmitted')
      console.log('Updated project challenge estimates', data.result.content);
      //show create challenges modal
    }).catch(function(e) {
      // $rootScope.$emit('challengeEstimatesSubmitted')
        console.log('error on submit challenge', e)
        $q.reject(e);
    });
   };

   service.projectAvailable = function(project, projectId) {
    var claimedProjectStatuses = ['awaiting_estimates',
    'awaiting_approval',
    'awaiting_challenge_creation',
    'launched']
    if (service.workDetails[projectId]) {
      return claimedProjectStatuses.indexOf(service.workDetails[projectId].status) < 0
    } else {
    return project.status === 'Incomplete' || project.status === 'Submitted'
    }
   }

   service.showCreateEstimatesButton = function(projectId) {
    if (service.workDetails[projectId]) {
            return service.workDetails[projectId].status === 'awaiting_estimates'
    }
   }

    return service;

  }
})();
