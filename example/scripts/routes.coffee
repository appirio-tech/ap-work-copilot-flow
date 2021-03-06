'use strict'

config = ($stateProvider) ->
  states = {}

  states['home'] =
    url: '/'
    templateUrl: 'index.html'
    controller: 'ExampleController'
    controllerAs: 'vm'

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
    controllerAs: 'vm'

  states['project-details.challenges'] =
    url         : '/challenges'
    templateUrl : 'views/challenges.html'
    controller: 'ChallengesController'
    controllerAs: 'vm'


  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()