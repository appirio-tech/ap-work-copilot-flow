'use strict'

ClaimProjectController = ($scope, $rootScope, $window, ClaimProjectService, UserService, NavService, $state, ThreadsAPIService, UserV3Service) ->
  $scope.activeState  = NavService.activeState
  $scope.work         =  ClaimProjectService.work
  $scope.completed    = NavService.completed
  $scope.asideService = getEstimate: ClaimProjectService.getEstimate
  # $scope.hideClaimButton = false
  $scope.showClaimedModal = false
  # $scope.showCreateEstimatesButton = false
  $scope.showCreateChallengesModal = false
  $scope.showLaunchButton = false
  # $scope.projectAvailable = true
  $scope.claimedProjectId = ClaimProjectService.claimedProjectId;
  $scope.threadId = null;
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

      $state.go 'view-projects.open' , options

  $rootScope.$on 'projectClaimed', ->
   $scope.showClaimedModal = true
   # $scope.projectAvailable = false

   $rootScope.$on 'challengeEstimatesSubmitted', ->
    $scope.showCreateChallengesModal = true

  $scope.submitClaim = ->
    copilotId = UserService.currentUser.id
    projectId = $scope.work.id
    ClaimProjectService.submitClaim(copilotId, projectId)

  $scope.projectAvailable = ->
    ClaimProjectService.projectAvailable($scope.work, $scope.work.id)

  $scope.revealCreateEstimatesButton = ->
    # $scope.showCreateEstimatesButton = true
    $scope.showClaimedModal  = false

  $scope.revealProjectEstimates = ->
    $scope.showClaimedModal  = false
    # $scope.showCreateEstimatesButton = true

  $scope.openCreateChallenges = ->
    $window.open('https://www.topcoder.com/direct/home.action', '_blank')
    true
    $scope.showLaunchButton = true
    $scope.showCreateChallengesModal = false

  $scope.hideCreateChallengesModal = ->
    $scope.showCreateChallengesModal = false
    # $scope.projectAvailable = false
    # $scope.showCreateEstimatesButton = false

  $scope.showCreateEstimatesButton = ->
    ClaimProjectService.showCreateEstimatesButton($scope.work.id);

  $scope.showCreateChallengesButton = ->
    ClaimProjectService.showCreateChallengesButton($scope.work.id);

  activate = ->
   getOrCreateThread = ->
      #TODO: get rid of this call
      UserV3Service.getCurrentUser (user) ->
        publishers = [
          user.id
          $scope.work.ownerId
        ]
        # ThreadsAPIService.query subscriberId: user.id

        params =
          clientIdentifier: $scope.work.id
          context         : 'work'
          #project name
          subject         : $scope.work.name
          publishers      : publishers
          subscribers     : publishers

        thread  = new ThreadsAPIService params
        resource = thread.$save()

        resource.then (response) ->
          $scope.threadId = response?.result?.content?.id


    getOrCreateThread()

  activate()

ClaimProjectController.$inject = ['$scope', '$rootScope', '$window','ClaimProjectService', 'UserService', 'NavService', '$state', 'ThreadsAPIService', 'UserV3Service']

angular.module('app.claim-project').controller 'ClaimProjectController', ClaimProjectController

