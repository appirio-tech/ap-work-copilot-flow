'use strict'

directive = ->
  restrict   : 'E'
  controller : 'CopilotDetailsController as vm'
  templateUrl: 'views/copilot-details.directive.html'
  scope      : true

angular.module('appirio-tech-ng-copilot').directive 'copilotDetails', directive
