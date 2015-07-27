'use strict'

config = ($stateProvider) ->
  states = {}

  states['view-projects'] =
    url         : '/projects'
    templateUrl : 'views/projectTabs.html'
    controller: 'ProjectsTabController'
    controllerAs: 'vm'
    title: 'View Projects'
    abstract: true

  states['view-projects.assigned'] =
    url         : '/assigned'
    templateUrl : 'views/projects.html'
    controller: 'ProjectsController'
    controllerAs: 'vm'

  states['view-projects.open'] =
    url         : '/open'
    templateUrl : 'views/projects.html'
    controller: 'ProjectsController'
    controllerAs: 'vm'

  states['project-details'] =
    url: '/project-details/:id?/:status?',
    title: 'Claim Project',
    templateUrl : 'views/project-details.html'
    controller: 'ProjectDetailsController',
    controllerAs: 'vm',
    resolve:
      copilotWork: ['$stateParams', 'ProjectDetailsService', ($stateParams, ProjectDetailsService) ->
        if $stateParams.id && $stateParams.status
          return ProjectDetailsService.initializeCopilotWork($stateParams.id, $stateParams.status);
        else if $stateParams.id
          return ProjectDetailsService.initializeCopilotWork($stateParams.id);
        else
          return false;
       ]

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()