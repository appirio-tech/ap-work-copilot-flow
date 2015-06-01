'use strict'

ClaimProjectController = ($scope, ClaimProjectService, NavService, $state) ->
  $scope.activeState  = NavService.activeState
  $scope.work         = ClaimProjectService.work
  $scope.completed    = NavService.completed
  $scope.asideService = getEstimate: ClaimProjectService.getEstimate

  # Watch service to set active state
  watchActiveState = ->
    NavService.activeState

  setActiveState = (activeState) ->
    $scope.activeState = activeState

  $scope.$watch watchActiveState, setActiveState, true

  # Watch service to set completed
  watchCompleted = ->
    NavService.completed

  setCompleted = (completed) ->
    $scope.completed = completed

  $scope.$watch watchCompleted, setCompleted, true

  $scope.launch = ->
    for state in NavService.states
      unless state.form?.$valid
        state.form.$setDirty()

        activateState = state unless activateState

    if activateState
      NavService.setActiveState activateState
    else
      NavService.reset()

      options = save: 'yes'

      $state.go 'view-projects' , options

  activate = ->
    ClaimProjectService.resetWork() unless $scope.work

  activate()

ClaimProjectController.$inject = ['$scope', 'ClaimProjectService', 'NavService', '$state']

angular.module('app.claim-project').controller 'ClaimProjectController', ClaimProjectController

