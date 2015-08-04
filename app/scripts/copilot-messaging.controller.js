'use strict';
var CopilotMessagingController;
CopilotMessagingController = function($stateParams, $state, $window, UserV3Service, $scope) {
  var vm;
  vm = this;
  vm.threadId = $stateParams.id;
  vm.subscriberId = null;
  vm.back = function() {
    return $state.go('project-details');
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