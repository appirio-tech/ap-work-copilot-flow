(function () {
  'use strict';

  angular.module('app.claim-project').run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'claim-project',
      config: {
        url: '/claim-project/:id?',
        title: 'Claim Project',
        // abstract: true,
        controller: 'ClaimProjectController',
        resolve: {
          work: ['$stateParams', 'ClaimProjectService', function($stateParams, ClaimProjectService) {
            if ($stateParams.id) {
              return ClaimProjectService.initializeWork($stateParams.id);
            } else {
              return false;
            }
          }]
        },
        templateUrl: 'claim-project/claim-project.html'
      }
    },{
      state: 'claim-project.challenges',
      config: {
        url: '',
        templateUrl: 'claim-project/about-project/views/challenges.html',
        controller: 'SubmitChallengesController',
        controllerAs: 'vm'
      }
    },
    {
      state: 'claim-project.createChallenges',
      config: {
        url: '',
        templateUrl: 'claim-project/about-project/views/createChallenges.html',
        controller: 'CreateChallengesController',
        controllerAs: 'vm'
      }
    },
    {
      state: 'claim-project.launch',
      config: {
        url: '',
        templateUrl: 'claim-project/about-project/views/launch.html',
        controller: 'LaunchController',
        controllerAs: 'vm'
      }
    }
    ];
  }
})();
// {
//      state: 'claim-project.claim',
//      config: {
//        url: '',
//        templateUrl: 'claim-project/about-project/views/claim.html',
//        controller: 'SubmitClaimController',
//        controllerAs: 'vm'
//      }
//    },