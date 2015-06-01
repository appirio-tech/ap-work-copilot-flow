(function () {
  'use strict';

  angular.module('app.submit-work').run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'submit-work',
      config: {
        url: '/submit-work/:id?',
        title: 'Submit Work',
        abstract: true,
        controller: 'SubmitWorkController',
        resolve: {
          work: ['$stateParams', 'SubmitWorkService', function($stateParams, SubmitWorkService) {
            if ($stateParams.id) {
              return SubmitWorkService.initializeWork($stateParams.id);
            } else {
              return false;
            }
          }]
        },
        templateUrl: 'submit-work/submit-work.html'
      }
    }, {
      state: 'submit-work.name',
      config: {
        url: '',
        templateUrl: 'submit-work/about-project/views/name.html',
        controller: 'SubmitNameController',
        controllerAs: 'vm'
      }
    }, {
      state: 'submit-work.type',
      config: {
        url: '',
        templateUrl: 'submit-work/about-project/views/type.html',
        controller: 'SubmitTypeController',
        controllerAs: 'vm'
      }
    },
    {
      state: 'submit-work.brief',
      config: {
        url: '',
        templateUrl: 'submit-work/about-project/views/brief.html',
        controller: 'SubmitBriefController',
        controllerAs: 'vm'
      }
    },
    {
      state: 'submit-work.competitors',
      config: {
        url: '',
        templateUrl: 'submit-work/about-project/views/competitors.html',
        controller: 'SubmitCompetitorsController',
        controllerAs: 'vm'
      }
    }
    ];
  }
})();
