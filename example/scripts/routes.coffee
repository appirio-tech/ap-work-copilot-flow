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
    # resolve:
    #   workRequests: ['ProjectsService', (ProjectsService) ->
    #     return ProjectsService.getAssignedProjects()
    #   ]

  states['view-projects.open'] =
    url         : '/assigned'
    templateUrl : 'views/projects.html'
    controller: 'ProjectsController'
    controllerAs: 'vm'
    # resolve:
    #   workRequests: ['ProjectsService', (ProjectsService) ->
    #     return ProjectsService.getWorkRequests()
    #   ]

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()