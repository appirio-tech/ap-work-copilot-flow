'use strict'

directive = ->
  restrict   : 'E'
  controller : 'CopilotProjectsController as vm'
  templateUrl: 'views/copilot-projects.directive.html'
  scope      : true

angular.module('appirio-tech-ng-copilot').directive 'copilotProjects', directive
