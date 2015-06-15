(function () {
  'use strict';

  angular
    .module('app.claim-project')
    .factory('ClaimProjectService', ClaimProjectService);

  ClaimProjectService.$inject = ['$rootScope', '$q', 'data'];
  /* @ngInject */
  function ClaimProjectService($rootScope, $q, data) {
    // local used by "save" function
    var created = false;
    var service = {

      // variables
      work           : {},
      copilotWork : null,
      claimedProjectId: null,

      // functions
      save           : null,
      savePrice      : null,
      getEstimate    : null,
      resetWork      : null,
      initializeWork : null,
      submitChallenges: null,
      submitClaim: null
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

    service.initializeWork = function(id) {
      var deferred = $q.defer();
      data.get('work-request', {id: id}).then(function(data) {
        service.work = data.result.content;
        deferred.resolve(service.work);
      });
      return deferred.promise;
    };

    service.initializeCopilotWork = function(id) {
      var deferred = $q.defer();
      data.get('copilot-assigned-projects', {id: id}).then(function(data) {
        service.copilotWork = data.result.content;
        deferred.resolve(service.copilotWork);
      });
      return deferred.promise;
    };

    service.submitClaim= function(projectId) {
        data.create('copilot-assigned-projects').then(function(data) {
          console.log('Updated project status', data)
          //later change to dynamic copilot project id
          service.claimedProjectId = 'project-2';
        }).catch(function(e) {
          service.claimedProjectId = 'project-2';
          $rootScope.$emit('projectClaimed');
          // service.projectAvailable= false;
            console.log('error on project claim', e);
            $q.reject(e);
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

   // service.allowCreateChallenges = function() {
   //  return service.showCreateChallenges;
   // }

    return service;

  }
})();
