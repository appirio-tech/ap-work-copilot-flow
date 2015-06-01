(function () {
  'use strict';

  angular
    .module('app.projects')
    .run(runApp);

  runApp.$inject = ['routerHelper', 'ProjectsService', 'SubmitWorkService'];
  /* @ngInject */
  function runApp(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'view-projects',
        config: {
          url: '/projects',
          templateUrl: 'projects/views/projects.html',
          controller: 'ProjectsController',
          controllerAs: 'vm',
          title: 'View Projects',
          settings: {},
          params: {
            save: {}
          },
          resolve: {
            workRequests: ['ProjectsService', function(ProjectsService) {
              return ProjectsService.getWorkRequests();
            }]
          }
        }
      }
    ];
  }
})();