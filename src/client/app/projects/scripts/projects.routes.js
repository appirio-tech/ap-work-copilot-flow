(function () {
  'use strict';

  angular
    .module('app.projects').run(runApp);

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
          abstract: true,
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
        //later change to getAssignedProjects()
        resolve: {
          copilotAssignedProjects: ['ProjectsService', function(ProjectsService) {
            return ProjectsService.getWorkRequests();
          }]
        }
        }
      }, {
        state: 'view-projects.open',
        config: {
          url: '',
          templateUrl: 'projects/views/open-projects.html',
          controller: 'ProjectsController',
          controllerAs: 'vm',
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