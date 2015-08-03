'use strict'

CopilotMessagingController = ($stateParams, $state, $window, UserV3Service, $scope) ->
  vm = this
  vm.threadId = $stateParams.id
  vm.subscriberId = null

  vm.back = ->
    $state.go('project-details')

  $scope.$watch UserV3Service.getCurrentUser, ->
    user            = UserV3Service.getCurrentUser()
    vm.subscriberId = user.id if user

  vm

CopilotMessagingController.$inject = ['$stateParams', '$state', '$window', 'UserV3Service', '$scope']

angular.module('app').controller 'CopilotMessagingController', CopilotMessagingController