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
        state: 'view-projects.assigned',
        config: {
          url: '',
          templateUrl: 'projects/views/assigned-projects.html',
          controller: 'AssignedProjectsController',
          controllerAs: 'vm',
          title: 'View Assigned Projects'
          // resolve: {
          //   copilotAssignedProjects: ['$stateParams', 'ProjectsService', function($stateParams, ProjectsService) {
          //     if ($stateParams.id) {
          //       return ProjectsService.getAssignedProjects($stateParams.id);
          //     } else {
          //       return false;
          //     }
          //   }]
          // }
        }
      }, {
        state: 'view-projects.open',
        config: {
          url: '',
          templateUrl: 'projects/views/open-projects.html',
          controller: 'OpenProjectsController',
          controllerAs: 'vm',
          title: 'View Available Projects'
      }
    }
    ];
  }
})();