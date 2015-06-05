(function () {
  'use strict';

  angular
    .module('app.projects')
    .run(runApp);

  runApp.$inject = ['routerHelper', 'ProjectsService', 'ClaimProjectService'];
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
      }, {
        state: 'view-my-projects',
        config: {
          url: '/my-projects/:id?',
          templateUrl: 'projects/views/my-projects.html',
          controller: 'MyProjectsController',
          controllerAs: 'vm',
          title: 'View My Projects',
          settings: {},
          params: {
            save: {}
          },
          resolve: {
            copilotAssignedProjects: ['$stateParams', 'ProjectsService', function($stateParams, ProjectsService) {
              if ($stateParams.id) {
                return ProjectsService.getAssignedProjects($stateParams.id);
              } else {
                return false;
              }
            }]
          }
        }
      }
    ];
  }
})();