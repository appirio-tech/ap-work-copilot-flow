'use strict'

ClaimProjectController = ($scope, $rootScope, $window, ClaimProjectService, NavService, $state) ->
  $scope.activeState  = NavService.activeState
  $scope.work         = ClaimProjectService.work
  $scope.copilotWork = ClaimProjectService.copilotWork
  $scope.completed    = NavService.completed
  $scope.asideService = getEstimate: ClaimProjectService.getEstimate
  # $scope.hideClaimButton = false
  $scope.showClaimedModal = false
  $scope.showCreateEstimatesButton = false
  $rootScope.showCreateChallengesModal = false
  $scope.showCreateChallengesButton = false
  $scope.showLaunchButton = false
  $scope.projectAvailable = true
  # $scope.projectStatus = ClaimProjectService.currentStatus();

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

      $state.go 'view-projects.assigned' , options

  $rootScope.$on 'projectClaimed', ->
   $scope.showClaimedModal = true
   $scope.projectAvailable = false

   $rootScope.$on 'challengeEstimatesSubmitted', ->
    $rootScope.showCreateChallengesModal = true

  $scope.submitClaim = ->
    ClaimProjectService.submitClaim($scope.work.id)

  # $scope.projectAvailable = ->
  #   ClaimProjectService.projectAvailable

  $scope.revealCreateEstimatesButton = ->
    $scope.showCreateEstimatesButton = true
    $scope.showClaimedModal  = false

  $scope.revealProjectEstimates = ->
    $scope.showClaimedModal  = false
    $scope.showCreateEstimatesButton = true

  $scope.openCreateChallenges = ->
    $window.open('https://www.topcoder.com/direct/home.action', '_blank')
    true
    $scope.showLaunchButton = true

  $scope.hideCreateChallengesModal = ->
    $scope.showCreateChallengesModal = false
    $scope.showCreateChallengesButton = true


  activate = ->
    # ClaimProjectService.resetWork() unless $scope.work

  activate()

ClaimProjectController.$inject = ['$scope', '$rootScope', '$window','ClaimProjectService', 'NavService', '$state']

angular.module('app.claim-project').controller 'ClaimProjectController', ClaimProjectController

