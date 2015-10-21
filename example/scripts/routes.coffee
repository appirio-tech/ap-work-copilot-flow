'use strict'

config = ($stateProvider) ->
  states = {}

  states['projects'] =
    url: '/'
    templateUrl: 'views/copilot-projects.example.html'

  states['details'] =
    url: '/details'
    templateUrl: 'views/copilot-details.example.html'

  states['project-details.challenges'] =
    url         : '/challenges'
    templateUrl : 'views/challenges.html'
    controller: 'ChallengesController'
    controllerAs: 'vm'


  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()