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
        abstract: true,
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
    }, {
      state: 'claim-project.name',
      config: {
        url: '',
        templateUrl: 'claim-project/about-project/views/name.html',
        controller: 'SubmitNameController',
        controllerAs: 'vm'
      }
    }, {
      state: 'claim-project.type',
      config: {
        url: '',
        templateUrl: 'claim-project/about-project/views/type.html',
        controller: 'SubmitTypeController',
        controllerAs: 'vm'
      }
    },
    {
      state: 'claim-project.brief',
      config: {
        url: '',
        templateUrl: 'claim-project/about-project/views/brief.html',
        controller: 'SubmitBriefController',
        controllerAs: 'vm'
      }
    },
    {
      state: 'claim-project.competitors',
      config: {
        url: '',
        templateUrl: 'claim-project/about-project/views/competitors.html',
        controller: 'SubmitCompetitorsController',
        controllerAs: 'vm'
      }
    }
    ];
  }
})();
