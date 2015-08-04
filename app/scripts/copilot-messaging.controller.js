'use strict';
var CopilotMessagingController;
CopilotMessagingController = function($stateParams, $state, $window, UserV3Service, $scope) {
  var vm;
  vm = this;
  vm.threadId = $stateParams.id;
  vm.subscriberId = null;
  vm.back = function() {
    if ($state.params.status) {
      $state.go('project-details', {status: $state.params.status, id: $state.params.id})
    } else {
      $state.go('project-details', {id: $state.params.id})
    }
  };
  $scope.$watch(UserV3Service.getCurrentUser, function() {
    var user;
    user = UserV3Service.getCurrentUser();
    if (user) {
      return vm.subscriberId = user.id;
    }
  });
  return vm;
};
CopilotMessagingController.$inject = ['$stateParams', '$state', '$window', 'UserV3Service', '$scope'];
angular.module('ap-copilot-flow.project-details').controller('CopilotMessagingController', CopilotMessagingController);